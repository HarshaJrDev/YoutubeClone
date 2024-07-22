
const supabaseUrl = 'https://ljyipweointieptchztj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeWlwd2VvaW50aWVwdGNoenRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE0ODEzMjAsImV4cCI6MjAzNzA1NzMyMH0.ND6c5Jhb3H79cBIvMknFup47-p07zb1DCRHfUO0rIog';
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});