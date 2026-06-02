export default function Badge({ children, color }) {
  return (
    <span
      style={{
        padding: "0.2rem 0.5rem",
        borderRadius: 999,
        fontSize: "0.65rem",
        fontWeight: 700,
        background: color?.bg || "#f3f4f6",
        color: color?.text || "#374151",
      }}
    >
      {children}
    </span>
  );
}
