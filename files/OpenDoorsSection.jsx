import { theme } from "./theme";

const T = {
  fr: {
    label: "JOURNÉES PORTES OUVERTES",
    title: "Venez Nous\nDécouvrir.",
    body: "Les Journées Portes Ouvertes de l'ISSTEK sont destinées à vous présenter nos différents cursus, permettre de mieux nous connaître et de poser vos questions. Nos équipes pédagogiques seront ravies de vous accompagner.",
    cta: "EN SAVOIR PLUS",
  },
  en: {
    label: "OPEN DAYS",
    title: "Come\nDiscover Us.",
    body: "ISSTEK Open Days are designed to present our various programs, let you get to know us better and answer all your questions. Our teaching teams will be delighted to guide you.",
    cta: "LEARN MORE",
  },
};

const GALLERY = [
  "https://isstek.org/images/labo_info.jpeg",
  "https://isstek.org/images/labo_gmh2.jpeg",
  "https://isstek.org/images/diplomation5.jpeg",
  "https://isstek.org/images/labo_sante1.jpeg",
];

export default function OpenDoorsSection({ lang }) {
  const t = T[lang];

  return (
    <>
      <style>{`
        .open-doors-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 4rem;
          align-items: center;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .gallery-img {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          border-radius: 10px;
          display: block;
          transition: transform 0.3s ease;
        }

        .gallery-img:hover {
          transform: scale(1.04);
        }

        @media (max-width: 992px) {
          .open-doors-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section
        id="opendays"
        style={{
          padding: "clamp(4rem, 8vw, 7rem) 1.5rem",
          background: theme.bgLight,
        }}
      >
        <div
          className="open-doors-grid"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
          {/* Text Section */}
          <div>
            <div
              style={{
                fontSize: "0.65rem",
                color: theme.primary,
                letterSpacing: "0.22em",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              — {t.label}
            </div>

            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                color: theme.text,
                lineHeight: 1.1,
                marginBottom: "1.5rem",
                whiteSpace: "pre-line",
              }}
            >
              {t.title}
            </h2>

            <p
              style={{
                fontSize: "1rem",
                color: theme.textSecondary,
                lineHeight: 1.8,
                marginBottom: "2rem",
                maxWidth: 600,
              }}
            >
              {t.body}
            </p>

            <a
              href="#contact"
              style={{
                display: "inline-block",
                background: "transparent",
                color: theme.primary,
                fontWeight: 700,
                fontSize: "0.8rem",
                padding: "0.9rem 2rem",
                textDecoration: "none",
                letterSpacing: "0.08em",
                border: `2px solid ${theme.primary}`,
                borderRadius: 6,
                transition: "all 0.25s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = theme.primary;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = theme.primary;
              }}
            >
              {t.cta}
            </a>
          </div>

          {/* Gallery */}
          <div className="gallery-grid">
            {GALLERY.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`ISSTEK ${index + 1}`}
                className="gallery-img"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
