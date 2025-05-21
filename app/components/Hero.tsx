'use client'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative h-screen w-full bg-[#0a192f]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-[#0a192f]/60 to-transparent z-10 
          md:via-[#0a192f]/40 md:to-transparent" />
        <Image
          src="/var-faith.jpg"
          alt="Faith Kajuju"
          fill
          className="object-cover object-center opacity-30 md:opacity-80"
          priority
          quality={100}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-16">
      <div className="md:w-1/2">
        <p className="text-xl md:text-2xl mb-4 text-[#8892b0]">Zoho Certified Developer</p>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#ccd6f6]">
        Hi, I&apos;m <span className="text-[#64ffda]">Eldel</span>
        <br />
        Okutoyi
        </h1>
        <p className="text-2xl md:text-3xl text-[#8892b0]">From Kenya</p>
      </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
      <div className="w-6 h-10 border-2 border-[#8892b0] rounded-full flex justify-center">
        <div className="w-1 h-3 bg-[#8892b0] rounded-full animate-bounce mt-2" />
      </div>
      </div>
    </div>
  )
}