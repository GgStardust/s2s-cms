import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const body = await request.json();
    const { chapter_id } = body;

    if (!chapter_id) {
      return NextResponse.json({ error: 'Chapter ID is required' }, { status: 400 });
    }

    // Get chapter and its sources
    const { data: chapter, error: chapterError } = await supabase
      .from('chapters')
      .select('*, assigned_files')
      .eq('id', chapter_id)
      .single();

    if (chapterError || !chapter) {
      console.error('Error fetching chapter:', chapterError);
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
    }

    // Get assigned files content
    const assignedFileIds = chapter.assigned_files || [];

    if (assignedFileIds.length === 0) {
      return NextResponse.json({ error: 'No files assigned to this chapter' }, { status: 400 });
    }

    const { data: files, error: filesError } = await supabase
      .from('content_files')
      .select('id, title, content, orb_associations, tags')
      .in('id', assignedFileIds);

    if (filesError || !files || files.length === 0) {
      console.error('Error fetching files:', filesError);
      return NextResponse.json({ error: 'Could not fetch assigned files' }, { status: 500 });
    }

    // MOCK AI MERGE - In production, this would call OpenAI GPT-4o
    // TODO: Replace with actual OpenAI API call when ready to connect
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create mock merged content
    let mergedContent = `# Chapter ${chapter.chapter_number}: ${chapter.title}\n\n`;

    files.forEach((file: any, index: number) => {
      // Add the essay content
      mergedContent += `${file.content}\n\n`;

      // Add mock transition between essays (except after last one)
      if (index < files.length - 1) {
        mergedContent += `---\n\n*[Transition: These insights naturally lead us to explore ${files[index + 1].title}...]*\n\n`;
      }
    });

    // Calculate word count
    const wordCount = mergedContent.trim().split(/\s+/).length;
    const transitionsAdded = files.length - 1;

    // Update chapter with merged content
    const { error: updateError } = await supabase
      .from('chapters')
      .update({
        content: mergedContent,
        word_count: wordCount,
        status: 'draft'
      })
      .eq('id', chapter_id);

    if (updateError) {
      console.error('Error updating chapter:', updateError);
      return NextResponse.json({ error: 'Failed to update chapter' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      merged: {
        chapter_id,
        files_merged: files.length,
        word_count: wordCount,
        transitions_added: transitionsAdded
      }
    });

  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
