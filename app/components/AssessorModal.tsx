'use client'

import { useEffect } from 'react';

interface AssessorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
  children: React.ReactNode;
}

export default function AssessorModal({ isOpen, onClose, onVerify, children }: AssessorModalProps) {
  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal container - Always centered */}
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          {/* Modal panel */}
          <div 
            className={`
              relative w-full max-w-lg transform overflow-hidden
              rounded-2xl bg-[#112240] p-6
              text-left shadow-xl transition-all duration-300
              border border-[#233554]/50 backdrop-blur-sm
              
              /* Base state - for both mobile and desktop */
              opacity-0 scale-95 translate-y-0
              
              /* Active state */
              ${isOpen && 'opacity-100 scale-100'}
            `}
          >
            {/* Close button */}
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full p-1.5 
                text-[#8892b0] hover:text-[#64ffda] transition-colors
                focus:outline-none focus:ring-2 focus:ring-[#64ffda]"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content wrapper */}
            <div className="mt-3">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
