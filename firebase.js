// src/firebase.js
// ─────────────────────────────────────────────────────────────────────────────
// SETUP INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com
// 2. Create a project called "isstek-website"
// 3. Add a Web App, copy the config object below
// 4. Enable Firestore Database (start in production mode)
// 5. Enable Authentication → Email/Password
// 6. Enable Storage
// 7. Replace the placeholder values below with your real config
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
