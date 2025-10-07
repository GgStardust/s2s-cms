import { createClient } from '@/lib/supabase/server';
import PublicNav from '@/components/navigation/PublicNav';
import ScrollstreamRail from '@/components/public/ScrollstreamRail';
import { Search, Filter, Clock } from 'lucide-react';

export default async function ScrollstreamPage() {
  const supabase = createClient();

  // Fetch scrollstreams
  const { data: scrollstreams } = await supabase
    .from('scrollstreams')
    .select('id, content, orb_associations, created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-navy via-deep-navy to-deep-navy">
      <PublicNav />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-montserrat font-bold text-creamy-white mb-6">
            Scrollstream
          </h1>
          <p className="text-xl md:text-2xl text-deep-gold/80 font-lora italic mb-12">
            Live consciousness transmissions from the field
          </p>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deep-gold/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search transmissions..."
                className="pl-10 pr-4 py-3 bg-deep-navy/50 border border-deep-gold/30 rounded-lg text-creamy-white placeholder-creamy-white/60 focus:outline-none focus:border-deep-gold/60 focus:ring-2 focus:ring-deep-gold/20 w-80"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-3 bg-deep-gold/20 border border-deep-gold/30 rounded-lg text-creamy-white hover:bg-deep-gold/30 transition-colors">
              <Filter className="w-5 h-5" />
              Filter by Orb
            </button>
          </div>
        </div>
      </section>

      {/* Live Feed Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <h2 className="text-2xl font-montserrat font-semibold text-creamy-white">
              Live Resonance Stream
            </h2>
          </div>

          {/* Scrollstream Feed */}
          <div className="space-y-6">
            {scrollstreams && scrollstreams.length > 0 ? (
              scrollstreams.map((scroll) => (
                <div
                  key={scroll.id}
                  className="bg-deep-navy/30 backdrop-blur-sm rounded-lg p-6 border border-deep-gold/20 hover:border-deep-gold/40 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-deep-gold/20 rounded-full flex items-center justify-center">
                        <span className="text-deep-gold font-bold">
                          {scroll.orb_associations?.[0] || '∞'}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-creamy-white text-lg font-lora italic mb-3">
                        "{scroll.content}"
                      </p>
                      <div className="flex items-center gap-4 text-sm text-creamy-white/60">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {new Date(scroll.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        {scroll.orb_associations && scroll.orb_associations.length > 0 && (
                          <div className="flex gap-2">
                            {scroll.orb_associations.map((orbId: number) => (
                              <span
                                key={orbId}
                                className="px-2 py-1 bg-deep-gold/20 text-deep-gold rounded text-xs"
                              >
                                Orb {orbId}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-creamy-white/60 text-lg">
                  No scrollstreams available at this time.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Scrollstream Rail Component */}
      <ScrollstreamRail />
    </div>
  );
}
