import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./files/src/firebase/firebase";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "contactMessages"), (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>📩 Messages</h2>

      <div style={{ display: "grid", gap: "1rem" }}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              background: "#fff",
              padding: "1rem",
              borderRadius: 12,
              border: "1px solid #eee",
            }}
          >
            <strong>{m.name}</strong>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>{m.email}</div>

            <p style={{ marginTop: "0.5rem" }}>{m.message}</p>

            <span
              style={{
                fontSize: "0.75rem",
                padding: "4px 8px",
                borderRadius: 6,
                background: m.status === "new" ? "#FEF3C7" : "#DCFCE7",
              }}
            >
              {m.status || "new"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
