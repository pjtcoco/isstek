import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { COLORS, theme } from "../../../theme"; // or wherever you store it

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* TOPBAR */}
        <Topbar />

        {/* BODY WRAPPER (THIS IS WHAT YOU WERE MISSING) */}
        <main
          style={{
            flex: 1,
            background: COLORS.bg,
            padding: "1.5rem",
            overflowY: "auto",
          }}
        >
          {/* CONTENT CARD WRAPPER (IMPORTANT FOR UI DEPTH) */}
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
