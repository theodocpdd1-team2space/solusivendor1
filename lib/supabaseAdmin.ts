import { createClient } from "@supabase/supabase-js";

function cleanEnv(value: string | undefined) {
  return value
    ?.trim()
    .replace(/^["']|["']$/g, "")
    .replace(/;$/g, "")
    .replace(/\/$/g, "");
}

const supabaseUrl = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAdminKey = cleanEnv(
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
);

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL belum diatur.");
}

if (!supabaseUrl.startsWith("https://")) {
  throw new Error(`NEXT_PUBLIC_SUPABASE_URL harus diawali https://. Value sekarang: ${supabaseUrl}`);
}

if (!supabaseAdminKey) {
  throw new Error("SUPABASE_SECRET_KEY atau SUPABASE_SERVICE_ROLE_KEY belum diatur.");
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseAdminKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});