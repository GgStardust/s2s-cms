import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// GET /api/chapters/:id - Get single chapter with sources
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get chapter
    const { data: chapter, error: chapterError } = await supabase
      .from('chapters')
      .select('*')
      .eq('id', params.id)
      .single();

    if (chapterError) {
      return NextResponse.json({ error: chapterError.message }, { status: 500 });
    }

    if (!chapter) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
    }

    // Get chapter sources with content file details
    const { data: sources, error: sourcesError } = await supabase
      .from('chapter_sources')
      .select(`
        *,
        content_files (
          id,
          title,
          file_path,
          content_type,
          orb_associations,
          tags
        )
      `)
      .eq('chapter_id', params.id)
      .order('created_at', { ascending: true });

    if (sourcesError) {
      return NextResponse.json({ error: sourcesError.message }, { status: 500 });
    }

    return NextResponse.json({ chapter, sources: sources || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/chapters/:id - Update chapter
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body = await request.json();

    const {
      chapter_number,
      title,
      part_number,
      part_title,
      status,
      content,
      notes,
      word_count,
    } = body;

    const { data: chapter, error } = await supabase
      .from('chapters')
      .update({
        chapter_number,
        title,
        part_number,
        part_title,
        status,
        content,
        notes,
        word_count,
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ chapter });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/chapters/:id - Delete chapter
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error } = await supabase
      .from('chapters')
      .delete()
      .eq('id', params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
