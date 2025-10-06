import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { batchEmbedAllFiles } from '@/lib/orbital/embeddings';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Initialize embeddings for all content files
 * WARNING: This is a one-time operation that will cost ~$1-2 for 75 files
 * Run this once after enabling pgvector
 */
export async function POST(request: NextRequest) {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const body = await request.json();
    const { confirm } = body;

    if (confirm !== 'yes-embed-all-files') {
      return NextResponse.json({
        error: 'Confirmation required. Send { "confirm": "yes-embed-all-files" } to proceed.',
        warning: 'This will cost approximately $1-2 in OpenAI credits for 75 files.',
      }, { status: 400 });
    }

    // Run batch embedding
    const results = await batchEmbedAllFiles(supabase);

    return NextResponse.json({
      success: true,
      message: 'Embeddings initialized successfully',
      results: {
        total: results.total,
        success: results.success,
        failed: results.failed,
      },
    });
  } catch (err: any) {
    console.error('Error initializing embeddings:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
