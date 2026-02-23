import { useState } from "react";
import { COLORS } from "../constants/colors";

const FLOW_STEPS = [
  { emoji: "📸", label: "拍题答疑", sub: "元宝核心功能", isCore: true },
  { emoji: "📝", label: "错题沉淀", sub: "自动归集分类" },
  { emoji: "📊", label: "学情分析", sub: "知识图谱诊断" },
  { emoji: "🎯", label: "复习计划", sub: "遗忘曲线排期" },
  { emoji: "💬", label: "微信提醒", sub: "生态闭环触达" },
];

const FEATURES = [
  {
    icon: "💬",
    title: "微信提醒推送",
    desc: "复习时间到，元宝通过微信服务号推送提醒",
    color: "#07C160",
    type: "wechat",
  },
  {
    icon: "📖",
    title: "微信读书联动",
    desc: "根据薄弱知识点，推荐相关书籍章节",
    color: "#4F6EF7",
    type: "weread",
  },
  {
    icon: "👥",
    title: "学习小组 PK",
    desc: "微信群/QQ群内@元宝，组队刷题竞赛",
    color: "#FF6B35",
    type: "group",
  },
  {
    icon: "📄",
    title: "腾讯文档导出",
    desc: "一键导出错题本到腾讯文档，打印复习",
    color: "#2563EB",
    type: "docs",
  },
];

function WechatDetail() {
  return (
    <div
      style={{
        background: "#F0FFF4",
        borderRadius: 12,
        padding: 16,
        border: "1px solid #C6F6D5",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#276749",
          marginBottom: 10,
        }}
      >
        模拟微信服务号推送
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: 14,
          border: "1px solid #E2E8F0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #4F6EF7, #7B93FF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            ✨
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>
            腾讯元宝
          </span>
          <span
            style={{
              fontSize: 11,
              color: COLORS.textMuted,
              marginLeft: "auto",
            }}
          >
            下午 6:00
          </span>
        </div>
        <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.7 }}>
          📚 <strong>复习提醒</strong>
          <br />
          你有3道<strong>二次函数</strong>
          错题即将到达最佳复习时间，现在复习记忆效果最好！
          <br />
          <br />
          <span style={{ color: COLORS.primary, fontWeight: 600 }}>
            点击立即开始复习 →
          </span>
        </div>
      </div>
    </div>
  );
}

function WereadDetail() {
  const books = [
    {
      book: "《高中数学思维方法》",
      chapter: "第5章：二次函数的图像与性质",
      match: "98%",
    },
    {
      book: "《概率论基础》",
      chapter: "第3章：条件概率与贝叶斯",
      match: "92%",
    },
  ];

  return (
    <div
      style={{
        background: COLORS.primaryLight,
        borderRadius: 12,
        padding: 16,
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: COLORS.primaryDark,
          marginBottom: 10,
        }}
      >
        📖 微信读书智能推荐
      </div>
      {books.map((b, j) => (
        <div
          key={j}
          style={{
            background: "#fff",
            borderRadius: 10,
            padding: 12,
            marginBottom: j < books.length - 1 ? 8 : 0,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 38,
              height: 50,
              borderRadius: 5,
              background: "linear-gradient(135deg, #E0E7FF, #C7D2FE)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            📕
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}
            >
              {b.book}
            </div>
            <div
              style={{
                fontSize: 11,
                color: COLORS.textSecondary,
                marginTop: 3,
              }}
            >
              推荐章节：{b.chapter}
            </div>
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#22C55E",
              flexShrink: 0,
            }}
          >
            匹配{b.match}
          </span>
        </div>
      ))}
    </div>
  );
}

function GroupDetail() {
  const users = [
    { name: "小明", avatar: "😎", score: 95, rank: 1 },
    { name: "你", avatar: "🙋", score: 82, rank: 2, isMe: true },
    { name: "小红", avatar: "😊", score: 78, rank: 3 },
  ];

  return (
    <div
      style={{
        background: COLORS.accentLight,
        borderRadius: 12,
        padding: 16,
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#C2410C",
          marginBottom: 10,
        }}
      >
        👥 学习小组PK排行榜
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: 14,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: COLORS.text,
            marginBottom: 10,
          }}
        >
          🏆 本周数学错题PK榜
        </div>
        {users.map((u, j) => (
          <div
            key={j}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: u.isMe ? "8px 10px" : "8px 0",
              borderBottom:
                j < users.length - 1
                  ? `1px solid ${COLORS.borderLight}`
                  : "none",
              background: u.isMe ? COLORS.primaryLight : "transparent",
              borderRadius: u.isMe ? 8 : 0,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: j === 0 ? "#F59E0B" : COLORS.textMuted,
                width: 24,
              }}
            >
              #{u.rank}
            </span>
            <span style={{ fontSize: 20 }}>{u.avatar}</span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: COLORS.text,
                flex: 1,
              }}
            >
              {u.name}
              {u.isMe && (
                <span
                  style={{
                    fontSize: 10,
                    color: COLORS.primary,
                    marginLeft: 4,
                  }}
                >
                  (我)
                </span>
              )}
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: COLORS.primary,
              }}
            >
              {u.score}分
            </span>
          </div>
        ))}
        <div
          style={{
            fontSize: 11,
            color: COLORS.textMuted,
            marginTop: 10,
            textAlign: "center",
            padding: "8px",
            background: COLORS.bg,
            borderRadius: 8,
          }}
        >
          在微信群 @元宝 发起「今日数学PK赛」
        </div>
      </div>
    </div>
  );
}

