import { useState, useEffect } from "react";
import { theme } from "./theme";
import { Link } from "react-router-dom";

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

const PROGRAMS = {
  fr: [
    {
      slug: "bts-hnd",
      title: "BTS / HND",
      desc: "Formation professionnelle en 2 ans",
    },
    {
      slug: "licence-professionnelle",
      title: "Licence Professionnelle",
      desc: "Formation en 3 ans",
    },
    {
      slug: "master-professionnel",
      title: "Master Professionnel",
      desc: "Formation avancée en 5 ans",
    },
    {
      slug: "commerce-gestion",
      title: "Commerce & Gestion",
      desc: "Finance, Comptabilité, Marketing",
    },
    {
      slug: "informatique",
      title: "Informatique",
      desc: "Développement, Réseaux, Cybersécurité",
    },
    {
      slug: "sante",
      title: "Santé",
      desc: "Formations paramédicales",
    },
  ],

  en: [
    {
      slug: "bts-hnd",
      title: "BTS / HND",
      desc: "2-year professional training",
    },
    {
      slug: "professional-degree",
      title: "Professional Degree",
      desc: "3-year program",
    },
    {
      slug: "professional-master",
      title: "Professional Master",
      desc: "5-year advanced training",
    },
    {
      slug: "business-management",
      title: "Business & Management",
      desc: "Finance, Accounting, Marketing",
    },
    {
      slug: "computer-science",
      title: "Computer Science",
      desc: "Software, Networks, Cybersecurity",
    },
    {
      slug: "health-sciences",
      title: "Health Sciences",
      desc: "Medical and paramedical training",
    },
  ],
};

export default function NavBar({ lang = "fr", setLang }) {
  const t = T[lang] || T.fr;

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 9999,
          background: theme.bgLight,
          borderBottom: `1px solid ${theme.border}`,
          boxShadow: scrolled ? "0 6px 25px rgba(0,0,0,.06)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            height: 75,
            padding: "0 1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* LOGO */}
          <a
            href="#home"
            style={{
              textDecoration: "none",
              color: theme.primary,
              fontWeight: 800,
              fontSize: "1.5rem",
            }}
          >
            ISSTEK
          </a>

          {/* DESKTOP NAV */}
          <div className="desktop-nav">
            <a href="#home">{t.home}</a>
            <a href="#about">{t.about}</a>

            {/* PROGRAMS DROPDOWN */}
            <div
              className="mega-wrapper"
              onMouseEnter={() => setProgramsOpen(true)}
              onMouseLeave={() => setProgramsOpen(false)}
            >
              <span className="mega-trigger">{t.programs} ▾</span>

              {programsOpen && (
                <div className="mega-menu">
                  {PROGRAMS[lang].map((item) => (
                    <Link
                      key={item.slug}
                      to={`/programs/${item.slug}`}
                      className="mega-card"
                      onClick={() => setProgramsOpen(false)}
                    >
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a href="#scholarships">{t.scholarships}</a>
            <a href="#opendays">{t.openDoors}</a>
            <a href="#contact">{t.contact}</a>
          </div>

          {/* RIGHT SIDE */}
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              style={{
                border: `1px solid ${theme.primary}`,
                background: "#fff",
                color: theme.primary,
                padding: ".4rem .8rem",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>

            <a
              href="#contact"
              style={{
                background: theme.primary,
                color: "#fff",
                textDecoration: "none",
                padding: ".6rem 1rem",
                borderRadius: 6,
                fontWeight: 700,
              }}
            >
              {t.enroll}
            </a>

            <button
              className="mobile-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                border: "none",
                background: "none",
                fontSize: "1.7rem",
                cursor: "pointer",
                color: theme.primary,
              }}
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="mobile-menu">
            <a href="#home">{t.home}</a>
            <a href="#about">{t.about}</a>

            <div
              className="mobile-program-trigger"
              onClick={() => setProgramsOpen(!programsOpen)}
            >
              {t.programs}
            </div>

            {programsOpen &&
              PROGRAMS[lang].map((item) => (
                <Link
                  key={item.slug}
                  to={`/programs/${item.slug}`}
                  className="mobile-sub-link"
                  onClick={() => {
                    setMobileOpen(false);
                    setProgramsOpen(false);
                  }}
                >
                  • {item.title}
                </Link>
              ))}

            <a href="#scholarships">{t.scholarships}</a>
            <a href="#opendays">{t.openDoors}</a>
            <a href="#contact">{t.contact}</a>
          </div>
        )}
      </nav>

      <style>{`
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.8rem;
        }

        .desktop-nav a,
        .mega-trigger {
          text-decoration: none;
          color: ${theme.text};
          font-size: 0.92rem;
          font-weight: 500;
          cursor: pointer;
        }

        .mega-wrapper {
          position: relative;
          height: 75px;
          display: flex;
          align-items: center;
        }

        /* FIXED DROPDOWN POSITION (NO GAP BUG) */
        .mega-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);

          width: min(900px, 90vw);
          background: white;
          border-radius: 18px;
          border: 1px solid #eee;
          box-shadow: 0 20px 60px rgba(0,0,0,.12);
          padding: 1.5rem;

          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          z-index: 99999;
        }

        .mega-card {
          display: block;
          padding: 1rem;
          border-radius: 12px;
          text-decoration: none;
          transition: .25s;
        }

        .mega-card:hover {
          background: #f8fafc;
          transform: translateY(-2px);
        }

        .mega-card h4 {
          margin: 0 0 .5rem;
          color: ${theme.primary};
        }

        .mega-card p {
          margin: 0;
          color: #666;
          font-size: .82rem;
        }

        .mobile-btn {
          display: none;
        }

        .mobile-menu {
          background: white;
          border-top: 1px solid ${theme.border};
          padding: 1rem;
        }

        .mobile-menu a,
        .mobile-program-trigger {
          display: block;
          padding: .9rem 0;
          text-decoration: none;
          color: ${theme.text};
          border-bottom: 1px solid ${theme.border};
          cursor: pointer;
        }

        .mobile-sub-link {
          padding-left: 1rem !important;
          font-size: .9rem;
          color: #666 !important;
        }

        @media(max-width: 900px) {
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
