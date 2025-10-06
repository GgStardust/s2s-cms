'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/backend/Button';
import { Card } from '@/components/backend/Card';
import { Textarea } from '@/components/backend/Input';

interface Chapter {
  id: string;
  book_id: string;
  chapter_number: number;
  title: string;
  part_number: number | null;
  part_title: string | null;
  status: string;
  word_count: number;
  content: string | null;
  notes: string | null;
  orb_focus: string | null;
  source_file_ids: string[] | null;
  scrollstreams: string[] | null;
}

interface Source {
  id: string;
  source_file_id: string;
  source_type: string;
  source_content: string;
  relevance_score: number;
  ai_suggested: boolean;
  user_confirmed: boolean;
  integration_notes: string | null;
  content_files: {
    id: string;
    title: string;
    file_path: string;
    content_type: string;
    orb_associations: number[];
    tags: string[];
  };
}

export default function ChapterEditorPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.id as string;
  const chapterId = params.chapterId as string;

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [content, setContent] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('outline');

  useEffect(() => {
    loadChapter();
  }, [chapterId]);

  async function loadChapter() {
    try {
      const response = await fetch(`/api/chapters/${chapterId}`);
      const data = await response.json();
      setChapter(data.chapter);
      setSources(data.sources || []);

      setContent(data.chapter.content || '');
      setNotes(data.chapter.notes || '');
      setStatus(data.chapter.status || 'outline');
    } catch (err) {
      console.error('Error loading chapter:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const wordCount = content.trim().split(/\s+/).length;

      const response = await fetch(`/api/chapters/${chapterId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          notes,
          status,
          word_count: wordCount,
        }),
      });

      if (response.ok) {
        await loadChapter();
      }
    } catch (err) {
      console.error('Error saving chapter:', err);
    } finally {
      setSaving(false);
    }
  }

  async function handleGenerateChapter() {
    if (sources.length === 0) {
      alert('Please add source files to this chapter first.');
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch('/api/ai/merge-chapter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapter_id: chapterId }),
      });

      const data = await response.json();

      if (response.ok) {
        await loadChapter();
        alert(`Chapter generated! ${data.merged.word_count} words, ${data.merged.transitions_added} transitions added.`);
      } else {
        alert(data.error || 'Failed to generate chapter');
      }
    } catch (err) {
      console.error('Error generating chapter:', err);
      alert('Failed to generate chapter');
    } finally {
      setGenerating(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-backend-secondary flex items-center justify-center">
        <div className="text-backend-primary text-2xl">Loading chapter...</div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen bg-backend-secondary flex items-center justify-center">
        <div className="text-backend-primary text-2xl">Chapter not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-backend-secondary">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/creator/book-compiler/${bookId}`}
            className="text-backend-secondary hover:text-backend-primary mb-4 inline-block"
          >
            ← Back to Book
          </Link>

          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-backend-primary mb-2">
                Chapter {chapter.chapter_number}: {chapter.title}
              </h1>
              {chapter.part_number && (
                <p className="text-backend-secondary">
                  Part {chapter.part_number}: {chapter.part_title}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="px-4 py-2 bg-white border border-backend-default rounded-md text-backend-primary focus:outline-none focus:ring-2 focus:ring-backend-focus"
              >
                <option value="outline">Outline</option>
                <option value="draft">Draft</option>
                <option value="in_progress">In Progress</option>
                <option value="complete">Complete</option>
              </select>

              <Button
                onClick={handleSave}
                disabled={saving}
                variant="primary"
              >
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Editor */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-backend-primary">Chapter Content</h2>
                <span className="text-backend-secondary text-sm">
                  {content.trim().split(/\s+/).filter(w => w.length > 0).length.toLocaleString()} words
                </span>
              </div>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Start writing your chapter content here..."
                className="w-full h-96 px-3 py-2 bg-white border border-backend-default rounded-md text-backend-primary placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-backend-focus focus:border-transparent"
              />
            </Card>

            {/* Notes */}
            <Card title="Chapter Notes">
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Add notes, ideas, or reminders for this chapter..."
                className="w-full h-64 px-3 py-2 bg-white border border-backend-default rounded-md text-backend-primary placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-backend-focus focus:border-transparent whitespace-pre-wrap font-mono text-sm"
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Orb Focus */}
            {chapter.orb_focus && (
              <Card title="Orb Focus">
                <p className="text-backend-secondary text-sm">{chapter.orb_focus}</p>
              </Card>
            )}

            {/* Scrollstreams */}
            {chapter.scrollstreams && chapter.scrollstreams.length > 0 && (
              <Card title="Scrollstreams">
                <div className="space-y-2">
                  {chapter.scrollstreams.map((stream, idx) => (
                    <div key={idx} className="text-backend-secondary text-sm italic border-l-2 border-backend-default pl-3">
                      {stream}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Source Files from Metadata */}
            {chapter.source_file_ids && chapter.source_file_ids.length > 0 && (
              <Card title="Referenced Source Files">
                <div className="space-y-2">
                  {chapter.source_file_ids.map((fileId, idx) => (
                    <div key={idx} className="text-backend-secondary text-sm bg-gray-50 rounded px-3 py-2 border border-backend-default">
                      {fileId}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Source Files */}
            <Card
              title="Linked Source Files"
              subtitle={`${sources.length} source${sources.length !== 1 ? 's' : ''}`}
            >
              {sources.length > 0 ? (
                <div className="space-y-3">
                  {sources.map(source => (
                    <div
                      key={source.id}
                      className="bg-gray-50 rounded-lg p-3 border border-backend-default"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-backend-primary text-sm font-medium">
                          {source.content_files.title}
                        </h3>
                        {source.ai_suggested && (
                          <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                            Orbital
                          </span>
                        )}
                      </div>
                      <p className="text-backend-muted text-xs mb-2">
                        {source.source_type}
                      </p>
                      {source.relevance_score && (
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-backend-primary"
                              style={{ width: `${source.relevance_score * 100}%` }}
                            />
                          </div>
                          <span className="text-backend-muted text-xs">
                            {Math.round(source.relevance_score * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-backend-muted text-sm">
                  No source files yet
                </div>
              )}

              <Link
                href={`/creator/book-compiler/${bookId}/chapters/${chapterId}/add-sources`}
                className="mt-4 block w-full px-4 py-2 bg-white border border-backend-default rounded-lg text-backend-primary text-center hover:border-backend-hover transition-colors"
              >
                + Add Sources
              </Link>
            </Card>

            {/* Quick Actions */}
            <Card title="Orbital Tools">
              <div className="space-y-2">
                <Button
                  onClick={handleGenerateChapter}
                  disabled={generating || sources.length === 0}
                  variant="secondary"
                  fullWidth
                  size="sm"
                >
                  {generating ? 'Generating...' : 'Generate Chapter Draft'}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
