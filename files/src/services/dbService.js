import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/* ───────────────── CREATE ───────────────── */
export const createDoc = (collectionName, data) => {
  return addDoc(collection(db, collectionName), data);
};

/* ───────────────── UPDATE ───────────────── */
export const updateDocById = (collectionName, id, data) => {
  return updateDoc(doc(db, collectionName, id), data);
};

/* ───────────────── DELETE ───────────────── */
export const deleteDocById = (collectionName, id) => {
  return deleteDoc(doc(db, collectionName, id));
};

/* ───────────────── GET ALL ───────────────── */
export const getAllDocs = async (collectionName) => {
  const snap = await getDocs(collection(db, collectionName));

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};
