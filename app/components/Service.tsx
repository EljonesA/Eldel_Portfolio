'use client'

const services = [
  {
    title: 'Finance Data Migration',
    description: 'Accurate transfer of financial data to Zoho Books.',
    icon: '💳'
  },
  {
    title: 'User Training',
    description: 'Tailored sessions to empower teams on Zoho tools.',
    icon: '👥'
  },
  {
    title: 'Product Demonstrations',
    description: "Detailed demos showcasing Zoho's business solutions.",
    icon: '🎯'
  },
  {
    title: 'Consulting Services',
    description: 'Expert advice on selecting and implementing Zoho solutions.',
    icon: '💡'
  },
  {
    title: 'Agile Project Management',
    description: 'Timely delivery of projects using Agile methodologies.',
    icon: '📊'
  },
  {
    title: 'Finance Integration',
    description: 'Connect Zoho Books with payment gateways for efficient transactions.',
    icon: '🔄'
  }
]

export default function Services() {
  return (
    <section id="services" className="min-h-screen bg-[#0a192f] py-20 md:py-24">
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-[#64ffda]">My</span>
              <span className="text-[#ccd6f6]"> Services</span>
            </h2>
            <p className="text-[#8892b0] text-sm md:text-base mt-4">
              Comprehensive Zoho solutions to enhance your business operations
            </p>
          </div>

          {/* Services Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto px-2 py-1">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-[#112240] p-6 rounded-lg border border-[#233554] hover:border-[#64ffda] transition-all duration-300 transform hover:-translate-y-1 hover:translate-z-0"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-[#ccd6f6] text-lg font-semibold mb-2 hover:text-[#64ffda] transition-colors">
                  {service.title}
                </h3>
                <p className="text-[#8892b0] text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
