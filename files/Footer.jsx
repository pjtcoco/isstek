import { theme } from "./theme";
import { useNavigate } from "react-router-dom";

const T = {
  fr: {
    tagline: "Institut Supérieur des Sciences et Technologies Kouam",
    quickLinks: "LIENS RAPIDES",
    extraLinks: "LIENS EXTRA",
    contactLabel: "CONTACT",
    home: "Accueil",
    programs: "Nos Formations",
    about: "À Propos",
    contact: "Contacts",
    questions: "Posez vos questions",
    privacy: "Politique de confidentialité",
    terms: "Nos Termes",
    adminLink: "Accès Administrateur",
    rights: "© 2025 ISSTEK. Tous droits réservés.",
    credit: "Redesigné avec React + Firebase",
  },
  en: {
    tagline: "Kouam Higher Institute of Science and Technology",
    quickLinks: "QUICK LINKS",
    extraLinks: "EXTRA LINKS",
    contactLabel: "CONTACT",
    home: "Home",
    programs: "Programs",
    about: "About",
    contact: "Contact",
    questions: "Ask Questions",
    privacy: "Privacy Policy",
    terms: "Terms",
    adminLink: "Admin Access",
    rights: "© 2025 ISSTEK. All rights reserved.",
    credit: "Redesigned with React + Firebase",
  },
};

export default function Footer({ lang }) {
  const t = T[lang];
  const navigate = useNavigate();

  const socials = [
    { label: "FB", href: "https://facebook.com" },
    { label: "IG", href: "#" },
    { label: "LI", href: "#" },
    { label: "YT", href: "#" },
  ];

  const linkStyle = {
    display: "block",
    fontSize: "0.82rem",
    color: theme.textMuted,
    textDecoration: "none",
    marginBottom: "0.5rem",
    transition: "0.2s",
  };

  return (
    <footer
      style={{
        background: theme.bgDark,
        padding: "clamp(3rem, 5vw, 4.5rem) 1.5rem 2rem",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          {/* BRAND */}
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.2rem",
                color: "#fff",
                marginBottom: "0.4rem",
              }}
            >
              ISSTEK
            </div>

            <p
              style={{
                fontSize: "0.78rem",
                color: theme.textMuted,
                lineHeight: 1.7,
                marginBottom: "1.2rem",
              }}
            >
              {t.tagline}
            </p>

            {/* SOCIALS */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: theme.textMuted,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    transition: "0.2s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = theme.primary)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.06)")
                  }
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <div
              style={{
                fontSize: "0.6rem",
                color: theme.primary,
                letterSpacing: "0.15em",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              {t.quickLinks}
            </div>

            {[
              { label: t.home, href: "#home" },
              { label: t.programs, href: "#programs" },
              { label: t.about, href: "#about" },
              { label: t.contact, href: "#contact" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={linkStyle}
                onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = theme.textMuted)
                }
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* EXTRA LINKS */}
          <div>
            <div
              style={{
                fontSize: "0.6rem",
                color: theme.primary,
                letterSpacing: "0.15em",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              {t.extraLinks}
            </div>

            {[t.questions, t.privacy, t.terms].map((text) => (
              <a
                key={text}
                href="#"
                style={linkStyle}
                onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = theme.textMuted)
                }
              >
                {text}
              </a>
            ))}

            {/* ADMIN FIXED LINK */}
            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin");
              }}
              style={{
                ...linkStyle,
                color: theme.primary,
                fontWeight: 700,
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = theme.primaryHover)
              }
              onMouseOut={(e) => (e.currentTarget.style.color = theme.primary)}
            >
              🔐 {t.adminLink}
            </a>
          </div>

          {/* CONTACT */}
          <div>
            <div
              style={{
                fontSize: "0.6rem",
                color: theme.primary,
                letterSpacing: "0.15em",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              {t.contactLabel}
            </div>

            {[
              "+237 677 699 402",
              "+237 698 942 412",
              "isstek@gmail.com",
              "Yaoundé, Cameroun",
            ].map((c) => (
              <div
                key={c}
                style={{
                  fontSize: "0.82rem",
                  color: theme.textMuted,
                  marginBottom: "0.4rem",
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          style={{
            borderTop: theme.border,
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span style={{ fontSize: "0.7rem", color: theme.textMuted }}>
            {t.rights}
          </span>

          <span style={{ fontSize: "0.7rem", color: theme.textMuted }}>
            Corine Leslie Zone Meli · {t.credit}
          </span>
        </div>
      </div>
    </footer>
  );
}
