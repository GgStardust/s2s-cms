import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { suggestBookContentMapping } from '@/lib/ai/book-content-mapper';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * POST /api/ai/map-book-content
 *
 * Analyzes all chapters in a book and suggests which content files
 * should be used for each chapter.
 */
export async function POST(request: NextRequest) {
  try {
    const { book_id } = await request.json();

    if (!book_id) {
      return NextResponse.json(
        { error: 'book_id is required' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get book details
    const { data: book, error: bookError } = await supabase
      .from('books')
      .select('*')
      .eq('id', book_id)
      .single();

    if (bookError || !book) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      );
    }

    // Get all chapters for this book
    const { data: chapters, error: chaptersError } = await supabase
      .from('chapters')
      .select('*')
      .eq('book_id', book_id)
      .order('chapter_number', { ascending: true });

    if (chaptersError) {
      return NextResponse.json(
        { error: chaptersError.message },
        { status: 500 }
      );
    }

    if (!chapters || chapters.length === 0) {
      return NextResponse.json(
        { error: 'No chapters found. Please create chapters first.' },
        { status: 400 }
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

    // Use AI to suggest content mappings
    const mapping = await suggestBookContentMapping(
      book.id,
      book.title,
      book.type,
      chapters,
      contentFiles || []
    );

    return NextResponse.json({ mapping });
  } catch (err: any) {
    console.error('Error in map-book-content:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to map content' },
      { status: 500 }
    );
  }
}
