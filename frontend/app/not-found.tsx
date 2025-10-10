import Link from 'next/link'

export default function NotFound() {
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
          Coming Online Soon
        </h1>
        
        <p className="font-montserrat text-lg text-creamy-white/80 mb-8 leading-relaxed">
          The Stardust to Sovereignty platform is currently being prepared for launch. 
          We're fine-tuning the resonance architecture and calibrating the field systems.
        </p>

        {/* Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-deep-navy/20 backdrop-blur-sm border border-bright-orange/30 rounded-lg p-6">
            <div className="w-3 h-3 bg-bright-orange rounded-full mx-auto mb-3 animate-pulse"></div>
            <h3 className="font-montserrat text-sm font-light text-creamy-white mb-2">Field Systems</h3>
            <p className="font-lora text-xs text-creamy-white/70">Calibrating</p>
          </div>
          
          <div className="bg-deep-navy/20 backdrop-blur-sm border border-bright-orange/30 rounded-lg p-6">
            <div className="w-3 h-3 bg-bright-orange rounded-full mx-auto mb-3 animate-pulse"></div>
            <h3 className="font-montserrat text-sm font-light text-creamy-white mb-2">Orb Constellation</h3>
            <p className="font-lora text-xs text-creamy-white/70">Aligning</p>
          </div>
          
          <div className="bg-deep-navy/20 backdrop-blur-sm border border-bright-orange/30 rounded-lg p-6">
            <div className="w-3 h-3 bg-bright-orange rounded-full mx-auto mb-3 animate-pulse"></div>
            <h3 className="font-montserrat text-sm font-light text-creamy-white mb-2">Resonance Library</h3>
            <p className="font-lora text-xs text-creamy-white/70">Processing</p>
          </div>
        </div>

        {/* Back to Home */}
        <Link 
          href="/"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-bright-orange/20 to-bright-orange/10 border border-bright-orange/40 rounded-lg text-creamy-white font-montserrat font-light tracking-wide hover:from-bright-orange/30 hover:to-bright-orange/20 hover:border-bright-orange/60 transition-all duration-300"
        >
          Return to Portal
        </Link>

        {/* Footer Message */}
        <p className="mt-12 font-lora text-sm text-creamy-white/60">
          A resonance-based system for multidimensional embodiment
        </p>
      </div>
    </div>
  )
}