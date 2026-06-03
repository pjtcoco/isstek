import NavBar from "../NavBar";
import { theme } from "../theme";

export default function Layout({ children, lang, setLang }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: theme.bgLight,
        color: theme.text,
      }}
    >
      {/* NAVBAR */}
      <NavBar lang={lang} setLang={setLang} />

      {/* PAGE CONTENT */}
      <main
        style={{
          flex: 1,
          width: "100%",
          paddingTop: "1rem",
        }}
      >
        {children}
      </main>

      {/* FOOTER */}
      <footer
        style={{
          marginTop: "4rem",
          background: "#0b1220",
          color: "#e2e8f0",
          padding: "4rem 1rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {/* BRAND */}
          <div>
            <h3 style={{ marginBottom: "1rem", color: "#fff" }}>ISSTEK</h3>
            <p
              style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "#94a3b8" }}
            >
              Institut Supérieur de Sciences et Techniques de l’Éducation et de
              la Connaissance. Former les leaders de demain à travers une
              formation moderne et professionnelle.
            </p>
          </div>

          {/* NAVIGATION */}
          <div>
            <h4 style={{ marginBottom: "1rem", color: "#fff" }}>Navigation</h4>
            {["Accueil", "Formations", "À Propos", "Contact"].map((item) => (
              <div
                key={item}
                style={{
                  fontSize: "0.85rem",
                  color: "#94a3b8",
                  marginBottom: "0.5rem",
                  cursor: "pointer",
                }}
              >
                {item}
              </div>
            ))}
          </div>

          {/* CONTACT */}
          <div>
            <h4 style={{ marginBottom: "1rem", color: "#fff" }}>Contact</h4>
            <p style={smallText}>📍 Cameroun</p>
            <p style={smallText}>📧 contact@isstek.org</p>
            <p style={smallText}>📞 +237 XXX XXX XXX</p>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          style={{
            marginTop: "3rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "1.2rem",
            textAlign: "center",
            fontSize: "0.8rem",
            color: "#64748b",
          }}
        >
          © {new Date().getFullYear()} ISSTEK — All rights reserved
        </div>
      </footer>
    </div>
  );
}

const smallText = {
  fontSize: "0.85rem",
  color: "#94a3b8",
  marginBottom: "0.4rem",
};