function DocsDetail() {
  return (
    <div
      style={{
        background: "#EFF6FF",
        borderRadius: 12,
        padding: 16,
        border: "1px solid #BFDBFE",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#1E40AF",
          marginBottom: 12,
        }}
      >
        📄 一键导出到腾讯文档
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {[
          { icon: "📋", label: "错题本PDF" },
          { icon: "📊", label: "学情报告" },
          { icon: "📅", label: "复习计划表" },
        ].map((d, j) => (
          <div
            key={j}
            style={{
              flex: 1,
              background: "#fff",
              borderRadius: 10,
              padding: 14,
              textAlign: "center",
              border: "1px solid #DBEAFE",
            }}
          >
            <div style={{ fontSize: 26, marginBottom: 6 }}>{d.icon}</div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: COLORS.text,
              }}
            >
              {d.label}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 12,
          padding: "12px 0",
          borderRadius: 10,
          textAlign: "center",
          background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
          fontSize: 13,
          fontWeight: 700,
          color: "#fff",
          cursor: "pointer",
        }}
      >
        导出到腾讯文档 →
      </div>
    </div>
  );
}

export default function EcosystemTab() {
  const [activeDemo, setActiveDemo] = useState(null);

  const DetailComponents = {
    wechat: WechatDetail,
    weread: WereadDetail,
    group: GroupDetail,
    docs: DocsDetail,
  };

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
            🔗
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
              生态串联
            </h2>
            <p
              style={{
                fontSize: 12,
                color: COLORS.textSecondary,
                margin: 0,
              }}
            >
              打通腾讯全生态，学习无处不在
            </p>
          </div>
        </div>
      </div>

      {/* Vertical flow chart */}
      <div
        className="stagger-item"
        style={{
          background: COLORS.card,
          borderRadius: 20,
          padding: 24,
          marginBottom: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: COLORS.text,
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          🔗 元宝教育生态全链路
        </div>

        <div style={{ position: "relative" }}>
          {FLOW_STEPS.map((item, i) => (
            <div key={i}>
              <div
                className="stagger-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background: item.isCore
                    ? "linear-gradient(135deg, #4F6EF7, #7B93FF)"
                    : COLORS.bg,
                  borderRadius: 12,
                  padding: "13px 16px",
                  border: item.isCore
                    ? "none"
                    : `1px solid ${COLORS.borderLight}`,
                  position: "relative",
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <span style={{ fontSize: 24 }}>{item.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: item.isCore ? "#fff" : COLORS.text,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: item.isCore
                        ? "rgba(255,255,255,0.7)"
                        : COLORS.textMuted,
                    }}
                  >
                    {item.sub}
                  </div>
                </div>
                {item.isCore && (
                  <div
                    style={{
                      padding: "4px 10px",
                      borderRadius: 8,
                      background: "linear-gradient(135deg, #FF6B35, #FF8F5E)",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    现有功能
                  </div>
                )}
              </div>

              {/* Arrow between steps */}
              {i < FLOW_STEPS.length - 1 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2px 0",
                    fontSize: 14,
                    color: COLORS.textMuted,
                    lineHeight: 1,
                  }}
                >
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feature detail cards */}
      {FEATURES.map((f, i) => {
        const isActive = activeDemo === i;
        const DetailComp = DetailComponents[f.type];

        return (
          <div
            key={i}
            className="stagger-item"
            onClick={() => setActiveDemo(isActive ? null : i)}
            style={{
              background: COLORS.card,
              borderRadius: 16,
              padding: 18,
              marginBottom: 12,
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              cursor: "pointer",
              transition: "all 0.2s",
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  background: `${f.color}15`,
                  flexShrink: 0,
                }}
              >
                {f.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: COLORS.text,
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: COLORS.textSecondary,
                    marginTop: 3,
                  }}
                >
                  {f.desc}
                </div>
              </div>
              <span
                style={{
                  fontSize: 20,
                  color: COLORS.textMuted,
                  transform: isActive ? "rotate(90deg)" : "rotate(0)",
                  transition: "transform 0.25s ease",
                  flexShrink: 0,
                }}
              >
                ›
              </span>
            </div>

            {/* Expanded detail */}
            {isActive && (
              <div
                className="fade-in"
                style={{
                  marginTop: 16,
                  paddingTop: 16,
                  borderTop: `1px solid ${COLORS.borderLight}`,
                }}
              >
                <DetailComp />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
