'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface ContentFile {
  id: string;
  title: string;
  file_path: string;
  content_type: string;
  status: string;
  markdown_body: string;
  yaml_frontmatter: any;
  orb_associations: number[];
  tags: string[];
  resonance_rating: number;
  resonance_metrics: any;
  created_at: string;
  updated_at: string;
}

export default function FileDetailPage() {
  const params = useParams();
  const [file, setFile] = useState<ContentFile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFile();
  }, [params.id]);

  async function loadFile() {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('content_files')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      console.error('Error loading file:', error);
    } else {
      setFile(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-navy flex items-center justify-center">
        <div className="text-creamy-white text-2xl">Loading file...</div>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="min-h-screen bg-deep-navy flex items-center justify-center">
        <div className="text-center">
          <div className="text-creamy-white text-2xl mb-4">File not found</div>
          <Link
            href="/creator/library"
            className="text-deep-gold hover:text-creamy-white"
          >
            ← Back to Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-navy">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/creator/library"
            className="text-deep-gold hover:text-creamy-white mb-4 inline-block"
          >
            ← Back to Library
          </Link>

          <h1 className="text-4xl font-bold text-creamy-white mb-4">
            {file.title}
          </h1>

          <div className="flex items-center space-x-4 text-creamy-white/60 text-sm mb-6">
            <span>{file.file_path}</span>
            <span>•</span>
            <span>Updated {new Date(file.updated_at).toLocaleDateString()}</span>
          </div>

          {/* Metadata Bar */}
          <div className="flex items-center space-x-4 flex-wrap gap-y-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              file.status === 'published'
                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
            }`}>
              {file.status}
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-medium bg-deep-gold/20 text-deep-gold border border-deep-gold/30">
              {file.content_type}
            </span>

            {file.orb_associations && file.orb_associations.length > 0 && (
              <div className="flex items-center space-x-1">
                <span className="text-creamy-white/60 text-xs mr-1">Orbs:</span>
                {file.orb_associations.map(orb => (
                  <span
                    key={orb}
                    className="w-7 h-7 rounded-full bg-deep-gold/20 border border-deep-gold/40 flex items-center justify-center text-xs text-deep-gold font-medium"
                  >
                    {orb}
                  </span>
                ))}
              </div>
            )}

            {file.tags && file.tags.length > 0 && (
              <div className="flex items-center space-x-1">
                <span className="text-creamy-white/60 text-xs mr-1">Tags:</span>
                {file.tags.slice(0, 5).map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded bg-cosmic-blue/20 text-cosmic-blue text-xs border border-cosmic-blue/30"
                  >
                    {tag}
                  </span>
                ))}
                {file.tags.length > 5 && (
                  <span className="text-creamy-white/60 text-xs">
                    +{file.tags.length - 5} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-deep-navy/60 backdrop-blur-sm rounded-2xl p-8 border border-deep-gold/30">
              <h2 className="text-2xl font-bold text-creamy-white mb-6">Content</h2>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-mono text-sm text-creamy-white/90 leading-relaxed">
                  {file.markdown_body}
                </pre>
              </div>
            </div>
          </div>

          {/* Metadata Sidebar */}
          <div className="space-y-6">
            {/* YAML Frontmatter */}
            <div className="bg-deep-navy/60 backdrop-blur-sm rounded-2xl p-6 border border-deep-gold/30">
              <h3 className="text-lg font-bold text-creamy-white mb-4">Metadata</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-creamy-white/60 mb-1">Content Type</div>
                  <div className="text-creamy-white">{file.content_type}</div>
                </div>

                <div>
                  <div className="text-creamy-white/60 mb-1">Status</div>
                  <div className="text-creamy-white">{file.status}</div>
                </div>

                <div>
                  <div className="text-creamy-white/60 mb-1">Resonance Rating</div>
                  <div className="text-creamy-white">{file.resonance_rating}/10</div>
                </div>

                {file.resonance_metrics && (
                  <div>
                    <div className="text-creamy-white/60 mb-2">Resonance Metrics</div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-creamy-white/80">Strength</span>
                        <span className="text-deep-gold">{file.resonance_metrics.strength}/10</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-creamy-white/80">Clarity</span>
                        <span className="text-deep-gold">{file.resonance_metrics.clarity}/10</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-creamy-white/80">Coherence</span>
                        <span className="text-deep-gold">{file.resonance_metrics.coherence}/10</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-creamy-white/80">Pattern</span>
                        <span className="text-deep-gold">{file.resonance_metrics.pattern}/10</span>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-creamy-white/60 mb-1">Created</div>
                  <div className="text-creamy-white text-xs">
                    {new Date(file.created_at).toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-creamy-white/60 mb-1">Updated</div>
                  <div className="text-creamy-white text-xs">
                    {new Date(file.updated_at).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* YAML Frontmatter Raw */}
            {file.yaml_frontmatter && (
              <div className="bg-deep-navy/60 backdrop-blur-sm rounded-2xl p-6 border border-deep-gold/30">
                <h3 className="text-lg font-bold text-creamy-white mb-4">YAML Frontmatter</h3>
                <pre className="text-xs text-creamy-white/80 overflow-x-auto whitespace-pre-wrap font-mono">
                  {JSON.stringify(file.yaml_frontmatter, null, 2)}
                </pre>
              </div>
            )}

            {/* Actions */}
            <div className="bg-deep-navy/60 backdrop-blur-sm rounded-2xl p-6 border border-deep-gold/30">
              <h3 className="text-lg font-bold text-creamy-white mb-4">Actions</h3>
              <div className="space-y-2">
                <Link
                  href={`/creator/library/${file.id}/edit`}
                  className="block w-full px-4 py-2 bg-deep-gold/20 text-deep-gold border border-deep-gold/30 rounded-lg hover:bg-deep-gold/30 transition-colors text-sm text-center"
                >
                  Edit Content
                </Link>
                <button className="w-full px-4 py-2 bg-cosmic-blue/20 text-cosmic-blue border border-cosmic-blue/30 rounded-lg hover:bg-cosmic-blue/30 transition-colors text-sm">
                  Publish to Social
                </button>
                <button className="w-full px-4 py-2 bg-green-500/20 text-green-300 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors text-sm">
                  Add to Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
