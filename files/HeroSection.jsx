import { theme } from "../files/theme";
import { useState } from "react";
import EnrollmentForm from "../files/src/components/EnrollmentForm";

const T = {
  fr: {
    badge: "INSCRIPTIONS OUVERTES",
    line1: "L'INSTITUT",
    line2: "DE L'EXCELLENCE",
    sub: "Institut Supérieur des Sciences et Technologies Kouam — Yaoundé, Cameroun",
    cta1: "S'INSCRIRE",
    cta2: "FORMATIONS",
  },
  en: {
    badge: "ENROLLMENT OPEN",
    line1: "THE INSTITUTE",
    line2: "OF EXCELLENCE",
    sub: "Kouam Higher Institute — Yaoundé, Cameroon",
    cta1: "ENROLL",
    cta2: "PROGRAMS",
  },
};

export default function HeroSection({ lang }) {
  const t = T[lang];
  const [open, setOpen] = useState(false);

  // hover states
  const [hoverEnroll, setHoverEnroll] = useState(false);
  const [hoverPrograms, setHoverPrograms] = useState(false);

  return (
    <>
      <section
        style={{
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          background: theme.bgDark,
          color: "#fff",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "auto", width: "100%" }}>
          <div
            style={{
              fontSize: "0.75rem",
              color: theme.primary,
              marginBottom: "1rem",
            }}
          >
            {t.badge}
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1.1,
            }}
          >
            {t.line1} <br />
            <span style={{ color: theme.primary }}>{t.line2}</span>
          </h1>

          <p
            style={{
              marginTop: "1rem",
              maxWidth: 600,
              color: theme.textMuted,
            }}
          >
            {t.sub}
          </p>

          {/* BUTTONS */}
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {/* ENROLL BUTTON */}
            <a
              onClick={() => setOpen(true)}
              onMouseEnter={() => setHoverEnroll(true)}
              onMouseLeave={() => setHoverEnroll(false)}
              style={{
                background: hoverEnroll ? theme.primaryHover : theme.primary,
                color: "#fff",
                padding: "0.8rem 1.5rem",
                textDecoration: "none",
                cursor: "pointer",
                borderRadius: 8,
                transition: "0.25s ease",
                transform: hoverEnroll ? "translateY(-2px)" : "translateY(0)",
                boxShadow: hoverEnroll ? theme.shadow : "none",
                display: "inline-block",
              }}
            >
              {t.cta1}
            </a>

            {/* PROGRAMS BUTTON (BRIGHTER + FIXED CONTRAST) */}
            <a
              href="#programs"
              onMouseEnter={() => setHoverPrograms(true)}
              onMouseLeave={() => setHoverPrograms(false)}
              style={{
                background: hoverPrograms ? theme.primary : "#ffffff",
                color: hoverPrograms ? "#ffffff" : theme.primary,
                padding: "0.8rem 1.5rem",
                textDecoration: "none",
                fontWeight: 700,
                borderRadius: 8,
                transition: "0.25s ease",
                transform: hoverPrograms ? "translateY(-2px)" : "translateY(0)",
                boxShadow: hoverPrograms ? theme.shadow : "none",
                border: `1px solid ${theme.primary}`,
                display: "inline-block",
              }}
            >
              {t.cta2}
            </a>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {open && <EnrollmentForm onClose={() => setOpen(false)} />}
    </>
  );
}
