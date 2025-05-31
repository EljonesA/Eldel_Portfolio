'use client'
import { useState } from 'react'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Message sent successfully!')
        setFormData({ name: '', email: '', message: '' })
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch {
      alert('Error sending message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="min-h-screen bg-[#0a192f] flex items-center">
      <div className="w-full px-4 md:px-16 py-10 md:py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            <span className="text-[#64ffda]">Contact</span>
            <span className="text-[#ccd6f6]"> Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <p className="text-[#8892b0] mb-4">
                  Feel free to reach out to me for any inquiries or concerns you want to talk about.
                </p>
                <div className="space-y-3">
                  <p className="text-[#8892b0]">
                    <span className="text-[#64ffda]">Email:</span>{' '}
                    <a href="mailto:kajujufaith55@gmail.com" className="hover:text-[#64ffda] transition-colors">
                      eldelapiyo08@gmail.com
                    </a>
                  </p>
                  <p className="text-[#8892b0]">
                    <span className="text-[#64ffda]">Phone:</span>{' '}
                    <a href="tel:+254115409504" className="hover:text-[#64ffda] transition-colors">
                      +254 757 260 698
                    </a>
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-6">
                <a 
                  href="https://www.instagram.com/fai_kajuju/profilecard/?igsh=cnNoenNnNXJjOHhy" 
                  className="text-[#8892b0] hover:text-[#64ffda] transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram size={28} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/faith-kajuju-3430a5201?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                  className="text-[#8892b0] hover:text-[#64ffda] transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={28} />
                </a>
              </div>

              {/* <a 
                href="/FaithKajuju-CV.pdf" 
                download
                className="inline-block bg-[#64ffda] text-[#0a192f] px-8 py-3 rounded-lg hover:bg-[#64ffda]/80 transition-colors"
              >
                Download CV
              </a> */}
            </div>

            {/* Right Column - Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 bg-[#112240] rounded-lg border border-[#233554] text-[#ccd6f6] focus:border-[#64ffda] focus:outline-none transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-4 bg-[#112240] rounded-lg border border-[#233554] text-[#ccd6f6] focus:border-[#64ffda] focus:outline-none transition-colors"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={6}
                  className="w-full p-4 bg-[#112240] rounded-lg border border-[#233554] text-[#ccd6f6] focus:border-[#64ffda] focus:outline-none transition-colors resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#64ffda] text-[#0a192f] px-6 py-4 rounded-lg hover:bg-[#64ffda]/80 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}