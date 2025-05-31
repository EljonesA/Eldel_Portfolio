'use client'
import { useState, useRef, useEffect } from 'react'
import { deleteUnit } from '@/sanity/lib/client'
import { Unit } from '@/types'


type UnitActionsProps = {
  unit: Unit
  onDelete: () => void
  onEdit: () => void
}

export default function UnitActions({ unit, onDelete, onEdit }: UnitActionsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDelete = async () => {
    if (!unit._id) return
    
    const token = prompt('Enter assessor token to confirm deletion:')
    if (!token) return

    if (token !== process.env.NEXT_PUBLIC_ASSESSOR_TOKEN) {
      alert('Invalid token')
      return
    }

    try {
      await deleteUnit(unit._id, token)
      onDelete()
      setIsOpen(false)
    } catch (error) {
      console.error('Error deleting unit:', error)
      alert('Failed to delete unit')
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[#8892b0] hover:text-[#64ffda] p-1 rounded-full"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#112240] border border-[#233554] z-10">
          <div className="py-1">
            <button
              onClick={() => {
                onEdit()
                setIsOpen(false)
              }}
              className="block w-full text-left px-4 py-2 text-sm text-[#64ffda] hover:bg-[#233554]"
            >
              Edit Unit
            </button>
            <button
              onClick={handleDelete}
              className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#233554]"
            >
              Delete Unit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
