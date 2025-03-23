
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


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);




export const supabaseDb = createClient(VITE_REACT_APP_SUPABASE_URL, VITE_REACT_APP_SUPABASE_ANON_KEY);

