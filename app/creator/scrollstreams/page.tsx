'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Button } from '@/components/backend/Button';
import { Card, CardGrid } from '@/components/backend/Card';
import { Input, Textarea } from '@/components/backend/Input';
import { PageHeader } from '@/components/backend/Layout';

interface Scrollstream {
  id: string;
  content: string;
  source_file_id: string;
  orb_associations: string[];
  tags: string[];
  status: string;
  created_at: string;
  published_to_instagram: boolean;
  published_to_linkedin: boolean;
}

export default function ScrollstreamsPage() {
  const [scrollstreams, setScrollstreams] = useState<Scrollstream[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterOrb, setFilterOrb] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Quick Capture State
  const [captureText, setCaptureText] = useState('');
  const [captureStatus, setCaptureStatus] = useState<'draft' | 'published' | 'scheduled'>('draft');
  const [captureOrbs, setCaptureOrbs] = useState<number[]>([]);
  const [captureTags, setCaptureTags] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState('');
  const [saving, setSaving] = useState(false);
  const [orbitalSuggestions, setOrbitalSuggestions] = useState<{orbs: number[], tags: string[]} | null>(null);
  const [gettingOrbitalSuggestions, setGettingOrbitalSuggestions] = useState(false);

  useEffect(() => {
    loadScrollstreams();
  }, []);

  async function loadScrollstreams() {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('scrollstreams')
      .select('*')
      .order('created_at', { ascending: false});

    if (error) {
      console.error('Error loading scrollstreams:', error);
    } else {
      setScrollstreams(data || []);
    }

    setLoading(false);
  }

  async function getOrbitalSuggestions() {
    if (!captureText.trim() || captureText.length < 10) return;

    setGettingOrbitalSuggestions(true);

    // Mock Orbital suggestions for now (will connect to OpenAI later)
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockSuggestions = {
      orbs: [1, 4, 12], // Mock Orb suggestions
      tags: ['sovereignty', 'coherence', 'embodiment'] // Mock tag suggestions
    };

    setOrbitalSuggestions(mockSuggestions);
    setGettingOrbitalSuggestions(false);
  }

  function applySuggestions() {
    if (!orbitalSuggestions) return;
    setCaptureOrbs(orbitalSuggestions.orbs);
    setCaptureTags(orbitalSuggestions.tags);
  }

  function toggleOrb(orb: number) {
    if (captureOrbs.includes(orb)) {
      setCaptureOrbs(captureOrbs.filter(o => o !== orb));
    } else {
      setCaptureOrbs([...captureOrbs, orb]);
    }
  }

  async function saveScrollstream() {
    if (!captureText.trim()) return;

    setSaving(true);

    try {
      const response = await fetch('/api/scrollstreams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: captureText,
          status: captureStatus,
          orb_associations: captureOrbs.map(String),
          tags: captureTags,
          schedule_date: scheduleDate || null,
        }),
      });

      if (response.ok) {
        // Reset form
        setCaptureText('');
        setCaptureStatus('draft');
        setCaptureOrbs([]);
        setCaptureTags([]);
        setScheduleDate('');
        setOrbitalSuggestions(null);

        // Reload scrollstreams
        await loadScrollstreams();
      }
    } catch (err) {
      console.error('Error saving scrollstream:', err);
    } finally {
      setSaving(false);
    }
  }

  const filteredScrollstreams = scrollstreams.filter(scroll => {
    const matchesSearch = scroll.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || scroll.status === filterStatus;
    const matchesOrb = !filterOrb || scroll.orb_associations.includes(String(filterOrb));

    return matchesSearch && matchesStatus && matchesOrb;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-backend-secondary flex items-center justify-center">
        <div className="text-backend-primary text-2xl">Loading scrollstreams...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-backend-secondary">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-backend-secondary hover:text-backend-primary mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <PageHeader
            title="Scrollstream Manager"
            subtitle={`${scrollstreams.length} scrollstreams extracted from content files`}
          />
        </div>

        {/* Quick Capture Form */}
        <Card title="Quick Capture" subtitle="Create a new scrollstream transmission (280 char max)" className="mb-8">
          {/* Text Input */}
          <Textarea
            value={captureText}
            onChange={(e) => setCaptureText(e.target.value)}
            placeholder="Every human body is an architecture of layers..."
            rows={4}
            className="font-mono"
          />

          <div className="flex justify-between items-center mt-2 mb-6">
            <span className={`text-sm ${captureText.length > 250 ? 'text-yellow-600' : 'text-backend-muted'}`}>
              {captureText.length} / 280 characters
            </span>
            <Button
              onClick={getOrbitalSuggestions}
              disabled={!captureText.trim() || captureText.length < 10 || gettingOrbitalSuggestions}
              variant="secondary"
              size="sm"
            >
              {gettingOrbitalSuggestions ? 'Getting suggestions...' : 'Get Orbital Suggestions'}
            </Button>
          </div>

          {/* Orbital Suggestions Panel */}
          {orbitalSuggestions && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-backend-primary font-semibold">Orbital Suggestions</h3>
                <Button
                  onClick={applySuggestions}
                  variant="secondary"
                  size="sm"
                >
                  Apply All
                </Button>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-backend-secondary text-sm">Suggested Orbs: </span>
                  <span className="text-blue-700 text-sm">{orbitalSuggestions.orbs.join(', ')}</span>
                </div>
                <div>
                  <span className="text-backend-secondary text-sm">Suggested Tags: </span>
                  <span className="text-blue-700 text-sm">{orbitalSuggestions.tags.join(', ')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Orb Selection */}
          <div className="mb-6">
            <label className="block text-backend-primary text-sm font-medium mb-3">Orb Associations</label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(orb => (
                <button
                  key={orb}
                  onClick={() => toggleOrb(orb)}
                  className={`w-10 h-10 rounded-full border-2 font-bold text-sm transition-all ${
                    captureOrbs.includes(orb)
                      ? 'bg-backend-primary border-backend-primary text-white'
                      : 'bg-white border-backend-default text-backend-primary hover:border-backend-hover'
                  }`}
                >
                  {orb}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Input */}
          <div className="mb-6">
            <Input
              label="Tags (comma-separated)"
              value={captureTags.join(', ')}
              onChange={(e) => setCaptureTags(e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
              placeholder="sovereignty, coherence, embodiment"
            />
          </div>

          {/* Status and Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-backend-primary mb-1.5">Status</label>
              <select
                value={captureStatus}
                onChange={(e) => setCaptureStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-backend-default rounded-md text-backend-primary focus:outline-none focus:ring-2 focus:ring-backend-focus"
              >
                <option value="draft">Draft</option>
                <option value="published">Publish Now</option>
                <option value="scheduled">Schedule</option>
              </select>
            </div>

            {captureStatus === 'scheduled' && (
              <div>
                <label className="block text-sm font-medium text-backend-primary mb-1.5">Schedule Date</label>
                <input
                  type="datetime-local"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-backend-default rounded-md text-backend-primary focus:outline-none focus:ring-2 focus:ring-backend-focus"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button
              onClick={saveScrollstream}
              disabled={!captureText.trim() || saving}
              variant="primary"
              fullWidth
            >
              {saving ? 'Saving...' : captureStatus === 'published' ? 'Publish Now' : captureStatus === 'scheduled' ? 'Schedule' : 'Save Draft'}
            </Button>
            <Button
              onClick={() => {
                setCaptureText('');
                setCaptureOrbs([]);
                setCaptureTags([]);
                setScheduleDate('');
                setOrbitalSuggestions(null);
              }}
              variant="secondary"
            >
              Clear
            </Button>
          </div>
        </Card>

        {/* Filters */}
        <Card title="Filters" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <Input
              label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scrollstream content..."
            />

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-backend-primary mb-1.5">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-backend-default rounded-md text-backend-primary focus:outline-none focus:ring-2 focus:ring-backend-focus"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>

            {/* Orb Filter */}
            <div>
              <label className="block text-sm font-medium text-backend-primary mb-1.5">Orb Association</label>
              <select
                value={filterOrb || ''}
                onChange={(e) => setFilterOrb(e.target.value ? Number(e.target.value) : null)}
                className="w-full px-3 py-2 bg-white border border-backend-default rounded-md text-backend-primary focus:outline-none focus:ring-2 focus:ring-backend-focus"
              >
                <option value="">All Orbs</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(orb => (
                  <option key={orb} value={orb}>Orb {orb}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-6 text-backend-secondary">
          Showing {filteredScrollstreams.length} of {scrollstreams.length} scrollstreams
        </div>

        {/* Scrollstream Grid */}
        <CardGrid columns={3}>
          {filteredScrollstreams.map(scroll => (
            <Card key={scroll.id} className="hover:shadow-lg transition-shadow">
              {/* Content Preview */}
              <div className="mb-4">
                <p className="text-backend-primary text-sm leading-relaxed line-clamp-4">
                  {scroll.content}
                </p>
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    scroll.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : scroll.status === 'scheduled'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {scroll.status}
                  </span>

                  {scroll.orb_associations && scroll.orb_associations.length > 0 && (
                    <span className="text-backend-secondary text-xs">
                      Orbs: {scroll.orb_associations.join(', ')}
                    </span>
                  )}
                </div>
              </div>

              {/* Social Media Status */}
              <div className="flex items-center space-x-2 mb-4">
                {scroll.published_to_instagram && (
                  <span className="px-2 py-1 rounded bg-pink-100 text-pink-700 text-xs">
                    Instagram
                  </span>
                )}
                {scroll.published_to_linkedin && (
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">
                    LinkedIn
                  </span>
                )}
                {!scroll.published_to_instagram && !scroll.published_to_linkedin && (
                  <span className="text-backend-muted text-xs">Not published</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button variant="secondary" size="sm" fullWidth>
                  View
                </Button>
                <Button variant="primary" size="sm" fullWidth>
                  Publish
                </Button>
              </div>
            </Card>
          ))}
        </CardGrid>

        {filteredScrollstreams.length === 0 && (
          <div className="text-center py-20">
            <p className="text-backend-secondary text-xl">No scrollstreams match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
