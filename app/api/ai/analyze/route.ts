import { NextRequest, NextResponse } from 'next/server';
import { analyzeContent } from '@/lib/ai/content-analysis';

export async function POST(request: NextRequest) {
  try {
    const { content, title } = await request.json();

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const analysis = await analyzeContent(content, title);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('AI analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze content' },
      { status: 500 }
    );
  }
}
