import { useState } from "react";
import { theme } from "./theme";

const T = {
  fr: {
    label: "CYCLES DE FORMATIONS",
    title: "Choisissez\nVotre Parcours.",
    learnMore: "En savoir plus →",
    programs: [
      {
        code: "BTS / HND",
        img: "https://isstek.org/images/diplome.jpeg",
        duration: "2 ans",
        title: "Brevet de Technicien Supérieur",
        desc: "Après 2 ans de formations, l'étudiant obtient le BTS dans divers domaines et est capable de faire valoir ses compétences dans une entreprise.",
        tracks: ["Commerce & Gestion", "Industriel", "Santé"],
      },
      {
        code: "LICENCE / BACHELOR",
        img: "https://isstek.org/images/labo_info3.jpeg",
        duration: "3 ans",
        title: "Licence Professionnelle",
        desc: "La licence professionnelle permet une forte immersion dans l'entreprise grâce à des stages et séminaires animés par des experts.",
        tracks: ["Informatique", "Gestion", "Commerce International"],
      },
      {
        code: "MASTER PRO",
        img: "https://isstek.org/images/diplomation6.jpeg",
        duration: "5 ans",
        title: "Master Professionnel",
        desc: "Le programme offre une spécialisation avancée avec une forte orientation recherche et professionnalisation.",
        tracks: ["Management", "Ingénierie", "Recherche"],
      },
    ],
  },
  en: {
    label: "TRAINING PROGRAMS",
    title: "Choose Your\nPath.",
    learnMore: "Learn more →",
    programs: [
      {
        code: "BTS / HND",
        img: "https://isstek.org/images/diplome.jpeg",
        duration: "2 years",
        title: "Higher Technician Certificate",
        desc: "After 2 years of training, students obtain the BTS in various fields and can demonstrate their skills in a company.",
        tracks: ["Commerce & Management", "Industrial", "Health"],
      },
      {
        code: "DEGREE / BACHELOR",
        img: "https://isstek.org/images/labo_info3.jpeg",
        duration: "3 years",
        title: "Professional Degree",
        desc: "Strong business immersion through internships, seminars, and professional supervision.",
        tracks: ["Computer Science", "Management", "International Trade"],
      },
      {
        code: "MASTER PRO",
        img: "https://isstek.org/images/diplomation6.jpeg",
        duration: "5 years",
        title: "Professional Master",
        desc: "Advanced specialization with professional and research-oriented training.",
        tracks: ["Management", "Engineering", "Research"],
      },
    ],
  },
};

export default function ProgramsSection({ lang }) {
  const t = T[lang];
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="programs"
      style={{
        padding: "7rem 1.5rem",
        background: theme.bgLight,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
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
              color: theme.text,
              lineHeight: 1.08,
              whiteSpace: "pre-line",
            }}
          >
            {t.title}
          </h2>
        </div>

        {/* GRID */}
        <div className="programs-grid">
          {t.programs.map((prog, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: theme.bgWhite,
                borderRadius: 10,
                overflow: "hidden",
                transition: "all 0.3s ease",
                transform: hovered === i ? "translateY(-6px)" : "translateY(0)",
                boxShadow:
                  hovered === i
                    ? `0 0 0 2px ${theme.primary}, 0 20px 50px rgba(15,76,129,0.15)`
                    : "0 4px 20px rgba(0,0,0,0.06)",
              }}
            >
              {/* IMAGE */}
              <div style={{ position: "relative" }}>
                <img
                  src={prog.img}
                  alt={prog.title}
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    background: theme.primary,
                    color: "#fff",
                    padding: "0.3rem 0.7rem",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    borderRadius: 3,
                  }}
                >
                  {prog.code}
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "0.8rem",
                    right: "0.8rem",
                    background: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    padding: "0.25rem 0.6rem",
                    fontSize: "0.6rem",
                    borderRadius: 3,
                  }}
                >
                  {prog.duration}
                </div>
              </div>

              {/* CONTENT */}
              <div
                style={{
                  padding: "1.5rem",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.2rem",
                    color: theme.text,
                    marginBottom: "0.6rem",
                  }}
                >
                  {prog.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.85rem",
                    color: theme.textSoft,
                    lineHeight: 1.7,
                    marginBottom: "1rem",
                  }}
                >
                  {prog.desc}
                </p>

                {/* TAGS */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                    marginBottom: "1.2rem",
                  }}
                >
                  {prog.tracks.map((track) => (
                    <span
                      key={track}
                      style={{
                        background: "rgba(15,76,129,0.08)",
                        color: theme.primary,
                        border: `1px solid rgba(15,76,129,0.2)`,
                        padding: "0.2rem 0.55rem",
                        fontSize: "0.65rem",
                        borderRadius: 3,
                        fontWeight: 600,
                      }}
                    >
                      {track}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  style={{
                    color: theme.primary,
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  {t.learnMore}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RESPONSIVE GRID FIX */}
      <style>{`
        .programs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 1024px) {
          .programs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .programs-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          /* better mobile spacing */
          .programs-grid div {
            padding: 0;
          }
        }
      `}</style>
    </section>
  );
}
