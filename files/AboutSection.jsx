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
        padding: "clamp(4rem,6vw,7rem) 1.5rem",
        background: theme.bgLight,
      }}
    >
      <div
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* LEFT CONTENT */}{" "}
        <div>
          <div
            style={{
              fontSize: ".7rem",
              color: theme.primary,
              letterSpacing: ".2em",
              fontWeight: 700,
              marginBottom: ".8rem",
            }}
          >
            — {t.label}{" "}
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem,4vw,3.8rem)",
              lineHeight: 1.1,
              color: theme.text,
              marginBottom: "1.5rem",
            }}
          >
            {t.title}
          </h2>

          <p
            style={{
              color: theme.textSoft,
              lineHeight: 1.9,
              marginBottom: "1.8rem",
            }}
          >
            {t.body}
          </p>

          <div
            style={{
              padding: "1rem 1.2rem",
              background: `${theme.primary}10`,
              borderLeft: `4px solid ${theme.primary}`,
              borderRadius: 6,
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                color: theme.primary,
                fontSize: ".7rem",
                fontWeight: 700,
                marginBottom: ".4rem",
              }}
            >
              {t.decreeLabel}
            </div>

            <div
              style={{
                color: theme.textSoft,
                lineHeight: 1.6,
                fontSize: ".9rem",
              }}
            >
              {t.decree}
            </div>
          </div>

          <div
            style={{
              marginBottom: "2rem",
              color: theme.textSoft,
            }}
          >
            📍 {t.location}
          </div>

          <a
            href="#programs"
            style={{
              display: "inline-block",
              background: theme.primary,
              color: "#fff",
              padding: "1rem 2rem",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            {t.cta}
          </a>
        </div>
        {/* RIGHT SIDE */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* CAMPUS IMAGE */}
          <div
            style={{
              position: "relative",
              borderRadius: 20,
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 20px 50px rgba(0,0,0,.12)",
            }}
          >
            <img
              src="https://isstek.org/images/isstek1.jpg"
              alt="Campus ISSTEK"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: 20,
                background: theme.primary,
                color: "#fff",
                padding: "1rem 1.2rem",
                borderRadius: 12,
                boxShadow: "0 10px 30px rgba(0,0,0,.25)",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                2020
              </div>

              <div
                style={{
                  fontSize: ".7rem",
                  marginTop: ".3rem",
                  letterSpacing: ".1em",
                }}
              >
                {t.founded}
              </div>
            </div>
          </div>

          {/* VIDEO */}
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,.12)",
              background: "#000",
            }}
          >
            {/* <video
              controls
              preload="metadata"
              poster="https://isstek.org/images/isstek1.jpg"
              style={{
                width: "100%",
                display: "block",
              }}
            >
              <source src="/videos/isstek-campus.mp4" type="video/mp4" />
            </video> */}
          </div>

          {/* STATS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "1rem",
            }}
          >
            {[
              ["5000+", "Étudiants"],
              ["20+", "Filières"],
              ["95%", "Insertion"],
            ].map(([value, label]) => (
              <div
                key={label}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "1rem",
                  textAlign: "center",
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div
                  style={{
                    color: theme.primary,
                    fontSize: "1.4rem",
                    fontWeight: 800,
                  }}
                >
                  {value}
                </div>

                <div
                  style={{
                    color: theme.textSoft,
                    fontSize: ".8rem",
                    marginTop: ".3rem",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
