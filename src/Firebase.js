
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { createClient } from "@supabase/supabase-js";

const { VITE_REACT_APP_API_KEY, VITE_REACT_APP_AUTH_DOMAIN, VITE_REACT_APP_PROJECT_ID, VITE_REACT_APP_STORAGE_BUCKET, VITE_REACT_APP_MESSAGING_SENDER_ID, VITE_REACT_APP_APP_ID, VITE_REACT_APP_MEASUREMENT_ID, VITE_REACT_APP_SUPABASE_URL, VITE_REACT_APP_SUPABASE_ANON_KEY } = import.meta.env;
const firebaseConfig = {
    apiKey: VITE_REACT_APP_API_KEY,
    authDomain: VITE_REACT_APP_AUTH_DOMAIN,
    projectId: VITE_REACT_APP_PROJECT_ID,
    storageBucket: VITE_REACT_APP_STORAGE_BUCKET,
    messagingSenderId: VITE_REACT_APP_MESSAGING_SENDER_ID,
    appId: VITE_REACT_APP_APP_ID,
    measurementId: VITE_REACT_APP_MEASUREMENT_ID
};
// const firebaseConfig = {
//     apiKey: "AIzaSyCF_Z1_uEmj7W4AhQJ9K-0H9g0zKsPy8is",
//     authDomain: "pmuhed-16a55.firebaseapp.com",
//     projectId: "pmuhed-16a55",
//     storageBucket: "pmuhed-16a55.firebasestorage.app",
//     messagingSenderId: "358371876406",
//     appId: "1:358371876406:web:68ce6e5be56e2894780297",
//     measurementId: "G-VPYPXWZ3VQ"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);



// const REACT_APP_SUPABASE_URL = "https://vgkrbuyufduvpjhntjhw.supabase.co"
// const REACT_APP_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZna3JidXl1ZmR1dnBqaG50amh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MDA5MTgsImV4cCI6MjA1NjM3NjkxOH0.1I3Upn7WlD7AFhscsP7Kr7FxWzgjnOYG5eiH5mq6MDI";

export const supabaseDb = createClient(VITE_REACT_APP_SUPABASE_URL, VITE_REACT_APP_SUPABASE_ANON_KEY);

