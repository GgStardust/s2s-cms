'use client';

import { useState } from 'react';
import { getAllOrbs } from '@/lib/content';
import OrbSelector from '@/components/explorer/OrbSelector';
import OrbFeaturedCard from '@/components/explorer/OrbFeaturedCard';

export default function ExplorerPage() {
  const orbs = getAllOrbs();
  const [selectedId, setSelectedId] = useState(1);
  
  const selectedOrb = orbs.find(orb => orb.id === selectedId) || orbs[0];

  return (
    <div className="min-h-screen bg-creamy-white">
      {/* Header */}
      <section className="bg-creamy-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-4 text-deep-navy">
            Field Map
          </h1>
          <p className="font-lora text-lg md:text-xl text-deep-navy/80 max-w-2xl mx-auto leading-relaxed">
            Navigate the 13 fundamental Orbs that govern sovereign consciousness and human evolution.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Orb Selector */}
          <div className="lg:col-span-1">
            <OrbSelector
              orbs={orbs}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          {/* Center: Featured Orb Card */}
          <div className="lg:col-span-1">
            <OrbFeaturedCard orb={selectedOrb} />
          </div>

          {/* Right: Meta Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 border border-deep-gold/20">
              <h3 className="text-deep-navy font-montserrat font-semibold text-lg mb-4">
                Field Architecture
              </h3>
              <div className="space-y-3 text-deep-navy/80 font-lora text-sm">
                <p>• 13 Primary Orbs</p>
                <p>• 12 Undercurrents</p>
                <p>• Special Domains</p>
                <p>• Scrollstream Integration</p>
                <p>• Living Field System</p>
                <p>• Resonance Mechanics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
