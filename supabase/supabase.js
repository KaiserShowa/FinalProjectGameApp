import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vuelztcsuzhldirhlixr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1ZWx6dGNzdXpobGRpcmhsaXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0MDYwOTAsImV4cCI6MjAxMjk4MjA5MH0.t6112Bs1CQsoYu-QtnrtOesjsW2H7LgJR3ErkS6Dsrw";
export const supabase = createClient(supabaseUrl, supabaseKey);
