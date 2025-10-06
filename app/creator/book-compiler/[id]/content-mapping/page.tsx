'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface ContentFile {
  id: string;
  title: string;
  type: string;
  orb_associations: number[];
  tags: string[];
  word_count?: number;
}

interface ChapterMapping {
  chapter_id: string;
  chapter_number: number;
  chapter_title: string;
  suggested_files: {
    file: ContentFile;
    relevance_score: number;
    reasoning: string;
  }[];
}

export default function ContentMappingPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.id as string;

  const [mapping, setMapping] = useState<ChapterMapping[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<{ [chapterId: string]: string[] }>({});
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    loadMapping();
  }, []);

  function loadMapping() {
    const storedMapping = sessionStorage.getItem('content_mapping');
    if (storedMapping) {
      const parsedMapping = JSON.parse(storedMapping);
      setMapping(parsedMapping);

      // Pre-select top 2 suggestions per chapter
      const initialSelection: { [chapterId: string]: string[] } = {};
      parsedMapping.forEach((chapter: ChapterMapping) => {
        initialSelection[chapter.chapter_id] = chapter.suggested_files
          .slice(0, 2)
          .map((s: any) => s.file.id);
      });
      setSelectedFiles(initialSelection);
    }
    setLoading(false);
  }

  function toggleFileSelection(chapterId: string, fileId: string) {
    setSelectedFiles(prev => {
      const current = prev[chapterId] || [];
      const isSelected = current.includes(fileId);

      return {
        ...prev,
        [chapterId]: isSelected
          ? current.filter(id => id !== fileId)
          : [...current, fileId]
      };
    });
  }

  async function assignSelectedFiles() {
    setAssigning(true);

    try {
      const assignments = Object.entries(selectedFiles).map(([chapterId, fileIds]) => ({
        chapter_id: chapterId,
        file_ids: fileIds
      }));

      const response = await fetch('/api/chapters/assign-files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignments }),
      });

      if (response.ok) {
        sessionStorage.removeItem('content_mapping');
        router.push(`/creator/book-compiler/${bookId}`);
      }
    } catch (err) {
      console.error('Error assigning files:', err);
    } finally {
      setAssigning(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-navy flex items-center justify-center">
        <div className="text-creamy-white text-2xl">Loading content mapping...</div>
      </div>
    );
  }

  const totalSelected = Object.values(selectedFiles).flat().length;

  return (
    <div className="min-h-screen bg-deep-navy">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link
            href={`/creator/book-compiler/${bookId}`}
            className="text-deep-gold hover:text-creamy-white mb-4 inline-block"
          >
            ← Back to Book
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-creamy-white mb-4">
                Orbital Content Mapping
              </h1>
              <p className="text-creamy-white/60 text-lg">
                Review and select which essays to include in each chapter
              </p>
            </div>

            <button
              onClick={assignSelectedFiles}
              disabled={totalSelected === 0 || assigning}
              className="px-6 py-3 bg-cosmic-blue border border-cosmic-blue rounded-lg text-white hover:bg-cosmic-blue/80 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {assigning ? 'Assigning...' : `Assign ${totalSelected} Files`}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {mapping.map((chapter) => (
            <div
              key={chapter.chapter_id}
              className="bg-deep-navy/60 backdrop-blur-sm rounded-2xl p-6 border border-deep-gold/30"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-creamy-white mb-2">
                  Chapter {chapter.chapter_number}: {chapter.chapter_title}
                </h2>
                <p className="text-creamy-white/60 text-sm">
                  {chapter.suggested_files.length} suggested essays
                </p>
              </div>

              <div className="space-y-4">
                {chapter.suggested_files.map((suggestion) => {
                  const isSelected = selectedFiles[chapter.chapter_id]?.includes(suggestion.file.id);

                  return (
                    <div
                      key={suggestion.file.id}
                      onClick={() => toggleFileSelection(chapter.chapter_id, suggestion.file.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-cosmic-blue/20 border-cosmic-blue'
                          : 'bg-deep-navy/40 border-deep-gold/20 hover:border-deep-gold/40'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-creamy-white">
                              {suggestion.file.title}
                            </h3>
                            <span className="text-xs px-2 py-1 rounded-full bg-deep-gold/20 text-deep-gold">
                              {suggestion.file.type}
                            </span>
                            <span className="text-xs text-creamy-white/60">
                              {Math.round(suggestion.relevance_score * 100)}% match
                            </span>
                          </div>
                          <p className="text-creamy-white/60 text-sm mb-2">
                            {suggestion.reasoning}
                          </p>
                        </div>

                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          isSelected
                            ? 'bg-cosmic-blue border-cosmic-blue'
                            : 'border-creamy-white/30'
                        }`}>
                          {isSelected && (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-xs">
                        {suggestion.file.orb_associations.length > 0 && (
                          <span className="text-cosmic-blue">
                            Orbs: {suggestion.file.orb_associations.join(', ')}
                          </span>
                        )}
                        {suggestion.file.word_count && (
                          <span className="text-creamy-white/40">
                            {suggestion.file.word_count.toLocaleString()} words
                          </span>
                        )}
                        {suggestion.file.tags.length > 0 && (
                          <span className="text-creamy-white/40">
                            Tags: {suggestion.file.tags.slice(0, 3).join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
