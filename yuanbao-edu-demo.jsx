import { useState, useEffect, useRef } from "react";

// ============================================================
// 元宝AI教育升级 - 智能学情系统 Demo
// 核心功能：智能错题本 + 学情诊断 + 个性化复习 + 微信生态串联
// ============================================================

const COLORS = {
  primary: "#4F6EF7",
  primaryLight: "#EEF1FE",
  primaryDark: "#3A54C4",
  accent: "#FF6B35",
  accentLight: "#FFF3ED",
  success: "#22C55E",
  successLight: "#ECFDF5",
  warning: "#F59E0B",
  warningLight: "#FFFBEB",
  danger: "#EF4444",
  dangerLight: "#FEF2F2",
  bg: "#F8F9FC",
  card: "#FFFFFF",
  text: "#1A1D2E",
  textSecondary: "#6B7194",
  textMuted: "#9DA3C0",
  border: "#E8EBF4",
  borderLight: "#F0F2F8",
};

// Mock data
const SUBJECTS = [
  { name: "数学", icon: "📐", color: "#4F6EF7", errors: 23, mastery: 72 },
  { name: "英语", icon: "🔤", color: "#22C55E", errors: 15, mastery: 81 },
  { name: "物理", icon: "⚡", color: "#F59E0B", errors: 18, mastery: 65 },
  { name: "语文", icon: "📖", color: "#EF4444", errors: 8, mastery: 88 },
];

const ERROR_QUESTIONS = [
  {
    id: 1,
    subject: "数学",
    topic: "二次函数",
    knowledgePoint: "顶点式求解",
    question: "已知二次函数 y=a(x-1)²+3 的图像经过点(2,1)，求a的值",
    yourAnswer: "a = 2",
    correctAnswer: "a = -2",
    errorType: "符号错误",
    errorLevel: "概念迷雾",
    errorAnalysis: "代入点(2,1)后计算 1=a(2-1)²+3，得 a=-2。你在移项时忘记变号。",
    date: "2月21日",
    reviewCount: 0,
    mastered: false,
  },
  {
    id: 2,
    subject: "数学",
    topic: "概率统计",
    knowledgePoint: "条件概率",
    question: "袋中有3红2白球，不放回取2次，第一次红色的条件下第二次红色的概率",
    yourAnswer: "3/5",
    correctAnswer: "2/4 = 1/2",
    errorType: "思路偏差",
    errorLevel: "策略偏差",
    errorAnalysis: "你没有考虑'不放回'的条件，第一次取走红球后剩余4球中只有2红球。",
    date: "2月20日",
    reviewCount: 1,
    mastered: false,
  },
  {
    id: 3,
    subject: "物理",
    topic: "牛顿运动定律",
    knowledgePoint: "受力分析",
    question: "倾斜角30°的光滑斜面上，质量2kg物体的加速度",
    yourAnswer: "10 m/s²",
    correctAnswer: "5 m/s²",
    errorType: "公式错用",
    errorLevel: "表层错误",
    errorAnalysis: "你用了 a=g 而非 a=gsinθ。斜面上的加速度需要分解重力沿斜面方向的分量。",
    date: "2月19日",
    reviewCount: 2,
    mastered: false,
  },
  {
    id: 4,
    subject: "英语",
    topic: "定语从句",
    knowledgePoint: "关系代词选择",
    question: 'The book _____ cover is red belongs to Mary.',
    yourAnswer: "which",
    correctAnswer: "whose",
    errorType: "语法混淆",
    errorLevel: "概念迷雾",
    errorAnalysis: "当关系代词修饰名词（cover）表示所属关系时，应使用whose而非which。",
    date: "2月18日",
    reviewCount: 0,
    mastered: false,
  },
];

const KNOWLEDGE_MAP = [
  { name: "二次函数", mastery: 45, total: 8, errors: 4, trend: "down" },
  { name: "概率统计", mastery: 55, total: 6, errors: 3, trend: "up" },
  { name: "三角函数", mastery: 78, total: 10, errors: 2, trend: "up" },
  { name: "立体几何", mastery: 62, total: 5, errors: 2, trend: "stable" },
  { name: "数列", mastery: 85, total: 7, errors: 1, trend: "up" },
  { name: "导数", mastery: 38, total: 4, errors: 3, trend: "down" },
];

const REVIEW_TASKS = [
  { time: "08:00", task: "复习：二次函数顶点式（3题）", type: "review", urgent: true },
  { time: "12:30", task: "巩固：条件概率基础练习（2题）", type: "practice", urgent: false },
  { time: "18:00", task: "阅读：《微信读书》推荐章节", type: "reading", urgent: false },
  { time: "21:00", task: "测验：本周错题随机抽测（5题）", type: "test", urgent: true },
];

// ============================================================
// Components
// ============================================================

