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
        role: "PROMOTRICE — Fondatrice de plusieurs écoles",
        img: "https://isstek.org/images/promotice.jpeg",
        short:
          "L'Institut Supérieur ISSTEK a été créé dans l'optique d'apporter des solutions aux problèmes du choix des filières de formation.",
        full: "Chers Parents, Chers Jeunes étudiants et aspirants au magistère du savoir, du savoir-être et du savoir-faire... ISSTEK prépare et assure la réussite et le succès des jeunes en réduisant drastiquement le chômage au Cameroun.",
      },
      {
        name: "M. KOUAM Etienne",
        role: "PDG — PLEG HORS ÉCHELLE retraité",
        img: "https://isstek.org/images/pdg.jpeg",
        short:
          "ISSTEK prépare et assure la réussite et le succès des jeunes en réduisant drastiquement le chômage au Cameroun.",
        full: "De par son offre diversifiée de filières professionnalisantes... ISSTEK assure la réussite des jeunes et leur insertion professionnelle.",
      },
      {
        name: "M. BINAM Alphonse Donatien",
        role: "DAAC — Enseignant Chercheur en Droit et Science Politique",
        img: "https://isstek.org/images/binam.jpeg",
        short:
          "ISSTEK forme ses étudiants dans les filières les plus sollicitées avec un bon équilibre théorie/pratique.",
        full: "ISSTEK se positionne parmi les meilleurs établissements avec un campus moderne, des laboratoires performants et des enseignants qualifiés.",
      },
    ],
  },

  en: {
    label: "ADMINISTRATIVE STAFF",
    title: "A Word From\nOur Leaders.",
    readMore: "Read More",
    readLess: "Collapse",
    staff: [
      {
        name: "Mrs. KOUAM",
        role: "FOUNDER & DIRECTOR",
        img: "https://isstek.org/images/promotice.jpeg",
        short:
          "ISSTEK was created to provide solutions for choosing academic paths and career guidance.",
        full: "ISSTEK was created to solve training orientation issues and ensure student success through discipline, work quality, and guidance.",
      },
      {
        name: "Mr. KOUAM Etienne",
        role: "CEO — Retired Senior Teacher",
        img: "https://isstek.org/images/pdg.jpeg",
        short:
          "ISSTEK ensures student success and reduces unemployment through professional training.",
        full: "Through strong academic programs and partnerships, ISSTEK ensures student success and professional integration.",
      },
      {
        name: "Mr. BINAM Alphonse Donatien",
        role: "DAAC — Law & Political Science Researcher",
        img: "https://isstek.org/images/binam.jpeg",
        short:
          "ISSTEK trains students in high-demand fields with strong theory and practice.",
        full: "ISSTEK offers modern facilities, qualified staff, and international partnerships for high-quality education.",
      },
    ],
  },
};

export default function StaffSection({ lang }) {
  const t = T[lang];
  const [expanded, setExpanded] = useState(null);

  return (
    <section
      id="staff"
      style={{
        padding: "clamp(4rem, 8vw, 7rem) 1.5rem",
        background: theme.bgDark,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "3.5rem",
          }}
        >
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
                borderRadius: 8,
                overflow: "hidden",
                transition: "all 0.25s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = theme.primary;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = theme.border;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <img
                src={person.img}
                alt={person.name}
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  objectFit: "cover",
                  objectPosition: "top",
                  display: "block",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <div style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    fontSize: "0.6rem",
                    color: theme.primary,
                    letterSpacing: "0.1em",
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
                    marginBottom: "0.9rem",
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
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.05em",
                    padding: 0,
                  }}
                >
                  {expanded === i ? `▴ ${t.readLess}` : `▾ ${t.readMore}`}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .staff-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
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
