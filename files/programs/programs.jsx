import { Link } from "react-router-dom";
import { programs } from "./programs";
import { theme } from "../theme";
import Layout from "./Layout";

export default function Programs({ lang, setLang }) {
  return (
    <Layout lang={lang} setLang={setLang}>
      <div
        style={{
          background: theme.bgLight,
          minHeight: "100vh",
          padding: "4rem 1rem",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: theme.text,
            }}
          >
            Nos Formations
          </h1>

          <p style={{ color: theme.textSoft, maxWidth: 600, margin: "0 auto" }}>
            Découvrez nos parcours académiques adaptés au monde professionnel.
          </p>
        </div>

        {/* GRID */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {programs.map((program) => (
            <Link
              key={program.slug}
              to={`/programs/${program.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  overflow: "hidden",
                  border: `1px solid ${theme.border}`,
                  transition: "0.3s",
                }}
              >
                <img
                  src={program.image}
                  alt={program.title}
                  style={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                  }}
                />

                <div style={{ padding: "1rem" }}>
                  <h3>{program.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: theme.textSoft }}>
                    {program.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
