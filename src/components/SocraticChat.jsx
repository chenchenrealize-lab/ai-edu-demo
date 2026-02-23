import { useState, useEffect, useRef } from "react";
import { COLORS } from "../constants/colors";
import { SOCRATIC_FLOWS } from "../constants/mockData";

export default function SocraticChat({ question, onBack }) {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const containerRef = useRef(null);

  const chatFlow = SOCRATIC_FLOWS[question.id] || [];

  // Advance to the next message
  const handleNext = (optionText) => {
    if (step >= chatFlow.length) return;
    const msg = chatFlow[step];

    if (msg.role === "ai") {
      // Show typing indicator, then reveal AI message
      setTyping(true);
      setTimeout(() => {
        setMessages((prev) => [...prev, msg]);
        setTyping(false);
        setStep((s) => s + 1);
      }, 800 + Math.random() * 400);
    } else {
      // User clicked an option: show user message immediately
      const userMsg = { role: "user", text: optionText || msg.text };
      setMessages((prev) => [...prev, userMsg]);
      setStep((s) => s + 1);

      // Then auto-trigger next AI message
      setTimeout(() => {
        const nextIdx = step + 1;
        if (nextIdx < chatFlow.length && chatFlow[nextIdx].role === "ai") {
          setTyping(true);
          setTimeout(() => {
            setMessages((prev) => [...prev, chatFlow[nextIdx]]);
            setTyping(false);
            setStep((s) => s + 1);
          }, 800 + Math.random() * 400);
        }
      }, 300);
    }
  };

  // Auto-start first AI message
  useEffect(() => {
    if (chatFlow.length > 0 && step === 0) {
      setTyping(true);
      setTimeout(() => {
        setMessages([chatFlow[0]]);
        setTyping(false);
        setStep(1);
      }, 1000);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const currentMsg = step < chatFlow.length ? chatFlow[step] : null;
  const isUserTurn = currentMsg?.role === "user";
  const isFinished = step >= chatFlow.length && messages.length > 0;

  return (
    <div>
      {/* Back button + title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <button
          onClick={onBack}
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            border: `1px solid ${COLORS.border}`,
            background: COLORS.card,
            fontSize: 16,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ←
        </button>
        <div>
          <div
            style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}
          >
            ✨ AI引导讲解
          </div>
          <div
            style={{ fontSize: 11, color: COLORS.textSecondary }}
          >
            苏格拉底式对话 · 启发你自己发现答案
          </div>
        </div>
      </div>

      {/* Original question card */}
      <div
        style={{
          background: COLORS.card,
          borderRadius: 16,
          padding: 16,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: COLORS.textMuted,
            marginBottom: 6,
            fontWeight: 600,
          }}
        >
          📋 原题 · {question.subject} · {question.topic}
        </div>
        <div
          style={{
            fontSize: 14,
            color: COLORS.text,
            fontWeight: 600,
            lineHeight: 1.7,
          }}
        >
          {question.question}
        </div>
      </div>

      {/* Chat messages */}
      <div
        ref={containerRef}
        style={{
          maxHeight: 380,
          overflowY: "auto",
          marginBottom: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          paddingRight: 4,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className="fade-in"
            style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "82%",
                padding: "12px 16px",
                borderRadius: 16,
                fontSize: 14,
                lineHeight: 1.7,
                background:
                  m.role === "user"
                    ? "linear-gradient(135deg, #4F6EF7, #3A54C4)"
                    : COLORS.card,
                color: m.role === "user" ? "#fff" : COLORS.text,
                boxShadow:
                  m.role === "user"
                    ? "0 4px 12px rgba(79,110,247,0.3)"
                    : "0 2px 8px rgba(0,0,0,0.06)",
                borderBottomRightRadius: m.role === "user" ? 4 : 16,
                borderBottomLeftRadius: m.role === "user" ? 16 : 4,
                whiteSpace: "pre-line",
              }}
            >
              {m.role === "ai" && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: COLORS.primary,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  ✨ 元宝AI导师
                </span>
              )}
              {m.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                background: COLORS.card,
                borderRadius: 16,
                padding: "12px 20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                borderBottomLeftRadius: 4,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="typing-dot"
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: COLORS.textMuted,
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {/* User option buttons */}
        {isUserTurn && currentMsg.options && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {currentMsg.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleNext(opt)}
                className="option-btn"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: `1.5px solid ${COLORS.primary}33`,
                  background: i === 0 ? `${COLORS.primary}10` : COLORS.card,
                  fontSize: 13,
                  fontWeight: 600,
                  color: COLORS.primary,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                }}
              >
                {String.fromCharCode(65 + i)}. {opt}
              </button>
            ))}
          </div>
        )}

        {/* Finished button */}
        {isFinished && (
          <button
            onClick={onBack}
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg, #22C55E, #16A34A)",
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(34,197,94,0.35)",
            }}
          >
            ✅ 已掌握，返回错题本
          </button>
        )}
      </div>
    </div>
  );
}
