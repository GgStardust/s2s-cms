'use client';

import { useEffect, useRef } from 'react';

// 13 Orbs arranged in WIDER Fibonacci Spiral (Golden Ratio)
// Spiraling outward from center nucleus - MORE SPACING for field presence
const ORBS = [
  // Center - The One (Unified Field)
  { 
    id: 13, 
    name: 'Bridging Intelligence', 
    x: 50, 
    y: 50, 
    delay: 0,
    synthesis: 'Integration across dimensions. The unified field where all Orbs converge into sovereign architecture.',
    function: 'Governs multidimensional coherence and field integration',
    expression: 'Unified field consciousness and dimensional bridging'
  },

  // Inner spiral (first rotation) - MORE SPACED
  { 
    id: 1, 
    name: 'Origin Intelligence', 
    glyph: '/glyphs/1.png', 
    x: 60, 
    y: 42, 
    delay: 3,
    synthesis: 'Photonic blueprinting meets biological activation. Governs the origination code of embodiment.',
    function: 'Pre-form light encoding through mitochondrial ignition',
    expression: 'Bioelectric coherence and cosmic biological circuitry'
  },
  { 
    id: 2, 
    name: 'Resonance Mechanics', 
    glyph: '/glyphs/2.png', 
    x: 66, 
    y: 56, 
    delay: 7,
    synthesis: 'Signal enters form and becomes architecture. Governs translation of encoded signal into structure.',
    function: 'Sound, cymatics, emotion, and resonance fields',
    expression: 'Avatar as carrier, form as broadcast'
  },
  { 
    id: 3, 
    name: 'Photonic Intelligence', 
    glyph: '/glyphs/3.png', 
    x: 56, 
    y: 66, 
    delay: 11,
    synthesis: 'Reflection initiates coherence. Through light webs and relational mirrors, field observes itself.',
    function: 'Light webs and relational mirrors for field observation',
    expression: 'Duality harnessed for synthesis, not opposition'
  },

  // Mid spiral (expanding arc) - WIDER SPACING
  { 
    id: 4, 
    name: 'Harmonic Architectures', 
    glyph: '/glyphs/4.png', 
    x: 38, 
    y: 66, 
    delay: 15,
    synthesis: 'Chaos becomes rhythm. Pattern is the bridge between fields through harmonic law.',
    function: 'Sacred geometry and multidimensional structuring',
    expression: 'Stabilizes frequencies through harmonic intelligence'
  },
  { 
    id: 5, 
    name: 'Temporal Sovereignty', 
    glyph: '/glyphs/5.png', 
    x: 28, 
    y: 52, 
    delay: 19,
    synthesis: 'Time reclaimed as tool. Spiral rhythm, rest-phase logic, identity fluidity across lifetimes.',
    function: 'Field integrity across dimensions',
    expression: 'Mastery through rhythmic alignment'
  },
  { 
    id: 6, 
    name: 'Starline Memory', 
    glyph: '/glyphs/6.png', 
    x: 32, 
    y: 34, 
    delay: 23,
    synthesis: 'Memory returns as signal. Carries galactic and ancestral recall across networks of consciousness.',
    function: 'Living strands of history across consciousness networks',
    expression: 'Repatterning through remembrance'
  },
  { 
    id: 7, 
    name: 'Alchemical Current', 
    glyph: '/glyphs/7.png', 
    x: 46, 
    y: 24, 
    delay: 27,
    synthesis: 'Density becomes light through heat, compression, and pulse. Governs the alchemy of experience.',
    function: 'Emotional intensity, energetic holding, and release',
    expression: 'Collapse and resurrection through inner fire'
  },

  // Outer spiral (wide dramatic arc) - MAXIMUM SPACING
  { 
    id: 8, 
    name: 'Galactic Structuring', 
    glyph: '/glyphs/8.png', 
    x: 68, 
    y: 22, 
    delay: 31,
    synthesis: 'Beyond-linear knowing. Reveals nonlinear cognition and galactic-scale intelligence.',
    function: 'Nonlinear cognition and galactic consciousness',
    expression: 'Beyond-linear knowing and cosmic intelligence'
  },
  { 
    id: 9, 
    name: 'Stellar Navigation', 
    glyph: '/glyphs/9.png', 
    x: 82, 
    y: 32, 
    delay: 35,
    synthesis: 'Adaptability across layers. Enables flow states and quantum timing across dimensions.',
    function: 'Etheric flow and astral adaptability',
    expression: 'Flow states and quantum timing mastery'
  },
  { 
    id: 10, 
    name: 'Ancestral Repatterning', 
    glyph: '/glyphs/10.png', 
    x: 86, 
    y: 52, 
    delay: 39,
    synthesis: 'Breaking inherited loops. Repairs fractures in the layers through crystalline memory.',
    function: 'Astral and etheric healing scaffolds',
    expression: 'Repairs fractures through crystalline intelligence'
  },
  { 
    id: 11, 
    name: 'Radiant Transparency', 
    glyph: '/glyphs/11.png', 
    x: 78, 
    y: 72, 
    delay: 43,
    synthesis: 'Luminous authenticity. Illuminates all layers as radiant form through morphic resonance.',
    function: 'I/Spirit luminous coherence',
    expression: 'Illuminates all layers as radiant form'
  },
  { 
    id: 12, 
    name: 'Sovereign Field', 
    glyph: '/glyphs/12.png', 
    x: 56, 
    y: 78, 
    delay: 47,
    synthesis: 'Authority from within. Embodies indivisible coherence across all layers of being.',
    function: 'All layers unified in sovereign authority',
    expression: 'Embodies indivisible coherence'
  },
];

