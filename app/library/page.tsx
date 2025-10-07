import { createClient } from '@/lib/supabase/server';
import PublicNav from '@/components/navigation/PublicNav';
import Link from 'next/link';
import { Search, Filter, BookOpen, FileText, Sparkles, Brain } from 'lucide-react';

export default async function LibraryPage() {
  const supabase = createClient();

  // Fetch content from the library
  const { data: content } = await supabase
    .from('content_files')
    .select('id, title, content_type, excerpt, word_count, orb_associations, created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(100);

  // Group content by type
  const contentByType = {
    codex_core: content?.filter(c => c.content_type === 'codex_core') || [],
    book_fragment: content?.filter(c => c.content_type === 'book_fragment') || [],
    scrollstream_entry: content?.filter(c => c.content_type === 'scrollstream_entry') || [],
    research_notes: content?.filter(c => c.content_type === 'research_notes') || [],
    orb_personality: content?.filter(c => c.content_type === 'orb_personality') || [],
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'codex_core':
        return <BookOpen className="w-5 h-5" />;
      case 'book_fragment':
        return <FileText className="w-5 h-5" />;
      case 'scrollstream_entry':
        return <Sparkles className="w-5 h-5" />;
      case 'research_notes':
        return <Brain className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case 'codex_core':
        return 'Core Essays';
      case 'book_fragment':
        return 'Book Chapters';
      case 'scrollstream_entry':
        return 'Scrollstreams';
      case 'research_notes':
        return 'Research Notes';
      case 'orb_personality':
        return 'Orb Personalities';
      default:
        return 'Content';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-deep-navy via-deep-navy to-deep-navy">
      <PublicNav />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-montserrat font-bold text-creamy-white mb-6">
              Resonance Library
            </h1>
            <p className="text-xl md:text-2xl text-deep-gold/80 font-lora italic mb-8">
              The complete Codex archive of consciousness teachings
            </p>
            
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deep-gold/60 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search the Codex..."
                  className="pl-10 pr-4 py-3 bg-deep-navy/50 border border-deep-gold/30 rounded-lg text-creamy-white placeholder-creamy-white/60 focus:outline-none focus:border-deep-gold/60 focus:ring-2 focus:ring-deep-gold/20 w-80"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-3 bg-deep-gold/20 border border-deep-gold/30 rounded-lg text-creamy-white hover:bg-deep-gold/30 transition-colors">
                <Filter className="w-5 h-5" />
                Filter by Type
              </button>
            </div>
          </div>

          {/* Content Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {Object.entries(contentByType).map(([type, items]) => (
              <div key={type} className="bg-deep-navy/30 backdrop-blur-sm rounded-lg p-4 border border-deep-gold/20 text-center">
                <div className="flex items-center justify-center text-deep-gold mb-2">
                  {getContentIcon(type)}
                </div>
                <div className="text-2xl font-bold text-creamy-white">{items.length}</div>
                <div className="text-sm text-creamy-white/60">{getContentTypeLabel(type)}</div>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="space-y-8">
            {Object.entries(contentByType).map(([type, items]) => (
              items.length > 0 && (
                <div key={type} className="bg-deep-navy/20 backdrop-blur-sm rounded-lg p-6 border border-deep-gold/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-deep-gold">
                      {getContentIcon(type)}
                    </div>
                    <h2 className="text-2xl font-montserrat font-semibold text-creamy-white">
                      {getContentTypeLabel(type)}
                    </h2>
                    <span className="text-creamy-white/60">({items.length})</span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.slice(0, 6).map((item) => (
                      <Link
                        key={item.id}
                        href={`/library/${item.id}`}
                        className="block bg-deep-navy/40 hover:bg-deep-navy/60 rounded-lg p-4 border border-deep-gold/20 hover:border-deep-gold/40 transition-all group"
                      >
                        <h3 className="text-lg font-montserrat font-semibold text-creamy-white group-hover:text-deep-gold transition-colors mb-2">
                          {item.title}
                        </h3>
                        {item.excerpt && (
                          <p className="text-creamy-white/70 text-sm mb-3 line-clamp-3">
                            {item.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs text-creamy-white/60">
                          <span>{item.word_count} words</span>
                          {item.orb_associations && item.orb_associations.length > 0 && (
                            <div className="flex gap-1">
                              {item.orb_associations.slice(0, 3).map((orbId: number) => (
                                <span
                                  key={orbId}
                                  className="px-2 py-1 bg-deep-gold/20 text-deep-gold rounded"
                                >
                                  {orbId}
                                </span>
                              ))}
                              {item.orb_associations.length > 3 && (
                                <span className="px-2 py-1 bg-deep-gold/20 text-deep-gold rounded">
                                  +{item.orb_associations.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  {items.length > 6 && (
                    <div className="mt-4 text-center">
                      <Link
                        href={`/library?type=${type}`}
                        className="inline-flex items-center gap-2 text-deep-gold hover:text-deep-gold/80 transition-colors"
                      >
                        View all {items.length} {getContentTypeLabel(type).toLowerCase()}
                        <span>→</span>
                      </Link>
                    </div>
                  )}
                </div>
              )
            ))}
          </div>

          {content && content.length === 0 && (
            <div className="text-center py-12">
              <p className="text-creamy-white/60 text-lg">
                No content available in the library at this time.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
