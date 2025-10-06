import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { ContentType } from '@/lib/orbital/templates';
import { buildOrbitalPrompt } from '@/lib/orbital/system-prompt';
import { performFullResearch } from '@/lib/orbital/research';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const body = await request.json();
    const {
      text,
      contentType,
      enableResearch = false,
    }: {
      text: string;
      contentType: ContentType;
      enableResearch?: boolean;
    } = body;

    if (!text || !contentType) {
      return NextResponse.json(
        { error: 'Text and contentType are required' },
        { status: 400 }
      );
    }

    let researchResults = null;
    let researchSynthesis = '';

    // Perform research if enabled
    if (enableResearch) {
      try {
        researchResults = await performFullResearch(
          text,
          supabase,
          contentType
        );
        researchSynthesis = researchResults.synthesis;
      } catch (err) {
        console.error('Error performing research:', err);
        // Continue without research if it fails
      }
    }

    // Build system prompt with research context
    const systemPrompt = buildOrbitalPrompt(contentType, researchSynthesis);

    // Call OpenAI GPT-4o
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.7,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Process the following content:\n\n${text}`,
        },
      ],
    });

    const processedContent = response.choices[0]?.message?.content || '';

    // Parse YAML frontmatter and extract metadata
    const yamlMatch = processedContent.match(/^---\n([\s\S]*?)\n---/);
    let yaml = '';
    let markdown = processedContent;

    if (yamlMatch) {
      yaml = yamlMatch[0];
      markdown = processedContent.substring(yamlMatch[0].length).trim();
    }

    return NextResponse.json({
      success: true,
      output: {
        yaml,
        markdown,
        fullContent: processedContent,
      },
      research: researchResults
        ? {
            internal: researchResults.internal,
            external: researchResults.external,
            synthesis: researchResults.synthesis,
          }
        : null,
    });
  } catch (err: any) {
    console.error('Error processing with Orbital:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
