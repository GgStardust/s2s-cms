# 🔗 Backend Integration Guide

## **Email Subscription Integration**

The frontend now includes a working email subscription form that can be easily connected to your backend system.

### **Current Setup**

✅ **Frontend Form**: Beautiful email capture form in the footer
✅ **API Endpoint**: `/api/subscribe` route ready for backend connection
✅ **User Feedback**: Success/error messages with S2S branding
✅ **Form Validation**: Email validation and loading states

### **✅ Supabase Integration (Already Connected!)**

The email subscription is now connected to your existing Supabase database:

```typescript
// In frontend/app/api/subscribe/route.ts
import { createClient } from '@/lib/supabase/server'

const supabase = createClient()

const { data, error } = await supabase
  .from('subscribers')
  .insert([{ 
    email, 
    subscribed_at: new Date().toISOString(),
    source: 'landing_page',
    status: 'active'
  }])
```

**✅ What's Already Done:**
- Supabase client utilities copied to frontend
- API route updated to use your existing Supabase setup
- Subscribers table migration created
- Dependencies added to package.json

#### **Option 2: ConvertKit Integration**

```typescript
// Add to the POST handler:
const response = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    api_key: process.env.CONVERTKIT_API_KEY,
    email: email,
    tags: ['s2s-landing-page']
  })
})
```

#### **Option 3: Your Existing Backend API**

```typescript
// Add to the POST handler:
const response = await fetch(`${process.env.BACKEND_URL}/api/subscribers`, {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`
  },
  body: JSON.stringify({ 
    email,
    source: 'landing_page',
    timestamp: new Date().toISOString()
  })
})
```

#### **Option 4: Email Service Provider**

```typescript
// Example with Resend
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Add to the POST handler:
await resend.contacts.create({
  email: email,
  audienceId: process.env.RESEND_AUDIENCE_ID,
  unsubscribed: false
})
```

### **Environment Variables**

Add these to your `.env.local` file:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# ConvertKit
CONVERTKIT_API_KEY=your_convertkit_api_key

# Your Backend
BACKEND_URL=your_backend_url
BACKEND_API_KEY=your_backend_api_key

# Email Service
RESEND_API_KEY=your_resend_api_key
RESEND_AUDIENCE_ID=your_audience_id
```

### **Database Schema (Supabase)**

If using Supabase, create this table:

```sql
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT DEFAULT 'landing_page',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_status ON subscribers(status);
```

### **Testing the Integration**

1. **Local Testing:**
```bash
cd frontend
npm run dev
# Visit http://localhost:3000
# Try subscribing with a test email
```

2. **Check Logs:**
```bash
# Check the console for subscription logs
# Check your backend/database for new entries
```

### **Next Steps**

1. **Choose Integration Method**: Pick Supabase, ConvertKit, or your backend
2. **Add Environment Variables**: Set up your API keys
3. **Update API Route**: Uncomment and configure the integration code
4. **Test**: Verify emails are being captured
5. **Deploy**: Push to production

### **Future Enhancements**

- **Double Opt-in**: Send confirmation email before subscribing
- **Segmentation**: Tag subscribers by interest/source
- **Analytics**: Track subscription rates and sources
- **Unsubscribe**: Add unsubscribe functionality
- **Welcome Series**: Automated email sequences

The foundation is ready - just choose your integration method and uncomment the relevant code in `/api/subscribe/route.ts`!
