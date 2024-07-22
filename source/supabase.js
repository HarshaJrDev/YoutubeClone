// supabase.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ljyipweointieptchztj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeWlwd2VvaW50aWVwdGNoenRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE0ODEzMjAsImV4cCI6MjAzNzA1NzMyMH0.ND6c5Jhb3H79cBIvMknFup47-p07zb1DCRHfUO0rIog';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage, // Use AsyncStorage for local storage
});


//const supabaseUrl = 'https://ljyipweointieptchztj.supabase.co';
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqeWlwd2VvaW50aWVwdGNoenRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE0ODEzMjAsImV4cCI6MjAzNzA1NzMyMH0.ND6c5Jhb3H79cBIvMknFup47-p07zb1DCRHfUO0rIog';

// const supabase = createClient(supabaseUrl,supabaseAnonKey)