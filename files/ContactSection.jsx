import { useState } from "react";
import { theme } from "./theme";

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
    fNamePh: "Votre nom complet",
    fEmail: "ADRESSE EMAIL",
    fEmailPh: "votre@email.com",
    fMsg: "MESSAGE",
    fMsgPh: "Comment pouvons-nous vous aider ?",
    fSubmit: "ENVOYER LE MESSAGE →",
    fSending: "ENVOI EN COURS...",
    successTitle: "MESSAGE ENVOYÉ !",
    successSub: "Nous vous répondrons dans les 48 heures.",
    errorMsg: "Erreur lors de l'envoi.",
    required: "Champ requis",
    invalidEmail: "Email invalide",
  },
  en: {
    label: "CONTACT US",
    title: "Let's Talk\nAbout Your Future.",
    phones: ["677 699 402 / 699 101 557", "698 942 412 / 676 343 066"],
    email: "isstek@gmail.com",
    address: "Yaoundé-Etoug-Ebé, Opposite Collège de l'Espérance",
    hours: "Monday – Friday: 7:30am – 6:00pm\nSaturday: 8:00am – 2:00pm",
    hoursLabel: "OFFICE HOURS",
    fName: "FULL NAME",
    fNamePh: "Your full name",
    fEmail: "EMAIL ADDRESS",
    fEmailPh: "your@email.com",
    fMsg: "MESSAGE",
    fMsgPh: "How can we help you?",
    fSubmit: "SEND MESSAGE →",
    fSending: "SENDING...",
    successTitle: "MESSAGE SENT!",
    successSub: "We will reply within 48 hours.",
    errorMsg: "Send failed.",
    required: "Required",
    invalidEmail: "Invalid email",
  },
};

export default function ContactSection({ lang }) {
  const t = T[lang];

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t.required;
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = t.invalidEmail;
    if (!form.message.trim()) e.message = t.required;
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);

    setErrors({});
    setStatus("loading");

    try {
      await new Promise((r) => setTimeout(r, 900));
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
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

  const lbl = {
    fontSize: "0.65rem",
    color: theme.textMuted,
    letterSpacing: "0.12em",
    fontWeight: 700,
    marginBottom: "0.4rem",
    display: "block",
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
          <div
            style={{
              fontSize: "0.65rem",
              color: theme.primary,
              fontWeight: 700,
            }}
          >
            — {t.label}
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontFamily: "'Playfair Display', serif",
              whiteSpace: "pre-line",
              lineHeight: 1.1,
              marginBottom: "2rem",
              color: theme.text,
            }}
          >
            {t.title}
          </h2>

          <div style={{ display: "grid", gap: "0.9rem", marginBottom: "2rem" }}>
            {[
              { icon: "📞", text: t.phones[0] },
              { icon: "📞", text: t.phones[1] },
              { icon: "✉️", text: t.email },
              { icon: "📍", text: t.address },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "0.7rem" }}>
                <span>{item.icon}</span>
                <span style={{ color: theme.textSoft, fontSize: "0.9rem" }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: "1.2rem",
              background: "#fff",
              borderRadius: 8,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div
              style={{
                fontSize: "0.65rem",
                color: theme.primary,
                fontWeight: 700,
              }}
            >
              {t.hoursLabel}
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                color: theme.textSoft,
                whiteSpace: "pre-line",
                lineHeight: 1.7,
              }}
            >
              {t.hours}
            </div>
          </div>
        </div>

        {/* FORM */}
        <div>
          {status === "success" ? (
            <div
              style={{
                padding: "2.5rem",
                textAlign: "center",
                background: "#ecfdf5",
                borderRadius: 8,
                border: "1px solid #bbf7d0",
              }}
            >
              <div style={{ fontSize: "2.5rem" }}>✅</div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#166534",
                }}
              >
                {t.successTitle}
              </h3>
              <p style={{ color: theme.textSoft }}>{t.successSub}</p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "1rem" }}>
              <div>
                <label style={lbl}>{t.fName}</label>
                <input
                  style={{
                    ...inp,
                    borderColor: errors.name ? "#dc2626" : theme.border,
                  }}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <div style={errStyle}>{errors.name}</div>}
              </div>

              <div>
                <label style={lbl}>{t.fEmail}</label>
                <input
                  style={{
                    ...inp,
                    borderColor: errors.email ? "#dc2626" : theme.border,
                  }}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && <div style={errStyle}>{errors.email}</div>}
              </div>

              <div>
                <label style={lbl}>{t.fMsg}</label>
                <textarea
                  rows={5}
                  style={{
                    ...inp,
                    resize: "vertical",
                    borderColor: errors.message ? "#dc2626" : theme.border,
                  }}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
                {errors.message && <div style={errStyle}>{errors.message}</div>}
              </div>

              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                style={{
                  background: theme.primary,
                  color: "#fff",
                  border: "none",
                  padding: "1rem",
                  borderRadius: 6,
                  fontWeight: 700,
                  cursor: "pointer",
                  opacity: status === "loading" ? 0.6 : 1,
                }}
              >
                {status === "loading" ? t.fSending : t.fSubmit}
              </button>

              {status === "error" && (
                <div style={{ color: "#dc2626", fontSize: "0.75rem" }}>
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
