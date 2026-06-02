import { useMemo, useState } from "react";
import { createDoc } from "../services/dbService";
import { theme } from "../../theme";
import { usePrograms } from "../hooks/usePrograms";

export default function EnrollmentForm({ onClose }) {
  const { programs } = usePrograms();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    level: "",
  });

  const selectedProgram = programs.find((p) => p.name === form.program);

  const availableLevels = useMemo(() => {
    return selectedProgram?.levels || [];
  }, [selectedProgram]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) => /^[0-9+\s()-]{8,20}$/.test(phone);

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.program ||
      !form.level
    ) {
      alert("Tous les champs sont obligatoires");
      return;
    }

    if (!validateEmail(form.email)) {
      alert("Email invalide");
      return;
    }

    if (!validatePhone(form.phone)) {
      alert("Numéro invalide");
      return;
    }

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
        <h2>Inscription</h2>

        {/* NAME */}
        <input
          placeholder="Nom complet"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={input}
        />

        {/* EMAIL */}
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={input}
        />

        {/* PHONE */}
        <input
          placeholder="Téléphone"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          style={input}
        />

        {/* PROGRAM */}
        <select
          value={form.program}
          onChange={(e) =>
            setForm({
              ...form,
              program: e.target.value,
              level: "",
            })
          }
          style={input}
        >
          <option value="">Choisir une filière</option>
          {programs.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>

        {/* LEVEL (FILTERED AUTOMATICALLY) */}
        <select
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
          style={input}
          disabled={!form.program}
        >
          <option value="">Choisir un niveau</option>
          {availableLevels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>

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

/* STYLES */
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
  gap: "10px",
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
};

const closeBtn = {
  background: "transparent",
  color: "red",
  border: "none",
  marginTop: "5px",
};
