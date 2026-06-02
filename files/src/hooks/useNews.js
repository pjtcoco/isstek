import { useEffect, useState } from "react";
import { createDoc, updateDocById, deleteDocById } from "../services/dbService";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export function useNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "news"), (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setNews(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  /* ───────── ACTIONS ───────── */

  const addNews = async (data) => {
    return createDoc("news", data);
  };

  const updateNews = async (id, data) => {
    return updateDocById("news", id, data);
  };

  const deleteNews = async (id) => {
    return deleteDocById("news", id);
  };

  return {
    news,
    loading,
    addNews,
    updateNews,
    deleteNews,
  };
}
