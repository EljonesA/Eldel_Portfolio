'use client'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import AssessorModal from '../../components/AssessorModal'
import { getUnits, createUnit } from '@/sanity/lib/client'

type Unit = {
  code: string
  name: string
  description: string
  grade?: string
  status: 'completed' | 'in-progress' | 'upcoming'
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="relative p-[1px] rounded-lg overflow-hidden">
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#64ffda] via-[#0a192f] to-[#64ffda] bg-[length:200%_200%] animate-border-gradient" />
        
        {/* Content */}
        <div className="relative bg-[#112240] p-8 rounded-lg text-center max-w-md">
          <div className="text-6xl mb-6">📚</div>
          <h3 className="text-[#ccd6f6] text-xl font-semibold mb-3">
            No Units Available Yet
          </h3>
          <p className="text-[#8892b0] text-sm leading-relaxed">
            Units for this term haven't been added to the system yet. 
            Check back later for updates on your academic progress.
          </p>
          <div className="mt-6">
            <div className="inline-flex items-center gap-2 text-[#64ffda] text-sm">
              Coming soon
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function UnitsPage() {
  const params = useParams()
  const term = params.term as string
  const [units, setUnits] = useState<Unit[]>([])
  const [loading, setLoading] = useState(true)
  
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showUnitForm, setShowUnitForm] = useState(false)

  useEffect(() => {
    async function fetchUnits() {
      try {
        const data = await getUnits(term)
        console.log('Fetched units:', data)
        setUnits(data)
      } catch (error) {
        console.error('Error fetching units:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUnits()
  }, [term])

  const handleVerify = () => {
    setShowAuthModal(false)
    setShowUnitForm(true)
  }

  const handleAddUnit = async (unitData: Unit) => {
    try {
      const test = await createUnit({ ...unitData, term })
      console.log('Unit added:', test)
      const updatedUnits = await getUnits(term)
      setUnits(updatedUnits)
      setShowUnitForm(false)
    } catch (error) {
      console.error('Error adding unit:', error)
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-[#0a192f] flex items-center justify-center">
      <div className="text-[#64ffda]">Loading...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-[#0a192f] py-20 md:py-24">
      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            <span className="text-[#64ffda]">Term {term}</span>
            <span className="text-[#ccd6f6]"> Units</span>
          </h2>

          {units.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {units.map((unit) => (
                <div 
                  key={unit.code}
                  className="bg-[#112240] p-6 rounded-lg border border-[#233554]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-[#ccd6f6] text-lg font-semibold">
                      {unit.code}: {unit.name}
                    </h3>
                    {unit.grade && (
                      <span className="text-[#64ffda] font-bold">
                        Grade: {unit.grade}
                      </span>
                    )}
                  </div>
                  <p className="text-[#8892b0] text-sm mb-4">
                    {unit.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span 
                      className={`text-sm px-3 py-1 rounded-full ${
                        unit.status === 'completed' 
                          ? 'bg-green-900/20 text-green-400'
                          : unit.status === 'in-progress'
                          ? 'bg-blue-900/20 text-blue-400'
                          : 'bg-gray-900/20 text-gray-400'
                      }`}
                    >
                      {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      {/* Add Assessor Button */}
      <button
        onClick={() => setShowAuthModal(true)}
        className="fixed bottom-8 right-8 bg-[#64ffda] text-[#0a192f] rounded-full p-4 shadow-lg hover:bg-[#64ffda]/90 transition-all group"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#112240] text-[#64ffda] px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Add Unit
        </span>
      </button>

      {/* Auth Modal */}
      <AssessorModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onVerify={handleVerify}
      >
        <div className="sm:flex sm:items-start">
          <div className="w-full">
            <h2 className="text-[#ccd6f6] text-2xl font-semibold mb-6">Assessor Authentication</h2>
            <form onSubmit={(e) => {
              e.preventDefault()
              const token = new FormData(e.currentTarget).get('token') as string
              if (token === process.env.NEXT_PUBLIC_ASSESSOR_TOKEN) {
                handleVerify()
              } else {
                alert('Invalid token')
              }
            }}>
              <div className="relative">
                <input
                  type="password"
                  name="token"
                  placeholder="Enter access token"
                  className="w-full p-4 rounded-xl bg-[#0a192f] border border-[#233554] text-[#ccd6f6] 
                    placeholder-[#8892b0] focus:border-[#64ffda] focus:ring-1 focus:ring-[#64ffda] mb-4
                    transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#64ffda] text-[#0a192f] py-3 rounded-xl font-medium 
                  hover:bg-[#64ffda]/90 transition-colors mt-2"
              >
                Verify Access
              </button>
            </form>
          </div>
        </div>
      </AssessorModal>

      {/* Unit Form Modal */}
      <AssessorModal 
        isOpen={showUnitForm} 
        onClose={() => setShowUnitForm(false)}
        onVerify={() => {}}
      >
        <div className="sm:flex sm:items-start">
          <div className="w-full">
            <h2 className="text-[#ccd6f6] text-2xl font-semibold mb-6">Add New Unit</h2>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const unitData: Unit = {
                code: formData.get('code') as string,
                name: formData.get('name') as string,
                description: formData.get('description') as string,
                grade: formData.get('grade') as string,
                status: formData.get('status') as 'completed' | 'in-progress' | 'upcoming',
              }
              handleAddUnit(unitData)
            }}>
              <div className="space-y-4">
                <input
                  type="text"
                  name="code"
                  placeholder="Unit Code"
                  className="w-full p-4 rounded-xl bg-[#0a192f] border border-[#233554] text-[#ccd6f6] 
                    placeholder-[#8892b0] focus:border-[#64ffda] focus:ring-1 focus:ring-[#64ffda]
                    transition-all duration-200"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Unit Name"
                  className="w-full p-4 rounded-xl bg-[#0a192f] border border-[#233554] text-[#ccd6f6] 
                    placeholder-[#8892b0] focus:border-[#64ffda] focus:ring-1 focus:ring-[#64ffda]
                    transition-all duration-200"
                />
                <textarea
                  name="description"
                  placeholder="Unit Description"
                  className="w-full p-4 rounded-xl bg-[#0a192f] border border-[#233554] text-[#ccd6f6] 
                    placeholder-[#8892b0] focus:border-[#64ffda] focus:ring-1 focus:ring-[#64ffda]
                    transition-all duration-200"
                />
                <input
                  type="text"
                  name="grade"
                  placeholder="Grade (optional)"
                  className="w-full p-4 rounded-xl bg-[#0a192f] border border-[#233554] text-[#ccd6f6] 
                    placeholder-[#8892b0] focus:border-[#64ffda] focus:ring-1 focus:ring-[#64ffda]
                    transition-all duration-200"
                />
                <select
                  name="status"
                  className="w-full p-4 rounded-xl bg-[#0a192f] border border-[#233554] text-[#ccd6f6] 
                    focus:border-[#64ffda] focus:ring-1 focus:ring-[#64ffda]
                    transition-all duration-200"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-[#64ffda] text-[#0a192f] py-3 rounded-xl font-medium 
                  hover:bg-[#64ffda]/90 transition-colors mt-6"
              >
                Add Unit
              </button>
            </form>
          </div>
        </div>
      </AssessorModal>
    </div>
  )
}
