'use client'
import { useState } from 'react'
import Image from 'next/image'

type Tab = 'Education' | 'Skills'

type TabItem = {
  title: string;
  desc?: string | React.ReactElement;
  issuer?: string;
  date?: string;
  credentialId?: string;
  link?: string;
}

type TabContent = {
  [K in Tab]: TabItem[];
}

export default function About() {
  const [activeTab, setActiveTab] = useState<Tab>('Skills')

  const tabContent: TabContent = {
    Skills: [
        { title: 'Zoho Development', desc: 'Expertise in customizing and building applications within the Zoho ecosystem to streamline business operations.' },
        { title: 'Custom Integrations', desc: 'Seamless integration of Zoho applications with third-party systems to enable data synchronization and automation.' },
        { title: 'Zoho Training', desc: 'Comprehensive training sessions to help teams efficiently use Zoho tools and maximize productivity.' },
        { title: 'Project Management', desc: 'Effective planning, execution, and tracking of projects to ensure timely delivery and alignment with business goals.' },
      ],
      Education: [
        { 
          title: '2019 - 2022', 
          desc: 'Bachelor of Technology in Information Technology',
        }
      ], 
  }

  const renderTabContent = () => {
    if (activeTab === 'Skills') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tabContent.Skills.map((skill, idx) => (
            <div 
              key={idx} 
              className="bg-[#112240] p-5 rounded-lg border border-[#233554] hover:border-[#64ffda]/50 transition-colors"
            >
              <h3 className="text-base font-semibold text-[#ccd6f6] mb-2">{skill.title}</h3>
              <p className="text-[#8892b0] text-sm leading-relaxed">{skill.desc}</p>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {tabContent[activeTab].map((item, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-base font-semibold text-[#ccd6f6]">{item.title}</h3>
            <p className="text-[#8892b0] text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <section id="about" className="min-h-screen bg-[#0a192f] py-20 md:py-24">
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-7xl mx-auto h-full grid md:grid-cols-2 gap-12 md:items-center">
          {/* Image - Hidden on mobile */}
          <div className="hidden md:block relative aspect-square rounded-2xl overflow-hidden">
            <Image
              src="/var-faith.jpg"
              alt="Faith Kajuju"
              fill
              className="object-cover"
            />
          </div>

          {/* Content - Full width on mobile */}
          <div className="w-full h-full flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 px-2">
              <span className="text-[#64ffda]">About</span>
              <span className="text-[#ccd6f6]"> Me</span>
            </h2>
            <div className="mb-6 px-2">
              <p className="text-[#8892b0] text-justify text-sm md:text-base leading-relaxed">
                I am a dedicated Zoho solutions expert with over two years of experience designing and implementing customized business systems using the Zoho One ecosystem. As a certified Zoho Partner, I specialize in creating tailored solutions that streamline operations, enhance productivity, and meet the unique needs of clients across various industries, including real estate, corporate travel, and healthcare. My expertise spans CRM development, data migration, user training, and process optimization, with a proven track record of solving complex challenges, such as data formatting issues and workflow inefficiencies. Passionate about leveraging technology to transform businesses, I thrive on exploring the endless possibilities within Zoho&apos;s ecosystem to deliver innovative and impactful solutions.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-between px-2 mb-6">
              {(['Skills', 'Education'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 relative text-sm md:text-base font-medium group ${
                    activeTab === tab ? 'text-[#64ffda]' : 'text-[#ccd6f6] hover:text-[#64ffda]'
                  }`}
                >
                  {tab}
                  {activeTab === tab ? (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#64ffda]" />
                  ) : (
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#64ffda] group-hover:w-full transition-all duration-300 ease-in-out" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content with relative height and padding */}
            <div className="flex-1 overflow-y-auto min-h-[45vh] md:min-h-[40vh] px-2">
              {activeTab === 'Skills' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tabContent.Skills.map((skill, idx) => (
                    <div 
                      key={idx} 
                      className="bg-[#112240] p-5 rounded-lg border border-[#233554] hover:border-[#64ffda]/50 transition-colors"
                    >
                      <h3 className="text-base font-semibold text-[#ccd6f6] mb-2">{skill.title}</h3>
                      <p className="text-[#8892b0] text-sm leading-relaxed">{skill.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {tabContent[activeTab].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="text-base font-semibold text-[#ccd6f6]">{item.title}</h3>
                      <p className="text-[#8892b0] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}