'use client';

import Link from 'next/link';
import { Button, Card, CardGrid, PageHeader } from '@/components/backend';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-backend-secondary">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-backend-primary mb-4">
            Stardust to Sovereignty
          </h1>
          <p className="text-xl text-deep-gold mb-2">
            A Cosmological Framework for Consciousness Evolution
          </p>
          <p className="text-sm text-backend-muted">
            Backend Dashboard · Content Management System
          </p>
        </div>

        <CardGrid columns={2} className="mb-6">
          <Link href="/creator/library">
            <Card className="hover:border-backend-hover transition-all cursor-pointer h-full">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-backend-primary mb-2">
                  Content Library
                </h3>
                <p className="text-backend-muted text-sm">
                  Manage and organize your content files
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/creator/book-compiler">
            <Card className="hover:border-backend-hover transition-all cursor-pointer h-full">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-backend-primary mb-2">
                  Book Compiler
                </h3>
                <p className="text-backend-muted text-sm">
                  Compile and structure your books
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/creator/scrollstreams">
            <Card className="hover:border-backend-hover transition-all cursor-pointer h-full">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-backend-primary mb-2">
                  Scrollstream Manager
                </h3>
                <p className="text-backend-muted text-sm">
                  Manage scrollstreams and insights
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/creator/orbital">
            <Card className="hover:border-backend-hover transition-all cursor-pointer h-full">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-backend-primary mb-2">
                  Orbital Processor
                </h3>
                <p className="text-backend-muted text-sm">
                  Process and analyze content
                </p>
              </div>
            </Card>
          </Link>
        </CardGrid>

        <Card className="mb-6">
          <h3 className="text-base font-semibold text-backend-primary mb-4">
            Advanced Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Link href="/creator/knowledge-graph">
              <Button variant="secondary" fullWidth>
                Knowledge Graph
              </Button>
            </Link>

            <Link href="/creator/health">
              <Button variant="secondary" fullWidth>
                Health Dashboard
              </Button>
            </Link>

            <Link href="/creator/embeddings">
              <Button variant="ghost" fullWidth>
                Initialize Embeddings
              </Button>
            </Link>
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-backend-primary mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link href="/creator/fiction-resources">
              <Button variant="secondary" fullWidth>
                Fiction Resources
              </Button>
            </Link>

            <Link href="/creator/book-compiler/real-world-content">
              <Button variant="secondary" fullWidth>
                Real-World Content
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
