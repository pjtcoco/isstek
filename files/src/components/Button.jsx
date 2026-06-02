export default function Button({ children, onClick, variant = "primary" }) {
  const base = {
    padding: "0.6rem 1rem",
    borderRadius: 6,
    fontWeight: 600,
    fontSize: "0.8rem",
    cursor: "pointer",
    border: "none",
  };

  const styles = {
    primary: { background: "#1e3a8a", color: "#fff" },
    danger: { background: "#dc2626", color: "#fff" },
    ghost: {
      background: "transparent",
      border: "1px solid #1e3a8a",
      color: "#1e3a8a",
    },
  };

  return (
    <button style={{ ...base, ...styles[variant] }} onClick={onClick}>
      {children}
    </button>
  );
}
