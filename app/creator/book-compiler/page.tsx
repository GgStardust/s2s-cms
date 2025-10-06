'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Card, CardGrid, PageHeader, EmptyState } from '@/components/backend';

interface Book {
  id: string;
  title: string;
  type: 'non_fiction' | 'fiction';
  status: string;
  description: string;
  current_word_count: number;
  target_word_count: number;
}

export default function BookCompilerPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      const response = await fetch('/api/books');
      const data = await response.json();
      setBooks(data.books || []);
    } catch (err) {
      console.error('Error loading books:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-backend-secondary flex items-center justify-center">
        <div className="text-backend-primary text-lg">Loading Book Compiler...</div>
      </div>
    );
  }

  const nonFictionBooks = books.filter(b => b.type === 'non_fiction');
  const fictionBooks = books.filter(b => b.type === 'fiction');

  return (
    <div className="min-h-screen bg-backend-secondary">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <PageHeader
          title="Book Compiler"
          subtitle="Intelligent book compilation system for both non-fiction and fiction projects"
        />

        {/* Dual Mode Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Non-Fiction Mode */}
          <Card
            title="Non-Fiction"
            subtitle="Stardust to Sovereignty & Consciousness Technology"
          >
            {nonFictionBooks.length > 0 ? (
              <div className="space-y-3">
                {nonFictionBooks.map(book => (
                  <Link
                    key={book.id}
                    href={`/creator/book-compiler/${book.id}`}
                    className="block bg-backend-secondary rounded-lg p-4 border border-backend-default hover:border-backend-hover transition-all"
                  >
                    <h3 className="text-base font-semibold text-backend-primary mb-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-backend-secondary mb-3">
                      {book.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        book.status === 'complete'
                          ? 'bg-green-100 text-green-700'
                          : book.status === 'in_progress'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {book.status.replace('_', ' ')}
                      </span>
                      {book.target_word_count > 0 && (
                        <span className="text-backend-muted text-xs">
                          {book.current_word_count.toLocaleString()} / {book.target_word_count.toLocaleString()} words
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No non-fiction books yet"
                description="Create your first non-fiction book to get started"
              />
            )}
          </Card>

          {/* Fiction Mode */}
          <Card
            title="Fiction"
            subtitle="Future Primitive: Field Reports from Sausalito"
          >
            {fictionBooks.length > 0 ? (
              <div className="space-y-3">
                {fictionBooks.map(book => (
                  <Link
                    key={book.id}
                    href={`/creator/book-compiler/${book.id}`}
                    className="block bg-backend-secondary rounded-lg p-4 border border-backend-default hover:border-backend-hover transition-all"
                  >
                    <h3 className="text-base font-semibold text-backend-primary mb-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-backend-secondary mb-3">
                      {book.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        book.status === 'complete'
                          ? 'bg-green-100 text-green-700'
                          : book.status === 'in_progress'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {book.status.replace('_', ' ')}
                      </span>
                      {book.target_word_count > 0 && (
                        <span className="text-backend-muted text-xs">
                          {book.current_word_count.toLocaleString()} / {book.target_word_count.toLocaleString()} words
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No fiction books yet"
                description="Create your first fiction book to get started"
              />
            )}
          </Card>
        </div>

        {/* Quick Actions */}
        <Card title="Quick Actions">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Link href="/creator/fiction-resources">
              <Button variant="secondary" fullWidth>
                Fiction Resources
              </Button>
            </Link>
            <Link href="/creator/book-compiler/real-world-content">
              <Button variant="secondary" fullWidth>
                Add Real-World Content
              </Button>
            </Link>
            <Link href="/creator/library">
              <Button variant="secondary" fullWidth>
                Browse Content Library
              </Button>
            </Link>
            <Link href="/creator/scrollstreams">
              <Button variant="secondary" fullWidth>
                View Scrollstreams
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
