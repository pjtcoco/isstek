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
    <div>
      {/* HEADER ROW */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.4rem",
            fontWeight: 700,
            color: COLORS.text,
          }}
        >
          Tableau de bord
        </h2>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          style={{
            background: COLORS.primary,
            color: "#fff",
            border: "none",
            padding: "10px 14px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ← Retour au site
        </button>
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {cards.map((c) => (
          <div
            key={c.title}
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 12,
              padding: "1.2rem",
              boxShadow: COLORS.shadow,
            }}
          >
            <div style={{ fontSize: "0.8rem", color: COLORS.muted }}>
              {c.title}
            </div>

            <div
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: c.color,
              }}
            >
              {c.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
