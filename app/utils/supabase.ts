import { createClient } from '@supabase/supabase-js';

// The URL is hardcoded as fallback since we already know it from the DATABASE_URL
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://addlynusetvlnhggzwnj.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});