function PhoneFrame({ children }) {
  return (
    <div style={{
      width: "100%",
      maxWidth: 430,
      margin: "0 auto",
      background: COLORS.bg,
      minHeight: "100vh",
      position: "relative",
      fontFamily: '-apple-system, "SF Pro Display", "PingFang SC", "Helvetica Neue", sans-serif',
      overflowX: "hidden",
    }}>
      {children}
    </div>
  );
}

function StatusBar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 20px",
      fontSize: 12,
      color: COLORS.text,
      fontWeight: 600,
    }}>
      <span>14:32</span>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <span style={{ fontSize: 10 }}>📶</span>
        <span style={{ fontSize: 10 }}>🔋</span>
      </div>
    </div>
  );
}

function TabBar({ activeTab, onTabChange }) {
  const tabs = [
    { id: "errors", label: "错题本", icon: "📝" },
    { id: "analytics", label: "学情", icon: "📊" },
    { id: "review", label: "复习", icon: "🎯" },
    { id: "ecosystem", label: "生态", icon: "🔗" },
  ];
  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: 430,
      display: "flex",
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(20px)",
      borderTop: `1px solid ${COLORS.border}`,
      zIndex: 100,
      padding: "6px 0 20px 0",
    }}>
      {tabs.map(tab => (
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
          <span style={{
            fontSize: 20,
            filter: activeTab === tab.id ? "none" : "grayscale(0.6)",
            transform: activeTab === tab.id ? "scale(1.15)" : "scale(1)",
            transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}>{tab.icon}</span>
          <span style={{
            fontSize: 10,
            fontWeight: activeTab === tab.id ? 700 : 500,
            color: activeTab === tab.id ? COLORS.primary : COLORS.textMuted,
            transition: "all 0.2s",
          }}>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

function Header({ title, subtitle }) {
  return (
    <div style={{ padding: "4px 20px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: "linear-gradient(135deg, #4F6EF7, #7B93FF)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, boxShadow: "0 4px 12px rgba(79,110,247,0.3)",
        }}>✨</div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: COLORS.text, margin: 0, letterSpacing: -0.5 }}>{title}</h1>
          <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: 0, marginTop: 1 }}>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function AnimatedNumber({ value, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = value / 30;
    const interval = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(interval); }
      else setDisplay(Math.round(start));
    }, 20);
    return () => clearInterval(interval);
  }, [value]);
  return <span>{display}{suffix}</span>;
}

