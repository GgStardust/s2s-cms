import OrbGrid from '@/components/public/OrbGrid';
import ScrollstreamRail from '@/components/public/ScrollstreamRail';
import Link from 'next/link';

export default function PublicHomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-void-black/90 to-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-montserrat font-bold text-bone-white">
                Stardust to Sovereignty
              </h1>
              <p className="text-sm md:text-base text-living-gold/70 mt-1">
                Your Sovereign Field Console
              </p>
            </div>

            <nav className="flex items-center gap-4">
              <Link
                href="/creator"
                className="px-4 py-2 text-sm text-bone-white hover:text-living-gold transition-colors"
              >
                Creator Mode
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Orb Grid */}
      <OrbGrid />

      {/* Scrollstream Rail */}
      <ScrollstreamRail />
    </div>
  );
}
