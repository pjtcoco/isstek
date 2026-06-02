import { useState } from "react";
import { theme } from "./theme";

const T = {
  fr: {
    label: "STAFF ADMINISTRATIF",
    title: "Mot de\nNos Dirigeants.",
    readMore: "Voir Plus",
    readLess: "Réduire",
    staff: [
      {
        name: "Mme. KOUAM",
        role: "PROMOTRICE — Fondatrice",
        img: "https://isstek.org/images/promotice.jpeg",
        short:
          "L'Institut ISSTEK a été créé pour améliorer l'orientation des étudiants.",
        full: "ISSTEK prépare les jeunes à réussir et réduit le chômage par une formation adaptée.",
      },
      {
        name: "M. KOUAM Etienne",
        role: "PDG — Retraité",
        img: "https://isstek.org/images/pdg.jpeg",
        short: "ISSTEK garantit la réussite et l’insertion professionnelle.",
        full: "ISSTEK accompagne les étudiants vers une insertion durable.",
      },
      {
        name: "M. BINAM Alphonse",
        role: "DAAC — Enseignant Chercheur",
        img: "https://isstek.org/images/binam.jpeg",
        short: "ISSTEK forme dans les filières les plus demandées.",
        full: "ISSTEK offre des formations modernes et adaptées au marché.",
      },
    ],
  },

  en: {
    label: "ADMINISTRATIVE STAFF",
    title: "A Word From\nOur Leaders.",
    readMore: "Read More",
    readLess: "Collapse",
    staff: [],
  },
};

export default function StaffSection({ lang }) {
  // ✅ FIX: safe fallback
  const safeLang = lang && T[lang] ? lang : "fr";
  const t = T[safeLang];

  const [expanded, setExpanded] = useState(null);

  return (
    <section
      id="staff"
      style={{
        padding: "clamp(4rem, 8vw, 7rem) 1rem",
        background: theme.bgDark,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div
            style={{
              fontSize: "0.65rem",
              color: theme.primary,
              letterSpacing: "0.22em",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            — {t.label}
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "#fff",
              lineHeight: 1.1,
              whiteSpace: "pre-line",
            }}
          >
            {t.title}
          </h2>
        </div>

        {/* GRID */}
        <div className="staff-grid">
          {t.staff.map((person, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              {/* IMAGE */}
              <div
                style={{
                  width: "100%",
                  height: 320,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem",
                }}
              >
                <img
                  src={person.img}
                  alt={person.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: 260,
                    objectFit: "contain",
                    objectPosition: "center",
                    display: "block",
                    borderRadius: 10,
                  }}
                />
              </div>

              {/* CONTENT */}
              <div style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    fontSize: "0.6rem",
                    color: theme.primary,
                    fontWeight: 700,
                    marginBottom: "0.3rem",
                  }}
                >
                  {person.role}
                </div>

                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.2rem",
                    color: "#fff",
                    marginBottom: "0.8rem",
                  }}
                >
                  {person.name}
                </h3>

                <p
                  style={{
                    fontSize: "0.82rem",
                    color: theme.textMuted,
                    lineHeight: 1.7,
                  }}
                >
                  {expanded === i ? person.full : person.short}
                </p>

                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  style={{
                    marginTop: "0.9rem",
                    background: "none",
                    border: "none",
                    color: theme.primary,
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  {expanded === i ? `▴ ${t.readLess}` : `▾ ${t.readMore}`}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GRID RESPONSIVE */}
      <style>{`
        .staff-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 1024px) {
          .staff-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 650px) {
          .staff-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
