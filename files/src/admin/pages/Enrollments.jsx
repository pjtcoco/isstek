import { useState } from "react";
import { useEnrollments } from "../../hooks/useEnrollments";
import { theme } from "../../../theme";

export default function Enrollments() {
  const {
    enrollments = [],
    loading,
    updateEnrollment,
    deleteEnrollment,
  } = useEnrollments();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  if (loading) {
    return (
      <div style={{ padding: "2rem" }}>Chargement des inscriptions... </div>
    );
  }

  const filtered = enrollments.filter((e) => {
    const matchesSearch =
      (e.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.email || "").toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "all" || e.status === filter;

    return matchesSearch && matchesFilter;
  });

  const badgeStyle = (status) => {
    switch (status) {
      case "Confirmé":
        return {
          background: "#DCFCE7",
          color: "#166534",
        };

      case "Rejeté":
        return {
          background: "#FEE2E2",
          color: "#991B1B",
        };

      default:
        return {
          background: "#FEF3C7",
          color: "#92400E",
        };
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1
        style={{
          marginBottom: "2rem",
          color: theme.text,
        }}
      >
        Gestion des Inscriptions{" "}
      </h1>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "1.2rem",
            borderRadius: 16,
            boxShadow: theme.shadow,
          }}
        >
          <strong>Total</strong>
          <div>{enrollments.length}</div>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "1.2rem",
            borderRadius: 16,
            boxShadow: theme.shadow,
          }}
        >
          <strong>Confirmés</strong>
          <div>{enrollments.filter((e) => e.status === "Confirmé").length}</div>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "1.2rem",
            borderRadius: 16,
            boxShadow: theme.shadow,
          }}
        >
          <strong>Rejetés</strong>
          <div>{enrollments.filter((e) => e.status === "Rejeté").length}</div>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "1.2rem",
            borderRadius: 16,
            boxShadow: theme.shadow,
          }}
        >
          <strong>En attente</strong>
          <div>
            {
              enrollments.filter((e) => !e.status || e.status === "En attente")
                .length
            }
          </div>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1.5rem",
        }}
      >
        <input
          type="text"
          placeholder="Rechercher un étudiant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: 250,
            padding: "12px",
            borderRadius: 10,
            border: `1px solid ${theme.border}`,
          }}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: 10,
            border: `1px solid ${theme.border}`,
          }}
        >
          <option value="all">Tous</option>
          <option value="En attente">En attente</option>
          <option value="Confirmé">Confirmés</option>
          <option value="Rejeté">Rejetés</option>
        </select>
      </div>

      {/* TABLE */}
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: theme.shadow,
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: theme.primary,
                color: "#fff",
              }}
            >
              <th style={{ padding: "16px", textAlign: "left" }}>Nom</th>

              <th style={{ padding: "16px", textAlign: "left" }}>Email</th>

              <th style={{ padding: "16px", textAlign: "left" }}>Statut</th>

              <th style={{ padding: "16px", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((e) => (
              <tr
                key={e.id}
                style={{
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <td style={{ padding: "16px" }}>{e.name || "-"}</td>

                <td style={{ padding: "16px" }}>{e.email || "-"}</td>

                <td style={{ padding: "16px" }}>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: 999,
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      ...badgeStyle(e.status),
                    }}
                  >
                    {e.status || "En attente"}
                  </span>
                </td>

                <td style={{ padding: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={() =>
                        updateEnrollment(e.id, {
                          status: "Confirmé",
                        })
                      }
                      style={{
                        background: "#16A34A",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      Confirmer
                    </button>

                    <button
                      onClick={() =>
                        updateEnrollment(e.id, {
                          status: "Rejeté",
                        })
                      }
                      style={{
                        background: "#DC2626",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      Rejeter
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm("Supprimer cette inscription ?")) {
                          deleteEnrollment(e.id);
                        }
                      }}
                      style={{
                        background: "#fff",
                        color: "#DC2626",
                        border: "1px solid #DC2626",
                        padding: "8px 12px",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
