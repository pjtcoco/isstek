import { useNews } from "../../hooks/useNews";
import { COLORS } from "../../../theme"; // adjust path if needed

export default function News() {
  const { news, addNews, deleteNews, updateNews } = useNews();

  return (
    <div>
      {/* TITLE */}
      <h2
        style={{
          fontSize: "1.4rem",
          fontWeight: 700,
          marginBottom: "1.5rem",
          color: COLORS.text,
        }}
      >
        Actualités
      </h2>

      {/* ADD BUTTON */}
      <button
        onClick={() =>
          addNews({
            title: "Nouvel article",
            body: "Contenu...",
            published: true,
            date: new Date().toISOString().split("T")[0],
          })
        }
        style={{
          padding: "0.6rem 1rem",
          borderRadius: 8,
          border: "none",
          background: COLORS.primary,
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
          marginBottom: "1.5rem",
        }}
      >
        + Ajouter un article
      </button>

      {/* LIST */}
      <div style={{ display: "grid", gap: "1rem" }}>
        {news?.map((n) => (
          <div
            key={n.id}
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 12,
              padding: "1rem",
              boxShadow: COLORS.shadow,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {/* LEFT CONTENT */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: COLORS.text,
                }}
              >
                {n.title}
              </div>

              <div
                style={{
                  fontSize: "0.75rem",
                  color: COLORS.muted,
                  marginTop: "0.3rem",
                }}
              >
                {n.date}
              </div>

              <p
                style={{
                  fontSize: "0.85rem",
                  color: COLORS.textSecondary,
                  marginTop: "0.6rem",
                  lineHeight: 1.5,
                }}
              >
                {n.body || "Aucun contenu"}
              </p>

              {/* STATUS BADGE */}
              <span
                style={{
                  display: "inline-block",
                  marginTop: "0.8rem",
                  fontSize: "0.7rem",
                  padding: "0.25rem 0.6rem",
                  borderRadius: 999,
                  fontWeight: 700,
                  background: n.published ? "#dcfce7" : "#fef3c7",
                  color: n.published ? "#166534" : "#92400e",
                }}
              >
                {n.published ? "Publié" : "Brouillon"}
              </span>
            </div>

            {/* ACTIONS */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => updateNews(n.id, { published: !n.published })}
                style={{
                  padding: "0.4rem 0.7rem",
                  borderRadius: 6,
                  border: `1px solid ${COLORS.primary}`,
                  background: "#fff",
                  color: COLORS.primary,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {n.published ? "Dépublier" : "Publier"}
              </button>

              <button
                onClick={() => deleteNews(n.id)}
                style={{
                  padding: "0.4rem 0.7rem",
                  borderRadius: 6,
                  border: "none",
                  background: "#dc2626",
                  color: "#fff",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
