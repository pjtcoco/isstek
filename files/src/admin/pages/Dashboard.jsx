import { useNews } from "../../hooks/useNews";
import { useEnrollments } from "../../hooks/useEnrollments";
import { COLORS } from "../../../theme";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { news } = useNews();
  const { enrollments } = useEnrollments();
  const navigate = useNavigate();

  const cards = [
    {
      title: "Inscriptions",
      value: enrollments?.length || 0,
      color: COLORS.primary,
    },
    {
      title: "News",
      value: news?.length || 0,
      color: "#2563EB",
    },
    {
      title: "En attente",
      value: enrollments?.filter((e) => e.status === "En attente").length || 0,
      color: "#F59E0B",
    },
    {
      title: "Confirmées",
      value: enrollments?.filter((e) => e.status === "Confirmé").length || 0,
      color: "#10B981",
    },
  ];

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>Tableau de bord</h2>

        <button onClick={() => navigate("/")} style={styles.button}>
          ← Retour au site
        </button>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {cards.map((c) => (
          <div key={c.title} style={styles.card}>
            <div style={styles.cardTitle}>{c.title}</div>
            <div style={{ ...styles.value, color: c.color }}>{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── RESPONSIVE STYLES ───────── */

const styles = {
  page: {
    padding: "clamp(1rem, 3vw, 2rem)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap", // 🔥 IMPORTANT for mobile
    gap: "1rem",
    marginBottom: "1.5rem",
  },

  title: {
    fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
    fontWeight: 700,
    margin: 0,
    color: COLORS.text,
  },

  button: {
    background: COLORS.primary,
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "1rem",
  },

  card: {
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 12,
    padding: "clamp(1rem, 2vw, 1.2rem)",
    boxShadow: COLORS.shadow,
  },

  cardTitle: {
    fontSize: "0.8rem",
    color: COLORS.muted,
    marginBottom: "0.5rem",
  },

  value: {
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 700,
  },
};
