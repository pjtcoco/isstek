import { NavLink } from "react-router-dom";

export default function Sidebar({ open }) {
  const tabs = [
    { path: "/admin", label: "📊 Dashboard" },
    { path: "/admin/news", label: "📰 Actualités" },
    { path: "/admin/photos", label: "🖼️ Galerie" },
    { path: "/admin/enrollments", label: "📋 Inscriptions" },
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
            color: isActive ? "#1e3a8a" : "#4b5563",
            background: isActive ? "#eff6ff" : "transparent",
            fontWeight: isActive ? 700 : 500,
          })}
        >
          {t.label}
        </NavLink>
      ))}
    </aside>
  );
}
