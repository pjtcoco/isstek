import { NavLink } from "react-router-dom";
import { theme } from "../../../theme";

export default function Sidebar({ open }) {
  const tabs = [
    { path: "/admin", label: "📊 Dashboard" },
    { path: "/admin/news", label: "📰 Actualités" },
    { path: "/admin/photos", label: "🖼️ Galerie" },
    { path: "/admin/enrollments", label: "📋 Inscriptions" },

    // ✅ NEW MESSAGES SECTION
    { path: "/admin/inbox", label: "📩 Messages" },

    { path: "/admin/settings", label: "⚙️ Paramètres" },
  ];

  return (
    <aside
      className={open ? "open" : ""}
      style={{
        width: 220,
        background: "#fff",
        borderRight: "1px solid #e5e7eb",
        padding: "1rem 0",
        minHeight: "100vh",
      }}
    >
      {tabs.map((t) => (
        <NavLink
          key={t.path}
          to={t.path}
          style={({ isActive }) => ({
            display: "block",
            padding: "0.8rem 1.2rem",
            textDecoration: "none",
            color: isActive ? theme.primary : "#4b5563",
            background: isActive ? "#eff6ff" : "transparent",
            fontWeight: isActive ? 700 : 500,
            borderLeft: isActive
              ? `3px solid ${theme.primary}`
              : "3px solid transparent",
          })}
        >
          {t.label}
        </NavLink>
      ))}
    </aside>
  );
}
