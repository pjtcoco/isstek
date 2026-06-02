// ─────────────────────────────────────────────────────────────────────────────
// INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com
// 2. Create project → Add Web App → Copy the config below
// 3. Replace every "REPLACE_..." value with your real values
// ─────────────────────────────────────────────────────────────────────────────
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyArpfJ2IwVRxufhL9xKa4b3nYHX38KkAYU",
  authDomain: "isstek-website.firebaseapp.com",
  projectId: "isstek-website",
  storageBucket: "isstek-website.firebasestorage.app",
  messagingSenderId: "485906125382",
  appId: "1:485906125382:web:437d5b51dd43cf03c9f047",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
