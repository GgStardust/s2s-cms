'use client';

import Link from 'next/link';
import { useState } from 'react';
import DriftingOrbs from '@/components/public/DriftingOrbs';

// 6 Fixed Portal Modules (Scrollstream is now a ticker, not a portal)
const PORTALS = [
  {
    id: 'field-input',
    title: 'Field Input',
    tagline: 'What\'s alive in your field today?',
    route: '/field-input',
    description: 'Enter your inquiry, question, or current resonance. The system responds with relevant scrolls, orbs, and pathways.',
    isPrimary: true
  },
  {
    id: 'living-intelligence',
    title: 'Living Intelligence',
    tagline: 'Living intelligence interface',
    route: '/orb-explorer',
    description: 'Explore all 13 Orbs with essays and living intelligence companions'
  },
  {
    id: 'resonance-library',
    title: 'Resonance Library',
    tagline: 'Living wisdom interface',
    route: '/library',
    description: 'Sovereign Archive of essays and explorations'
  },
  {
    id: 'sonic-architecture',
    title: 'Sonic Architecture',
    tagline: 'Sound + field resonance',
    route: '/sonic-architecture',
    description: 'Music, resonance, and sound design integration'
  },
  {
    id: 'star-love',
    title: 'Star Love',
    tagline: 'Relational resonance interface',
    route: '/star-love',
    description: 'Star Love and Quantum-Galactic Relationship frameworks'
  },
  {
    id: 'quantum-architecture',
    title: 'Quantum Architecture',
    tagline: 'Advanced structural systems',
    route: '/field-systems',
    description: 'Quantum Architecture, Galactic Structuring, Somatic Tracking'
  }
];

// Scrollstream fragments for ticker
const SCROLLS = [
  "Consciousness recognizes itself as the source, not the competitor.",
  "Structure can evolve when designed from resonance rather than reaction.",
  "Every piece of content evaluates itself through resonance metrics.",
  "The quantum field responds to coherence, not worthiness.",
];

