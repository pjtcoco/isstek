import { useState } from "react";
import { COLORS } from "../../../theme"; // adjust path if needed

export default function Photos() {
  const [mode, setMode] = useState("file");
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Campus");

  const categories = [
    "Campus",
    "Événements",
    "Diplômations",
    "Laboratoires",
    "Étudiants",
  ];

  const handleAdd = () => {
    if (mode === "url") {
      console.log("URL upload:", urls);
    } else {
      console.log("File upload:", files);
    }

    alert("Mock upload successful (Firebase not connected yet)");
  };

  return (
    <div>
      {/* TITLE */}
      <h2
        style={{
          fontSize: "1.4rem",
          fontWeight: 700,
          marginBottom: "1.5rem",
          color: COLORS.text,
        }}
      >
        Photos Admin
      </h2>

      {/* MODE SWITCH */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <button
          onClick={() => setMode("file")}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: 8,
            border: mode === "file" ? "none" : `1px solid ${COLORS.border}`,
            background: mode === "file" ? COLORS.primary : "#fff",
            color: mode === "file" ? "#fff" : COLORS.primary,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Fichiers
        </button>

        <button
          onClick={() => setMode("url")}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: 8,
            border: mode === "url" ? "none" : `1px solid ${COLORS.border}`,
            background: mode === "url" ? COLORS.primary : "#fff",
            color: mode === "url" ? "#fff" : COLORS.primary,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          URL
        </button>
      </div>

      {/* FORM CARD */}
      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 12,
          padding: "1.5rem",
          boxShadow: COLORS.shadow,
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {/* FILE / URL */}
          <div>
            <div
              style={{
                fontSize: "0.75rem",
                color: COLORS.muted,
                marginBottom: 6,
              }}
            >
              {mode === "file" ? "FICHIERS" : "URLS"}
            </div>

            {mode === "file" ? (
              <input
                type="file"
                multiple
                onChange={(e) => setFiles([...e.target.files])}
                style={{ width: "100%" }}
              />
            ) : (
              <textarea
                placeholder="Une URL par ligne"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                style={{
                  width: "100%",
                  minHeight: 90,
                  padding: "0.6rem",
                  borderRadius: 6,
                  border: `1px solid ${COLORS.border}`,
                }}
              />
            )}
          </div>

          {/* CAPTION */}
          <div>
            <div
              style={{
                fontSize: "0.75rem",
                color: COLORS.muted,
                marginBottom: 6,
              }}
            >
              LÉGENDE
            </div>
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              style={{
                width: "100%",
                padding: "0.6rem",
                borderRadius: 6,
                border: `1px solid ${COLORS.border}`,
              }}
            />
          </div>

          {/* CATEGORY */}
          <div>
            <div
              style={{
                fontSize: "0.75rem",
                color: COLORS.muted,
                marginBottom: 6,
              }}
            >
              CATÉGORIE
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "100%",
                padding: "0.6rem",
                borderRadius: 6,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* BUTTON */}
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button
              onClick={handleAdd}
              style={{
                width: "100%",
                padding: "0.7rem",
                borderRadius: 8,
                border: "none",
                background: COLORS.primary,
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Upload
            </button>
          </div>
        </div>
      </div>

      {/* EMPTY STATE (IMPORTANT UX IMPROVEMENT) */}
      <div
        style={{
          textAlign: "center",
          color: COLORS.muted,
          fontSize: "0.9rem",
          padding: "2rem",
          border: `1px dashed ${COLORS.border}`,
          borderRadius: 12,
        }}
      >
        Aucune image affichée (Firebase non connecté ou galerie vide)
      </div>
    </div>
  );
}
