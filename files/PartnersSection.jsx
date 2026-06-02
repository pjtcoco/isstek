import { theme } from "./theme";

const T = {
  fr: {
    label: "NOS PARTENAIRES & TUTELLES",
    title: "Reconnus\nMondialement.",
  },
  en: {
    label: "OUR PARTNERS & AFFILIATES",
    title: "Globally\nRecognized.",
  },
};

const PARTNERS = [
  { name: "UIT de Bandjoun", img: "https://isstek.org/images/IUT_Banjoun.PNG" },
  {
    name: "Ontario Technologies",
    img: "https://isstek.org/images/ontario_tech.PNG",
  },
  { name: "UCLouvain", img: "https://isstek.org/images/UCL.PNG" },
  {
    name: "Université Libre de Bruxelles",
    img: "https://isstek.org/images/ULB.PNG",
  },
  {
    name: "Université de Ngaoundéré",
    img: "https://isstek.org/images/univ_ngaoundere.jpg",
  },
  {
    name: "Université de Dschang",
    img: "https://isstek.org/images/univ_dschang.png",
  },
];

export default function PartnersSection({ lang }) {
  const t = T[lang];

  return (
    <section
      id="partners"
      style={{
        background: theme.bgDark,
        padding: "clamp(4rem, 8vw, 6rem) 1.5rem",
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
              marginBottom: "0.75rem",
            }}
          >
            — {t.label}
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              color: "#fff",
              lineHeight: 1.1,
              whiteSpace: "pre-line",
            }}
          >
            {t.title}
          </h2>
        </div>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "1.5rem 1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.primary;
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.background = "rgba(10, 77, 162, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              {/* IMAGE WRAPPER (FIXED) */}
              <div
                style={{
                  width: "100%",
                  height: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={partner.img}
                  alt={partner.name}
                  loading="lazy"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* NAME */}
              <div
                style={{
                  fontSize: "0.78rem",
                  color: theme.textMuted,
                  textAlign: "center",
                  fontWeight: 500,
                }}
              >
                {partner.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
