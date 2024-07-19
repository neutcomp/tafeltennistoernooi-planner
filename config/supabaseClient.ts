import { createClient } from '@supabase/supabase-js';

const supabaseUrl = String(process.env.SUPABASE_URL)
const supabaseKey = String(process.env.SUPABASE_KEY)

const supabase = createClient(supabaseUrl, supabaseKey, { auth: { debug: true } });


export default supabase;