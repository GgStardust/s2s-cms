'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { applyOrbitalTemplate, contentTypeLabels, ContentType } from '@/lib/orbital/templates';
import { Button } from '@/components/backend/Button';
import { Card } from '@/components/backend/Card';
import { Input, Textarea } from '@/components/backend/Input';
import { PageHeader } from '@/components/backend/Layout';

export default function OrbitalPage() {
  const router = useRouter();

  const [contentType, setContentType] = useState<ContentType>('scrollstream_entry');
  const [inputMethod, setInputMethod] = useState<'paste' | 'upload'>('paste');
  const [rawInput, setRawInput] = useState('');
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [output, setOutput] = useState({ yaml: '', markdown: '', fullContent: '' });
  const [editedYaml, setEditedYaml] = useState('');
  const [editedMarkdown, setEditedMarkdown] = useState('');
  const [saving, setSaving] = useState(false);
  const [enableResearch, setEnableResearch] = useState(false);
  const [researchResults, setResearchResults] = useState<any>(null);

  async function handleProcess() {
    if (!rawInput.trim()) return;

    setProcessing(true);

    try {
      // Call real Orbital API
      const response = await fetch('/api/orbital/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: rawInput,
          contentType,
          enableResearch,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOutput(data.output);
        setEditedYaml(data.output.yaml);
        setEditedMarkdown(data.output.markdown);
        setResearchResults(data.research);
        setProcessed(true);
      } else {
        alert(data.error || 'Failed to process content');
      }
    } catch (err) {
      console.error('Error processing content:', err);
      alert('Failed to process content');
    } finally {
      setProcessing(false);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    setRawInput(text);
  }

  async function handleSave() {
    setSaving(true);

    try {
      const fullContent = `${editedYaml}\n${editedMarkdown}`;

      // Parse YAML to extract metadata
      const yamlLines = editedYaml.split('\n').filter(line => line.trim() && !line.includes('---'));
      const title = yamlLines.find(l => l.includes('title:'))?.split('title:')[1]?.trim().replace(/"/g, '') || 'Untitled';
      const type = yamlLines.find(l => l.includes('type:'))?.split('type:')[1]?.trim().replace(/"/g, '') || 'codex_entry';

      const response = await fetch('/api/content-files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content: fullContent,
          content_type: type,
          status: 'draft',
          orb_associations: [],
          tags: [],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/creator/library/${data.file.id}`);
      }
    } catch (err) {
      console.error('Error saving:', err);
      alert('Failed to save content');
    } finally {
      setSaving(false);
    }
  }

  function handleReset() {
    setRawInput('');
    setProcessed(false);
    setOutput({ yaml: '', markdown: '', fullContent: '' });
    setEditedYaml('');
    setEditedMarkdown('');
  }

  return (
    <div className="min-h-screen bg-backend-secondary">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/creator"
            className="text-backend-secondary hover:text-backend-primary mb-4 inline-block text-base"
          >
            ← Back to Creator Dashboard
          </Link>

          <PageHeader
            title="Orbital Content Processor"
            subtitle="Transform raw observations into structured Codex entries using Orbital templates"
          />
        </div>

        {!processed ? (
          /* Input Phase */
          <div className="space-y-6">
            {/* Content Type Selector */}
            <Card title="Content Type">
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value as ContentType)}
                className="w-full px-4 py-3 bg-white border border-backend-default rounded-md text-backend-primary text-base focus:outline-none focus:ring-2 focus:ring-backend-focus"
              >
                {Object.entries(contentTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </Card>

            {/* Input Method Toggle */}
            <Card title="Input Method">
              <div className="flex space-x-4 mb-6">
                <Button
                  onClick={() => setInputMethod('paste')}
                  variant={inputMethod === 'paste' ? 'primary' : 'secondary'}
                  fullWidth
                >
                  Paste Text
                </Button>
                <Button
                  onClick={() => setInputMethod('upload')}
                  variant={inputMethod === 'upload' ? 'primary' : 'secondary'}
                  fullWidth
                >
                  Upload File
                </Button>
              </div>

              {inputMethod === 'paste' ? (
                <Textarea
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                  placeholder="Paste your raw content here..."
                  rows={16}
                  className="font-mono"
                />
              ) : (
                <div>
                  <input
                    type="file"
                    accept=".txt,.md"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full h-48 px-4 py-3 bg-white border-2 border-dashed border-backend-default rounded-lg text-backend-muted cursor-pointer hover:border-backend-hover transition-colors"
                  >
                    {rawInput ? (
                      <div className="text-center">
                        <div className="text-backend-primary text-base mb-2">File loaded</div>
                        <div className="text-sm text-backend-secondary">{rawInput.substring(0, 100)}...</div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-lg mb-2">📄</div>
                        <div className="text-base">Click to upload .txt or .md file</div>
                      </div>
                    )}
                  </label>
                </div>
              )}
            </Card>

            {/* Research Toggle */}
            <Card>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableResearch}
                  onChange={(e) => setEnableResearch(e.target.checked)}
                  className="w-5 h-5 rounded border-backend-default bg-white text-backend-primary focus:ring-backend-focus focus:ring-offset-0"
                />
                <div>
                  <div className="text-backend-primary text-base font-medium">
                    Enable Internal Research
                  </div>
                  <div className="text-backend-secondary text-sm">
                    Search your 75 content files for related concepts (uses vector search)
                  </div>
                </div>
              </label>
            </Card>

            {/* Process Button */}
            <Button
              onClick={handleProcess}
              disabled={!rawInput.trim() || processing}
              variant="primary"
              fullWidth
              size="lg"
            >
              {processing ? 'Processing with Orbital...' : 'Process with Orbital'}
            </Button>
          </div>
        ) : (
          /* Preview & Edit Phase */
          <div className="space-y-6">
            {/* Research Results */}
            {researchResults && researchResults.internal.length > 0 && (
              <Card title="Internal Research Findings" className="bg-blue-50">
                <div className="space-y-4">
                  {researchResults.internal.map((result: any, idx: number) => (
                    <div key={idx} className="bg-white rounded-lg p-4 border border-backend-default">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-base font-semibold text-backend-primary">
                          {result.file_title}
                        </h4>
                        <span className="text-sm text-blue-600">
                          {Math.round(result.similarity * 100)}% match
                        </span>
                      </div>
                      <p className="text-sm text-backend-secondary mb-2">{result.excerpt}</p>
                      <div className="flex items-center space-x-4 text-xs">
                        {result.orb_associations.length > 0 && (
                          <span className="text-blue-600">
                            Orbs: {result.orb_associations.join(', ')}
                          </span>
                        )}
                        {result.tags.length > 0 && (
                          <span className="text-backend-muted">
                            Tags: {result.tags.slice(0, 3).join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Preview Panel */}
            <Card
              title="Processed Output"
              headerAction={
                <Button
                  onClick={handleReset}
                  variant="secondary"
                >
                  Start Over
                </Button>
              }
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* YAML Editor */}
                <div>
                  <label className="block text-backend-primary text-base font-medium mb-3">
                    YAML Frontmatter
                  </label>
                  <textarea
                    value={editedYaml}
                    onChange={(e) => setEditedYaml(e.target.value)}
                    className="w-full h-96 px-3 py-2 bg-white border border-backend-default rounded-md text-backend-primary text-sm resize-none focus:outline-none focus:ring-2 focus:ring-backend-focus font-mono"
                  />
                </div>

                {/* Markdown Editor */}
                <div>
                  <label className="block text-backend-primary text-base font-medium mb-3">
                    Markdown Content
                  </label>
                  <textarea
                    value={editedMarkdown}
                    onChange={(e) => setEditedMarkdown(e.target.value)}
                    className="w-full h-96 px-3 py-2 bg-white border border-backend-default rounded-md text-backend-primary text-sm resize-none focus:outline-none focus:ring-2 focus:ring-backend-focus font-mono"
                  />
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                onClick={handleSave}
                disabled={saving}
                variant="primary"
                fullWidth
                size="lg"
              >
                {saving ? 'Saving...' : 'Save to Content Library'}
              </Button>
              <Button
                onClick={() => {
                  const fullContent = `${editedYaml}\n${editedMarkdown}`;
                  navigator.clipboard.writeText(fullContent);
                  alert('Copied to clipboard!');
                }}
                variant="secondary"
                size="lg"
              >
                Copy to Clipboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
