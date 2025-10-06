'use client';

import { getAllModules, getAllScrollstream } from '@/lib/content';
import ModuleTile from '@/components/cards/ModuleTile';
import ScrollstreamSingle from '@/components/ScrollstreamSingle';
import ScrollstreamFlow from '@/components/ScrollstreamFlow';
import LivingFieldMap from '@/components/LivingFieldMap';
import ResonanceQuiz from '@/components/ResonanceQuiz';
import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFieldMap, setShowFieldMap] = useState(false);
  const modules = getAllModules();
  const scrollstream = getAllScrollstream();

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-deep-navy">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <ResonanceQuiz />
        </div>
      </div>
    );
  }

  if (showFieldMap) {
    return (
      <div className="min-h-screen">
        <LivingFieldMap onOrbSelect={() => setShowFieldMap(false)} />
        <button
          onClick={() => setShowFieldMap(false)}
          className="fixed top-6 right-6 z-50 bg-deep-gold text-deep-navy px-4 py-2 rounded-lg font-semibold hover:bg-creamy-white transition-colors"
        >
          Close Field Map
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Living Field Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-navy via-deep-navy/95 to-deep-navy">
        {/* Constellation Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="constellation-grid"></div>
        </div>

        {/* Breathing Pulse */}
        <div className="absolute inset-0 bg-gradient-radial from-deep-gold/10 via-transparent to-transparent animate-pulse-slow"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
                <h1 className="font-montserrat font-bold text-6xl md:text-8xl mb-8 text-creamy-white animate-breathe">
                  Stardust to Sovereignty
                </h1>
                <p className="font-lora text-2xl md:text-3xl text-deep-gold mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-rotate">
                  A Cosmological Framework for Consciousness Evolution
                </p>
                <p className="font-lora text-lg text-creamy-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
                  From recognizing your truest form, the pure consciousness that enters the body as an electric spark in the first cells, to achieving the ultimate expression of this form in embodied life.
                  Navigate the 13 fundamental Orbs that structure consciousness evolution through technology, space, physics, AI, neuroscience, and universal principles.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                  <button
                    onClick={() => setShowFieldMap(true)}
                    className="group relative inline-flex items-center bg-deep-gold text-deep-navy px-12 py-6 rounded-full font-montserrat font-bold text-xl uppercase tracking-wide hover:bg-creamy-white transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-deep-gold/50"
                  >
                    <span className="relative z-10">Navigate the Orbs</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-deep-gold to-creamy-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>

                  <button
                    onClick={() => setShowQuiz(true)}
                    className="group relative inline-flex items-center bg-transparent text-creamy-white border-2 border-creamy-white/30 px-12 py-6 rounded-full font-montserrat font-bold text-xl uppercase tracking-wide hover:bg-creamy-white/10 hover:border-creamy-white transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-creamy-white/50"
                  >
                    <span className="relative z-10">Find Your Resonance</span>
                  </button>
                </div>

                {/* Living Field Indicators */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                  <div className="flex items-center space-x-2 px-6 py-3 bg-deep-gold/20 backdrop-blur-sm rounded-full border border-deep-gold/40">
                    <div className="w-2 h-2 bg-deep-gold rounded-full animate-pulse"></div>
                    <span className="text-creamy-white text-sm font-medium">Stardust Technology</span>
                  </div>
                  <div className="flex items-center space-x-2 px-6 py-3 bg-cosmic-blue/20 backdrop-blur-sm rounded-full border border-cosmic-blue/40">
                    <div className="w-2 h-2 bg-cosmic-blue rounded-full animate-pulse"></div>
                    <span className="text-creamy-white text-sm font-medium">Cosmic Intelligence</span>
                  </div>
                  <div className="flex items-center space-x-2 px-6 py-3 bg-creamy-white/20 backdrop-blur-sm rounded-full border border-creamy-white/40">
                    <div className="w-2 h-2 bg-creamy-white rounded-full animate-pulse"></div>
                    <span className="text-creamy-white text-sm font-medium">Sovereign Field</span>
                  </div>
                </div>
        </div>
      </section>

      {/* Scrollstream Flow */}
      <section className="relative">
        <ScrollstreamFlow />
      </section>

            {/* Field Architecture Modules */}
            <div className="relative py-20">
              <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/50 to-deep-navy"></div>
              <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-bold text-creamy-white mb-6 animate-breathe">
                    The Living Codex
                  </h2>
                  <p className="text-creamy-white/80 text-xl max-w-4xl mx-auto leading-relaxed">
                    Dynamic frameworks that arise from direct connection to the universal field, not inherited ideas.
                    Explore the 13 fundamental Orbs that structure consciousness development and reality architecture.
                  </p>
                </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module) => (
              <div key={module.id} className="group bg-deep-navy/60 backdrop-blur-sm rounded-2xl p-8 border border-deep-gold/30 hover:border-deep-gold/60 transition-all duration-500 hover:shadow-2xl hover:shadow-deep-gold/20 hover:scale-105">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-deep-gold to-yellow-500 rounded-full flex items-center justify-center mr-6 group-hover:animate-pulse">
                    <span className="text-deep-navy font-bold text-xl">{module.id}</span>
                  </div>
                  <h3 className="text-creamy-white font-semibold text-xl group-hover:text-deep-gold transition-colors duration-300">{module.title}</h3>
                </div>
                <p className="text-creamy-white/80 text-base leading-relaxed mb-6">
                  {module.summary}
                </p>
                <button className="text-deep-gold hover:text-creamy-white text-sm font-medium transition-colors duration-300 group-hover:scale-105 transform">
                  Enter Field →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

            {/* Footer */}
            <footer className="relative bg-deep-navy text-creamy-white py-16 px-6 overflow-hidden">
              {/* Subtle field effects */}
              <div className="absolute inset-0 opacity-10">
                <div className="constellation-grid"></div>
              </div>

              <div className="relative z-10 max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-creamy-white mb-4 animate-breathe">
                    Reclaim Your Stellar Inheritance
                  </h3>
                  <p className="text-creamy-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
                    You are made of stardust, animated by bioelectric forces. Navigate the 13 fundamental Orbs that structure consciousness evolution from cosmic origins to sovereign embodiment.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-deep-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 bg-deep-gold rounded-full animate-pulse"></div>
                    </div>
                    <h4 className="text-creamy-white font-semibold text-lg mb-3">Orb Navigation</h4>
                    <a href="/explorer" className="text-deep-gold hover:text-creamy-white transition-colors text-sm">
                      Explore the 13 Orbs →
                    </a>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-cosmic-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 bg-cosmic-blue rounded-full animate-pulse"></div>
                    </div>
                    <h4 className="text-creamy-white font-semibold text-lg mb-3">Resonance Recognition</h4>
                    <a href="/consulting" className="text-deep-gold hover:text-creamy-white transition-colors text-sm">
                      Find Your Frequency →
                    </a>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-creamy-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 bg-creamy-white rounded-full animate-pulse"></div>
                    </div>
                    <h4 className="text-creamy-white font-semibold text-lg mb-3">Sovereign Field</h4>
                    <a href="/consulting" className="text-deep-gold hover:text-creamy-white transition-colors text-sm">
                      Enter the Field →
                    </a>
                  </div>
                </div>

          <div className="border-t border-deep-gold/20 pt-8 text-center">
            <p className="text-creamy-white/60 text-sm">
              © 2025 Stardust to Sovereignty — A Living Field Architecture
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
