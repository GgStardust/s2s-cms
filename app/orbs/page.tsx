import PublicNav from '@/components/navigation/PublicNav';
import Link from 'next/link';
import { Sparkles, BookOpen, Brain, Heart } from 'lucide-react';

const ORB_DATA = {
  1: { name: 'Origin Intelligence', color: 'orb-1', description: 'Photonic blueprinting meets biological activation' },
  2: { name: 'Resonance Mechanics', color: 'orb-2', description: 'Frequency becomes form' },
  3: { name: 'Photonic Intelligence', color: 'orb-3', description: 'Light as information, structure, and consciousness' },
  4: { name: 'Harmonic Architectures', color: 'orb-4', description: 'Geometry crystallizes consciousness' },
  5: { name: 'Temporal Sovereignty', color: 'orb-5', description: 'Time as spiral, parallel, permeable' },
  6: { name: 'Starline Memory', color: 'orb-6', description: 'Galactic recall and stellar navigation' },
  7: { name: 'Alchemical Current', color: 'orb-7', description: 'Density becomes light through heat, compression, pulse' },
  8: { name: 'Quantum Intuition', color: 'orb-8', description: 'Probability collapse through conscious observation' },
  9: { name: 'Temporal Fluidity', color: 'orb-9', description: 'Flow states and quantum timing' },
  10: { name: 'Ancestral Repatterning', color: 'orb-10', description: 'Breaking inherited loops' },
  11: { name: 'Radiant Transparency', color: 'orb-11', description: 'Luminous authenticity' },
  12: { name: 'Sovereign Field', color: 'orb-12', description: 'Authority from within' },
  13: { name: 'Bridging Intelligence', color: 'orb-13', description: 'Integration across dimensions' },
};

export default function OrbsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-navy via-deep-navy to-deep-navy">
      <PublicNav />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-montserrat font-bold text-creamy-white mb-6">
            Orb Explorer
          </h1>
          <p className="text-xl md:text-2xl text-deep-gold/80 font-lora italic mb-12">
            Navigate the 13 fundamental principles of consciousness evolution
          </p>
        </div>
      </section>

      {/* Orbs Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(ORB_DATA).map(([id, orb]) => (
              <Link
                key={id}
                href={`/orbs/${id}`}
                className="group bg-deep-navy/30 backdrop-blur-sm rounded-lg p-6 border border-deep-gold/20 hover:border-deep-gold/40 transition-all hover:transform hover:scale-105"
              >
                <div className="text-center">
                  {/* Orb Number and Color */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${orb.color} mb-4 shadow-lg shadow-${orb.color}/50 group-hover:shadow-${orb.color}/70 transition-shadow`}>
                    <span className="text-2xl font-bold text-white">{id}</span>
                  </div>
                  
                  {/* Orb Name */}
                  <h3 className="text-lg font-montserrat font-semibold text-creamy-white group-hover:text-deep-gold transition-colors mb-2">
                    Orb {id}
                  </h3>
                  <h4 className="text-sm font-montserrat font-medium text-deep-gold mb-3">
                    {orb.name}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-sm text-creamy-white/70 font-lora italic">
                    "{orb.description}"
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-montserrat font-semibold text-creamy-white text-center mb-12">
            Explore the System
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-deep-navy/30 backdrop-blur-sm rounded-lg p-6 border border-deep-gold/20 text-center">
              <Sparkles className="w-8 h-8 text-deep-gold mx-auto mb-4" />
              <h3 className="text-lg font-montserrat font-semibold text-creamy-white mb-2">
                Scrollstreams
              </h3>
              <p className="text-sm text-creamy-white/70">
                Live consciousness transmissions from the field
              </p>
            </div>
            
            <div className="bg-deep-navy/30 backdrop-blur-sm rounded-lg p-6 border border-deep-gold/20 text-center">
              <BookOpen className="w-8 h-8 text-deep-gold mx-auto mb-4" />
              <h3 className="text-lg font-montserrat font-semibold text-creamy-white mb-2">
                Essays
              </h3>
              <p className="text-sm text-creamy-white/70">
                Core teachings and consciousness frameworks
              </p>
            </div>
            
            <div className="bg-deep-navy/30 backdrop-blur-sm rounded-lg p-6 border border-deep-gold/20 text-center">
              <Brain className="w-8 h-8 text-deep-gold mx-auto mb-4" />
              <h3 className="text-lg font-montserrat font-semibold text-creamy-white mb-2">
                AI Companion
              </h3>
              <p className="text-sm text-creamy-white/70">
                Field-coherent guidance and exploration
              </p>
            </div>
            
            <div className="bg-deep-navy/30 backdrop-blur-sm rounded-lg p-6 border border-deep-gold/20 text-center">
              <Heart className="w-8 h-8 text-deep-gold mx-auto mb-4" />
              <h3 className="text-lg font-montserrat font-semibold text-creamy-white mb-2">
                Field Systems
              </h3>
              <p className="text-sm text-creamy-white/70">
                Advanced consciousness technologies
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
