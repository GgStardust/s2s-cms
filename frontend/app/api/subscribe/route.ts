import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Connect to Supabase
    const supabase = createClient()
    
    // Insert email into subscribers table
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ 
        email, 
        subscribed_at: new Date().toISOString(),
        source: 'landing_page',
        status: 'active'
      }])

    if (error) {
      console.error('Supabase error:', error)
      
      // Handle duplicate email error gracefully
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { 
            message: 'Email already subscribed to field updates',
            email: email 
          },
          { status: 200 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    console.log('New subscription added:', email)

    return NextResponse.json(
      { 
        message: 'Successfully subscribed to field updates',
        email: email 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}
