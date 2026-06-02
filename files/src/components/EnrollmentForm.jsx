import { useState } from "react";
import { createDoc } from "../services/dbService";
import { theme } from "../../theme";

export default function EnrollmentForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ LIST OF AVAILABLE PROGRAMS (EDIT THIS LIST ANYTIME)
  const programs = [
    "Informatique",
    "Génie Logiciel",
    "Réseaux & Télécommunications",
    "Cybersécurité",
    "Électronique",
    "Génie Civil",
    "Management",
    "Comptabilité",
  ];

  // ✅ EMAIL VALIDATION
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ✅ PHONE VALIDATION (international safe)
  const isValidPhone = (phone) => {
    return /^[0-9+]{8,15}$/.test(phone);
  };

  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = "Nom requis";

    if (!isValidEmail(form.email)) e.email = "Email invalide";

    if (!isValidPhone(form.phone)) e.phone = "Numéro invalide";

    if (!form.program) e.program = "Veuillez choisir une filière";

    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    setErrors({});

    await createDoc("enrollments", {
      ...form,
      status: "En attente",
      createdAt: new Date().toISOString(),
    });

    alert("Inscription envoyée !");
    onClose();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>Formulaire d'inscription</h2>

        {/* NAME */}
        <input
          placeholder="Nom complet"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={input}
        />
        {errors.name && <small style={error}>{errors.name}</small>}

        {/* EMAIL */}
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={input}
        />
        {errors.email && <small style={error}>{errors.email}</small>}

        {/* PHONE */}
        <input
          placeholder="Téléphone (ex: 677123456)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          style={input}
        />
        {errors.phone && <small style={error}>{errors.phone}</small>}

        {/* PROGRAM DROPDOWN */}
        <select
          value={form.program}
          onChange={(e) => setForm({ ...form, program: e.target.value })}
          style={input}
        >
          <option value="">-- Choisir une filière --</option>
          {programs.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {errors.program && <small style={error}>{errors.program}</small>}

        {/* BUTTONS */}
        <button onClick={handleSubmit} style={btn}>
          Envoyer
        </button>

        <button onClick={onClose} style={closeBtn}>
          Fermer
        </button>
      </div>
    </div>
  );
}

/* ───────── STYLES ───────── */

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "#fff",
  padding: "2rem",
  borderRadius: 12,
  width: 420,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const input = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: 8,
};

const btn = {
  background: theme.primary,
  color: "#fff",
  padding: "10px",
  border: "none",
  borderRadius: 8,
  marginTop: "10px",
  cursor: "pointer",
};

const closeBtn = {
  background: "transparent",
  color: "red",
  border: "none",
  marginTop: "5px",
  cursor: "pointer",
};

const error = {
  color: "red",
  fontSize: "0.75rem",
};
