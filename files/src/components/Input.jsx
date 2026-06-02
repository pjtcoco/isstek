export default function Input(props) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: "0.7rem 1rem",
        borderRadius: 6,
        border: "1px solid #e5e7eb",
        outline: "none",
        fontSize: "0.9rem",
      }}
    />
  );
}
