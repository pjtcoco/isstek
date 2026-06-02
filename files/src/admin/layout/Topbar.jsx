import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin");
  };

  return (
    <div
      style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.5rem",
        borderBottom: "1px solid #e5e7eb",
        background: "#fff",
      }}
    >
      {/* LEFT */}
      <div>
        <h2
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            margin: 0,
            color: "#1e3a8a",
          }}
        >
          ISSTEK Admin
        </h2>
        <p style={{ fontSize: "0.7rem", margin: 0, color: "#6b7280" }}>
          Tableau de gestion
        </p>
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
          admin@isstek.org
        </span>

        <button
          onClick={handleLogout}
          style={{
            padding: "0.4rem 0.8rem",
            borderRadius: 6,
            border: "1px solid #dc2626",
            background: "transparent",
            color: "#dc2626",
            fontWeight: 600,
            fontSize: "0.75rem",
            cursor: "pointer",
          }}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}
