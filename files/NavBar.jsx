import { useState, useEffect } from "react";
import { theme } from "./theme";

const T = {
  fr: {
    home: "Accueil",
    programs: "Nos Formations",
    about: "À Propos",
    scholarships: "Bourses",
    openDoors: "Portes Ouvertes",
    contact: "Contacts",
    enroll: "S'inscrire",
  },
  en: {
    home: "Home",
    programs: "Programs",
    about: "About",
    scholarships: "Scholarships",
    openDoors: "Open Days",
    contact: "Contact",
    enroll: "Enroll",
  },
};

export default function NavBar({ lang, setLang }) {
  const t = T[lang];

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.home, href: "#home" },
    { label: t.about, href: "#about" },
    { label: t.programs, href: "#programs" },
    { label: t.scholarships, href: "#scholarships" },
    { label: t.openDoors, href: "#opendays" },
    { label: t.contact, href: "#contact" },
  ];

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 9999,
          background: scrolled ? theme.bgLight : theme.bgLight,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 1rem",
            height: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LOGO */}
          <a
            href="#home"
            style={{
              fontWeight: 800,
              fontSize: "1.4rem",
              color: theme.primary,
              textDecoration: "none",
            }}
          >
            ISSTEK
          </a>

          {/* DESKTOP NAV */}
          <div className="desktop-nav">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  textDecoration: "none",
                  color: theme.text,
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* ACTIONS */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
            <button
              type="button"
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              style={{
                border: `1px solid ${theme.primary}`,
                background: "#fff",
                color: theme.primary,
                padding: "0.35rem 0.7rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>

            <a
              href="#contact"
              style={{
                background: theme.primary,
                color: "#fff",
                padding: "0.5rem 1rem",
                fontSize: "0.8rem",
                fontWeight: 700,
                textDecoration: "none",
                borderRadius: 4,
              }}
            >
              {t.enroll}
            </a>

            {/* MOBILE BUTTON */}
            <button
              type="button"
              className="mobile-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: "none",
                border: "none",
                fontSize: "1.6rem",
                color: theme.primary,
                cursor: "pointer",
              }}
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div
            style={{
              borderTop: `1px solid ${theme.border}`,
              background: "#fff",
              padding: "1rem",
            }}
          >
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "0.8rem 0",
                  textDecoration: "none",
                  color: theme.text,
                  borderBottom: `1px solid ${theme.border}`,
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* RESPONSIVE CSS */}
      <style>{`
        .desktop-nav {
          display: flex;
          gap: 1.8rem;
        }

        .mobile-btn {
          display: none;
        }

        @media (max-width: 900px) {
          .desktop-nav {
            display: none;
          }

          .mobile-btn {
            display: block;
          }
        }
      `}</style>
    </>
  );
}
