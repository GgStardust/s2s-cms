import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { suggestChapterContent } from '@/lib/ai/book-content-mapper';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * POST /api/ai/suggest-chapter-sources
 *
 * Suggests relevant content files for a specific chapter.
 */
export async function POST(request: NextRequest) {
  try {
    const { chapter_id } = await request.json();

    if (!chapter_id) {
      return NextResponse.json(
        { error: 'chapter_id is required' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get chapter details
    const { data: chapter, error: chapterError } = await supabase
      .from('chapters')
      .select('*, books(*)')
      .eq('id', chapter_id)
      .single();

    if (chapterError || !chapter) {
      return NextResponse.json(
        { error: 'Chapter not found' },
        { status: 404 }
      );
    }

    // Get all available content files
    const { data: contentFiles, error: contentError } = await supabase
      .from('content_files')
      .select('id, title, file_path, content_type, markdown_body, orb_associations, tags');

    if (contentError) {
      return NextResponse.json(
        { error: contentError.message },
        { status: 500 }
      );
    }

    // Use AI to suggest content
    const suggestions = await suggestChapterContent(
      chapter.title,
      chapter.notes || '',
      chapter.chapter_number,
      chapter.books.type,
      contentFiles || []
    );

    return NextResponse.json({ suggestions });
  } catch (err: any) {
    console.error('Error in suggest-chapter-sources:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to suggest sources' },
      { status: 500 }
    );
  }
}
