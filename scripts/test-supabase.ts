#!/usr/bin/env tsx

/**
 * Test Supabase connection and check if data exists
 */

import dotenv from 'dotenv';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testConnection() {
  console.log('\n🔍 Testing Supabase Connection...\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing environment variables');
    console.log('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
    console.log('   SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✓' : '✗');
    process.exit(1);
  }

  console.log('✅ Environment variables found\n');

  // Create client
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  console.log('✅ Supabase client created\n');

  // Test query
  console.log('📊 Querying content_files table...\n');

  const { data, error, count } = await supabase
    .from('content_files')
    .select('*', { count: 'exact' })
    .limit(5);

  if (error) {
    console.error('❌ Query error:', error.message);
    console.error('   Code:', error.code);
    console.error('   Details:', error.details);
    console.error('   Hint:', error.hint);
  } else {
    console.log(`✅ Query successful!`);
    console.log(`   Total rows: ${count}`);
    console.log(`   Fetched: ${data?.length || 0}\n`);

    if (data && data.length > 0) {
      console.log('📄 Sample file:');
      console.log('   Title:', data[0].title);
      console.log('   Path:', data[0].file_path);
      console.log('   Type:', data[0].content_type);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

testConnection().catch(console.error);
