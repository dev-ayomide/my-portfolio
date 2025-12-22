import { createClient } from '@supabase/supabase-js'

/**
 * Keep-alive endpoint to prevent Supabase from pausing the project
 * This endpoint makes a minimal query to keep the database active
 * Should be called via Vercel Cron every 6 days
 */
export default async function handler(req, res) {
  // Only allow GET requests (Vercel Cron uses GET)
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Try both VITE_ prefixed (for frontend) and non-prefixed (for backend) env vars
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return res.status(500).json({ 
        error: 'Supabase credentials not configured',
        message: 'Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or SUPABASE_URL and SUPABASE_ANON_KEY) are set in Vercel environment variables'
      })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Make a minimal query to keep the database active
    // This queries the projects table (which should always exist)
    const { data, error } = await supabase
      .from('projects')
      .select('id')
      .limit(1)

    if (error) {
      console.error('Keep-alive error:', error)
      return res.status(500).json({ 
        error: 'Failed to ping Supabase',
        details: error.message 
      })
    }

    return res.status(200).json({ 
      success: true,
      message: 'Supabase keep-alive successful',
      timestamp: new Date().toISOString(),
      data: data ? 'Database is active' : 'No data returned'
    })
  } catch (error) {
    console.error('Keep-alive exception:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    })
  }
}

