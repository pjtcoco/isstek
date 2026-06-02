import { useState } from "react";
import emailjs from "@emailjs/browser";
import { theme } from "./theme";
import { createDoc } from "./src/services/dbService";

const T = {
  fr: {
    label: "NOUS CONTACTER",
    title: "Parlons de\nVotre Avenir.",
    phones: ["677 699 402 / 699 101 557", "698 942 412 / 676 343 066"],
    email: "isstek@gmail.com",
    address: "Yaoundé-Etoug-Ebé, Face Collège de l'Espérance",
    hours: "Lundi – Vendredi : 07h30 – 18h00\nSamedi : 08h00 – 14h00",
    hoursLabel: "HORAIRES D'ACCUEIL",
    fName: "NOM COMPLET",
    fEmail: "ADRESSE EMAIL",
    fMsg: "MESSAGE",
    fSubmit: "ENVOYER LE MESSAGE →",
    fSending: "ENVOI EN COURS...",
    successTitle: "MESSAGE ENVOYÉ !",
    successSub: "Nous vous répondrons dans les 48 heures.",
    errorMsg: "Erreur lors de l'envoi.",
    required: "Champ requis",
    invalidEmail: "Email invalide",
  },
};

export default function ContactSection({ lang }) {
  // ✅ SAFE FALLBACK (fixes your crash)
  const t = T[lang] || T.fr;

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = t.required;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      e.email = t.invalidEmail;
    }

    if (!form.message.trim()) e.message = t.required;

    return e;
  };

  const handleSubmit = async () => {
    if (status === "loading") return; // prevent spam clicks

    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      // 1. Save to Firestore
      await createDoc("contactMessages", {
        name: form.name,
        email: form.email,
        message: form.message,
        status: "new",
        createdAt: new Date().toISOString(),
      });

      // 2. Send email via EmailJS
      await emailjs.send(
        "service_o3vkzlv",
        "template_qtpa9e2",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          reply_to: form.email,
          to_email: "zonemelicorineleslie@gmail.com",
        },
        "2FgsyzmHZGEsyiTCk",
      );

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    }
  };

  const inp = {
    width: "100%",
    background: "#fff",
    border: `1px solid ${theme.border}`,
    padding: "0.9rem 1rem",
    fontSize: "0.9rem",
    borderRadius: 6,
    outline: "none",
    color: theme.text,
  };

  const errStyle = {
    fontSize: "0.65rem",
    color: "#dc2626",
    marginTop: "0.25rem",
  };

  return (
    <section
      id="contact"
      style={{
        padding: "clamp(4rem, 6vw, 7rem) 1.5rem",
        background: theme.bgLight,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(2rem, 5vw, 5rem)",
        }}
      >
        {/* LEFT */}
        <div>
          <div style={{ fontSize: "0.65rem", color: theme.primary }}>
            — {t.label}
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              whiteSpace: "pre-line",
              lineHeight: 1.1,
              marginBottom: "2rem",
              color: theme.text,
            }}
          >
            {t.title}
          </h2>
        </div>

        {/* FORM */}
        <div>
          {status === "success" ? (
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <h3>✅ {t.successTitle}</h3>
              <p>{t.successSub}</p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "1rem" }}>
              <input
                placeholder={t.fName}
                style={inp}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <div style={errStyle}>{errors.name}</div>}

              <input
                placeholder={t.fEmail}
                style={inp}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <div style={errStyle}>{errors.email}</div>}

              <textarea
                rows={5}
                placeholder={t.fMsg}
                style={inp}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              {errors.message && <div style={errStyle}>{errors.message}</div>}

              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                style={{
                  background: theme.primary,
                  color: "#fff",
                  padding: "1rem",
                  border: "none",
                  borderRadius: 6,
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  opacity: status === "loading" ? 0.6 : 1,
                }}
              >
                {status === "loading" ? t.fSending : t.fSubmit}
              </button>

              {status === "error" && (
                <div style={{ color: "red", fontSize: "0.8rem" }}>
                  {t.errorMsg}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
