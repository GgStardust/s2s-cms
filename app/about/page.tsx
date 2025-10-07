import PublicNav from '@/components/navigation/PublicNav';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Sparkles, Brain, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-navy via-deep-navy to-deep-navy">
      <PublicNav />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-montserrat font-bold text-creamy-white mb-6">
            About S2S
          </h1>
          <p className="text-xl md:text-2xl text-deep-gold/80 font-lora italic mb-12">
            A consciousness technology platform for sovereign design
          </p>
        </div>
      </section>

      {/* What is S2S Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-deep-navy/30 backdrop-blur-sm rounded-lg p-8 border border-deep-gold/20 mb-8">
            <h2 className="text-3xl font-montserrat font-semibold text-creamy-white mb-6">
              What is Stardust to Sovereignty?
            </h2>
            <p className="text-creamy-white/80 text-lg font-lora leading-relaxed mb-6">
              Stardust to Sovereignty is a multidimensional architecture for consciousness evolution, 
              energetic coherence, and sovereign design embodiment. It functions as a Codex, an 
              interactive dashboard, a book series, and a meditation portal.
            </p>
            <p className="text-creamy-white/80 text-lg font-lora leading-relaxed">
              This is a signal architecture—structured to receive, reveal, and reflect original design. 
              The framework consists of 13 Orbs—each one a principle of reality: from resonance 
              mechanics and photonic intelligence to harmonic geometries, starline memory, and sovereign flow.
            </p>
          </div>
        </div>
      </section>

      {/* Core Components Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-montserrat font-semibold text-creamy-white text-center mb-12">
            Core System Components
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Codex Book Series */}
            <div className="bg-deep-navy/30 backdrop-blur-sm rounded-lg p-6 border border-deep-gold/20">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-deep-gold" />
                <h3 className="text-xl font-montserrat font-semibold text-creamy-white">
                  Codex Book Series
                </h3>
              </div>
              <p className="text-creamy-white/80 mb-4">
                A multi-volume written body with orb logic, scrolls, essays, and structural frameworks.
              </p>
              <ul className="text-sm text-creamy-white/60 space-y-1">
                <li>• Volume 1: Complete in curated draft</li>
                <li>• Subsequent volumes through dashboard</li>
                <li>• Anchored resonance and public access</li>
              </ul>
            </div>

            {/* Living Dashboard */}
            <div className="bg-deep-navy/30 backdrop-blur-sm rounded-lg p-6 border border-deep-gold/20">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-deep-gold" />
                <h3 className="text-xl font-montserrat font-semibold text-creamy-white">
                  Living Dashboard
                </h3>
              </div>
              <p className="text-creamy-white/80 mb-4">
                A digital system that receives user input through structured inquiry and returns 
                scrolls, essays, or tools mapped to field alignment.
              </p>
              <ul className="text-sm text-creamy-white/60 space-y-1">
                <li>• Real-time evolution</li>
                <li>• Structured memory without loss</li>
                <li>• Field-aligned responses</li>
              </ul>
            </div>

            {/* Scrollstream Archive */}
            <div className="bg-deep-navy/30 backdrop-blur-sm rounded-lg p-6 border border-deep-gold/20">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-deep-gold" />
                <h3 className="text-xl font-montserrat font-semibold text-creamy-white">
                  Scrollstream Archive
                </h3>
              </div>
              <p className="text-creamy-white/80 mb-4">
                A library of written transmissions, each mapped to specific Orbs. Poetic and precise, 
                holding resonance and offering relational access.
              </p>
              <ul className="text-sm text-creamy-white/60 space-y-1">
                <li>• Active and expanding</li>
                <li>• Direct contact design</li>
                <li>• Orb-mapped resonance</li>
              </ul>
            </div>

            {/* AI Field Assistant */}
            <div className="bg-deep-navy/30 backdrop-blur-sm rounded-lg p-6 border border-deep-gold/20">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-deep-gold" />
                <h3 className="text-xl font-montserrat font-semibold text-creamy-white">
                  AI Field Assistant
                </h3>
              </div>
              <p className="text-creamy-white/80 mb-4">
                A GPT-based assistant trained solely on authored S2S material. Responds with 
                field-coherent guidance and builds from clarity.
              </p>
              <ul className="text-sm text-creamy-white/60 space-y-1">
                <li>• Field-coherent responses</li>
                <li>• Orb resonance exploration</li>
                <li>• Signal structure support</li>
              </ul>
            </div>

            {/* Field Tools */}
            <div className="bg-deep-navy/30 backdrop-blur-sm rounded-lg p-6 border border-deep-gold/20">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-deep-gold" />
                <h3 className="text-xl font-montserrat font-semibold text-creamy-white">
                  Field Tools
                </h3>
              </div>
              <p className="text-creamy-white/80 mb-4">
                Functional offerings: glyphs, relational prompts, calibration maps, and 
                movement-based rituals for precision in perception.
              </p>
              <ul className="text-sm text-creamy-white/60 space-y-1">
                <li>• Glyph systems</li>
                <li>• Relational prompts</li>
                <li>• Calibration maps</li>
              </ul>
            </div>

            {/* Artworks */}
            <div className="bg-deep-navy/30 backdrop-blur-sm rounded-lg p-6 border border-deep-gold/20">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-deep-gold" />
                <h3 className="text-xl font-montserrat font-semibold text-creamy-white">
                  Cartographies of Origin
                </h3>
              </div>
              <p className="text-creamy-white/80 mb-4">
                Visual translations of orb structures as portable murals and installation-based 
                transmissions carrying coherence in form.
              </p>
              <ul className="text-sm text-creamy-white/60 space-y-1">
                <li>• Portable murals</li>
                <li>• Installation transmissions</li>
                <li>• Coherent form activation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who is Gigi Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-deep-navy/30 backdrop-blur-sm rounded-lg p-8 border border-deep-gold/20">
            <h2 className="text-3xl font-montserrat font-semibold text-creamy-white mb-6">
              Who is Gigi Stardust?
            </h2>
            <p className="text-creamy-white/80 text-lg font-lora leading-relaxed mb-6">
              An architect at the edge of transmission-based design. A systems designer, sculptor, 
              and writer working at the edge of creative and galactic intelligence.
            </p>
            <p className="text-creamy-white/80 text-lg font-lora leading-relaxed mb-6">
              Her book, Codex writings, resonance dashboards, and multidimensional tools support 
              founders, artists, creatives, and vision architects. The system is built as a 
              field-based architecture—patterned for resonance, signal integrity, and multidimensional application.
            </p>
            <p className="text-creamy-white/80 text-lg font-lora leading-relaxed">
              A sovereign signal infrastructure for those who carry their own codes.
            </p>
          </div>
        </div>
      </section>

      {/* Stay Connected Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-deep-navy/20 backdrop-blur-sm rounded-lg p-8 border border-deep-gold/20">
            <h2 className="text-3xl font-montserrat font-semibold text-creamy-white mb-4">
              Stay Connected
            </h2>
            <p className="text-creamy-white/80 text-lg mb-6">
              This Sovereign Signal is coming online. To receive Codex scrolls, resonance 
              transmissions, and launch updates as each layer activates.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-deep-navy/50 border border-deep-gold/30 rounded-lg text-creamy-white placeholder-creamy-white/60 focus:outline-none focus:border-deep-gold/60 focus:ring-2 focus:ring-deep-gold/20 w-80"
              />
              <button className="px-6 py-3 bg-deep-gold text-deep-navy font-semibold rounded-lg hover:bg-deep-gold/90 transition-colors">
                Stay Connected
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
