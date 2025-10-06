import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Sparkles, Music } from 'lucide-react';
import ScrollstreamRail from '@/components/public/ScrollstreamRail';

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

export default async function OrbPortalPage({ params }: { params: { id: string } }) {
  const orbId = parseInt(params.id);

  if (isNaN(orbId) || orbId < 1 || orbId > 13) {
    notFound();
  }

  const orbInfo = ORB_DATA[orbId as keyof typeof ORB_DATA];
  const supabase = createClient();

  // Fetch content related to this Orb
  const { data: content } = await supabase
    .from('content_files')
    .select('id, title, content_type, excerpt, word_count')
    .contains('orb_associations', [orbId])
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  // Fetch scrollstreams for this Orb
  const { data: scrollstreams } = await supabase
    .from('scrollstreams')
    .select('id, content')
    .contains('orb_associations', [orbId])
    .eq('status', 'published')
    .limit(5);

  // Group content by type
  const contentByType = {
    scrollstream_entry: content?.filter(c => c.content_type === 'scrollstream_entry') || [],
    codex_core: content?.filter(c => c.content_type === 'codex_core') || [],
    book_fragment: content?.filter(c => c.content_type === 'book_fragment') || [],
    orb_personality: content?.filter(c => c.content_type === 'orb_personality') || [],
    research_notes: content?.filter(c => c.content_type === 'research_notes') || [],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-void-black via-deep-indigo to-void-black pb-24">
      {/* Header with back button */}
      <header className="bg-void-black/50 backdrop-blur-sm border-b border-living-gold/20">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-bone-white hover:text-living-gold transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Constellation
          </Link>
        </div>
      </header>

      {/* Orb Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Orb Number and Glyph Placeholder */}
          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-${orbInfo.color} mb-8 shadow-lg shadow-${orbInfo.color}/50`}>
            <span className="text-6xl font-bold text-white">{orbId}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-montserrat font-bold text-bone-white mb-6">
            Orb {orbId}: {orbInfo.name}
          </h1>

          <p className="text-xl md:text-2xl text-living-gold/80 font-lora italic mb-12">
            "{orbInfo.description}"
          </p>
        </div>
      </section>

      {/* Content Threads Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-montserrat font-bold text-bone-white mb-8 text-center">
          Content Threads
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Scrollstreams */}
          {scrollstreams && scrollstreams.length > 0 && (
            <div className="bg-deep-indigo/30 backdrop-blur-sm rounded-lg p-6 border border-living-gold/20">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-living-gold" />
                <h3 className="text-xl font-montserrat font-semibold text-bone-white">
                  Scrollstreams
                </h3>
              </div>
              <p className="text-bone-white/70 mb-4">
                {scrollstreams.length} resonant transmissions
              </p>
              <div className="space-y-3">
                {scrollstreams.slice(0, 3).map((scroll) => (
                  <p key={scroll.id} className="text-sm text-bone-white/80 italic font-lora">
                    "{scroll.content.substring(0, 100)}..."
                  </p>
                ))}
              </div>
              <Link
                href={`/scrollstreams?orb=${orbId}`}
                className="inline-block mt-4 text-living-gold hover:text-living-gold/80 text-sm"
              >
                View all →
              </Link>
            </div>
          )}

          {/* Essays */}
          {contentByType.codex_core.length > 0 && (
            <div className="bg-deep-indigo/30 backdrop-blur-sm rounded-lg p-6 border border-living-gold/20">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-5 h-5 text-living-gold" />
                <h3 className="text-xl font-montserrat font-semibold text-bone-white">
                  Essays
                </h3>
              </div>
              <p className="text-bone-white/70 mb-4">
                {contentByType.codex_core.length} core teachings
              </p>
              <ul className="space-y-2">
                {contentByType.codex_core.slice(0, 3).map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/content/${item.id}`}
                      className="text-sm text-bone-white hover:text-living-gold transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              {contentByType.codex_core.length > 3 && (
                <Link
                  href={`/library?orb=${orbId}`}
                  className="inline-block mt-4 text-living-gold hover:text-living-gold/80 text-sm"
                >
                  View all →
                </Link>
              )}
            </div>
          )}

          {/* Book Chapters */}
          {contentByType.book_fragment.length > 0 && (
            <div className="bg-deep-indigo/30 backdrop-blur-sm rounded-lg p-6 border border-living-gold/20">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-5 h-5 text-living-gold" />
                <h3 className="text-xl font-montserrat font-semibold text-bone-white">
                  Book Chapters
                </h3>
              </div>
              <p className="text-bone-white/70 mb-4">
                {contentByType.book_fragment.length} book sections
              </p>
              <ul className="space-y-2">
                {contentByType.book_fragment.slice(0, 3).map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/content/${item.id}`}
                      className="text-sm text-bone-white hover:text-living-gold transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Related Orbs Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-montserrat font-bold text-bone-white mb-8 text-center">
          Related Orbs
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {/* Show a few related Orbs - this is simplified, you could add logic for actual relationships */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
            .filter(id => id !== orbId)
            .slice(0, 4)
            .map((id) => {
              const relatedOrb = ORB_DATA[id as keyof typeof ORB_DATA];
              return (
                <Link
                  key={id}
                  href={`/orbs/${id}`}
                  className="flex items-center gap-3 px-6 py-3 bg-deep-indigo/30 backdrop-blur-sm rounded-lg border border-living-gold/20 hover:border-living-gold/50 transition-all"
                >
                  <div className={`w-10 h-10 rounded-full bg-${relatedOrb.color} flex items-center justify-center`}>
                    <span className="text-white font-bold">{id}</span>
                  </div>
                  <span className="text-bone-white">{relatedOrb.name}</span>
                </Link>
              );
            })}
        </div>
      </section>

      {/* Scrollstream Rail */}
      <ScrollstreamRail />
    </div>
  );
}
