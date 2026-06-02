import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../theme";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await loginUser(email, password);
      navigate("/admin");
    } catch {
      setError("Email ou mot de passe incorrect");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: theme.bgSection,
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          borderRadius: 20,
          padding: "2.5rem",
          boxShadow: theme.shadow,
          border: `1px solid ${theme.border}`,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              color: theme.primary,
              margin: 0,
              fontSize: "2rem",
            }}
          >
            ISSTEK
          </h1>

          <p
            style={{
              color: theme.textSecondary,
              marginTop: "0.5rem",
            }}
          >
            Administration Portal
          </p>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              color: theme.text,
              fontWeight: 600,
            }}
          >
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@isstek.cm"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 10,
              border: `1px solid ${theme.border}`,
              fontSize: "0.95rem",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              color: theme.text,
              fontWeight: 600,
            }}
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 10,
              border: `1px solid ${theme.border}`,
              fontSize: "0.95rem",
            }}
          />
        </div>

        {error && (
          <div
            style={{
              background: "#FEE2E2",
              color: "#DC2626",
              padding: "10px",
              borderRadius: 8,
              marginBottom: "1rem",
              fontSize: "0.9rem",
            }}
          >
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            background: theme.primary,
            color: "#fff",
            border: "none",
            padding: "14px",
            borderRadius: 10,
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <div
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: theme.textMuted,
            fontSize: "0.8rem",
          }}
        >
          ISSTEK Administration System
        </div>
      </div>
    </div>
  );
}
