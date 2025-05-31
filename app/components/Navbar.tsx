'use client'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showAssessmentDropdown, setShowAssessmentDropdown] = useState(false)

  const navItems = ['Home', 'About'] // Remove Contact from here
  const assessmentTerms = ['Term 1', 'Term 2', 'Term 3']
  const allSections = [...navItems.map(item => item.toLowerCase()), 'assessments', 'contact']

  const isUnitsPage = pathname?.startsWith('/units')

  const setupObservers = useCallback(() => {
    const observers = new Map()

    allSections.forEach(section => {
      const element = document.getElementById(section)
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              // Special handling for home section
              if (section === 'home') {
                // Only set home as active if we're near the top of the page
                if (window.scrollY < 100) {
                  setActiveSection('home')
                }
              } else {
                setActiveSection(section)
              }
            }
          },
          { 
            threshold: section === 'home' ? 0.8 : 0.3,
            rootMargin: section === 'home' ? '0px' : '-50px'
          }
        )
        observer.observe(element)
        observers.set(section, observer)
      }
    })

    // Add scroll handler for home section
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('home')
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      observers.forEach(observer => observer.disconnect())
      window.removeEventListener('scroll', handleScroll)
    }
  }, [allSections])

  useEffect(() => {
    if (!isUnitsPage) {
      return setupObservers()
    }
    setActiveSection('assessments')
  }, [isUnitsPage, setupObservers])

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isUnitsPage) {
      router.push('/#contact')
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)  // Close mobile menu if open
  }

  return (
    <nav className="fixed w-full bg-[#0a192f] border-b border-[#233554] py-2 px-4 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold px-2">
          <Link href="/">
            <span className="text-[#64ffda]">Eldel</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`/${item === 'Home' ? '' : `#${item.toLowerCase()}`}`}
              className={`transition-colors relative group px-3 py-2 ${
                activeSection === item.toLowerCase() ? 'text-[#64ffda]' : 'text-[#8892b0] hover:text-[#64ffda]'
              }`}
            >
              {item}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#64ffda] transition-all duration-300 ease-in-out
                ${activeSection === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'}`} 
              />
            </Link>
          ))}
          
          {/* Assessment Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setShowAssessmentDropdown(true)}
            onMouseLeave={() => setShowAssessmentDropdown(false)}
          >
            <button className={`transition-colors px-3 py-2 relative ${
              (isUnitsPage || activeSection === 'assessments') 
                ? 'text-[#64ffda]' 
                : 'text-[#8892b0] hover:text-[#64ffda]'
            }`}>
              Assessments
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#64ffda] transition-all duration-300 ease-in-out
                ${(isUnitsPage || activeSection === 'assessments') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
              />
            </button>
            {showAssessmentDropdown && (
              <div className="absolute top-full left-0 bg-[#112240] rounded-lg py-2 min-w-[120px]">
                {assessmentTerms.map((term, index) => (
                  <Link
                    key={term}
                    href={`/units/${index + 1}`}
                    className="block px-4 py-2 text-[#8892b0] hover:text-[#64ffda] hover:bg-[#233554] transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Contact Link - Update both desktop and mobile versions */}
          <Link
            href="/#contact"
            onClick={handleContactClick}
            className={`transition-colors relative group px-3 py-2 ${
              activeSection === 'contact' ? 'text-[#64ffda]' : 'text-[#8892b0] hover:text-[#64ffda]'
            }`}
          >
            Contact
            <span className={`absolute bottom-0 left-0 h-0.5 bg-[#64ffda] transition-all duration-300 ease-in-out
              ${activeSection === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'}`} 
            />
          </Link>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-[#8892b0]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#0a192f] md:hidden">
            <div className="flex flex-col items-center py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`/${item === 'Home' ? '' : `#${item.toLowerCase()}`}`}
                  className={`transition-colors relative group px-3 py-2 ${
                    activeSection === item.toLowerCase() ? 'text-[#64ffda]' : 'text-[#8892b0] hover:text-[#64ffda]'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-[#64ffda] transition-all duration-300 ease-in-out
                    ${activeSection === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  />
                </Link>
              ))}

              {/* Assessment Dropdown in Mobile Menu */}
              <div className="relative group">
                <button className="text-[#8892b0] hover:text-[#64ffda] transition-colors px-3 py-2" onClick={() => setShowAssessmentDropdown(!showAssessmentDropdown)}>
                  Assessments
                </button>
                {showAssessmentDropdown && (
                  <div className="absolute top-full left-0 bg-[#112240] rounded-lg py-2 min-w-[120px]">
                    {assessmentTerms.map((term, index) => (
                      <Link
                        key={term}
                        href={`/units/${index + 1}`}
                        className="block px-4 py-2 text-[#8892b0] hover:text-[#64ffda] hover:bg-[#233554] transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {term}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Update mobile menu contact link too */}
              <Link
                href="/#contact"
                onClick={handleContactClick}
                className={`transition-colors relative group px-3 py-2 ${
                  activeSection === 'contact' ? 'text-[#64ffda]' : 'text-[#8892b0] hover:text-[#64ffda]'
                }`}
              >
                Contact
                <span className={`absolute bottom-0 left-0 h-0.5 bg-[#64ffda] transition-all duration-300 ease-in-out
                  ${activeSection === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
