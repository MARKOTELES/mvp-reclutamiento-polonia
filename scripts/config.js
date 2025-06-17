// Configuración de Supabase
const SUPABASE_URL = 'https://your-project-url.supabase.co';
const SUPABASE_KEY = 'your-anon-key';

// Inicialización de Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export { supabase };