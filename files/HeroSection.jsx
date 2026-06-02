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

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <a
              onClick={() => setOpen(true)}
              style={{
                background: theme.primary,
                color: "#fff",
                padding: "0.8rem 1.5rem",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {t.cta1}
            </a>

            <a
              href="#programs"
              style={{
                border: `1px solid ${theme.primary}`,
                color: theme.primary,
                padding: "0.8rem 1.5rem",
                textDecoration: "none",
              }}
            >
              {t.cta2}
            </a>
          </div>
        </div>
      </section>

      {/* ✅ MODAL MUST BE HERE */}
      {open && <EnrollmentForm onClose={() => setOpen(false)} />}
    </>
  );
}
