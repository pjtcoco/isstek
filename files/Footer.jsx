import { theme } from "./theme";
import { useNavigate } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

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
    {
      icon: <FaFacebookF />,
      href: "https://facebook.com",
      color: "#1877F2",
    },
    {
      icon: <FaInstagram />,
      href: "https://instagram.com",
      color: "#E4405F",
    },
    {
      icon: <FaLinkedinIn />,
      href: "https://linkedin.com",
      color: "#0A66C2",
    },
    {
      icon: <FaYoutube />,
      href: "https://youtube.com",
      color: "#FF0000",
    },
  ];
  const linkStyle = {
    display: "block",
    fontSize: "0.82rem",
    color: theme.textMuted,
    textDecoration: "none",
    marginBottom: "0.5rem",
    transition: "0.25s ease",
  };

  return (
    <footer
      style={{
        background: theme.bgDark,
        padding: "clamp(3rem,5vw,4.5rem) 1.5rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          {/* BRAND */}
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.35rem",
                color: "#fff",
                marginBottom: ".5rem",
              }}
            >
              ISSTEK
            </div>
            <p
              style={{
                fontSize: ".82rem",
                color: theme.textMuted,
                lineHeight: 1.8,
                marginBottom: "1.5rem",
              }}
            >
              {t.tagline}
            </p>
            ```jsx
            {/* SOCIAL ICONS */}
            <div
              style={{
                display: "flex",
                gap: ".75rem",
              }}
            >
              {socials.map((s, index) => (
                <a
                  key={index}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "1rem",
                    transition: "all .35s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = s.color;
                    e.currentTarget.style.transform =
                      "translateY(-4px) scale(1.08)";
                    e.currentTarget.style.boxShadow = `0 12px 30px ${s.color}66`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <div
              style={{
                fontSize: ".65rem",
                color: theme.primary,
                letterSpacing: ".15em",
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
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = theme.textMuted)
                }
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* EXTRA */}
          <div>
            <div
              style={{
                fontSize: ".65rem",
                color: theme.primary,
                letterSpacing: ".15em",
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
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = theme.textMuted)
                }
              >
                {text}
              </a>
            ))}

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
                marginTop: "1rem",
              }}
            >
              🔐 {t.adminLink}
            </a>
          </div>

          {/* CONTACT */}
          <div>
            <div
              style={{
                fontSize: ".65rem",
                color: theme.primary,
                letterSpacing: ".15em",
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
                  fontSize: ".82rem",
                  color: theme.textMuted,
                  marginBottom: ".45rem",
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
            gap: ".5rem",
          }}
        >
          <span
            style={{
              fontSize: ".75rem",
              color: theme.textMuted,
            }}
          >
            {t.rights}
          </span>

          <span
            style={{
              fontSize: ".75rem",
              color: theme.textMuted,
            }}
          >
            Corine Leslie Zone Meli · {t.credit}
          </span>
        </div>
      </div>
    </footer>
  );
}