// ============================================================
// Tab 1: 智能错题本
// ============================================================
function ErrorBookTab() {
  const [selectedError, setSelectedError] = useState(null);
  const [filterSubject, setFilterSubject] = useState("全部");
  const [showGuide, setShowGuide] = useState(null);

  const filtered = filterSubject === "全部"
    ? ERROR_QUESTIONS
    : ERROR_QUESTIONS.filter(q => q.subject === filterSubject);

  const errorLevelColor = (level) => {
    const map = {
      "表层错误": { bg: "#DBEAFE", color: "#2563EB" },
      "概念迷雾": { bg: "#FEF3C7", color: "#D97706" },
      "策略偏差": { bg: "#FEE2E2", color: "#DC2626" },
      "思维惯性": { bg: "#E0E7FF", color: "#4338CA" },
    };
    return map[level] || { bg: "#F3F4F6", color: "#6B7280" };
  };

  if (showGuide !== null) {
    const q = ERROR_QUESTIONS.find(e => e.id === showGuide);
    return (
      <div style={{ padding: "0 20px", paddingBottom: 100 }}>
        <Header title="启发式讲解" subtitle="AI引导你自己发现答案" />
        <div style={{
          background: COLORS.card, borderRadius: 16, padding: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 16,
        }}>
          <div style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 8 }}>原题</div>
          <div style={{ fontSize: 15, color: COLORS.text, fontWeight: 600, lineHeight: 1.6 }}>{q.question}</div>
        </div>

        <SocraticChat question={q} onBack={() => setShowGuide(null)} />
      </div>
    );
  }

  return (
    <div style={{ padding: "0 20px", paddingBottom: 100 }}>
      <Header title="智能错题本" subtitle={`已收集 ${ERROR_QUESTIONS.length} 道错题 · 自动归因分析`} />

      {/* Subject Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        {["全部", "数学", "英语", "物理", "语文"].map(s => (
          <button key={s} onClick={() => setFilterSubject(s)} style={{
            padding: "6px 16px", borderRadius: 20, border: "none", cursor: "pointer",
            fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
            background: filterSubject === s ? COLORS.primary : COLORS.card,
            color: filterSubject === s ? "#fff" : COLORS.textSecondary,
            boxShadow: filterSubject === s ? "0 4px 12px rgba(79,110,247,0.3)" : "0 1px 4px rgba(0,0,0,0.06)",
            transition: "all 0.2s",
          }}>{s}</button>
        ))}
      </div>

      {/* Error Stats Summary */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20,
      }}>
        {[
          { label: "待复习", value: 12, color: COLORS.danger, icon: "🔴" },
          { label: "复习中", value: 8, color: COLORS.warning, icon: "🟡" },
          { label: "已掌握", value: 44, color: COLORS.success, icon: "🟢" },
        ].map((s, i) => (
          <div key={i} style={{
            background: COLORS.card, borderRadius: 14, padding: "14px 12px",
            textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}>
            <div style={{ fontSize: 16, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}><AnimatedNumber value={s.value} /></div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Error Cards */}
      {filtered.map((q, idx) => (
        <div key={q.id} style={{
          background: COLORS.card, borderRadius: 16, padding: 16, marginBottom: 12,
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          borderLeft: `4px solid ${errorLevelColor(q.errorLevel).color}`,
          animation: `slideIn 0.3s ease ${idx * 0.08}s both`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{
                padding: "3px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700,
                background: errorLevelColor(q.errorLevel).bg,
                color: errorLevelColor(q.errorLevel).color,
              }}>{q.errorLevel}</span>
              <span style={{ fontSize: 12, color: COLORS.textMuted }}>{q.subject} · {q.topic}</span>
            </div>
            <span style={{ fontSize: 11, color: COLORS.textMuted }}>{q.date}</span>
          </div>

          <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.6, marginBottom: 12, fontWeight: 500 }}>
            {q.question}
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12,
          }}>
            <div style={{ background: COLORS.dangerLight, borderRadius: 10, padding: "8px 12px" }}>
              <div style={{ fontSize: 10, color: COLORS.danger, fontWeight: 700, marginBottom: 2 }}>你的答案</div>
              <div style={{ fontSize: 13, color: COLORS.danger, fontWeight: 600 }}>{q.yourAnswer}</div>
            </div>
            <div style={{ background: COLORS.successLight, borderRadius: 10, padding: "8px 12px" }}>
              <div style={{ fontSize: 10, color: COLORS.success, fontWeight: 700, marginBottom: 2 }}>正确答案</div>
              <div style={{ fontSize: 13, color: COLORS.success, fontWeight: 600 }}>{q.correctAnswer}</div>
            </div>
          </div>

          {selectedError === q.id && (
            <div style={{
              background: "#F8F9FC", borderRadius: 12, padding: 14, marginBottom: 12,
              animation: "fadeIn 0.3s ease",
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.primary, marginBottom: 6 }}>💡 错因分析</div>
              <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.7 }}>{q.errorAnalysis}</div>
            </div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setSelectedError(selectedError === q.id ? null : q.id)} style={{
              flex: 1, padding: "10px 0", borderRadius: 10, border: `1px solid ${COLORS.border}`,
              background: COLORS.card, fontSize: 12, fontWeight: 600, color: COLORS.textSecondary,
              cursor: "pointer", transition: "all 0.2s",
            }}>
              {selectedError === q.id ? "收起分析" : "查看错因"}
            </button>
            <button onClick={() => setShowGuide(q.id)} style={{
              flex: 1, padding: "10px 0", borderRadius: 10, border: "none",
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
              fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer",
              boxShadow: "0 4px 12px rgba(79,110,247,0.3)", transition: "all 0.2s",
            }}>
              ✨ AI引导讲解
            </button>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
      `}</style>
    </div>
  );
}

// Socratic method chat simulation
function SocraticChat({ question, onBack }) {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const containerRef = useRef(null);

  const chatFlow = [
    { role: "ai", text: `你好！让我们一起来看这道${question.topic}的题目。首先，你能告诉我这道题考查的是哪个知识点吗？🤔` },
    { role: "user", text: "二次函数的顶点式？", isOption: true },
    { role: "ai", text: `对！二次函数 y=a(x-h)²+k 的顶点式中，(h,k)是顶点坐标。那题目告诉我们顶点是哪个点呢？` },
    { role: "user", text: "顶点是(1,3)", isOption: true },
    { role: "ai", text: `很好！现在题目说图像经过点(2,1)。如果我们把这个点代入 y=a(x-1)²+3，你会得到什么等式？试着写一下 👇` },
    { role: "user", text: "1 = a(2-1)² + 3", isOption: true },
    { role: "ai", text: `完美！那 1 = a·1 + 3，解这个方程 a 等于多少呢？注意移项时的正负号哦 😊` },
    { role: "user", text: "a = 1-3 = -2！", isOption: true },
    { role: "ai", text: `🎉 太棒了！a = -2 才是正确答案！你之前的错误是在移项时忘了变号。记住：移项变号是最容易犯的"表层错误"，多留意就好！\n\n这道题已标记为"已理解"，3天后会再次复习巩固 ✅` },
  ];

  const handleNext = () => {
    if (step >= chatFlow.length) return;
    const msg = chatFlow[step];
    if (msg.role === "ai") {
      setTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, msg]);
        setTyping(false);
        setStep(s => s + 1);
      }, 800);
    } else {
      setMessages(prev => [...prev, msg]);
      setStep(s => s + 1);
      // Auto trigger AI response
      setTimeout(() => {
        if (step + 1 < chatFlow.length) {
          setTyping(true);
          setTimeout(() => {
            setMessages(prev => [...prev, chatFlow[step + 1]]);
            setTyping(false);
            setStep(s => s + 1);
          }, 1000);
        }
      }, 300);
    }
  };

  useEffect(() => {
    if (step === 0) handleNext();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const nextIsUser = step < chatFlow.length && chatFlow[step]?.role === "user";

  return (
    <div>
      <div ref={containerRef} style={{
        maxHeight: 420, overflowY: "auto", marginBottom: 16,
        display: "flex", flexDirection: "column", gap: 12,
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start",
            animation: "fadeIn 0.3s ease",
          }}>
            <div style={{
              maxWidth: "82%", padding: "12px 16px", borderRadius: 16,
              fontSize: 14, lineHeight: 1.7,
              background: m.role === "user"
                ? "linear-gradient(135deg, #4F6EF7, #3A54C4)"
                : COLORS.card,
              color: m.role === "user" ? "#fff" : COLORS.text,
              boxShadow: m.role === "user"
                ? "0 4px 12px rgba(79,110,247,0.3)"
                : "0 2px 8px rgba(0,0,0,0.06)",
              borderBottomRightRadius: m.role === "user" ? 4 : 16,
              borderBottomLeftRadius: m.role === "user" ? 16 : 4,
              whiteSpace: "pre-line",
            }}>
              {m.role === "ai" && <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.primary, display: "block", marginBottom: 4 }}>✨ 元宝AI导师</span>}
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              background: COLORS.card, borderRadius: 16, padding: "12px 20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderBottomLeftRadius: 4,
            }}>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: 7, height: 7, borderRadius: "50%", background: COLORS.textMuted,
                    animation: `bounce 1s ease ${i * 0.15}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onBack} style={{
          padding: "12px 20px", borderRadius: 12, border: `1px solid ${COLORS.border}`,
          background: COLORS.card, fontSize: 13, fontWeight: 600, color: COLORS.textSecondary,
          cursor: "pointer",
        }}>← 返回</button>
        {nextIsUser && step < chatFlow.length && (
          <button onClick={handleNext} style={{
            flex: 1, padding: "12px 0", borderRadius: 12, border: "none",
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
            fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer",
            boxShadow: "0 4px 14px rgba(79,110,247,0.35)",
          }}>
            💬 {chatFlow[step].text.substring(0, 20)}{chatFlow[step].text.length > 20 ? "..." : ""}
          </button>
        )}
        {step >= chatFlow.length && (
          <button onClick={onBack} style={{
            flex: 1, padding: "12px 0", borderRadius: 12, border: "none",
            background: `linear-gradient(135deg, ${COLORS.success}, #16A34A)`,
            fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer",
            boxShadow: "0 4px 14px rgba(34,197,94,0.35)",
          }}>
            ✅ 已掌握，返回错题本
          </button>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// Tab 2: 学情诊断
// ============================================================
function AnalyticsTab() {
  const [selectedSubject, setSelectedSubject] = useState("数学");
  return (
    <div style={{ padding: "0 20px", paddingBottom: 100 }}>
      <Header title="学情诊断" subtitle="AI实时分析你的知识掌握情况" />

      {/* Overall Score */}
      <div style={{
        background: "linear-gradient(135deg, #4F6EF7, #7B93FF)",
        borderRadius: 20, padding: 24, marginBottom: 20,
        color: "#fff", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -30, right: -30, width: 120, height: 120,
          borderRadius: "50%", background: "rgba(255,255,255,0.1)",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 8 }}>综合学力评估</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: 52, fontWeight: 900, letterSpacing: -2 }}><AnimatedNumber value={74} /></span>
            <span style={{ fontSize: 16, opacity: 0.7 }}>/ 100</span>
          </div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>较上周 <span style={{ color: "#86EFAC", fontWeight: 700 }}>↑ 3分</span> · 超过67%的同年级学生</div>
        </div>
      </div>

      {/* Subject Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        {SUBJECTS.map((s, i) => (
          <button key={s.name} onClick={() => setSelectedSubject(s.name)} style={{
            background: selectedSubject === s.name ? COLORS.primaryLight : COLORS.card,
            borderRadius: 16, padding: 16, border: selectedSubject === s.name ? `2px solid ${COLORS.primary}` : `2px solid transparent`,
            cursor: "pointer", textAlign: "left",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            animation: `slideIn 0.3s ease ${i * 0.08}s both`,
            transition: "all 0.2s",
          }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>{s.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                flex: 1, height: 6, borderRadius: 3, background: COLORS.borderLight, overflow: "hidden",
              }}>
                <div style={{
                  height: "100%", borderRadius: 3, background: s.color,
                  width: `${s.mastery}%`, transition: "width 1s ease",
                }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.mastery}%</span>
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 6 }}>{s.errors} 道错题</div>
          </button>
        ))}
      </div>

      {/* Knowledge Map */}
      <div style={{
        background: COLORS.card, borderRadius: 16, padding: 20,
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)", marginBottom: 16,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>{selectedSubject} · 知识点掌握</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>按掌握度从低到高排列</div>
          </div>
          <span style={{
            padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700,
            background: COLORS.dangerLight, color: COLORS.danger,
          }}>2个薄弱点</span>
        </div>

        {KNOWLEDGE_MAP.sort((a, b) => a.mastery - b.mastery).map((k, i) => (
          <div key={k.name} style={{
            display: "flex", alignItems: "center", gap: 12, marginBottom: 14,
            animation: `slideIn 0.3s ease ${i * 0.06}s both`,
          }}>
            <div style={{ width: 80, fontSize: 13, fontWeight: 600, color: COLORS.text }}>{k.name}</div>
            <div style={{ flex: 1, height: 10, borderRadius: 5, background: COLORS.borderLight, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 5,
                background: k.mastery < 50 ? `linear-gradient(90deg, ${COLORS.danger}, #F87171)` :
                  k.mastery < 70 ? `linear-gradient(90deg, ${COLORS.warning}, #FBBF24)` :
                    `linear-gradient(90deg, ${COLORS.success}, #4ADE80)`,
                width: `${k.mastery}%`, transition: "width 1.2s ease",
              }} />
            </div>
            <div style={{ width: 36, fontSize: 13, fontWeight: 700, textAlign: "right",
              color: k.mastery < 50 ? COLORS.danger : k.mastery < 70 ? COLORS.warning : COLORS.success,
            }}>{k.mastery}%</div>
            <span style={{ fontSize: 14 }}>
              {k.trend === "up" ? "📈" : k.trend === "down" ? "📉" : "➡️"}
            </span>
          </div>
        ))}
      </div>

      {/* AI Insight */}
      <div style={{
        background: "linear-gradient(135deg, #FFFBEB, #FEF3C7)",
        borderRadius: 16, padding: 18,
        border: "1px solid #FDE68A",
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#92400E", marginBottom: 8 }}>🧠 AI诊断建议</div>
        <div style={{ fontSize: 13, color: "#78350F", lineHeight: 1.8 }}>
          你的<strong>导数</strong>和<strong>二次函数</strong>是当前最薄弱的两个知识点，建议本周集中攻克。
          导数的错误主要集中在<strong>复合函数求导</strong>，建议先回顾基础公式再做变式练习。
          二次函数的问题在于<strong>顶点式与一般式的转换</strong>，可以通过配方法练习来巩固。
        </div>
      </div>

      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}

// ============================================================
// Tab 3: 个性化复习
// ============================================================
function ReviewTab() {
  const [expandedTask, setExpandedTask] = useState(null);
  return (
    <div style={{ padding: "0 20px", paddingBottom: 100 }}>
      <Header title="今日复习计划" subtitle="基于艾宾浩斯遗忘曲线 · AI智能排期" />

      {/* Memory Curve Visual */}
      <div style={{
        background: COLORS.card, borderRadius: 16, padding: 20, marginBottom: 20,
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 14 }}>📉 记忆保持曲线</div>
        <div style={{ position: "relative", height: 100, marginBottom: 10 }}>
          {/* Curve visualization */}
          <svg width="100%" height="100" viewBox="0 0 340 100" fill="none">
            <defs>
              <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F6EF7" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#4F6EF7" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Without review */}
            <path d="M0,10 Q40,12 80,35 T160,65 T240,80 T340,88" stroke="#EF4444" strokeWidth="2" fill="none" strokeDasharray="6,4" opacity="0.6" />
            {/* With review */}
            <path d="M0,10 Q40,12 80,30 L85,12 Q120,14 160,28 L165,10 Q200,13 240,22 L245,8 Q280,11 340,16" stroke="#4F6EF7" strokeWidth="2.5" fill="none" />
            <path d="M0,10 Q40,12 80,30 L85,12 Q120,14 160,28 L165,10 Q200,13 240,22 L245,8 Q280,11 340,16 V100 H0 Z" fill="url(#curveGrad)" />
            {/* Review points */}
            {[85, 165, 245].map((x, i) => (
              <circle key={i} cx={x} cy={[12, 10, 8][i]} r="5" fill="#4F6EF7" stroke="#fff" strokeWidth="2" />
            ))}
          </svg>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            display: "flex", justifyContent: "space-between",
            fontSize: 10, color: COLORS.textMuted,
          }}>
            <span>今天</span><span>1天后</span><span>3天后</span><span>7天后</span><span>30天后</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: COLORS.textMuted }}>
            <div style={{ width: 16, height: 2, background: "#EF4444", opacity: 0.6, borderRadius: 1 }} />不复习
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: COLORS.textMuted }}>
            <div style={{ width: 16, height: 2.5, background: COLORS.primary, borderRadius: 1 }} />定时复习
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 12 }}>📋 今日安排</div>
      {REVIEW_TASKS.map((t, i) => (
        <button
          key={i}
          onClick={() => setExpandedTask(expandedTask === i ? null : i)}
          style={{
            width: "100%", textAlign: "left",
            background: COLORS.card, borderRadius: 14, padding: 16, marginBottom: 10,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: t.urgent ? `1px solid ${COLORS.accent}33` : `1px solid transparent`,
            cursor: "pointer", transition: "all 0.2s",
            animation: `slideIn 0.3s ease ${i * 0.08}s both`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800,
              background: t.type === "review" ? COLORS.dangerLight :
                t.type === "practice" ? COLORS.warningLight :
                  t.type === "reading" ? COLORS.primaryLight : COLORS.successLight,
              color: t.type === "review" ? COLORS.danger :
                t.type === "practice" ? COLORS.warning :
                  t.type === "reading" ? COLORS.primary : COLORS.success,
            }}>{t.time.split(":")[0]}<span style={{ fontSize: 9 }}>:{t.time.split(":")[1]}</span></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{t.task}</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 3 }}>
                {t.type === "review" ? "🔄 间隔复习" : t.type === "practice" ? "✏️ 巩固练习" : t.type === "reading" ? "📖 拓展阅读" : "📝 综合测验"}
              </div>
            </div>
            {t.urgent && (
              <span style={{
                padding: "3px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700,
                background: COLORS.accentLight, color: COLORS.accent,
              }}>紧急</span>
            )}
          </div>

          {expandedTask === i && (
            <div style={{
              marginTop: 14, paddingTop: 14, borderTop: `1px solid ${COLORS.borderLight}`,
              animation: "fadeIn 0.3s ease",
            }}>
              <div style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.7, marginBottom: 12 }}>
                {t.type === "review" && "这些题目你在2天前做错过，根据遗忘曲线，现在是最佳复习时机。AI会用引导式提问帮你回忆解题思路。"}
                {t.type === "practice" && "在掌握基础概念后，通过变式练习加深理解。难度会根据你的表现动态调整。"}
                {t.type === "reading" && "微信读书推荐了与你薄弱知识点相关的章节，阅读约15分钟即可。"}
                {t.type === "test" && "从本周所有错题中随机抽取5道，检验复习效果。全部正确即可将这些题标记为'已掌握'。"}
              </div>
              <div style={{
                padding: "10px 0", borderRadius: 10, textAlign: "center",
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
                fontSize: 13, fontWeight: 700, color: "#fff",
                boxShadow: "0 4px 12px rgba(79,110,247,0.3)",
              }}>
                开始{t.type === "review" ? "复习" : t.type === "practice" ? "练习" : t.type === "reading" ? "阅读" : "测验"} →
              </div>
            </div>
          )}
        </button>
      ))}

      {/* Weekly Summary */}
      <div style={{
        background: "linear-gradient(135deg, #ECFDF5, #D1FAE5)",
        borderRadius: 16, padding: 18, marginTop: 8,
        border: "1px solid #A7F3D0",
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#065F46", marginBottom: 6 }}>📊 本周复习成果</div>
        <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
          {[
            { label: "复习次数", value: "18次" },
            { label: "掌握错题", value: "12道" },
            { label: "连续天数", value: "5天🔥" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#047857" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#059669", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
      `}</style>
    </div>
  );
}

// ============================================================
// Tab 4: 微信生态串联
// ============================================================
function EcosystemTab() {
  const [activeDemo, setActiveDemo] = useState(null);
  const features = [
    {
      icon: "💬",
      title: "微信提醒推送",
      desc: "复习时间到，元宝通过微信服务号推送提醒",
      color: "#07C160",
      detail: "integration_wechat",
    },
    {
      icon: "📖",
      title: "微信读书联动",
      desc: "根据薄弱知识点，推荐相关书籍章节",
      color: "#4F6EF7",
      detail: "integration_weread",
    },
    {
      icon: "👥",
      title: "学习小组 PK",
      desc: "微信群/QQ群内@元宝，组队刷题竞赛",
      color: "#FF6B35",
      detail: "integration_group",
    },
    {
      icon: "📄",
      title: "腾讯文档导出",
      desc: "一键导出错题本到腾讯文档，打印复习",
      color: "#2563EB",
      detail: "integration_docs",
    },
  ];

  return (
    <div style={{ padding: "0 20px", paddingBottom: 100 }}>
      <Header title="生态串联" subtitle="打通腾讯全生态，学习无处不在" />

      {/* Ecosystem Map */}
      <div style={{
        background: COLORS.card, borderRadius: 20, padding: 24, marginBottom: 20,
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)", textAlign: "center",
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 20 }}>🔗 元宝教育生态全链路</div>
        <div style={{ position: "relative", padding: "10px 0" }}>
          {/* Flow chart */}
          {[
            { emoji: "📸", label: "拍题答疑", sub: "元宝核心" },
            { emoji: "📝", label: "错题沉淀", sub: "自动归集" },
            { emoji: "📊", label: "学情分析", sub: "知识图谱" },
            { emoji: "🎯", label: "复习计划", sub: "遗忘曲线" },
            { emoji: "💬", label: "微信提醒", sub: "生态串联" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: i < 4 ? 4 : 0 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 12, flex: 1,
                background: i === 0 ? "linear-gradient(135deg, #4F6EF7, #7B93FF)" : COLORS.bg,
                borderRadius: 12, padding: "12px 16px",
                border: i === 0 ? "none" : `1px solid ${COLORS.borderLight}`,
              }}>
                <span style={{ fontSize: 24 }}>{item.emoji}</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: i === 0 ? "#fff" : COLORS.text }}>{item.label}</div>
                  <div style={{ fontSize: 10, color: i === 0 ? "rgba(255,255,255,0.7)" : COLORS.textMuted }}>{item.sub}</div>
                </div>
              </div>
              {i === 0 && (
                <div style={{
                  position: "absolute", right: 16, top: 10,
                  padding: "4px 10px", borderRadius: 8,
                  background: "linear-gradient(135deg, #FF6B35, #FF8F5E)",
                  fontSize: 10, fontWeight: 700, color: "#fff",
                }}>现有功能</div>
              )}
            </div>
          ))}
          {/* Arrows between items */}
          <div style={{
            position: "absolute", left: 32, top: 52, bottom: 52,
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            pointerEvents: "none",
          }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ fontSize: 12, color: COLORS.textMuted, textAlign: "center" }}>↓</div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      {features.map((f, i) => (
        <button
          key={i}
          onClick={() => setActiveDemo(activeDemo === i ? null : i)}
          style={{
            width: "100%", textAlign: "left",
            background: COLORS.card, borderRadius: 16, padding: 18, marginBottom: 12,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            border: "none", cursor: "pointer", transition: "all 0.2s",
            animation: `slideIn 0.3s ease ${i * 0.1}s both`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, background: `${f.color}15`,
            }}>{f.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>{f.title}</div>
              <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 3 }}>{f.desc}</div>
            </div>
            <span style={{
              fontSize: 18, color: COLORS.textMuted,
              transform: activeDemo === i ? "rotate(90deg)" : "rotate(0)",
              transition: "transform 0.2s",
            }}>›</span>
          </div>

          {activeDemo === i && (
            <div style={{
              marginTop: 16, paddingTop: 16, borderTop: `1px solid ${COLORS.borderLight}`,
              animation: "fadeIn 0.3s ease",
            }}>
              {f.detail === "integration_wechat" && (
                <div style={{
                  background: "#F0FFF4", borderRadius: 12, padding: 16,
                  border: "1px solid #C6F6D5",
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#276749", marginBottom: 10 }}>模拟微信推送通知</div>
                  <div style={{
                    background: "#fff", borderRadius: 10, padding: 14,
                    border: "1px solid #E2E8F0",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg, #4F6EF7, #7B93FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✨</div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>腾讯元宝</span>
                      <span style={{ fontSize: 11, color: COLORS.textMuted, marginLeft: "auto" }}>下午 6:00</span>
                    </div>
                    <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.6 }}>
                      📚 复习提醒：你有3道<strong>二次函数</strong>错题即将到达最佳复习时间，现在复习记忆效果最好！<br />
                      <span style={{ color: COLORS.primary, fontWeight: 600 }}>点击立即开始复习 →</span>
                    </div>
                  </div>
                </div>
              )}

              {f.detail === "integration_weread" && (
                <div style={{ background: COLORS.primaryLight, borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.primaryDark, marginBottom: 10 }}>📖 微信读书智能推荐</div>
                  {[
                    { book: "《高中数学思维方法》", chapter: "第5章：二次函数的图像与性质", match: "98%" },
                    { book: "《概率论基础》", chapter: "第3章：条件概率与贝叶斯", match: "92%" },
                  ].map((b, j) => (
                    <div key={j} style={{
                      background: "#fff", borderRadius: 10, padding: 12, marginBottom: j < 1 ? 8 : 0,
                      display: "flex", alignItems: "center", gap: 10,
                    }}>
                      <div style={{ width: 36, height: 48, borderRadius: 4, background: "linear-gradient(135deg, #E0E7FF, #C7D2FE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📕</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{b.book}</div>
                        <div style={{ fontSize: 11, color: COLORS.textSecondary, marginTop: 2 }}>{b.chapter}</div>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.success }}>匹配{b.match}</span>
                    </div>
                  ))}
                </div>
              )}

              {f.detail === "integration_group" && (
                <div style={{ background: COLORS.accentLight, borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#C2410C", marginBottom: 10 }}>👥 学习小组PK模拟</div>
                  <div style={{ background: "#fff", borderRadius: 10, padding: 14 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 10 }}>🏆 本周数学错题PK榜</div>
                    {[
                      { name: "小明", avatar: "😎", score: 95, rank: 1 },
                      { name: "你", avatar: "🙋", score: 82, rank: 2, isMe: true },
                      { name: "小红", avatar: "😊", score: 78, rank: 3 },
                    ].map((u, j) => (
                      <div key={j} style={{
                        display: "flex", alignItems: "center", gap: 10, padding: "8px 0",
                        borderBottom: j < 2 ? `1px solid ${COLORS.borderLight}` : "none",
                        background: u.isMe ? COLORS.primaryLight : "transparent",
                        borderRadius: u.isMe ? 8 : 0, padding: u.isMe ? "8px 10px" : "8px 0",
                      }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: j === 0 ? "#F59E0B" : COLORS.textMuted, width: 20 }}>#{u.rank}</span>
                        <span style={{ fontSize: 20 }}>{u.avatar}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, flex: 1 }}>{u.name}</span>
                        <span style={{ fontSize: 14, fontWeight: 800, color: COLORS.primary }}>{u.score}分</span>
                      </div>
                    ))}
                    <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 8, textAlign: "center" }}>
                      在微信群@元宝 发起"今日数学PK赛"
                    </div>
                  </div>
                </div>
              )}

              {f.detail === "integration_docs" && (
                <div style={{ background: "#EFF6FF", borderRadius: 12, padding: 16, border: "1px solid #BFDBFE" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1E40AF", marginBottom: 10 }}>📄 一键导出到腾讯文档</div>
                  <div style={{ display: "flex", gap: 10 }}>
                    {["错题本PDF", "学情报告", "复习计划表"].map((d, j) => (
                      <div key={j} style={{
                        flex: 1, background: "#fff", borderRadius: 10, padding: 12, textAlign: "center",
                        border: "1px solid #DBEAFE",
                      }}>
                        <div style={{ fontSize: 24, marginBottom: 4 }}>{["📋", "📊", "📅"][j]}</div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.text }}>{d}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    marginTop: 12, padding: "10px 0", borderRadius: 10, textAlign: "center",
                    background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                    fontSize: 12, fontWeight: 700, color: "#fff",
                  }}>导出到腾讯文档 →</div>
                </div>
              )}
            </div>
          )}
        </button>
      ))}

      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
      `}</style>
    </div>
  );
}

// ============================================================
// Main App
// ============================================================
export default function YuanbaoEduDemo() {
  const [activeTab, setActiveTab] = useState("errors");

  return (
    <PhoneFrame>
      <StatusBar />
      <div style={{
        background: "linear-gradient(180deg, #4F6EF7 0%, #F8F9FC 35%)",
        paddingTop: 8,
      }}>
        {/* Top bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 20px 16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 12,
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20,
            }}>🎓</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>元宝 · 学习中心</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>高二 · 理科 · 第二学期</div>
            </div>
          </div>
          <div style={{
            padding: "6px 12px", borderRadius: 20,
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            fontSize: 12, fontWeight: 600, color: "#fff",
            display: "flex", alignItems: "center", gap: 4,
          }}>🔥 5天连续学习</div>
        </div>

        {/* Quick stats */}
        <div style={{
          display: "flex", gap: 10, padding: "0 20px 20px", overflowX: "auto",
        }}>
          {[
            { label: "今日待复习", value: "6题", icon: "📝", urgent: true },
            { label: "本周掌握", value: "12题", icon: "✅" },
            { label: "学力提升", value: "+3分", icon: "📈" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: 14, padding: "12px 16px", minWidth: 110,
              boxShadow: "0 4px 16px rgba(79,110,247,0.15)",
              border: s.urgent ? "1px solid rgba(255,107,53,0.3)" : "1px solid rgba(255,255,255,0.5)",
            }}>
              <div style={{ fontSize: 16, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.text }}>{s.value}</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ minHeight: "60vh" }}>
        {activeTab === "errors" && <ErrorBookTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
        {activeTab === "review" && <ReviewTab />}
        {activeTab === "ecosystem" && <EcosystemTab />}
      </div>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </PhoneFrame>
  );
}
