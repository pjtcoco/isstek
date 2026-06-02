import { theme } from "./theme";

const T = {
  fr: {
    label: "À PROPOS DE NOUS",
    title: "Qui sommes-nous ?",
    body: "Une école experte dans les domaines du commerce, des sciences et des technologies disposant d'un campus High Tech. Notre école rassemble une équipe de professionnels en matière de formation d'une part, et d'autre part d'entrepreneurs issus du monde de l'entreprise et qui gardent un pied dans la gestion d'entreprise.",
    decree: "Arrêté No 20-08759/N/MINESUP/SG/DDES/ESUP/SDA/GA du 19/08/2020",
    decreeLabel: "DÉCRET OFFICIEL",
    location: "Yaoundé-Etoug-Ebé, Face Collège de l'Espérance",
    cta: "CE QUE NOUS VOUS PROPOSONS",
    founded: "FONDÉ",
  },
  en: {
    label: "ABOUT US",
    title: "Who Are We?",
    body: "An expert school in commerce, science and technology with a High Tech campus. Our school brings together a team of training professionals and entrepreneurs from the business world who maintain a foothold in business management.",
    decree: "Decree No 20-08759/N/MINESUP/SG/DDES/ESUP/SDA/GA of 19/08/2020",
    decreeLabel: "OFFICIAL DECREE",
    location: "Yaoundé-Etoug-Ebé, Opposite Collège de l'Espérance",
    cta: "WHAT WE OFFER",
    founded: "FOUNDED",
  },
};

export default function AboutSection({ lang }) {
  const t = T[lang];

  return (
    <section
      id="about"
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
          alignItems: "center",
        }}
      >
        {/* TEXT */}
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
              fontSize: "clamp(2rem, 4vw, 3.6rem)",
              color: "#111827",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            {t.title}
          </h2>

          <p
            style={{
              fontSize: "clamp(0.95rem, 1.2vw, 1rem)",
              color: theme.textSoft,
              lineHeight: 1.8,
              marginBottom: "1.5rem",
            }}
          >
            {t.body}
          </p>

          {/* DECREE */}
          <div
            style={{
              padding: "1rem 1.2rem",
              background: `${theme.primary}10`,
              borderLeft: `4px solid ${theme.primary}`,
              marginBottom: "1.5rem",
              borderRadius: 4,
            }}
          >
            <div
              style={{
                fontSize: "0.6rem",
                color: theme.primary,
                fontWeight: 700,
                letterSpacing: "0.1em",
                marginBottom: "0.3rem",
              }}
            >
              {t.decreeLabel}
            </div>

            <div
              style={{
                fontSize: "0.8rem",
                color: theme.textSoft,
                lineHeight: 1.6,
              }}
            >
              {t.decree}
            </div>
          </div>

          {/* LOCATION */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: theme.textSoft,
              fontSize: "0.85rem",
              marginBottom: "2rem",
            }}
          >
            <span>📍</span>
            <span>{t.location}</span>
          </div>

          <a
            href="#programs"
            style={{
              display: "inline-block",
              background: theme.primary,
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.75rem",
              padding: "0.9rem 2rem",
              textDecoration: "none",
              letterSpacing: "0.1em",
              borderRadius: 6,
              border: `2px solid ${theme.primary}`,
              transition: "all 0.25s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = theme.primaryHover;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = theme.primary;
            }}
          >
            {t.cta}
          </a>
        </div>

        {/* IMAGE */}
        <div style={{ position: "relative" }}>
          <img
            src="https://isstek.org/images/isstek1.jpg"
            alt="Campus ISSTEK"
            style={{
              width: "100%",
              aspectRatio: "4/3",
              objectFit: "cover",
              borderRadius: 8,
              boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          {/* FOUNDED BADGE */}
          <div
            style={{
              position: "absolute",
              bottom: "-1rem",
              left: "-1rem",
              background: theme.primary,
              color: "#fff",
              padding: "1rem 1.2rem",
              borderRadius: 8,
              boxShadow: "0 10px 25px rgba(59,130,246,0.35)",
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.6rem",
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              2020
            </div>

            <div
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                fontWeight: 700,
                marginTop: "0.2rem",
              }}
            >
              {t.founded}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
