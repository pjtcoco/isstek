import { useEffect, useState } from "react";
import { createDoc, updateDocById, deleteDocById } from "../services/dbService";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export function useEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "enrollments"), (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setEnrollments(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const addEnrollment = (data) => {
    return createDoc("enrollments", {
      ...data,
      status: "En attente",
    });
  };

  const updateEnrollment = (id, data) => {
    return updateDocById("enrollments", id, data);
  };

  const deleteEnrollment = (id) => {
    return deleteDocById("enrollments", id);
  };

  return {
    enrollments,
    loading,
    addEnrollment,
    updateEnrollment,
    deleteEnrollment,
  };
}
