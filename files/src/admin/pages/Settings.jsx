import { useState } from "react";
import { COLORS } from "../../../theme"; // adjust path if needed

export default function Settings() {
  const [form, setForm] = useState({
    schoolName: "ISSTEK",
    email: "admin@isstek.org",
    language: "fr",
  });

  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);

    // MOCK SAVE (later connect Firebase)
    setTimeout(() => {
      console.log("Saved settings:", form);
      setSaving(false);
      alert("Settings saved successfully");
    }, 800);
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
        Paramètres
      </h2>

      {/* SETTINGS CARD */}
      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 12,
          padding: "1.5rem",
          boxShadow: COLORS.shadow,
          maxWidth: 600,
        }}
      >
        <div style={{ display: "grid", gap: "1rem" }}>
          {/* SCHOOL NAME */}
          <div>
            <div
              style={{
                fontSize: "0.75rem",
                color: COLORS.muted,
                marginBottom: 6,
              }}
            >
              NOM DE L'ÉCOLE
            </div>
            <input
              value={form.schoolName}
              onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
              style={{
                width: "100%",
                padding: "0.7rem",
                borderRadius: 8,
                border: `1px solid ${COLORS.border}`,
              }}
            />
          </div>

          {/* EMAIL */}
          <div>
            <div
              style={{
                fontSize: "0.75rem",
                color: COLORS.muted,
                marginBottom: 6,
              }}
            >
              EMAIL ADMIN
            </div>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{
                width: "100%",
                padding: "0.7rem",
                borderRadius: 8,
                border: `1px solid ${COLORS.border}`,
              }}
            />
          </div>

          {/* LANGUAGE */}
          <div>
            <div
              style={{
                fontSize: "0.75rem",
                color: COLORS.muted,
                marginBottom: 6,
              }}
            >
              LANGUE PAR DÉFAUT
            </div>
            <select
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
              style={{
                width: "100%",
                padding: "0.7rem",
                borderRadius: 8,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              marginTop: "0.5rem",
              padding: "0.8rem",
              borderRadius: 8,
              border: "none",
              background: COLORS.primary,
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
