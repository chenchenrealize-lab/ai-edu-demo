import { useState } from "react";
import { COLORS } from "../constants/colors";
import { REVIEW_TASKS } from "../constants/mockData";
import AnimatedNumber from "./common/AnimatedNumber";

export default function ReviewTab() {
  const [expandedTask, setExpandedTask] = useState(null);

  return (
    <div style={{ padding: "0 20px", paddingBottom: 100 }}>
      {/* Section title */}
      <div style={{ padding: "4px 0 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
            🎯
          </div>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.text, margin: 0 }}>
              今日复习计划
            </h2>
            <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: 0 }}>
              基于艾宾浩斯遗忘曲线 · AI智能排期
            </p>
          </div>
        </div>
      </div>

      {/* Memory retention curve */}
      <div
        className="stagger-item"
        style={{
          background: COLORS.card,
          borderRadius: 16,
          padding: 20,
          marginBottom: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: COLORS.text,
            marginBottom: 14,
          }}
        >
          📉 记忆保持曲线
        </div>
        <div style={{ position: "relative", height: 120, marginBottom: 6 }}>
          <svg
            width="100%"
            height="120"
            viewBox="0 0 340 120"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F6EF7" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#4F6EF7" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="340"
                y2={y}
                stroke="#E8EBF4"
                strokeWidth="0.5"
              />
            ))}

            {/* Without review - red dashed curve */}
            <path
              d="M0,10 Q50,15 90,40 T180,72 T260,88 T340,95"
              stroke="#EF4444"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6,4"
              opacity="0.5"
            />

            {/* With review - blue solid curve (sawtooth) */}
            <path
              d="M0,10 Q40,12 80,32 L86,12 Q120,15 160,30 L166,10 Q200,13 240,24 L246,8 Q280,11 340,16"
              stroke="#4F6EF7"
              strokeWidth="2.5"
              fill="none"
            />
            {/* Fill under blue curve */}
            <path
              d="M0,10 Q40,12 80,32 L86,12 Q120,15 160,30 L166,10 Q200,13 240,24 L246,8 Q280,11 340,16 V120 H0 Z"
              fill="url(#curveGrad)"
            />

            {/* Review points (blue dots) */}
            {[
              { x: 86, y: 12 },
              { x: 166, y: 10 },
              { x: 246, y: 8 },
            ].map((p, i) => (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="8"
                  fill="#4F6EF7"
                  opacity="0.15"
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="5"
                  fill="#4F6EF7"
                  stroke="#fff"
                  strokeWidth="2"
                />
              </g>
            ))}

            {/* Labels */}
            <text x="88" y="30" fontSize="9" fill="#4F6EF7" fontWeight="600">
              复习1
            </text>
            <text x="168" y="28" fontSize="9" fill="#4F6EF7" fontWeight="600">
              复习2
            </text>
            <text x="248" y="26" fontSize="9" fill="#4F6EF7" fontWeight="600">
              复习3
            </text>
          </svg>

          {/* Time axis */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10,
              color: COLORS.textMuted,
              marginTop: 4,
              padding: "0 2px",
            }}
          >
            <span>今天</span>
            <span>1天后</span>
            <span>3天后</span>
            <span>7天后</span>
            <span>30天后</span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
              color: COLORS.textMuted,
            }}
          >
            <div
              style={{
                width: 20,
                height: 2,
                background: "#EF4444",
                opacity: 0.5,
                borderRadius: 1,
                borderTop: "1px dashed #EF4444",
              }}
            />
            不复习（记忆快速衰退）
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
              color: COLORS.textMuted,
            }}
          >
            <div
              style={{
                width: 20,
                height: 2.5,
                background: COLORS.primary,
                borderRadius: 1,
              }}
            />
            定时复习（记忆巩固）
          </div>
        </div>
      </div>

      {/* Today's task list */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: COLORS.text,
          marginBottom: 12,
        }}
      >
        📋 今日安排
      </div>

      {REVIEW_TASKS.map((t, i) => {
        const typeConfig = {
          review: {
            bg: COLORS.dangerLight,
            color: COLORS.danger,
            icon: "🔄",
            label: "间隔复习",
            action: "复习",
          },
          practice: {
            bg: COLORS.warningLight,
            color: COLORS.warning,
            icon: "✏️",
            label: "巩固练习",
            action: "练习",
          },
          reading: {
            bg: COLORS.primaryLight,
            color: COLORS.primary,
            icon: "📖",
            label: "拓展阅读",
            action: "阅读",
          },
          test: {
            bg: COLORS.successLight,
            color: COLORS.success,
            icon: "📝",
            label: "综合测验",
            action: "测验",
          },
        };
        const tc = typeConfig[t.type];
        const isExpanded = expandedTask === i;

        return (
          <div
            key={i}
            className="stagger-item"
            onClick={() => setExpandedTask(isExpanded ? null : i)}
            style={{
              background: COLORS.card,
              borderRadius: 14,
              padding: 16,
              marginBottom: 10,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              border: t.urgent
                ? `1px solid ${COLORS.accent}33`
                : "1px solid transparent",
              cursor: "pointer",
              transition: "all 0.2s",
              animationDelay: `${i * 0.08}s`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Time badge */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: tc.bg,
                  color: tc.color,
                  fontWeight: 800,
                  fontSize: 14,
                  lineHeight: 1.2,
                  flexShrink: 0,
                }}
              >
                <span>{t.time.split(":")[0]}</span>
                <span style={{ fontSize: 10, opacity: 0.8 }}>
                  :{t.time.split(":")[1]}
                </span>
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: COLORS.text,
                  }}
                >
                  {t.task}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: COLORS.textMuted,
                    marginTop: 3,
                  }}
                >
                  {tc.icon} {tc.label}
                </div>
              </div>

              {t.urgent && (
                <span
                  style={{
                    padding: "3px 8px",
                    borderRadius: 6,
                    fontSize: 10,
                    fontWeight: 700,
                    background: COLORS.accentLight,
                    color: COLORS.accent,
                    flexShrink: 0,
                  }}
                >
                  紧急
                </span>
              )}
            </div>

            {/* Expanded detail */}
            {isExpanded && (
              <div
                className="fade-in"
                style={{
                  marginTop: 14,
                  paddingTop: 14,
                  borderTop: `1px solid ${COLORS.borderLight}`,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: COLORS.textSecondary,
                    lineHeight: 1.8,
                    marginBottom: 12,
                  }}
                >
                  {t.detail}
                </div>
                <div
                  style={{
                    padding: "12px 0",
                    borderRadius: 10,
                    textAlign: "center",
                    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(79,110,247,0.3)",
                  }}
                >
                  开始{tc.action} →
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Weekly summary */}
      <div
        className="stagger-item"
        style={{
          background: "linear-gradient(135deg, #ECFDF5, #D1FAE5)",
          borderRadius: 16,
          padding: 18,
          marginTop: 8,
          border: "1px solid #A7F3D0",
          animationDelay: "0.4s",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#065F46",
            marginBottom: 10,
          }}
        >
          📊 本周复习成果
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "复习次数", value: 18, suffix: "次" },
            { label: "掌握错题", value: 12, suffix: "道" },
            { label: "连续天数", value: 5, suffix: "天🔥" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#047857" }}>
                <AnimatedNumber value={s.value} />
                {s.suffix}
              </div>
              <div
                style={{ fontSize: 11, color: "#059669", marginTop: 2 }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
