import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const body = await request.json();
    const { book_id, format } = body;

    if (!book_id || !format) {
      return NextResponse.json({ error: 'Book ID and format are required' }, { status: 400 });
    }

    if (!['pdf', 'epub', 'docx'].includes(format)) {
      return NextResponse.json({ error: 'Invalid format. Must be pdf, epub, or docx' }, { status: 400 });
    }

    // Get book and chapters
    const { data: book, error: bookError } = await supabase
      .from('books')
      .select('*')
      .eq('id', book_id)
      .single();

    if (bookError || !book) {
      console.error('Error fetching book:', bookError);
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    const { data: chapters, error: chaptersError } = await supabase
      .from('chapters')
      .select('*')
      .eq('book_id', book_id)
      .order('chapter_number', { ascending: true });

    if (chaptersError) {
      console.error('Error fetching chapters:', chaptersError);
      return NextResponse.json({ error: 'Could not fetch chapters' }, { status: 500 });
    }

    // MOCK EXPORT - In production, this would use libraries like:
    // - PDF: jsPDF or pdfkit
    // - ePub: epub-gen
    // - DOCX: docx or officegen
    // TODO: Install and implement proper export libraries when ready

    // For now, create a simple text file with the book content
    let content = `${book.title}\n\n`;

    if (book.description) {
      content += `${book.description}\n\n`;
    }

    content += `${'='.repeat(50)}\n\n`;

    if (chapters && chapters.length > 0) {
      chapters.forEach((chapter: any) => {
        content += `Chapter ${chapter.chapter_number}: ${chapter.title}\n\n`;

        if (chapter.content) {
          content += `${chapter.content}\n\n`;
        } else {
          content += `[Chapter content not yet written]\n\n`;
        }

        content += `${'='.repeat(50)}\n\n`;
      });
    } else {
      content += '[No chapters created yet]\n';
    }

    // Create a blob with appropriate MIME type
    let mimeType = 'text/plain';
    let fileExtension = 'txt';

    switch (format) {
      case 'pdf':
        mimeType = 'application/pdf';
        fileExtension = 'txt'; // Would be 'pdf' with real implementation
        break;
      case 'epub':
        mimeType = 'application/epub+zip';
        fileExtension = 'txt'; // Would be 'epub' with real implementation
        break;
      case 'docx':
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        fileExtension = 'txt'; // Would be 'docx' with real implementation
        break;
    }

    // Add a note about mock export
    const mockNote = `\n\n[NOTE: This is a mock ${format.toUpperCase()} export. In production, this would be a properly formatted ${format.toUpperCase()} file.]\n`;
    content = mockNote + content;

    const blob = Buffer.from(content, 'utf-8');

    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${book.title.replace(/[^a-z0-9]/gi, '_')}.${fileExtension}"`,
      },
    });

  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
