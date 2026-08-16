import { createClient } from "@supabase/supabase-js";

type Database = {
  public: {
    Tables: {
      waitlist: {
        Row: { id: number; email: string; created_at: string };
        Insert: { id?: number; email: string; created_at?: string };
        Update: { id?: number; email?: string; created_at?: string };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};

let client: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseClient() {
  if (!client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error(
        "Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables."
      );
    }

    client = createClient<Database>(url, key, {
      auth: { persistSession: false },
    });
  }

  return client;
}
