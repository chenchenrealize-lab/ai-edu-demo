import { COLORS } from "../../constants/colors";

export default function StatusBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 20px",
        fontSize: 12,
        color: "#fff",
        fontWeight: 600,
      }}
    >
      <span>14:32</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ fontSize: 11 }}>📶</span>
        <span style={{ fontSize: 11 }}>🔋</span>
      </div>
    </div>
  );
}
