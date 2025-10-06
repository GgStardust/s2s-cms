import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Perform AI-powered content health analysis
 */
export async function POST(request: NextRequest) {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // Get all content files
    const { data: files, error: filesError } = await supabase
      .from('content_files')
      .select('*');

    if (filesError || !files) {
      return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
    }

    // Calculate basic metrics
    const metrics = {
      totalFiles: files.length,
      byType: {} as Record<string, number>,
      byOrb: {} as Record<string, number>,
      totalTags: new Set<string>(),
      totalWordCount: 0,
      scrollstreamCount: 0,
    };

    files.forEach((file: any) => {
      // Count by type
      metrics.byType[file.content_type] = (metrics.byType[file.content_type] || 0) + 1;

      // Count by Orb
      if (file.orb_associations) {
        file.orb_associations.forEach((orb: number) => {
          metrics.byOrb[`Orb ${orb}`] = (metrics.byOrb[`Orb ${orb}`] || 0) + 1;
        });
      }

      // Collect tags
      if (file.tags) {
        file.tags.forEach((tag: string) => metrics.totalTags.add(tag));
      }

      // Sum word count
      metrics.totalWordCount += file.word_count || 0;
    });

    // Get scrollstream count
    const { count: scrollCount } = await supabase
      .from('scrollstreams')
      .select('*', { count: 'exact', head: true });

    metrics.scrollstreamCount = scrollCount || 0;

    // AI Analysis: Identify gaps and opportunities
    const systemPrompt = `You are analyzing the S2S Codex for content health.

Codex has ${metrics.totalFiles} files across ${Object.keys(metrics.byType).length} content types.

Orb distribution:
${Object.entries(metrics.byOrb).map(([orb, count]) => `- ${orb}: ${count} files`).join('\n')}

Content types:
${Object.entries(metrics.byType).map(([type, count]) => `- ${type}: ${count} files`).join('\n')}

Total tags used: ${metrics.totalTags.size}
Total word count: ${metrics.totalWordCount.toLocaleString()}
Scrollstreams: ${metrics.scrollstreamCount}

Analyze this codex and provide:
1. **Coverage Gaps**: Which Orbs need more content? Which are well-covered?
2. **Balance Issues**: Is content distribution healthy across types?
3. **Opportunities**: What content should be created next?
4. **Strengths**: What's working well?
5. **Recommendations**: 3-5 specific actionable suggestions

Format as markdown with clear sections.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.7,
      messages: [{ role: 'system', content: systemPrompt }],
    });

    const aiAnalysis = response.choices[0]?.message?.content || '';

    return NextResponse.json({
      success: true,
      metrics: {
        ...metrics,
        totalTags: metrics.totalTags.size,
        avgWordsPerFile: Math.round(metrics.totalWordCount / metrics.totalFiles),
      },
      aiAnalysis,
    });
  } catch (err: any) {
    console.error('Error performing health check:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
