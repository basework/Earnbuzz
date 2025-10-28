import { createClient } from "@supabase/supabase-js";

// Define the Supabase types (optional but clean)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

// Safety check for missing environment variables
if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing Supabase environment variables in admin.ts");
}

// Create a Supabase client with service role key (server-side only)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
