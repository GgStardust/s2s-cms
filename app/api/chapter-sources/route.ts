import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const body = await request.json();
    const { chapter_id, file_ids } = body;

    if (!chapter_id || !file_ids || !Array.isArray(file_ids)) {
      return NextResponse.json({ error: 'Chapter ID and file IDs array are required' }, { status: 400 });
    }

    // Insert chapter sources into the chapter_sources table
    const sources = file_ids.map(file_id => ({
      chapter_id,
      source_file_id: file_id,
      source_type: 'essay',
      ai_suggested: false,
      user_confirmed: true,
      relevance_score: 1.0,
    }));

    const { error } = await supabase
      .from('chapter_sources')
      .insert(sources);

    if (error) {
      console.error('Error inserting chapter sources:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, added: file_ids.length });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
