import { COLORS } from "../../constants/colors";
import AnimatedNumber from "./AnimatedNumber";

export default function HeaderArea() {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #4F6EF7 0%, #6B85FA 60%, #F8F9FC 100%)",
        paddingTop: 0,
        paddingBottom: 4,
      }}
    >
      {/* Top bar: user info + streak */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px 14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            🎓
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>
              元宝 · 学习中心
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>
              高二 · 理科 · 第二学期
            </div>
          </div>
        </div>
        <div
          style={{
            padding: "6px 14px",
            borderRadius: 20,
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            fontSize: 12,
            fontWeight: 600,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          🔥 5天连续学习
        </div>
      </div>

      {/* Quick stats */}
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: "0 20px 20px",
          overflowX: "auto",
        }}
      >
        {[
          { label: "今日待复习", value: 6, suffix: "题", icon: "📝", urgent: true },
          { label: "本周掌握", value: 12, suffix: "题", icon: "✅", urgent: false },
          { label: "学力提升", value: 3, prefix: "+", suffix: "分", icon: "📈", urgent: false },
        ].map((s, i) => (
          <div
            key={i}
            className="stagger-item"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: 14,
              padding: "12px 16px",
              minWidth: 110,
              flex: 1,
              boxShadow: "0 4px 16px rgba(79,110,247,0.15)",
              border: s.urgent
                ? "1px solid rgba(255,107,53,0.3)"
                : "1px solid rgba(255,255,255,0.5)",
              animationDelay: `${i * 0.08}s`,
            }}
          >
            <div style={{ fontSize: 16, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.text }}>
              {s.prefix || ""}
              <AnimatedNumber value={s.value} />
              {s.suffix}
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
