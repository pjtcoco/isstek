import { useEffect, useState } from "react";
import { subscribeToAuth, getUserRole } from "../services/authService";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToAuth(async (u) => {
      setUser(u);

      if (!u) {
        setRole(null);
        setLoading(false);
        return;
      }

      const r = await getUserRole(u.uid);
      setRole(r);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return {
    user,
    role,
    isAdmin: role === "admin",
    loading,
  };
}
