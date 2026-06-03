import { programs } from "./programs";
import { theme } from "../theme";

export default function ProgramsCatalog() {
  return (
    <div style={{ background: theme.bgLight, minHeight: "100vh" }}>
      {/* HERO */}
      <div style={hero}>
        <h1 style={title}>Nos Formations</h1>
        <p style={subtitle}>
          Découvrez l’ensemble des cycles de formation de l’ISSTEK et leurs
          spécialités.
        </p>
      </div>

      {/* CONTENT */}
      <div style={container}>
        {programs.map((cycle, i) => (
          <div key={cycle.id} style={card}>
            <h2 style={cycleTitle}>{cycle.title}</h2>

            <div style={sectionsGrid}>
              {cycle.sections.map((sec) => (
                <div key={sec.title} style={sectionBox}>
                  <h3 style={sectionTitle}>{sec.title}</h3>

                  <div style={itemsGrid}>
                    {sec.items.map((item) => (
                      <div key={item} style={pill}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const hero = {
  textAlign: "center",
  padding: "4rem 1rem 2rem",
};

const title = {
  fontSize: "clamp(2rem, 4vw, 3rem)",
  fontFamily: "'Playfair Display', serif",
  marginBottom: "0.5rem",
  color: theme.text,
};

const subtitle = {
  color: theme.textSoft,
  maxWidth: 600,
  margin: "0 auto",
  lineHeight: 1.6,
};

const container = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "2rem 1rem 5rem",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
};

const card = {
  background: "#fff",
  borderRadius: 16,
  padding: "1.5rem",
  border: `1px solid ${theme.border}`,
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
};

const cycleTitle = {
  color: theme.primary,
  fontSize: "1.4rem",
  marginBottom: "1.5rem",
};

const sectionsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "1.2rem",
};

const sectionBox = {
  background: "#fafafa",
  padding: "1rem",
  borderRadius: 12,
};

const sectionTitle = {
  fontSize: "1rem",
  marginBottom: "0.7rem",
  color: theme.text,
};

const itemsGrid = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.4rem",
};

const pill = {
  fontSize: "0.8rem",
  padding: "0.35rem 0.6rem",
  borderRadius: 20,
  background: "rgba(15,76,129,0.08)",
  color: theme.primary,
  border: "1px solid rgba(15,76,129,0.2)",
};
