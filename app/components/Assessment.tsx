'use client'
import { useRouter } from 'next/navigation'

const terms = [
  {
    title: 'Term 1',
    description: 'First Term Assessment Results',
    icon: '📚',
    period: 'January - April',
    average: '85%'
  },
  {
    title: 'Term 2',
    description: 'Second Term Assessment Results',
    icon: '📝',
    period: 'May - August',
    average: '87%'
  },
  {
    title: 'Term 3',
    description: 'Third Term Assessment Results',
    icon: '🎯',
    period: 'September - December',
    average: '89%'
  }
]

export default function Assessments() {
  const router = useRouter()

  const handleTermClick = (termNumber: number) => {
    router.push(`/units/${termNumber}`)
  }

  return (
    <section id="assessments" className="bg-[#0a192f] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-[#64ffda]">Academic</span>
              <span className="text-[#ccd6f6]"> Assessments</span>
            </h2>
            <p className="text-[#8892b0] text-sm md:text-base mt-4">
              Academic Performance Overview
            </p>
          </div>

          {/* Term Cards Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto px-2 py-1">
            {terms.map((term, index) => (
              <div
                key={index}
                onClick={() => handleTermClick(index + 1)}
                className="bg-[#112240] p-6 rounded-lg border border-[#233554] hover:border-[#64ffda] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="text-4xl mb-4">{term.icon}</div>
                <h3 className="text-[#ccd6f6] text-lg font-semibold mb-2 hover:text-[#64ffda] transition-colors">
                  {term.title}
                </h3>
                <p className="text-[#8892b0] text-sm leading-relaxed mb-4">
                  {term.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#8892b0]">{term.period}</span>
                  <span className="text-[#64ffda] font-semibold">Average: {term.average}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
