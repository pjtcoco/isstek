import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

/* ───────────────── LOGIN ───────────────── */
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/* ───────────────── LOGOUT ───────────────── */
export const logoutUser = () => {
  return signOut(auth);
};

/* ───────────────── AUTH LISTENER ───────────────── */
export const subscribeToAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/* ───────────────── GET USER ROLE ───────────────── */
export const getUserRole = async (uid) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data()?.role || null;
};
