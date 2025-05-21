export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-[#0a192f] py-6 border-t border-[#233554]">
    <div className="max-w-7xl mx-auto px-4 md:px-16">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[#8892b0]">
      <p>© {currentYear} All Rights Reserved</p>
      <p className="mt-2 md:mt-0">
        Developed by{' '}
        <a 
        href="https://marabi.tech" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[#64ffda] hover:text-[#64ffda]/80 transition-colors"
        >
        Aineah Marabi
        </a>
        {' & '}
        <a 
        href="https://myhistory.co.ke" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[#64ffda] hover:text-[#64ffda]/80 transition-colors"
        >
        Eljones Odongo
        </a>
      </p>
      </div>
    </div>
    </footer>
  )
}