import {
  doc,
  getDoc,
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth, storage } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCollection } from "./useCollection";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// ── Mock auth (demo mode — replace with Firebase in production) ───────────────
const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
const [sidebarOpen, setSidebarOpen] = useState(false);
// ── Shared style helpers ──────────────────────────────────────────────────────
const ACCENT = "#2563eb"; // main school blue

const COLORS = {
  primary: "#1e3a8a",
  primaryLight: "#2563eb",
  bg: "#f5f7fb",
  card: "#ffffff",
  text: "#1f2937",
  muted: "#6b7280",
  border: "#e5e7eb",
  danger: "#dc2626",
};

// ── GLOBAL STYLES ─────────────────────────────
const card = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 10,
  padding: "1.2rem",
  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
};

const inp = {
  width: "100%",
  border: "1px solid #e5e7eb",
  padding: "0.75rem 1rem",
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.9rem",
  borderRadius: 6,
  outline: "none",
  boxSizing: "border-box",
  background: "#fff",
};

const lbl = {
  fontSize: "0.65rem",
  color: "#6b7280",
  letterSpacing: "0.12em",
  fontWeight: 700,
  display: "block",
  marginBottom: "0.4rem",
};

const primaryBtn = {
  background: ACCENT,
  color: "#fff",
  border: "none",
  padding: "0.7rem 1.2rem",
  fontWeight: 700,
  fontSize: "0.75rem",
  borderRadius: 6,
  cursor: "pointer",
};

const ghostBtn = {
  background: "transparent",
  color: ACCENT,
  border: `1px solid ${ACCENT}`,
  padding: "0.55rem 0.9rem",
  fontWeight: 700,
  fontSize: "0.7rem",
  borderRadius: 6,
  cursor: "pointer",
};

const dangerBtn = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "0.45rem 0.8rem",
  fontWeight: 700,
  fontSize: "0.68rem",
  borderRadius: 6,
  cursor: "pointer",
};

