import { useState } from "react";
import { COLORS } from "../constants/colors";
import { SUBJECTS, KNOWLEDGE_DATA } from "../constants/mockData";
import AnimatedNumber from "./common/AnimatedNumber";

export default function AnalyticsTab() {
  const [selectedSubject, setSelectedSubject] = useState("数学");

  const knowledgeList = (KNOWLEDGE_DATA[selectedSubject] || []).sort(
    (a, b) => a.mastery - b.mastery
  );
  const weakCount = knowledgeList.filter((k) => k.mastery < 60).length;

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
            📊
          </div>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: COLORS.text, margin: 0 }}>
              学情诊断
            </h2>
            <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: 0 }}>
              AI实时分析你的知识掌握情况
            </p>
          </div>
        </div>
      </div>

      {/* Overall score card */}
      <div
        className="stagger-item"
        style={{
          background: "linear-gradient(135deg, #4F6EF7, #7B93FF)",
          borderRadius: 20,
          padding: 24,
          marginBottom: 20,
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -20,
            left: -20,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 8 }}>
            综合学力评估
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: 52, fontWeight: 900, letterSpacing: -2 }}>
              <AnimatedNumber value={74} />
            </span>
            <span style={{ fontSize: 16, opacity: 0.7 }}>/ 100</span>
          </div>
          <div style={{ fontSize: 12, opacity: 0.75, marginTop: 8 }}>
            较上周{" "}
            <span style={{ color: "#86EFAC", fontWeight: 700 }}>↑ 3分</span>{" "}
            · 超过67%的同年级学生
          </div>
        </div>
      </div>

      {/* 2x2 subject mastery grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 20,
        }}
      >
        {SUBJECTS.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setSelectedSubject(s.name)}
            className="stagger-item"
            style={{
              background:
                selectedSubject === s.name ? COLORS.primaryLight : COLORS.card,
              borderRadius: 16,
              padding: 16,
              border:
                selectedSubject === s.name
                  ? `2px solid ${COLORS.primary}`
                  : "2px solid transparent",
              cursor: "pointer",
              textAlign: "left",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              transition: "all 0.2s",
              animationDelay: `${i * 0.08}s`,
            }}
          >
            <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: COLORS.text,
                marginBottom: 6,
              }}
            >
              {s.name}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  flex: 1,
                  height: 6,
                  borderRadius: 3,
                  background: COLORS.borderLight,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: 3,
                    background: s.color,
                    width: `${s.mastery}%`,
                    transition: "width 1s ease",
                  }}
                />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>
                {s.mastery}%
              </span>
            </div>
            <div
              style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 6 }}
            >
              {s.errors} 道错题
            </div>
          </button>
        ))}
      </div>

      {/* Knowledge point ranking */}
      <div
        className="stagger-item"
        style={{
          background: COLORS.card,
          borderRadius: 16,
          padding: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          marginBottom: 16,
          animationDelay: "0.3s",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>
              {selectedSubject} · 知识点掌握
            </div>
            <div
              style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}
            >
              按掌握度从低到高排列
            </div>
          </div>
          {weakCount > 0 && (
            <span
              style={{
                padding: "4px 10px",
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 700,
                background: COLORS.dangerLight,
                color: COLORS.danger,
              }}
            >
              {weakCount}个薄弱点
            </span>
          )}
        </div>

        {knowledgeList.map((k, i) => (
          <div
            key={k.name}
            className="stagger-item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: i < knowledgeList.length - 1 ? 14 : 0,
              animationDelay: `${0.3 + i * 0.06}s`,
            }}
          >
            <div
              style={{
                width: 72,
                fontSize: 13,
                fontWeight: 600,
                color: COLORS.text,
                flexShrink: 0,
              }}
            >
              {k.name}
            </div>
            <div
              style={{
                flex: 1,
                height: 10,
                borderRadius: 5,
                background: COLORS.borderLight,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 5,
                  background:
                    k.mastery < 50
                      ? "linear-gradient(90deg, #EF4444, #F87171)"
                      : k.mastery < 70
                      ? "linear-gradient(90deg, #F59E0B, #FBBF24)"
                      : "linear-gradient(90deg, #22C55E, #4ADE80)",
                  width: `${k.mastery}%`,
                  transition: "width 1.2s ease",
                }}
              />
            </div>
            <div
              style={{
                width: 36,
                fontSize: 13,
                fontWeight: 700,
                textAlign: "right",
                color:
                  k.mastery < 50
                    ? COLORS.danger
                    : k.mastery < 70
                    ? COLORS.warning
                    : COLORS.success,
              }}
            >
              {k.mastery}%
            </div>
            <span style={{ fontSize: 14, width: 20, textAlign: "center" }}>
              {k.trend === "up" ? "📈" : k.trend === "down" ? "📉" : "➡️"}
            </span>
          </div>
        ))}
      </div>

      {/* AI diagnosis suggestion */}
      <div
        className="stagger-item"
        style={{
          background: "linear-gradient(135deg, #FFFBEB, #FEF3C7)",
          borderRadius: 16,
          padding: 18,
          border: "1px solid #FDE68A",
          animationDelay: "0.4s",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#92400E",
            marginBottom: 8,
          }}
        >
          🧠 AI诊断建议
        </div>
        <div style={{ fontSize: 13, color: "#78350F", lineHeight: 1.8 }}>
          {selectedSubject === "数学" && (
            <>
              你的<strong>导数</strong>和<strong>二次函数</strong>
              是当前最薄弱的两个知识点，建议本周集中攻克。导数的错误主要集中在
              <strong>复合函数求导</strong>
              ，建议先回顾基础公式再做变式练习。二次函数的问题在于
              <strong>顶点式与一般式的转换</strong>
              ，可以通过配方法练习来巩固。
            </>
          )}
          {selectedSubject === "英语" && (
            <>
              <strong>定语从句</strong>
              是你英语科目的主要薄弱环节，尤其是关系代词的选择。建议系统复习
              <strong>which/that/whose/whom</strong>
              的区别，并通过真题练习强化语感。虚拟语气部分也需要关注。
            </>
          )}
          {selectedSubject === "物理" && (
            <>
              <strong>牛顿定律</strong>和<strong>电磁感应</strong>
              是当前最薄弱的两个知识点。牛顿定律的错误集中在
              <strong>受力分析</strong>
              环节，建议做题前养成先画受力图的习惯。电磁感应需要强化
              <strong>楞次定律</strong>的理解。
            </>
          )}
          {selectedSubject === "语文" && (
            <>
              语文整体掌握情况良好！<strong>文言文翻译</strong>
              是相对薄弱的部分，建议每天阅读一篇课外文言文短文，积累常见实词虚词。
              诗词鉴赏可以加强<strong>意象分析</strong>的训练。
            </>
          )}
        </div>
      </div>
    </div>
  );
}