export default function DriftingOrbs() {
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate each orb with SLOWER, more organic CSS animations
    orbRefs.current.forEach((orb, index) => {
      if (!orb) return;

      const orbData = ORBS[index];
      const duration = 30 + Math.random() * 20; // 30-50s per drift cycle (SLOWER)
      const radius = 60 + Math.random() * 90; // 60-150px drift radius (SMALLER, calmer)

      // Set CSS custom properties for animation
      orb.style.setProperty('--drift-duration', `${duration}s`);
      orb.style.setProperty('--drift-delay', `${orbData.delay}s`);
      orb.style.setProperty('--drift-radius', `${radius}px`);
    });
  }, []);

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {ORBS.map((orb, index) => (
        <div
          key={orb.id}
          ref={(el) => { orbRefs.current[index] = el; }}
          className="absolute animate-drift-organic pointer-events-none"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            animationDelay: `${orb.delay}s`,
          }}
        >
          {/* Orb container - BIGGER with enhanced interactions */}
          <div 
            className="relative w-24 h-24 pointer-events-auto cursor-pointer group"
            onClick={() => {
              // Subtle click feedback - could be enhanced with sound or more complex interactions
              console.log(`Orb ${orb.id} clicked: ${orb.name}`);
            }}
          >
            {/* Glow layer */}
            <div className="absolute inset-0 rounded-full bg-[#e1944d]/10 blur-2xl animate-pulse-subtle group-hover:bg-[#e1944d]/20 group-active:bg-[#e1944d]/30 transition-all duration-300" />

            {/* Core orb - bright orange sphere */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#e1944d]/50 to-[#e1944d]/25 border border-[#e1944d]/40 backdrop-blur-sm group-hover:bg-gradient-to-br group-hover:from-[#e1944d]/70 group-hover:to-[#e1944d]/45 group-hover:border-[#e1944d]/60 group-active:from-[#e1944d]/80 group-active:to-[#e1944d]/60 group-active:border-[#e1944d]/80 transition-all duration-300 shadow-lg group-hover:shadow-[#e1944d]/30 group-active:shadow-[#e1944d]/50 group-active:scale-105">
              {/* Inner glow */}
              <div className="absolute inset-1 rounded-full bg-[#e1944d]/25 group-hover:bg-[#e1944d]/40 group-active:bg-[#e1944d]/50 transition-all duration-300"></div>
              
              {/* Orb number indicator - subtle */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-montserrat text-xs text-[#e1944d]/60 font-light">
                  {orb.id}
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced hover tooltip with rich Orb information */}
          <div className="absolute top-28 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 z-50 pointer-events-none transform group-hover:scale-105">
            <div className="bg-deep-navy/98 backdrop-blur-lg border border-[#e1944d]/60 rounded-xl p-6 shadow-2xl max-w-sm w-80">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e1944d]/30 to-[#e1944d]/10 border border-[#e1944d]/40 flex items-center justify-center">
                  <span className="font-montserrat text-xs text-[#e1944d] font-semibold">
                    {orb.id}
                  </span>
                </div>
                <div>
                  <h3 className="font-montserrat text-lg text-[#e1944d] font-light tracking-wide">
                    {orb.name}
                  </h3>
                  <p className="font-lora text-xs text-creamy-white/60 uppercase tracking-widest">
                    Orb {orb.id}
                  </p>
                </div>
              </div>

              {/* Synthesis */}
              <div className="mb-4">
                <p className="font-lora text-sm text-creamy-white/90 leading-relaxed italic">
                  {orb.synthesis}
                </p>
              </div>

              {/* Function & Expression */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-montserrat text-xs text-[#e1944d]/80 uppercase tracking-wider mb-1">
                    Function
                  </h4>
                  <p className="font-lora text-xs text-creamy-white/75 leading-relaxed">
                    {orb.function}
                  </p>
                </div>
                <div>
                  <h4 className="font-montserrat text-xs text-[#e1944d]/80 uppercase tracking-wider mb-1">
                    Expression
                  </h4>
                  <p className="font-lora text-xs text-creamy-white/75 leading-relaxed">
                    {orb.expression}
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#e1944d]/30 animate-pulse"></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-[#e1944d]/20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
