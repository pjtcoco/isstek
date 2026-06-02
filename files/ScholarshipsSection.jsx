import { theme } from "./theme";

const T = {
  fr: {
    label: "BOURSES D'ÉTUDES",
    title: "Jusqu'à 50%\nde Réduction.",
    body: "Des bourses d'études disponibles couvrant jusqu'à 50% des frais de scolarité. Ne laissez pas les finances être un obstacle à votre avenir professionnel.",
    cta: "SOUSCRIRE MAINTENANT",
    badge: "BOURSE",
  },
  en: {
    label: "SCHOLARSHIPS",
    title: "Up to 50%\nReduction.",
    body: "Scholarships available covering up to 50% of tuition fees. Don't let finances be an obstacle to your professional future.",
    cta: "APPLY NOW",
    badge: "GRANT",
  },
};

const GRID_IMGS = [
  "https://isstek.org/images/diplomation5.jpeg",
  "https://isstek.org/images/diplomation9.jpeg",
  "https://isstek.org/images/diplomation13.jpeg",
  "https://isstek.org/images/labo_sante1.jpeg",
];

export default function ScholarshipsSection({ lang }) {
  const t = T[lang];

  return (
    <section
      id="scholarships"
      style={{
        padding: "clamp(4rem, 8vw, 7rem) 1.5rem",
        background: theme.bgLight,
      }}
    >
      <div
        className="scholarships-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* LEFT SIDE */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.8rem",
            }}
          >
            {GRID_IMGS.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="ISSTEK students"
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  objectFit: "cover",
                  borderRadius: 6,
                  display: "block",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.04)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ))}
          </div>

          {/* CENTER BADGE */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: theme.primary,
              color: "#fff",
              width: 92,
              height: 92,
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              boxShadow: "0 10px 35px rgba(59,130,246,0.35)",
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "1.6rem" }}>50%</div>

            <div
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.1em",
                marginTop: "0.2rem",
              }}
            >
              {t.badge}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <div
            style={{
              fontSize: "0.65rem",
              color: theme.primary,
              letterSpacing: "0.22em",
              fontWeight: 700,
              marginBottom: "0.6rem",
            }}
          >
            — {t.label}
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              lineHeight: 1.1,
              color: "#1a1a1a",
              whiteSpace: "pre-line",
              marginBottom: "1.5rem",
            }}
          >
            {t.title}
          </h2>

          <p
            style={{
              fontSize: "1rem",
              color: theme.textSoft,
              lineHeight: 1.8,
              marginBottom: "2rem",
              maxWidth: 520,
            }}
          >
            {t.body}
          </p>

          <a
            href="#contact"
            style={{
              display: "inline-block",
              background: theme.primary,
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.78rem",
              padding: "0.95rem 2.2rem",
              textDecoration: "none",
              letterSpacing: "0.1em",
              borderRadius: 4,
              border: `2px solid ${theme.primary}`,
              transition: "all 0.25s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = theme.primary;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = theme.primary;
              e.currentTarget.style.color = "#fff";
            }}
          >
            {t.cta}
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .scholarships-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }

        @media (max-width: 500px) {
          .scholarships-grid {
            padding: 0 0.5rem;
          }
        }
      `}</style>
    </section>
  );
}
