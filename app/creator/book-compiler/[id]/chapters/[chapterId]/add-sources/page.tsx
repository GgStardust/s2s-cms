'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Input, Card, EmptyState, PageHeader } from '@/components/backend';

interface ContentFile {
  id: string;
  title: string;
  file_path: string;
  content_type: string;
  orb_associations: number[];
  tags: string[];
  word_count: number | null;
  created_at: string;
}

export default function AddSourcesPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.id as string;
  const chapterId = params.chapterId as string;

  const [allFiles, setAllFiles] = useState<ContentFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<ContentFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOrb, setFilterOrb] = useState<number | null>(null);

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterOrb, allFiles]);

  async function loadFiles() {
    try {
      const response = await fetch('/api/content-files');
      const data = await response.json();
      setAllFiles(data.files || []);
      setFilteredFiles(data.files || []);
    } catch (err) {
      console.error('Error loading files:', err);
    } finally {
      setLoading(false);
    }
  }

  function applyFilters() {
    let filtered = [...allFiles];

    if (searchTerm) {
      filtered = filtered.filter(file =>
        file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterOrb !== null) {
      filtered = filtered.filter(file =>
        file.orb_associations.includes(filterOrb)
      );
    }

    setFilteredFiles(filtered);
  }

  function toggleFile(fileId: string) {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  }

  async function handleAddSources() {
    if (selectedFiles.length === 0) return;

    setAdding(true);
    try {
      const response = await fetch('/api/chapter-sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapter_id: chapterId,
          file_ids: selectedFiles,
        }),
      });

      if (response.ok) {
        router.push(`/creator/book-compiler/${bookId}/chapters/${chapterId}`);
      }
    } catch (err) {
      console.error('Error adding sources:', err);
    } finally {
      setAdding(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-backend-secondary flex items-center justify-center">
        <div className="text-backend-primary text-lg">Loading files...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-backend-secondary">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <PageHeader
          title="Add Source Files"
          subtitle="Select files from your library to link to this chapter"
          breadcrumbs={[
            { label: 'Book Compiler', href: `/creator/book-compiler/${bookId}` },
            { label: 'Chapter', href: `/creator/book-compiler/${bookId}/chapters/${chapterId}` },
            { label: 'Add Sources' },
          ]}
          action={
            <Button
              onClick={handleAddSources}
              disabled={selectedFiles.length === 0 || adding}
              variant="primary"
              size="lg"
            >
              {adding ? 'Adding...' : `Add ${selectedFiles.length} File${selectedFiles.length !== 1 ? 's' : ''}`}
            </Button>
          }
        />

        {/* Filters */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by title or tags..."
              label="Search"
            />

            <div>
              <label className="block text-sm font-medium text-backend-primary mb-1.5">
                Filter by Orb
              </label>
              <select
                value={filterOrb ?? ''}
                onChange={e => setFilterOrb(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full px-3 py-2 bg-white border border-backend-default rounded-md text-backend-primary focus:outline-none focus:ring-2 focus:ring-backend-focus focus:border-transparent"
              >
                <option value="">All Orbs</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(orb => (
                  <option key={orb} value={orb}>Orb {orb}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Files List */}
        <div className="space-y-3">
          {filteredFiles.length === 0 ? (
            <Card>
              <EmptyState
                title={searchTerm || filterOrb ? 'No files match your filters' : 'No files in library yet'}
                description="Try adjusting your search or filters"
              />
            </Card>
          ) : (
            filteredFiles.map(file => {
              const isSelected = selectedFiles.includes(file.id);

              return (
                <Card
                  key={file.id}
                  onClick={() => toggleFile(file.id)}
                  className={`cursor-pointer transition-all ${
                    isSelected
                      ? 'ring-2 ring-backend-focus border-backend-focus'
                      : 'hover:border-backend-hover'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-base font-semibold text-backend-primary">
                          {file.title}
                        </h3>
                        <span className="text-xs px-2 py-1 rounded bg-cosmic-blue/10 text-cosmic-blue font-medium">
                          {file.content_type}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-backend-secondary mb-2">
                        {file.orb_associations.length > 0 && (
                          <span>
                            Orbs: {file.orb_associations.join(', ')}
                          </span>
                        )}
                        {file.word_count && (
                          <span>
                            {file.word_count.toLocaleString()} words
                          </span>
                        )}
                      </div>

                      {file.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {file.tags.slice(0, 5).map(tag => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 rounded bg-backend-accent text-backend-secondary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ml-4 transition-colors ${
                      isSelected
                        ? 'bg-backend-focus border-backend-focus'
                        : 'border-backend-default'
                    }`}>
                      {isSelected && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