export default function DashboardLandingPage() {
  const [hoveredPortal, setHoveredPortal] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setSubscriptionStatus('idle');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscriptionStatus('success');
        setEmail('');
      } else {
        setSubscriptionStatus('error');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscriptionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-deep-navy via-midnight to-deep-navy overflow-hidden">
      {/* Layer 0: Background with subtle breathing effect */}
      <div className="fixed inset-0 z-0">
        {/* Subtle breathing gradient background (<2% opacity change) */}
        <div className="absolute inset-0 bg-gradient-radial from-deep-navy/30 via-midnight to-deep-navy animate-breathe" />

        {/* Center nucleus - soft orange core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
          <div className="w-full h-full rounded-full bg-bright-orange/3 blur-3xl animate-pulse-subtle" />
        </div>
      </div>

      {/* Layer 1: Drifting Orbs (13 nodes moving behind portals) */}
      <DriftingOrbs />

      {/* Layer 3: Fixed Portal Modules (DOM elements, main interaction) */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20 pointer-events-none">
        {/* Header - Coming Soon */}
        <div className="text-center mb-8 pointer-events-none">
          <p className="font-montserrat text-sm text-creamy-white/80 tracking-widest uppercase mb-4">
            Coming Soon
          </p>
        </div>

        {/* Dashboard Title */}
        <div className="text-center mb-16 pointer-events-none">
          <h1 className="font-lora text-4xl md:text-6xl font-light text-creamy-white mb-4 tracking-wide">
            Stardust to Sovereignty
          </h1>
          <p className="font-montserrat text-[#e1944d]/60 text-sm md:text-base tracking-wide">
            A resonance-based system for multidimensional embodiment
          </p>
        </div>

        {/* Field Portals Section */}
        <div className="max-w-6xl w-full pointer-events-auto">
          <h2 className="font-montserrat text-2xl font-light text-creamy-white text-center mb-8 tracking-wide">
            Field Portals
          </h2>
          
          {/* Portal Grid - Varied sizes and shapes */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
          {PORTALS.map((portal, index) => {
            // Create varied sizing and shapes for visual interest
            const sizeClasses = [
              'md:col-span-2 lg:col-span-3', // Field Input - Large and prominent
              'md:col-span-2 lg:col-span-2', // Living Intelligence - Medium wide
              'md:col-span-2 lg:col-span-1 lg:row-span-2', // Resonance Library - Tall, extends to bottom
              'md:col-span-2 lg:col-span-2', // Sonic Architecture - Medium wide (now in position 3)
              'md:col-span-2 lg:col-span-1', // Star Love - Tall (now in position 4)
              'md:col-span-2 lg:col-span-2', // Quantum Architecture - Medium wide
            ];
            
            // Add shape variations
            const shapeClasses = [
              'rounded-2xl', // Field Input - More rounded
              'rounded-xl',  // Living Intelligence - Standard
              'rounded-lg',  // Resonance Library - Less rounded
              'rounded-xl',  // Sonic Architecture - Standard (now in position 3)
              'rounded-lg',  // Star Love - Less rounded (now in position 4)
              'rounded-xl',  // Quantum Architecture - Standard
            ];
            
            return (
            <Link
              key={portal.id}
              href={portal.route}
              onMouseEnter={() => setHoveredPortal(portal.id)}
              onMouseLeave={() => setHoveredPortal(null)}
              className={`group relative ${sizeClasses[index] || 'md:col-span-2 lg:col-span-2'}`}
            >
              <div className={`
                relative backdrop-blur-sm
                border p-6 h-full
                transition-all duration-500
                ${shapeClasses[index] || 'rounded-lg'}
                ${portal.isPrimary 
                  ? 'bg-gradient-to-br from-bright-orange/10 via-deep-navy/30 to-deep-gold/5 border-bright-orange/50' 
                  : 'bg-deep-navy/20'
                }
                ${hoveredPortal === portal.id
                  ? 'border-transparent bg-deep-navy/40 shadow-[0_0_30px_rgba(225,148,77,0.2)]'
                  : portal.isPrimary 
                    ? 'hover:border-bright-orange/70 hover:shadow-[0_0_20px_rgba(225,148,77,0.15)]'
                    : 'border-bright-orange/30 hover:border-bright-orange/50'
                }
                ${hoveredPortal === portal.id ? 'bg-gradient-to-br from-bright-orange/5 via-deep-navy/40 to-deep-gold/5' : ''}
              `}
              style={hoveredPortal === portal.id ? {
                borderImage: 'linear-gradient(135deg, #e1944d 0%, #C49A6C 100%) 1'
              } : {}}>
                {/* Portal Title */}
                <h2 className={`font-montserrat font-light text-creamy-white mb-3 tracking-wide ${
                  portal.isPrimary 
                    ? 'text-2xl md:text-3xl' 
                    : sizeClasses[index]?.includes('col-span-1') 
                      ? 'text-lg md:text-xl' 
                      : 'text-xl md:text-2xl'
                }`}>
                  {portal.title}
                </h2>

                {/* Tagline (shows on hover) - NO QUOTES */}
                <p className={`
                  font-lora text-[#e1944d] italic mb-4
                  transition-opacity duration-300
                  ${sizeClasses[index]?.includes('col-span-1') ? 'text-xs' : 'text-sm'}
                  ${hoveredPortal === portal.id ? 'opacity-100' : 'opacity-0'}
                `}>
                  {portal.tagline}
                </p>

                {/* Description */}
                <p className={`font-lora text-creamy-white/60 leading-relaxed ${
                  sizeClasses[index]?.includes('col-span-1') ? 'text-xs' : 'text-sm'
                }`}>
                  {portal.description}
                </p>

                {/* Subtle glyph etching behind (Layer 2) */}
                <div className={`absolute inset-0 overflow-hidden pointer-events-none ${shapeClasses[index] || 'rounded-lg'}`}>
                  <div className={`
                    absolute top-4 right-4 w-12 h-12
                    rounded-full bg-[#e1944d]/5
                    transition-opacity duration-500
                    ${hoveredPortal === portal.id ? 'opacity-20' : 'opacity-0'}
                  `} />
                </div>

                {/* Hover pulse effect */}
                <div className={`
                  absolute inset-0
                  transition-all duration-500 pointer-events-none
                  ${shapeClasses[index] || 'rounded-lg'}
                  ${hoveredPortal === portal.id
                    ? 'bg-[#e1944d]/5 animate-pulse-subtle'
                    : 'bg-transparent'
                  }
                `} />
              </div>
            </Link>
            );
          })}
          </div>
        </div>

      </div>

      {/* Scrollstream Ticker Banner - Above About Section */}
      <section className="relative z-10 py-16 px-4 pointer-events-auto">
        <div className="max-w-6xl mx-auto">
          <div className="bg-deep-navy/60 backdrop-blur-md border border-[#e1944d]/40 rounded-lg overflow-hidden">
            <div className="relative h-14 flex items-center">
              {/* Continuous scrolling ticker */}
              <div className="flex animate-ticker whitespace-nowrap">
                {/* Duplicate scrolls for seamless loop */}
                {[...SCROLLS, ...SCROLLS, ...SCROLLS].map((scroll, index) => (
                  <div key={index} className="inline-flex items-center px-8">
                    <span className="font-lora text-sm text-creamy-white/70 italic">
                      {scroll}
                    </span>
                    <span className="mx-8 text-[#e1944d]/40">•</span>
                  </div>
                ))}
              </div>

              {/* Pause button */}
              <button className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#e1944d]/10 border border-[#e1944d]/30 rounded text-xs text-[#e1944d] hover:bg-[#e1944d]/20 transition-all font-montserrat tracking-wider">
                PAUSE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Matching Mockup Design */}
      <section className="relative z-10 py-24 px-4 pointer-events-none">
        <div className="max-w-6xl mx-auto">
          {/* Section Divider with Stars */}
          <div className="flex items-center justify-center mb-16">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-[#e1944d]/60 rounded-full"></div>
              <div className="w-1 h-1 bg-[#e1944d]/40 rounded-full"></div>
              <div className="w-1 h-1 bg-[#e1944d]/60 rounded-full"></div>
              <div className="w-1 h-1 bg-[#e1944d]/40 rounded-full"></div>
              <div className="w-1 h-1 bg-[#e1944d]/60 rounded-full"></div>
            </div>
          </div>

          {/* 3-column grid layout for About content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* What is Stardust to Sovereignty */}
            <div className="bg-deep-navy/15 backdrop-blur-sm border border-bright-orange/30 rounded-lg p-8 hover:border-bright-orange/50 transition-all duration-500">
              <h3 className="font-montserrat text-lg font-light text-creamy-white mb-4 tracking-wide">What is Stardust to Sovereignty</h3>
              <p className="font-lora text-sm text-creamy-white/85 leading-relaxed">
                Stardust to Sovereignty is a consciousness technology authored through years of research in physics, neurobiology, and design science. It operates as a living system that reveals how awareness structures itself through form, frequency, and intelligence. The work integrates quantum principles of coherence and entanglement with architectural logic, creating a framework where consciousness and technology move as one field.
              </p>
            </div>

            {/* Who this is for */}
            <div className="bg-deep-navy/15 backdrop-blur-sm border border-bright-orange/30 rounded-lg p-8 hover:border-bright-orange/50 transition-all duration-500">
              <h3 className="font-montserrat text-lg font-light text-creamy-white mb-4 tracking-wide">Who this is for</h3>
              <p className="font-lora text-sm text-creamy-white/85 leading-relaxed">
                For those building systems, art, or technologies that mirror living intelligence. For researchers, creators, and beings who understand that awareness is the most advanced technology we possess. For anyone ready to engage with consciousness not as philosophy, but as operating design.
              </p>
            </div>

            {/* Gigi Stardust */}
            <div className="bg-deep-navy/15 backdrop-blur-sm border border-bright-orange/30 rounded-lg p-8 hover:border-bright-orange/50 transition-all duration-500">
              <h3 className="font-montserrat text-lg font-light text-creamy-white mb-4 tracking-wide">Gigi Stardust</h3>
              <p className="font-lora text-sm text-creamy-white/85 leading-relaxed">
                Gigi Stardust is the architect of this system. Her work bridges science and consciousness, uniting measurable phenomena with the mechanics of creation. Her lifetime of research translates the architecture of light and thought into a platform that reveals the physics of sovereignty: how intelligence organizes itself through recognition, coherence, and participation in a living universe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Connected Footer */}
      <section className="relative z-10 py-24 px-4 pointer-events-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Divider with Stars */}
          <div className="flex items-center justify-center mb-16">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-bright-orange/60 rounded-full"></div>
              <div className="w-1 h-1 bg-bright-orange/40 rounded-full"></div>
              <div className="w-1 h-1 bg-bright-orange/60 rounded-full"></div>
              <div className="w-1 h-1 bg-bright-orange/40 rounded-full"></div>
              <div className="w-1 h-1 bg-bright-orange/60 rounded-full"></div>
            </div>
          </div>

          <h2 className="font-lora text-3xl md:text-4xl font-light text-creamy-white mb-8 tracking-wide">
            Stay Connected
          </h2>
          <p className="font-lora text-lg text-creamy-white/80 leading-relaxed mb-12 max-w-2xl mx-auto">
            Receive field updates and new releases as each layer activates.
          </p>

          {/* Email Subscription Form */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-deep-navy/30 backdrop-blur-sm border border-bright-orange/40 rounded-lg text-creamy-white placeholder-creamy-white/60 focus:outline-none focus:border-bright-orange/70 focus:bg-deep-navy/50 transition-all duration-300 font-montserrat"
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-gradient-to-r from-bright-orange/20 to-deep-gold/20 border-2 border-bright-orange/50 rounded-lg text-creamy-white hover:from-bright-orange/30 hover:to-deep-gold/30 hover:border-bright-orange/70 hover:shadow-[0_0_30px_rgba(225,148,77,0.3)] transition-all duration-500 font-montserrat tracking-wide uppercase text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            
            {/* Status Messages */}
            {subscriptionStatus === 'success' && (
              <p className="mt-4 text-sm text-bright-orange font-montserrat">
                ✓ Successfully joined the resonance field
              </p>
            )}
            {subscriptionStatus === 'error' && (
              <p className="mt-4 text-sm text-red-400 font-montserrat">
                ✗ Failed to subscribe. Please try again.
              </p>
            )}
            {subscriptionStatus === 'idle' && (
              <p className="mt-4 text-sm text-creamy-white/60 font-lora">
                Join the resonance field. No spam, only transmissions.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
