import { COLORS } from "../../constants/colors";

const tabs = [
  { id: "errors", label: "错题本", icon: "📝" },
  { id: "analytics", label: "学情", icon: "📊" },
  { id: "review", label: "复习", icon: "🎯" },
  { id: "ecosystem", label: "生态", icon: "🔗" },
];

export default function TabBar({ activeTab, onTabChange }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 430,
        display: "flex",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: `1px solid ${COLORS.border}`,
        zIndex: 100,
        padding: "6px 0 env(safe-area-inset-bottom, 20px) 0",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            padding: "8px 0",
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <span
            style={{
              fontSize: 22,
              filter: activeTab === tab.id ? "none" : "grayscale(0.6)",
              transform: activeTab === tab.id ? "scale(1.2)" : "scale(1)",
              transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {tab.icon}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? COLORS.primary : COLORS.textMuted,
              transition: "all 0.2s",
            }}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}
