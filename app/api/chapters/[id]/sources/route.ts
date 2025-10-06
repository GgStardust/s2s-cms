import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// POST /api/chapters/:id/sources - Add source to chapter
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body = await request.json();

    const {
      source_file_id,
      source_type,
      source_content,
      relevance_score,
      ai_suggested,
      user_confirmed,
      integration_notes,
    } = body;

    if (!source_file_id) {
      return NextResponse.json(
        { error: 'source_file_id is required' },
        { status: 400 }
      );
    }

    const { data: source, error } = await supabase
      .from('chapter_sources')
      .insert({
        chapter_id: params.id,
        source_file_id,
        source_type,
        source_content,
        relevance_score,
        ai_suggested: ai_suggested || false,
        user_confirmed: user_confirmed || false,
        integration_notes,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ source }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/chapters/:id/sources?source_id=xxx - Remove source from chapter
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const searchParams = request.nextUrl.searchParams;
    const sourceId = searchParams.get('source_id');

    if (!sourceId) {
      return NextResponse.json(
        { error: 'source_id query parameter is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('chapter_sources')
      .delete()
      .eq('id', sourceId)
      .eq('chapter_id', params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
