import OrbConstellation from '@/components/public/OrbConstellation';
import ScrollstreamRail from '@/components/public/ScrollstreamRail';
import Link from 'next/link';

export default function PublicHomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <OrbConstellation />
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-montserrat font-bold text-creamy-white mb-6">
              Stardust to Sovereignty
            </h1>
            <p className="text-xl md:text-2xl text-deep-gold/80 font-lora italic mb-8">
              A resonance-based system for multidimensional embodiment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/orbs"
                className="px-8 py-4 bg-deep-gold text-deep-navy font-semibold rounded-lg hover:bg-deep-gold/90 transition-colors"
              >
                Enter the Field
              </Link>
              <button className="px-8 py-4 bg-deep-navy/50 border border-deep-gold/30 text-creamy-white rounded-lg hover:bg-deep-navy/70 transition-colors">
                Stay Connected
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Scrollstream Rail */}
      <ScrollstreamRail />
    </div>
  );
}