// ── Login screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      onLogin();
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,600&display=swap');

      *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: 'Outfit', sans-serif;
      }

      /* Responsive improvements */
      @media (max-width: 480px) {
        .login-card {
          width: 92% !important;
          padding: 1.8rem !important;
        }
      }
    `}</style>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          display: "none",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.4)",
          color: "#fff",
          padding: "0.35rem 0.6rem",
          borderRadius: 6,
          fontSize: "1rem",
        }}
        className="mobile-toggle"
      >
        ☰
      </button>

      <div
        style={{
          minHeight: "100vh",
          background: COLORS.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <div
          className="login-card"
          style={{
            ...card,
            width: 380,
            maxWidth: "100%",
            padding: "2.5rem",
            borderTop: `4px solid ${COLORS.primary}`,
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <img
              src="https://isstek.org/images/logo_isstek.JPG"
              alt="ISSTEK"
              style={{
                height: 52,
                objectFit: "contain",
                marginBottom: "0.9rem",
              }}
              onError={(e) => (e.target.style.display = "none")}
            />

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                color: COLORS.text,
              }}
            >
              Administration
            </h1>

            <p
              style={{
                fontSize: "0.78rem",
                color: COLORS.muted,
                marginTop: "0.25rem",
              }}
            >
              Panneau de gestion ISSTEK
            </p>
          </div>

          {/* Form */}
          <div style={{ display: "grid", gap: "0.9rem" }}>
            {/* EMAIL */}
            <div>
              <label style={lbl}>EMAIL</label>
              <input
                type="email"
                placeholder="admin@isstek.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inp}
                onFocus={(e) => (e.target.style.borderColor = COLORS.primary)}
                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label style={lbl}>MOT DE PASSE</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inp}
                onKeyDown={(e) => e.key === "Enter" && handle()}
                onFocus={(e) => (e.target.style.borderColor = COLORS.primary)}
                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
              />
            </div>

            {/* ERROR */}
            {error && (
              <div
                style={{
                  fontSize: "0.78rem",
                  color: COLORS.danger,
                  padding: "0.6rem 0.8rem",
                  background: "#fef2f2",
                  borderRadius: 4,
                }}
              >
                {error}
              </div>
            )}

            {/* BUTTON */}
            <button
              onClick={handle}
              disabled={loading}
              style={{
                ...primaryBtn,
                background: COLORS.primary,
                padding: "0.9rem",
                opacity: loading ? 0.7 : 1,
                cursor: "pointer",
              }}
            >
              {loading ? "CONNEXION..." : "SE CONNECTER →"}
            </button>

            <p
              style={{
                fontSize: "0.68rem",
                color: COLORS.muted,
                textAlign: "center",
                marginTop: "0.3rem",
              }}
            >
              Accès réservé à l'administration
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Dashboard tab (RESPONSIVE UPGRADE) ───────────────────────────────────────
function Dashboard({ news, photos, enrollments }) {
  const stats = [
    { label: "Total inscriptions", value: enrollments.length, color: ACCENT },
    {
      label: "En attente",
      value: enrollments.filter((e) => e.status === "En attente").length,
      color: "#f59e0b",
    },
    {
      label: "Confirmées",
      value: enrollments.filter((e) => e.status === "Confirmé").length,
      color: "#10b981",
    },
    {
      label: "Articles publiés",
      value: news.filter((n) => n.published).length,
      color: COLORS.primary,
    },
  ];

  return (
    <div>
      {/* Title */}
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.4rem, 2vw, 1.9rem)",
          marginBottom: "2rem",
          color: COLORS.text,
        }}
      >
        Tableau de bord
      </h2>

      {/* STATS GRID (RESPONSIVE) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              ...card,
              borderTop: `3px solid ${s.color}`,
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                color: s.color,
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>

            <div
              style={{
                fontSize: "0.75rem",
                color: COLORS.muted,
                marginTop: "0.4rem",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* MAIN SECTIONS (STACK ON MOBILE) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {/* ENROLLMENTS */}
        <div style={card}>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              marginBottom: "1rem",
              color: COLORS.text,
            }}
          >
            Dernières inscriptions
          </h3>

          <div style={{ display: "grid", gap: "0.6rem" }}>
            {(enrollments ?? []).slice(0, 4).map((e) => (
              <div
                key={e.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.7rem",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 6,
                  background: "#fff",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    {e.name}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: COLORS.muted }}>
                    {e.program}
                  </div>
                </div>

                <span
                  style={{
                    fontSize: "0.62rem",
                    padding: "0.2rem 0.55rem",
                    borderRadius: 999,
                    fontWeight: 700,
                    background: e.status === "Confirmé" ? "#d1fae5" : "#fef3c7",
                    color: e.status === "Confirmé" ? "#065f46" : "#92400e",
                    whiteSpace: "nowrap",
                  }}
                >
                  {e.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* NEWS */}
        <div style={card}>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              marginBottom: "1rem",
              color: COLORS.text,
            }}
          >
            Dernières actualités
          </h3>

          <div style={{ display: "grid", gap: "0.6rem" }}>
            {(news ?? []).slice(0, 4).map((n) => (
              <div
                key={n.id}
                style={{
                  padding: "0.7rem",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 6,
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginBottom: "0.2rem",
                  }}
                >
                  {n.title}
                </div>

                <div
                  style={{
                    fontSize: "0.72rem",
                    color: COLORS.muted,
                  }}
                >
                  {n.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsTab({ news }) {
  const [form, setForm] = useState({ title: "", body: "" });

  const toggle = async (id) => {
    const ref = doc(db, "news", id);
    const current = news?.find((n) => n.id === id);
    if (!current) return;
    await updateDoc(ref, { published: !current.published });
  };

  const remove = async (id) => {
    await deleteDoc(doc(db, "news", id));
  };

  const publish = async () => {
    if (!form.title || !form.body) return;

    await addDoc(collection(db, "news"), {
      title: form.title,
      body: form.body,
      date: new Date().toISOString().split("T")[0],
      published: true,
    });

    setForm({ title: "", body: "" });
  };

  return (
    <div>
      {/* Title */}
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.4rem, 2vw, 1.9rem)",
          marginBottom: "2rem",
          color: COLORS.text,
        }}
      >
        Gestion des Actualités
      </h2>

      {/* CREATE FORM */}
      <div
        style={{
          ...card,
          marginBottom: "2rem",
        }}
      >
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            marginBottom: "1.2rem",
            color: COLORS.text,
          }}
        >
          Nouvel article
        </h3>

        <div
          style={{
            display: "grid",
            gap: "0.9rem",
          }}
        >
          {/* TITLE */}
          <div>
            <label style={lbl}>TITRE</label>
            <input
              placeholder="Titre de l'article"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={inp}
              onFocus={(e) => (e.target.style.borderColor = COLORS.primary)}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          {/* BODY */}
          <div>
            <label style={lbl}>CONTENU</label>
            <textarea
              placeholder="Contenu de l'article..."
              value={form.body}
              rows={5}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              style={{ ...inp, resize: "vertical", minHeight: 120 }}
              onFocus={(e) => (e.target.style.borderColor = COLORS.primary)}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={publish}
            style={{
              ...primaryBtn,
              background: COLORS.primary,
              width: "fit-content",
            }}
          >
            PUBLIER L'ARTICLE
          </button>
        </div>
      </div>

      {/* LIST */}
      <div
        style={{
          display: "grid",
          gap: "1rem",
        }}
      >
        {(news ?? []).map((n) => (
          <div
            key={n.id}
            style={{
              ...card,
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* TOP ROW */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1, minWidth: 220 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: COLORS.text,
                    }}
                  >
                    {n.title}
                  </span>

                  <span
                    style={{
                      fontSize: "0.6rem",
                      padding: "0.2rem 0.5rem",
                      borderRadius: 999,
                      fontWeight: 700,
                      background: n.published ? "#d1fae5" : "#f3f4f6",
                      color: n.published ? "#065f46" : "#6b7280",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {n.published ? "Publié" : "Brouillon"}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "0.72rem",
                    color: COLORS.muted,
                    marginTop: "0.2rem",
                  }}
                >
                  {n.date}
                </div>

                <p
                  style={{
                    fontSize: "0.82rem",
                    color: COLORS.text,
                    opacity: 0.8,
                    marginTop: "0.6rem",
                    lineHeight: 1.5,
                  }}
                >
                  {n.body}
                </p>
              </div>

              {/* ACTIONS */}
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <button onClick={() => toggle(n.id)} style={ghostBtn}>
                  {n.published ? "Dépublier" : "Publier"}
                </button>

                <button onClick={() => remove(n.id)} style={dangerBtn}>
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Photos tab (UPDATED RESPONSIVE + BLUE THEME) ─────────────────────────────
function PhotosTab({ photos }) {
  const [mode, setMode] = useState("file"); // file | url
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Campus");
  const [uploading, setUploading] = useState(false);

  const categories = [
    "Campus",
    "Événements",
    "Diplômations",
    "Laboratoires",
    "Étudiants",
  ];

  const add = async () => {
    try {
      setUploading(true);

      if (mode === "url") {
        const list = urls.split("\n").filter(Boolean);

        for (const url of list) {
          await addDoc(collection(db, "photos"), {
            url,
            caption,
            category,
            type: "image",
            createdAt: new Date(),
          });
        }
      }

      if (mode === "file") {
        for (const file of files) {
          const isVideo = file.type.startsWith("video/");
          const path = `${isVideo ? "videos" : "photos"}/${Date.now()}-${file.name}`;

          const storageRef = ref(storage, path);

          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);

          await addDoc(collection(db, "photos"), {
            url,
            caption,
            category,
            type: isVideo ? "video" : "image",
            createdAt: new Date(),
          });
        }
      }

      setFiles([]);
      setUrls("");
      setCaption("");
      setCategory("Campus");
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  const removePhoto = async (id) => {
    await deleteDoc(doc(db, "photos", id));
  };

  return (
    <div style={{ width: "100%" }}>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.3rem, 2vw, 1.9rem)",
          marginBottom: "1.5rem",
          color: "#1e3a8a",
        }}
      >
        Galerie Photos
      </h2>

      {/* MODE SWITCH */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setMode("file")}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: 4,
            border: mode === "file" ? "none" : "1px solid #e5e7eb",
            background: mode === "file" ? "#1e3a8a" : "#fff",
            color: mode === "file" ? "#fff" : "#1e3a8a",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.8rem",
          }}
        >
          FICHIER
        </button>

        <button
          onClick={() => setMode("url")}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: 4,
            border: mode === "url" ? "none" : "1px solid #e5e7eb",
            background: mode === "url" ? "#1e3a8a" : "#fff",
            color: mode === "url" ? "#fff" : "#1e3a8a",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.8rem",
          }}
        >
          URL
        </button>
      </div>

      {/* FORM */}
      <div
        style={{
          ...card,
          marginBottom: "2rem",
        }}
      >
        <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>
          Ajouter une photo / vidéo
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {/* FILE / URL */}
          {mode === "url" ? (
            <div>
              <label style={lbl}>URLS</label>
              <textarea
                placeholder="Une URL par ligne"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                style={inp}
              />
            </div>
          ) : (
            <div>
              <label style={lbl}>FICHIERS</label>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
              />
            </div>
          )}

          {/* CAPTION */}
          <div>
            <label style={lbl}>LÉGENDE</label>
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              style={inp}
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label style={lbl}>CATÉGORIE</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={inp}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* BUTTON */}
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button
              onClick={add}
              disabled={uploading}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: 4,
                border: "none",
                background: "#1e3a8a",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                opacity: uploading ? 0.6 : 1,
              }}
            >
              {uploading ? "UPLOAD..." : "AJOUTER"}
            </button>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "1rem",
        }}
      >
        {(photos ?? []).map((p) => (
          <div
            key={p.id}
            style={{
              ...card,
              padding: 0,
              overflow: "hidden",
            }}
          >
            {p.type === "video" ? (
              <video
                src={p.url}
                controls
                style={{ width: "100%", aspectRatio: "4/3" }}
              />
            ) : (
              <img
                src={p.url}
                alt={p.caption}
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  objectFit: "cover",
                }}
              />
            )}

            <div style={{ padding: "0.8rem" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                {p.caption}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "0.4rem",
                }}
              >
                <span style={{ fontSize: "0.62rem", color: "#1e3a8a" }}>
                  {p.category}
                </span>

                <button
                  onClick={() => removePhoto(p.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#dc2626",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Enrollments tab (UPDATED + RESPONSIVE + BLUE THEME) ───────────────────────
function EnrollmentsTab({ enrollments }) {
  const confirm = async (id, currentStatus) => {
    await updateDoc(doc(db, "enrollments", id), {
      status: currentStatus === "Confirmé" ? "En attente" : "Confirmé",
    });
  };

  const remove = async (id) => {
    await deleteDoc(doc(db, "enrollments", id));
  };

  return (
    <div style={{ width: "100%" }}>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.3rem, 2vw, 1.9rem)",
          marginBottom: "1.5rem",
          color: "#1e3a8a",
        }}
      >
        Gestion des Inscriptions
      </h2>

      <div
        style={{
          ...card,
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            minWidth: "700px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
              {["Nom", "Email", "Formation", "Date", "Statut", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "0.8rem",
                      fontSize: "0.65rem",
                      color: "#6b7280",
                      letterSpacing: "0.1em",
                      fontWeight: 700,
                    }}
                  >
                    {h.toUpperCase()}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {(enrollments ?? []).map((e) => (
              <tr key={e.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "0.8rem", fontWeight: 600 }}>{e.name}</td>
                <td style={{ padding: "0.8rem", color: "#6b7280" }}>
                  {e.email}
                </td>
                <td style={{ padding: "0.8rem" }}>{e.program}</td>
                <td style={{ padding: "0.8rem", color: "#9ca3af" }}>
                  {e.date}
                </td>

                <td style={{ padding: "0.8rem" }}>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      padding: "0.25rem 0.6rem",
                      borderRadius: 4,
                      fontWeight: 700,
                      background:
                        e.status === "Confirmé" ? "#dbeafe" : "#f3f4f6",
                      color: e.status === "Confirmé" ? "#1e3a8a" : "#6b7280",
                    }}
                  >
                    {e.status}
                  </span>
                </td>

                <td style={{ padding: "0.8rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => confirm(e.id, e.status)}
                      style={{
                        padding: "0.4rem 0.7rem",
                        borderRadius: 4,
                        border: "1px solid #1e3a8a",
                        background: "#fff",
                        color: "#1e3a8a",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {e.status === "Confirmé" ? "Annuler" : "Confirmer"}
                    </button>

                    <button
                      onClick={() => remove(e.id)}
                      style={{
                        padding: "0.4rem 0.7rem",
                        borderRadius: 4,
                        border: "none",
                        background: "#ef4444",
                        color: "#fff",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Main Admin Panel (UPDATED + RESPONSIVE + BLUE THEME) ─────────────────────
export default function AdminPanel() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingRole, setLoadingRole] = useState(true);

  const { data: news } = useCollection("news", loggedIn && isAdmin);
  const { data: photos } = useCollection("photos", loggedIn && isAdmin);
  const { data: enrollments } = useCollection(
    "enrollments",
    loggedIn && isAdmin,
  );

  // ── AUTH CHECK ─────────────────────────────────────────────
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setLoggedIn(!!user);

      if (!user) {
        setIsAdmin(false);
        setLoadingRole(false);
        return;
      }

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      setIsAdmin(snap.exists() && snap.data().role === "admin");
      setLoadingRole(false);
    });

    return unsub;
  }, []);

  // ── ROUTING GUARD ──────────────────────────────────────────
  useEffect(() => {
    if (loadingRole) return;

    if (!loggedIn) {
      navigate("/admin/login");
      return;
    }

    if (!isAdmin) {
      navigate("/unauthorized");
    }
  }, [loggedIn, isAdmin, loadingRole, navigate]);

  const tabs = [
    { id: "dashboard", label: "📊 Tableau de bord" },
    { id: "news", label: "📰 Actualités" },
    { id: "photos", label: "🖼️ Galerie" },
    { id: "enrollments", label: "📋 Inscriptions" },
    { id: "settings", label: "⚙️ Paramètres" },
  ];

  if (loadingRole)
    return (
      <div style={{ padding: "2rem", color: "#6b7280" }}>Chargement...</div>
    );

  if (!loggedIn || !isAdmin) return <LoginScreen />;

  return (
    <>
      <style>{`
      @media (max-width: 768px) {
  aside {
    position: fixed;
    left: 0;
    top: 56px;
    height: calc(100vh - 56px);
    transform: translateX(-100%);
    transition: 0.3s ease;
    z-index: 999;
  }

  aside.open {
    transform: translateX(0);
  }

  .mobile-toggle {
    display: block !important;
  }

  main {
    padding: 1rem !important;
  }
}
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Outfit', sans-serif;
          background: ${COLORS.bg};
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: COLORS.bg,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── TOP BAR ───────────────────────────────────────────── */}
        <div
          style={{
            background: COLORS.primary,
            padding: "0 1.5rem",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#fff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <img
              src="https://isstek.org/images/logo_isstek.JPG"
              alt="ISSTEK"
              style={{
                height: 30,
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
              }}
            />
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.05rem",
                color: "#fff",
                fontWeight: 700,
              }}
            >
              ISSTEK
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                opacity: 0.6,
              }}
            >
              Administration
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>
              admin@isstek.org
            </span>

            <button
              onClick={async () => {
                await signOut(auth);
                navigate("/admin/login");
              }}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.4)",
                color: "#fff",
                padding: "0.35rem 0.8rem",
                borderRadius: 6,
                fontSize: "0.7rem",
                cursor: "pointer",
              }}
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* ── BODY ─────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flex: 1,
            minHeight: "calc(100vh - 56px)",
          }}
        >
          {/* ── SIDEBAR ─────────────────────────────────────── */}
          <aside
            style={{
              width: 220,
              background: "#fff",
              borderRight: "1px solid #e5e7eb",
              padding: "1rem 0",
              position: "relative",
            }}
            className={sidebarOpen ? "open" : ""}
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "0.8rem 1.2rem",
                  border: "none",
                  background: tab === t.id ? "#eff6ff" : "transparent",
                  borderLeft:
                    tab === t.id
                      ? `3px solid ${COLORS.primary}`
                      : "3px solid transparent",
                  color: tab === t.id ? COLORS.primary : "#4b5563",
                  fontWeight: tab === t.id ? 700 : 500,
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                {t.label}
              </button>
            ))}

            <div
              style={{
                margin: "2rem 1rem",
                padding: "1rem",
                background: COLORS.bg,
                borderRadius: 8,
                fontSize: "0.75rem",
                color: "#6b7280",
              }}
            >
              <div style={{ marginBottom: "0.5rem", fontWeight: 700 }}>
                Site public
              </div>
              <a
                href="/"
                style={{
                  color: COLORS.primary,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                ← Voir le site
              </a>
            </div>
          </aside>

          {/* ── MAIN CONTENT ───────────────────────────────── */}
          <main
            style={{
              flex: 1,
              padding: "1.5rem",
              overflowY: "auto",
            }}
          >
            {tab === "dashboard" && (
              <Dashboard
                news={news}
                photos={photos}
                enrollments={enrollments}
              />
            )}
            {tab === "news" && <NewsTab news={news} />}
            {tab === "photos" && <PhotosTab photos={photos} />}
            {tab === "enrollments" && (
              <EnrollmentsTab enrollments={enrollments} />
            )}
            {tab === "settings" && <SettingsTab />}
          </main>
        </div>
      </div>
    </>
  );
}
