# S2S Dashboard Setup Guide

## **Step 1: Supabase Setup**

### 1.1 Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Name it "s2s-dashboard"
5. Set a strong database password (save this!)
6. Choose region closest to you
7. Wait for project to finish setting up (~2 minutes)

### 1.2 Get API Keys
1. In your Supabase project dashboard, go to **Settings → API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)
   - **service_role** key (long string, keep this secret!)

### 1.3 Configure Environment Variables
1. Create a file called `.env.local` in the project root (copy from `.env.local.example`)
2. Add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://ydnvnfmbbcmcbmxtbrtb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkbnZuZm1iYmNtY2JteHRicnRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MTQ1ODUsImV4cCI6MjA3NTE5MDU4NX0.5Eb5SPaJga0-3fiKQ-an6PFepwjcpX4aXoWs8Zy3Uqk
SUPABASE_SERVICE_ROLE_KEY=eyJxxxx...
```

---

## **Step 2: Database Schema Setup**

### 2.1 Run SQL in Supabase Dashboard

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the schema below
4. Click "Run"

```sql
-- Enable pgvector extension for AI embeddings
create extension if not exists vector;

-- Content files table
create table content_files (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Basic metadata
  title text not null,
  file_path text not null unique,
  content_type text not null, -- 'codex_core', 'book_fragment', 'scrollstream_entry', etc.
  status text not null default 'draft', -- 'draft', 'published', 'archived'

  -- Content
  markdown_body text not null,
  yaml_frontmatter jsonb,

  -- Orb associations
  orb_associations text[],

  -- Tags and metadata
  tags text[],
  resonance_rating integer default 5,
  resonance_metrics jsonb,

  -- System integration
  dashboard_component text,
  codex_destination text,
  book_threading text,
  is_primary_source boolean default true,
  related_to text[],

  -- AI embeddings for semantic search
  embedding vector(1536)
);

-- Scrollstream entries (extracted from content or standalone)
create table scrollstreams (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Content
  content text not null,
  source_file_id uuid references content_files(id) on delete cascade,

  -- Associations
  orb_associations text[],
  tags text[],

  -- Publishing
  status text not null default 'draft', -- 'draft', 'published', 'scheduled'
  publish_at timestamp with time zone,

  -- Social media
  published_to_instagram boolean default false,
  published_to_linkedin boolean default false,
  instagram_post_id text,
  linkedin_post_id text,

  -- Engagement metrics
  views integer default 0,
  saves integer default 0,
  shares integer default 0,

  -- AI embeddings
  embedding vector(1536)
);

-- Book chapters (compiled from essays)
create table book_chapters (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Book info
  book_title text not null, -- 'Stardust to Sovereignty' or fiction title
  part_number integer,
  part_title text,
  chapter_number integer not null,
  chapter_title text not null,

  -- Content
  chapter_content text,
  source_file_ids uuid[], -- Which essays contributed to this chapter

  -- Status
  status text not null default 'outline', -- 'outline', 'draft', 'complete'
  word_count integer
);

-- Social media queue (scheduled posts)
create table social_media_queue (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Content
  content text not null,
  image_url text,
  source_scroll_id uuid references scrollstreams(id),
  source_file_id uuid references content_files(id),

  -- Publishing details
  platforms text[], -- ['instagram', 'linkedin']
  scheduled_for timestamp with time zone not null,
  status text not null default 'scheduled', -- 'scheduled', 'published', 'failed'

  -- Post IDs after publishing
  instagram_post_id text,
  linkedin_post_id text,

  -- Results
  published_at timestamp with time zone,
  error_message text
);

-- User sessions (for Creator Mode - just Gigi for now)
create table user_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_activity timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for performance
create index content_files_file_path_idx on content_files(file_path);
create index content_files_status_idx on content_files(status);
create index content_files_orbs_idx on content_files using gin(orb_associations);
create index content_files_tags_idx on content_files using gin(tags);
create index content_files_embedding_idx on content_files using ivfflat (embedding vector_cosine_ops);

create index scrollstreams_status_idx on scrollstreams(status);
create index scrollstreams_publish_at_idx on scrollstreams(publish_at);
create index scrollstreams_orbs_idx on scrollstreams using gin(orb_associations);
create index scrollstreams_embedding_idx on scrollstreams using ivfflat (embedding vector_cosine_ops);

create index social_media_queue_scheduled_idx on social_media_queue(scheduled_for);
create index social_media_queue_status_idx on social_media_queue(status);

-- Row Level Security (RLS) policies
-- For now, allow authenticated users (Gigi) to do everything
alter table content_files enable row level security;
alter table scrollstreams enable row level security;
alter table book_chapters enable row level security;
alter table social_media_queue enable row level security;

-- Policies: Allow all operations for authenticated users
create policy "Allow all for authenticated users" on content_files
  for all using (auth.role() = 'authenticated');

create policy "Allow all for authenticated users" on scrollstreams
  for all using (auth.role() = 'authenticated');

create policy "Allow all for authenticated users" on book_chapters
  for all using (auth.role() = 'authenticated');

create policy "Allow all for authenticated users" on social_media_queue
  for all using (auth.role() = 'authenticated');

-- Functions
-- Update updated_at timestamp automatically
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_content_files_updated_at before update on content_files
  for each row execute procedure update_updated_at_column();

create trigger update_book_chapters_updated_at before update on book_chapters
  for each row execute procedure update_updated_at_column();
```

---

## **Step 3: OpenAI API Setup**

### 3.1 Get OpenAI API Key
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in or create account
3. Click "Create new secret key"
4. Name it "S2S Dashboard"
5. Copy the key (starts with `sk-...`)

### 3.2 Add to Environment Variables
Add to your `.env.local` file:
```
OPENAI_API_KEY=sk-xxxxx...
```

---

## **Step 4: Social Media Setup (Optional - Can Do Later)**

### 4.1 Buffer API
1. Go to [https://publish.buffer.com](https://publish.buffer.com)
2. Connect your Instagram and LinkedIn accounts
3. Go to Settings → Developers
4. Generate Access Token
5. Add to `.env.local`:
```
BUFFER_ACCESS_TOKEN=your-token
```

### 4.2 Account Info
Add your social media info to `.env.local`:
```
INSTAGRAM_USERNAME=your-instagram-username
LINKEDIN_PROFILE_URL=https://www.linkedin.com/in/your-profile
```

---

## **Step 5: Run the Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

---

## **Step 6: Import Your Content**

Once the backend is built, you'll run:
```bash
npm run import-content
```

This will scan your `09_PROCESSED` folder and import all files into Supabase.

---

## **Next Steps**

Once this setup is complete, you'll have:
1. ✅ Supabase database ready
2. ✅ OpenAI API connected
3. ✅ Social media integration ready
4. ✅ Development environment running

Then I'll build:
- Creator Mode dashboard
- Content Library
- Markdown Editor
- AI content analysis
- Scrollstream capture
- Social media publisher

---

## **Questions or Issues?**

Let me know if you run into any issues with:
- Supabase project creation
- API keys
- SQL schema setup
- Environment variables

I'm here to help!
