'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/backend/Button';
import { Card } from '@/components/backend/Card';
import { Input } from '@/components/backend/Input';
import { PageHeader } from '@/components/backend/Layout';

interface Book {
  id: string;
  title: string;
  type: 'non_fiction' | 'fiction';
  status: string;
  description: string;
  current_word_count: number;
  target_word_count: number;
  purpose: string | null;
  overview: string | null;
  book_structure: string | null;
  table_of_contents: string | null;
}

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
}

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddChapter, setShowAddChapter] = useState(false);
  const [mappingContent, setMappingContent] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [newChapter, setNewChapter] = useState({
    chapter_number: 1,
    title: '',
    part_number: null as number | null,
    part_title: '',
  });

  useEffect(() => {
    loadBook();
  }, [bookId]);

  async function loadBook() {
    try {
      const response = await fetch(`/api/books/${bookId}`);
      const data = await response.json();
      setBook(data.book);
      setChapters(data.chapters || []);

      // Set next chapter number
      if (data.chapters && data.chapters.length > 0) {
        const maxChapter = Math.max(...data.chapters.map((c: Chapter) => c.chapter_number));
        setNewChapter(prev => ({ ...prev, chapter_number: maxChapter + 1 }));
      }
    } catch (err) {
      console.error('Error loading book:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddChapter(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch('/api/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          book_id: bookId,
          ...newChapter,
          part_number: newChapter.part_number || null,
          part_title: newChapter.part_title || null,
        }),
      });

      if (response.ok) {
        setShowAddChapter(false);
        setNewChapter({
          chapter_number: newChapter.chapter_number + 1,
          title: '',
          part_number: null,
          part_title: '',
        });
        loadBook();
      }
    } catch (err) {
      console.error('Error creating chapter:', err);
    }
  }

  async function handleMapContent() {
    if (!chapters || chapters.length === 0) {
      alert('Please create chapters first before mapping content.');
      return;
    }

    setMappingContent(true);
    try {
      const response = await fetch('/api/ai/map-book-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ book_id: bookId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store mapping in session storage for review page
        sessionStorage.setItem('content_mapping', JSON.stringify(data.mapping));
        router.push(`/creator/book-compiler/${bookId}/content-mapping`);
      } else {
        alert(data.error || 'Failed to map content');
      }
    } catch (err) {
      console.error('Error mapping content:', err);
      alert('Failed to map content');
    } finally {
      setMappingContent(false);
    }
  }

  async function handleExport(format: 'pdf' | 'epub' | 'docx') {
    setExporting(true);
    try {
      const response = await fetch('/api/books/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ book_id: bookId, format }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${book?.title || 'book'}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to export book');
      }
    } catch (err) {
      console.error('Error exporting book:', err);
      alert('Failed to export book');
    } finally {
      setExporting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-backend-secondary flex items-center justify-center">
        <div className="text-backend-primary text-2xl">Loading book...</div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-backend-secondary flex items-center justify-center">
        <div className="text-backend-primary text-2xl">Book not found</div>
      </div>
    );
  }

  // Group chapters by part
  const chaptersByPart: { [key: string]: Chapter[] } = {};
  chapters.forEach(chapter => {
    const key = chapter.part_number ? `Part ${chapter.part_number}: ${chapter.part_title}` : 'Chapters';
    if (!chaptersByPart[key]) {
      chaptersByPart[key] = [];
    }
    chaptersByPart[key].push(chapter);
  });

  return (
    <div className="min-h-screen bg-backend-secondary">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/creator/book-compiler"
            className="text-backend-secondary hover:text-backend-primary mb-4 inline-block"
          >
            ← Back to Book Compiler
          </Link>

          <Card className="mb-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-4xl font-bold text-backend-primary">{book.title}</h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    book.status === 'complete'
                      ? 'bg-green-100 text-green-700'
                      : book.status === 'in_progress'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {book.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-backend-secondary mb-4">{book.description}</p>
                <div className="flex items-center space-x-6 text-sm">
                  <span className="text-backend-secondary">
                    <span className="font-semibold">{chapters.length}</span> chapters
                  </span>
                  {book.target_word_count > 0 && (
                    <span className="text-backend-secondary">
                      <span className="font-semibold">{book.current_word_count.toLocaleString()}</span> / {book.target_word_count.toLocaleString()} words
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-3">
                <div className="relative group">
                  <Button
                    disabled={exporting || chapters.length === 0}
                    variant="secondary"
                  >
                    {exporting ? 'Exporting...' : 'Export'}
                  </Button>
                  {!exporting && chapters.length > 0 && (
                    <div className="absolute top-full right-0 mt-2 bg-white border border-backend-default rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                      <button
                        onClick={() => handleExport('pdf')}
                        className="block w-full px-6 py-2 text-left text-backend-primary hover:bg-backend-accent rounded-t-lg"
                      >
                        PDF
                      </button>
                      <button
                        onClick={() => handleExport('epub')}
                        className="block w-full px-6 py-2 text-left text-backend-primary hover:bg-backend-accent"
                      >
                        ePub
                      </button>
                      <button
                        onClick={() => handleExport('docx')}
                        className="block w-full px-6 py-2 text-left text-backend-primary hover:bg-backend-accent rounded-b-lg"
                      >
                        DOCX
                      </button>
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleMapContent}
                  disabled={mappingContent || chapters.length === 0}
                  variant="secondary"
                >
                  {mappingContent ? 'Analyzing...' : 'Orbital Map Content'}
                </Button>
                <Button
                  onClick={() => setShowAddChapter(!showAddChapter)}
                  variant="primary"
                >
                  + Add Chapter
                </Button>
              </div>
            </div>
          </Card>

          {/* Book Metadata Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {book.purpose && (
              <Card title="Purpose">
                <p className="text-backend-secondary text-sm whitespace-pre-wrap">{book.purpose}</p>
              </Card>
            )}

            {book.overview && (
              <Card title="Overview">
                <p className="text-backend-secondary text-sm whitespace-pre-wrap">{book.overview}</p>
              </Card>
            )}
          </div>

          {book.book_structure && (
            <Card title="Book Structure" className="mb-8">
              <div className="text-backend-secondary text-sm whitespace-pre-wrap">{book.book_structure}</div>
            </Card>
          )}

          {book.table_of_contents && (
            <Card title="Table of Contents" className="mb-8">
              <div className="text-backend-secondary text-sm whitespace-pre-wrap font-mono">{book.table_of_contents}</div>
            </Card>
          )}
        </div>

        {/* Add Chapter Form */}
        {showAddChapter && (
          <Card title="Add New Chapter" className="mb-8">
            <form onSubmit={handleAddChapter} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Chapter Number"
                  value={newChapter.chapter_number}
                  onChange={e => setNewChapter({ ...newChapter, chapter_number: parseInt(e.target.value) })}
                  required
                />
                <Input
                  type="text"
                  label="Chapter Title"
                  value={newChapter.title}
                  onChange={e => setNewChapter({ ...newChapter, title: e.target.value })}
                  required
                />
                <Input
                  type="number"
                  label="Part Number (optional)"
                  value={newChapter.part_number || ''}
                  onChange={e => setNewChapter({ ...newChapter, part_number: e.target.value ? parseInt(e.target.value) : null })}
                />
                <Input
                  type="text"
                  label="Part Title (optional)"
                  value={newChapter.part_title}
                  onChange={e => setNewChapter({ ...newChapter, part_title: e.target.value })}
                />
              </div>
              <div className="flex space-x-4">
                <Button type="submit" variant="primary">
                  Add Chapter
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowAddChapter(false)}
                  variant="secondary"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Chapters List */}
        {Object.keys(chaptersByPart).length > 0 ? (
          <div className="space-y-8">
            {Object.entries(chaptersByPart).map(([partTitle, partChapters]) => (
              <Card key={partTitle} title={partTitle}>
                <div className="space-y-3">
                  {partChapters.map(chapter => (
                    <Link
                      key={chapter.id}
                      href={`/creator/book-compiler/${bookId}/chapters/${chapter.id}`}
                      className="block bg-white border border-backend-default rounded-lg p-4 hover:border-backend-hover transition-all duration-300 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-backend-primary mb-1">
                            Chapter {chapter.chapter_number}: {chapter.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-backend-secondary">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              chapter.status === 'complete'
                                ? 'bg-green-100 text-green-700'
                                : chapter.status === 'in_progress'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {chapter.status}
                            </span>
                            <span>{chapter.word_count.toLocaleString()} words</span>
                          </div>
                        </div>
                        <svg className="w-6 h-6 text-backend-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="text-center py-12">
              <p className="text-backend-secondary text-xl mb-4">No chapters yet</p>
              <Button
                onClick={() => setShowAddChapter(true)}
                variant="primary"
              >
                Add First Chapter
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
