import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// POST /api/chapters - Create new chapter
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body = await request.json();

    const {
      book_id,
      chapter_number,
      title,
      part_number,
      part_title,
      status,
      content,
      notes,
    } = body;

    if (!book_id || !chapter_number || !title) {
      return NextResponse.json(
        { error: 'book_id, chapter_number, and title are required' },
        { status: 400 }
      );
    }

    const { data: chapter, error } = await supabase
      .from('chapters')
      .insert({
        book_id,
        chapter_number,
        title,
        part_number,
        part_title,
        status: status || 'outline',
        content,
        notes,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ chapter }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
