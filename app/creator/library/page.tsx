'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Button, Card, Input, PageHeader, EmptyState } from '@/components/backend';

interface ContentFile {
  id: string;
  title: string;
  file_path: string;
  content_type: string;
  status: string;
  orb_associations: number[];
  tags: string[];
  created_at: string;
  updated_at: string;
}

export default function ContentLibraryPage() {
  const [files, setFiles] = useState<ContentFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterOrb, setFilterOrb] = useState<number | null>(null);
  const [filterTag, setFilterTag] = useState<string>('all');
  const [tagSearchQuery, setTagSearchQuery] = useState('');

  useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    try {
      const supabase = createClient();
      let query = supabase
        .from('content_files')
        .select('*')
        .order('updated_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        console.error('Supabase error:', error);
      } else {
        setFiles(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  }

  const filteredFiles = files.filter(file => {
    const matchesSearch =
      file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.file_path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = filterType === 'all' || file.content_type === filterType;
    const matchesOrb = !filterOrb || file.orb_associations.includes(filterOrb);
    const matchesTag = filterTag === 'all' || file.tags.includes(filterTag);

    return matchesSearch && matchesType && matchesOrb && matchesTag;
  });

  const contentTypes = [...new Set(files.map(f => f.content_type))];
  const allTags = [...new Set(files.flatMap(f => f.tags))].sort();
  const filteredTags = allTags.filter(tag =>
    tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-backend-secondary flex items-center justify-center">
        <div className="text-backend-primary text-lg">Loading content library...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-backend-secondary">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <PageHeader
          title="Content Library"
          subtitle={`${files.length} files imported from 09_PROCESSED`}
          action={
            <Link href="/creator/library/new">
              <Button variant="primary">+ Create New Content</Button>
            </Link>
          }
        />

        {/* Filters */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search titles, paths, tags..."
              label="Search"
            />

            <div>
              <label className="block text-sm font-medium text-backend-primary mb-1.5">
                Content Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-backend-default rounded-md text-backend-primary focus:outline-none focus:ring-2 focus:ring-backend-focus focus:border-transparent"
              >
                <option value="all">All Types</option>
                {contentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-backend-primary mb-1.5">
                Orb Association
              </label>
              <select
                value={filterOrb || ''}
                onChange={(e) => setFilterOrb(e.target.value ? Number(e.target.value) : null)}
                className="w-full px-3 py-2 bg-white border border-backend-default rounded-md text-backend-primary focus:outline-none focus:ring-2 focus:ring-backend-focus focus:border-transparent"
              >
                <option value="">All Orbs</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(orb => (
                  <option key={orb} value={orb}>Orb {orb}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-backend-primary mb-1.5">
                Tag ({allTags.length} tags)
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={tagSearchQuery}
                  onChange={(e) => setTagSearchQuery(e.target.value)}
                  placeholder="Search tags..."
                  className="w-full px-3 py-2 bg-white border border-backend-default rounded-md text-backend-primary text-sm focus:outline-none focus:ring-2 focus:ring-backend-focus focus:border-transparent"
                />
                <select
                  value={filterTag}
                  onChange={(e) => setFilterTag(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-backend-default rounded-md text-backend-primary text-sm focus:outline-none focus:ring-2 focus:ring-backend-focus focus:border-transparent"
                  size={5}
                >
                  <option value="all">All Tags</option>
                  {filteredTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-4 text-sm text-backend-secondary">
          Showing {filteredFiles.length} of {files.length} files
        </div>

        {/* File List */}
        <div className="space-y-3">
          {filteredFiles.length === 0 ? (
            <Card>
              <EmptyState
                title="No files match your filters"
                description="Try adjusting your search or filter criteria"
              />
            </Card>
          ) : (
            filteredFiles.map(file => (
              <Link
                key={file.id}
                href={`/creator/library/${file.id}`}
                className="block"
              >
                <Card className="hover:border-backend-hover transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-backend-primary mb-1">
                        {file.title}
                      </h3>
                      <p className="text-sm text-backend-muted mb-2">
                        {file.file_path}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ml-4 ${
                      file.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {file.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-backend-muted text-xs">Type:</span>
                      <span className="text-backend-primary font-medium">
                        {file.content_type}
                      </span>
                    </div>

                    {file.orb_associations.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-backend-muted text-xs">Orbs:</span>
                        <span className="text-backend-primary text-xs">
                          {file.orb_associations.slice(0, 3).join(', ')}
                          {file.orb_associations.length > 3 && ` +${file.orb_associations.length - 3}`}
                        </span>
                      </div>
                    )}

                    {file.tags.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-backend-muted text-xs">Tags:</span>
                        <div className="flex flex-wrap gap-1">
                          {file.tags.slice(0, 2).map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded bg-cosmic-blue/10 text-cosmic-blue text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {file.tags.length > 2 && (
                            <span className="text-backend-muted text-xs">
                              +{file.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="text-backend-muted text-xs ml-auto">
                      Updated {new Date(file.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
