'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#1C1F3B] to-[#0A0A0F] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Orb Animation */}
        <div className="relative mb-12">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#e1944d]/30 to-[#e1944d]/10 border border-[#e1944d]/40 backdrop-blur-sm animate-pulse">
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#e1944d]/50 to-[#e1944d]/25"></div>
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#e1944d]/70 to-[#e1944d]/40"></div>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="font-lora text-4xl md:text-6xl font-light text-creamy-white mb-6 tracking-wide">
          Field Resonance Interrupted
        </h1>
        
        <p className="font-montserrat text-lg text-creamy-white/80 mb-8 leading-relaxed">
          The system encountered an unexpected resonance pattern. 
          The field is being recalibrated to restore optimal flow.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={reset}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-bright-orange/20 to-bright-orange/10 border border-bright-orange/40 rounded-lg text-creamy-white font-montserrat font-light tracking-wide hover:from-bright-orange/30 hover:to-bright-orange/20 hover:border-bright-orange/60 transition-all duration-300"
          >
            Recalibrate Field
          </button>
          
          <Link 
            href="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-deep-navy/40 to-deep-navy/20 border border-bright-orange/20 rounded-lg text-creamy-white font-montserrat font-light tracking-wide hover:from-deep-navy/60 hover:to-deep-navy/40 hover:border-bright-orange/40 transition-all duration-300"
          >
            Return to Portal
          </Link>
        </div>

        {/* Footer Message */}
        <p className="font-lora text-sm text-creamy-white/60">
          A resonance-based system for multidimensional embodiment
        </p>
      </div>
    </div>
  )
}