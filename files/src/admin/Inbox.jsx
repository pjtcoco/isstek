import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { db } from "../firebase/firebase";
import { updateDocById, createDoc } from "../services/dbService";

export default function Inbox() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [replies, setReplies] = useState([]);
  const [filter, setFilter] = useState("all");
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  // LOAD CONTACT MESSAGES
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "contactMessages"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(data);
    });

    return () => unsub();
  }, []);

  // LOAD REPLIES FOR CURRENT MESSAGE
  useEffect(() => {
    if (!selected) return;

    const unsub = onSnapshot(collection(db, "replies"), (snap) => {
      const data = snap.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((r) => r.messageId === selected.id);

      setReplies(data);
    });

    return () => unsub();
  }, [selected]);

  const filtered =
    filter === "all" ? messages : messages.filter((m) => m.status === filter);

  const markAsRead = async (msg) => {
    try {
      await updateDocById("contactMessages", msg.id, {
        status: "read",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const sendReply = async () => {
    if (!reply.trim()) return;

    setSending(true);

    try {
      // SEND EMAIL
      console.log("Sending to:", selected.email);
      await emailjs.send(
        "service_o3vkzlv",
        "template_qtpa9e2",
        {
          to_email: selected.email,
          to_name: selected.name,
          message: reply,
        },
        "2FgsyzmHZGEsyiTCk",
      );

      // SAVE REPLY
      await createDoc("replies", {
        messageId: selected.id,
        to: selected.email,
        name: selected.name,
        message: reply,
        createdAt: new Date().toISOString(),
      });

      setReply("");
    } catch (err) {
      console.error(err);
      alert("Failed to send reply");
    }

    setSending(false);
  };

  return (
    <div style={styles.container}>
      {/* FILTERS */}{" "}
      <div style={styles.sidebar}>
        <h2 style={{ marginBottom: 20 }}>📧 Inbox</h2>

        {["all", "new", "read"].map((f) => (
          <div
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...styles.filter,
              background: filter === f ? "#e8f0fe" : "transparent",
            }}
          >
            {f.toUpperCase()}
          </div>
        ))}
      </div>
      {/* MESSAGE LIST */}
      <div style={styles.list}>
        {filtered.map((msg) => (
          <div
            key={msg.id}
            onClick={async () => {
              setSelected(msg);

              if (msg.status === "new") {
                await markAsRead(msg);
              }
            }}
            style={{
              ...styles.messageItem,
              background: selected?.id === msg.id ? "#e8f0fe" : "#fff",
            }}
          >
            <div style={styles.messageTop}>
              <strong>{msg.name}</strong>

              {msg.status === "new" && <span style={styles.dot}></span>}
            </div>

            <div style={styles.email}>{msg.email}</div>

            <div style={styles.preview}>{msg.message}</div>
          </div>
        ))}
      </div>
      {/* CHAT PANEL */}
      <div style={styles.viewer}>
        {selected ? (
          <>
            <div style={styles.header}>
              <h2>{selected.name}</h2>
              <div>{selected.email}</div>
            </div>

            <div style={styles.chat}>
              <div style={styles.userBubble}>{selected.message}</div>

              {replies.map((r) => (
                <div key={r.id} style={styles.adminBubble}>
                  {r.message}
                </div>
              ))}
            </div>

            <div style={styles.replyBox}>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your reply..."
                style={styles.textarea}
              />

              <button
                onClick={sendReply}
                disabled={sending}
                style={styles.sendBtn}
              >
                {sending ? "Sending..." : "Send Reply"}
              </button>
            </div>
          </>
        ) : (
          <div style={styles.empty}>Select a conversation</div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#f6f8fc",
  },

  sidebar: {
    width: 220,
    background: "#fff",
    borderRight: "1px solid #e5e7eb",
    padding: 16,
  },

  filter: {
    padding: 12,
    borderRadius: 8,
    cursor: "pointer",
    marginBottom: 8,
    fontWeight: 600,
  },

  list: {
    width: 350,
    background: "#fff",
    borderRight: "1px solid #e5e7eb",
    overflowY: "auto",
  },

  messageItem: {
    padding: 14,
    borderBottom: "1px solid #f1f1f1",
    cursor: "pointer",
  },

  messageTop: {
    display: "flex",
    justifyContent: "space-between",
  },

  email: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },

  preview: {
    fontSize: 12,
    color: "#888",
    marginTop: 6,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#1a73e8",
  },

  viewer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },

  header: {
    paddingBottom: 16,
    borderBottom: "1px solid #eee",
  },

  chat: {
    flex: 1,
    overflowY: "auto",
    paddingTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  userBubble: {
    alignSelf: "flex-start",
    background: "#f1f5f9",
    padding: 14,
    borderRadius: 14,
    maxWidth: "70%",
  },

  adminBubble: {
    alignSelf: "flex-end",
    background: "#1a73e8",
    color: "#fff",
    padding: 14,
    borderRadius: 14,
    maxWidth: "70%",
  },

  replyBox: {
    borderTop: "1px solid #eee",
    paddingTop: 16,
  },

  textarea: {
    width: "100%",
    height: 100,
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ddd",
    resize: "none",
  },

  sendBtn: {
    marginTop: 10,
    background: "#1a73e8",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 8,
    cursor: "pointer",
  },

  empty: {
    margin: "auto",
    color: "#888",
  },
};
