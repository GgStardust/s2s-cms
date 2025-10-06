import { NextRequest, NextResponse } from 'next/server';
import { suggestEssaysForChapter } from '@/lib/ai/book-compiler';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { chapter_title, chapter_description, chapter_orb } = await request.json();

    if (!chapter_title) {
      return NextResponse.json(
        { error: 'Chapter title is required' },
        { status: 400 }
      );
    }

    // Get available essays from database
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data: files } = await supabase
      .from('content_files')
      .select('id, title, markdown_body, orb_associations')
      .neq('content_type', 'scrollstream_entry'); // Exclude scrollstreams

    if (!files) {
      return NextResponse.json({ suggestions: [] });
    }

    const essays = files.map(f => ({
      id: f.id,
      title: f.title,
      content: f.markdown_body || '',
      orb_associations: f.orb_associations || [],
    }));

    const suggestions = await suggestEssaysForChapter(
      chapter_title,
      chapter_description || `Chapter focuses on ${chapter_title}`,
      essays
    );

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Essay suggestion error:', error);
    return NextResponse.json(
      { error: 'Failed to suggest essays' },
      { status: 500 }
    );
  }
}
