import { useEffect, useState } from "react";
import { createDoc, deleteDocById } from "../services/dbService";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export function usePhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "photos"), (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setPhotos(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const addPhoto = (data) => createDoc("photos", data);
  const deletePhoto = (id) => deleteDocById("photos", id);

  return {
    photos,
    loading,
    addPhoto,
    deletePhoto,
  };
}
