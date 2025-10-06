import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { searchSimilarContent } from '@/lib/orbital/embeddings';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const body = await request.json();
    const {
      query,
      matchThreshold = 0.7,
      matchCount = 10,
    } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }

    // Perform semantic search
    const results = await searchSimilarContent(query, supabase, {
      matchThreshold,
      matchCount,
    });

    // Group by file and get full file data
    const fileIds = [...new Set(results.map(r => r.content_file_id))];

    const { data: files } = await supabase
      .from('content_files')
      .select('*')
      .in('id', fileIds);

    const fileMap = new Map(files?.map(f => [f.id, f]) || []);

    const enrichedResults = results.map(result => ({
      ...result,
      file: fileMap.get(result.content_file_id),
    }));

    return NextResponse.json({
      success: true,
      query,
      results: enrichedResults,
      count: enrichedResults.length,
    });
  } catch (err: any) {
    console.error('Error in semantic search:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
