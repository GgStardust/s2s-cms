# 🚀 Supabase Setup for Email Subscriptions

## **Quick Setup (5 minutes)**

### **Step 1: Run the Migration**

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the contents of `supabase/migrations/20250110_add_subscribers_table.sql`
5. Click **Run**

This creates the `subscribers` table with proper indexes and security policies.

### **Step 2: Environment Variables ✅ DONE!**

Your Supabase credentials have been automatically copied from your existing project setup. No need to re-enter anything!

**✅ What's Already Configured:**
- ✅ `NEXT_PUBLIC_SUPABASE_URL` - Connected to your existing project
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Using your existing anon key  
- ✅ `SUPABASE_SERVICE_ROLE_KEY` - Using your existing service role key

### **Step 3: Test the Integration**

1. ✅ Dev server is already running at `http://localhost:3000`
2. Visit the site and scroll to the bottom
3. Try subscribing with a test email
4. Check your Supabase dashboard → Table Editor → `subscribers` to see the new entry

## **What's Created**

### **Subscribers Table**
```sql
CREATE TABLE subscribers (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE,
  source TEXT DEFAULT 'landing_page',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
);
```

### **Security Policies**
- ✅ Public can insert emails (for subscription)
- ✅ Service role has full access (for admin/backend)
- ✅ Row Level Security enabled

### **API Endpoint**
- ✅ `/api/subscribe` - Handles email subscriptions
- ✅ Validates email format
- ✅ Handles duplicate emails gracefully
- ✅ Returns proper success/error messages

## **Ready to Deploy!**

Once you've:
1. ✅ Run the migration (just need to do this one step!)
2. ✅ Environment variables (already done!)
3. ✅ Tested locally (ready to test!)

You can deploy to Vercel and emails will start flowing into your Supabase database!

## **Viewing Subscriptions**

In your Supabase dashboard:
- **Table Editor** → `subscribers` - See all subscriptions
- **SQL Editor** - Query subscriptions by source, date, etc.
- **API** - Access via your existing backend

The email subscription system is now fully integrated with your existing Supabase setup! 🎉
