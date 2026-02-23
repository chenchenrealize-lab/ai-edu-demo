import { useState } from "react";
import { COLORS } from "../constants/colors";
import { ERROR_QUESTIONS } from "../constants/mockData";
import AnimatedNumber from "./common/AnimatedNumber";
import SocraticChat from "./SocraticChat";

const ERROR_LEVEL_STYLES = {
  表层错误: { bg: "#DBEAFE", color: "#2563EB", bar: "#2563EB" },
  概念迷雾: { bg: "#FEF3C7", color: "#D97706", bar: "#D97706" },
  策略偏差: { bg: "#FEE2E2", color: "#DC2626", bar: "#DC2626" },
  思维惯性: { bg: "#E0E7FF", color: "#4338CA", bar: "#4338CA" },
};

export default function ErrorBookTab() {
  const [filterSubject, setFilterSubject] = useState("全部");
  const [expandedId, setExpandedId] = useState(null);
  const [guideQuestionId, setGuideQuestionId] = useState(null);

  const filtered =
    filterSubject === "全部"
      ? ERROR_QUESTIONS
      : ERROR_QUESTIONS.filter((q) => q.subject === filterSubject);

  const levelStyle = (level) =>
    ERROR_LEVEL_STYLES[level] || { bg: "#F3F4F6", color: "#6B7280", bar: "#6B7280" };

  // Socratic chat mode
  if (guideQuestionId !== null) {
    const q = ERROR_QUESTIONS.find((e) => e.id === guideQuestionId);
    return (
      <div style={{ padding: "0 20px", paddingBottom: 100 }}>
        <SocraticChat
          question={q}
          onBack={() => setGuideQuestionId(null)}
        />
      </div>
    );
  }

  return (
    <div style={{ padding: "0 20px", paddingBottom: 100 }}>
      {/* Section title */}
      <div style={{ padding: "4px 0 12px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 2,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "linear-gradient(135deg, #4F6EF7, #7B93FF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              boxShadow: "0 4px 12px rgba(79,110,247,0.3)",
            }}
          >
            📝
          </div>
          <div>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: COLORS.text,
                margin: 0,
              }}
            >
              智能错题本
            </h2>
            <p
              style={{
                fontSize: 12,
                color: COLORS.textSecondary,
                margin: 0,
              }}
            >
              已收集 {ERROR_QUESTIONS.length} 道错题 · 自动归因分析
            </p>
          </div>
        </div>
      </div>

      {/* Stats summary: 待复习 / 复习中 / 已掌握 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
          marginBottom: 16,
        }}
      >
        {[
          { label: "待复习", value: 12, color: COLORS.danger, icon: "🔴" },
          { label: "复习中", value: 8, color: COLORS.warning, icon: "🟡" },
          { label: "已掌握", value: 44, color: COLORS.success, icon: "🟢" },
        ].map((s, i) => (
          <div
            key={i}
            className="stagger-item"
            style={{
              background: COLORS.card,
              borderRadius: 14,
              padding: "14px 12px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              animationDelay: `${i * 0.08}s`,
            }}
          >
            <div style={{ fontSize: 16, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>
              <AnimatedNumber value={s.value} />
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Subject filter chips */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {["全部", "数学", "英语", "物理", "语文"].map((s) => (
          <button
            key={s}
            onClick={() => setFilterSubject(s)}
            style={{
              padding: "7px 18px",
              borderRadius: 20,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: "nowrap",
              background: filterSubject === s ? COLORS.primary : COLORS.card,
              color: filterSubject === s ? "#fff" : COLORS.textSecondary,
              boxShadow:
                filterSubject === s
                  ? "0 4px 12px rgba(79,110,247,0.3)"
                  : "0 1px 4px rgba(0,0,0,0.06)",
              transition: "all 0.2s",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Error question cards */}
      {filtered.map((q, idx) => {
        const ls = levelStyle(q.errorLevel);
        const isExpanded = expandedId === q.id;

        return (
          <div
            key={q.id}
            className="stagger-item"
            style={{
              background: COLORS.card,
              borderRadius: 16,
              padding: 16,
              marginBottom: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              borderLeft: `4px solid ${ls.bar}`,
              animationDelay: `${idx * 0.08}s`,
            }}
          >
            {/* Top row: error level tag + subject + date */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 700,
                    background: ls.bg,
                    color: ls.color,
                  }}
                >
                  {q.errorLevel}
                </span>
                <span style={{ fontSize: 12, color: COLORS.textMuted }}>
                  {q.subject} · {q.topic}
                </span>
              </div>
              <span style={{ fontSize: 11, color: COLORS.textMuted }}>
                {q.date}
              </span>
            </div>

            {/* Question text */}
            <div
              style={{
                fontSize: 14,
                color: COLORS.text,
                lineHeight: 1.7,
                marginBottom: 12,
                fontWeight: 500,
              }}
            >
              {q.question}
            </div>

            {/* Answer comparison */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  background: COLORS.dangerLight,
                  borderRadius: 10,
                  padding: "8px 12px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: COLORS.danger,
                    fontWeight: 700,
                    marginBottom: 2,
                  }}
                >
                  你的答案
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: COLORS.danger,
                    fontWeight: 600,
                  }}
                >
                  {q.yourAnswer}
                </div>
              </div>
              <div
                style={{
                  background: COLORS.successLight,
                  borderRadius: 10,
                  padding: "8px 12px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: COLORS.success,
                    fontWeight: 700,
                    marginBottom: 2,
                  }}
                >
                  正确答案
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: COLORS.success,
                    fontWeight: 600,
                  }}
                >
                  {q.correctAnswer}
                </div>
              </div>
            </div>

            {/* Expandable error analysis */}
            {isExpanded && (
              <div
                className="fade-in"
                style={{
                  background: "#F8F9FC",
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: COLORS.primary,
                    marginBottom: 6,
                  }}
                >
                  💡 错因分析
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: COLORS.text,
                    lineHeight: 1.8,
                  }}
                >
                  {q.errorAnalysis}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  borderRadius: 10,
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.card,
                  fontSize: 12,
                  fontWeight: 600,
                  color: COLORS.textSecondary,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {isExpanded ? "收起分析 ↑" : "查看错因 ↓"}
              </button>
              <button
                onClick={() => setGuideQuestionId(q.id)}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  borderRadius: 10,
                  border: "none",
                  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(79,110,247,0.3)",
                  transition: "all 0.2s",
                }}
              >
                ✨ AI引导讲解
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
