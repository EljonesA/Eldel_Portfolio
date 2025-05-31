'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { IoPlayCircleOutline, IoPauseCircleOutline } from 'react-icons/io5'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

interface CarouselProps {
  images: string[]
  interval?: number
  className?: string
  sizes: string
}

const Carousel = ({ images, interval = 5000, className = "", sizes }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(nextSlide, interval)
    return () => clearInterval(timer)
  }, [nextSlide, interval, isPlaying])

  return (
    <div className={`relative group ${className}`}>
      <div className="relative h-full w-full">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          fill
          sizes={sizes}
          className="object-cover rounded-lg"
        />
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
        <button 
          onClick={prevSlide}
          className="text-white/80 hover:text-white transition-colors"
          aria-label="Previous slide"
        >
          <IoIosArrowBack size={24} />
        </button>
        
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-white/80 hover:text-white transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <IoPauseCircleOutline size={24} />
          ) : (
            <IoPlayCircleOutline size={24} />
          )}
        </button>

        <button 
          onClick={nextSlide}
          className="text-white/80 hover:text-white transition-colors"
          aria-label="Next slide"
        >
          <IoIosArrowForward size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex 
                ? 'bg-[#64ffda] w-4' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
