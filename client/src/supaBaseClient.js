import { createClient } from "@supabase/supabase-js";
const supaBaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supaBaApiKey = import.meta.env.VITE_SUPABASE_APIKEY;
export const supabase = createClient(supaBaseUrl, supaBaApiKey);
