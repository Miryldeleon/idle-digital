import { useState } from "react";
import { Link } from "react-router";

const QUESTIONS = [
  {
    id: "name",
    label: "First, what's your name?",
    type: "text" as const,
    placeholder: "Your name",
  },
  {
    id: "business",
    label: "What type of business are you running?",
    type: "choice" as const,
    options: ["E-commerce / Product", "Service business", "Personal brand / Creator", "Agency / Studio", "Non-profit", "Other"],
  },
  {
    id: "need",
    label: "What's your primary need right now?",
    type: "choice" as const,
    options: ["Website maintenance & updates", "Social media content", "Email marketing", "All three — I need full coverage", "Not sure yet"],
  },
  {
    id: "website",
    label: "What's your current website situation?",
    type: "choice" as const,
    options: ["Live and working — just needs upkeep", "Live but outdated or broken", "Being built right now", "No website yet"],
  },
  {
    id: "content",
    label: "How often do you want to post on social media?",
    type: "choice" as const,
    options: ["A few times a month", "Weekly", "Multiple times a week", "Daily", "I don't prioritise social"],
  },
  {
    id: "email",
    label: "What size is your email list?",
    type: "choice" as const,
    options: ["No list yet", "Under 500", "500 – 2,000", "2,000 – 10,000", "10,000+"],
  },
  {
    id: "support",
    label: "What level of support feels right?",
    type: "choice" as const,
    options: ["Minimal — just the essentials handled", "Balanced — consistent output across areas", "Maximum — I want full coverage and fast turnaround"],
  },
];

function getRecommendation(answers: Record<string, string>): { plan: string; reason: string } {
  const support = answers.support || "";
  const need    = answers.need    || "";
  const content = answers.content || "";

  if (support.includes("Maximum") || content.includes("Daily") || need.includes("All three")) {
    return {
      plan: "PLUS",
      reason: "Based on your answers, you want high coverage, fast turnaround, and consistent output across all three areas. Plus gives you the most capacity and shortest response times.",
    };
  }
  if (support.includes("Balanced") || need.includes("All three") || content.includes("Multiple") || content.includes("Weekly")) {
    return {
      plan: "CORE",
      reason: "You need consistent, reliable output across website, social, and email — without micromanaging it. Core covers all three areas with solid turnaround and real depth.",
    };
  }
  return {
    plan: "STARTER",
    reason: "You need the essentials covered without the overhead. Starter gives you dependable maintenance and basic content support — clean, simple, and easy to start.",
  };
}

export default function Quiz() {
  const [step,    setStep]    = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [textVal, setTextVal] = useState("");
  const [done,    setDone]    = useState(false);

  const q = QUESTIONS[step];
  const isText   = q.type === "text";
  const isLast   = step === QUESTIONS.length - 1;
  const progress = ((step) / QUESTIONS.length) * 100;

  const handleChoice = (val: string) => {
    const next = { ...answers, [q.id]: val };
    setAnswers(next);
    if (isLast) { setDone(true); }
    else setStep(step + 1);
  };

  const handleText = () => {
    if (!textVal.trim()) return;
    setAnswers({ ...answers, [q.id]: textVal.trim() });
    setTextVal("");
    setStep(step + 1);
  };

  const result = getRecommendation(answers);
  const planColors: Record<string, string> = { STARTER: "rgba(255,255,255,0.1)", CORE: "rgba(22,18,211,0.25)", PLUS: "rgba(237,78,0,0.15)" };
  const planBorders: Record<string, string> = { STARTER: "rgba(255,255,255,0.15)", CORE: "rgba(22,18,211,0.5)", PLUS: "rgba(237,78,0,0.4)" };

  return (
    <div style={{ background: "#000", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header bar */}
      <div style={{ padding: "120px 80px 0" }}>
        <span className="idle-section-label">PLAN QUIZ</span>
        <div style={{ display: "flex", gap: "4px", marginTop: "20px", marginBottom: "64px" }}>
          {QUESTIONS.map((_, i) => (
            <div key={i} style={{ height: "2px", flex: 1, background: i < step || done ? "#ed4e00" : "rgba(255,255,255,0.12)", transition: "background 0.4s ease", borderRadius: "1px" }} />
          ))}
        </div>
      </div>

      {/* Question / Result */}
      <div style={{ flex: 1, padding: "0 80px 120px", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "800px" }}>
        {!done ? (
          <div key={step} style={{ animation: "fadeIn 0.4s ease" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "20px" }}>
              {step + 1} / {QUESTIONS.length}
            </p>
            <h2 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "48px" }}>
              {q.label}
            </h2>

            {isText ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <input
                  type="text"
                  value={textVal}
                  onChange={(e) => setTextVal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleText()}
                  placeholder={q.placeholder}
                  className="idle-input"
                  style={{ fontSize: "20px", paddingBottom: "20px" }}
                  autoFocus
                />
                <button
                  onClick={handleText}
                  className="idle-btn idle-btn-outline"
                  style={{ width: "fit-content", marginTop: "8px" }}
                  disabled={!textVal.trim()}
                >
                  Continue →
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {q.options!.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleChoice(opt)}
                    style={{
                      fontFamily: "Inter, sans-serif", fontSize: "15px",
                      color: "#fff", background: "transparent",
                      border: "1px solid rgba(255,255,255,0.15)",
                      padding: "16px 24px", textAlign: "left",
                      cursor: "none", transition: "all 0.2s ease",
                      borderRadius: "3px",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#ed4e00";
                      (e.currentTarget as HTMLButtonElement).style.color = "#ed4e00";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
                      (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                style={{ marginTop: "32px", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "none", padding: 0 }}
              >
                ← Back
              </button>
            )}
          </div>
        ) : (
          /* Result */
          <div style={{ animation: "fadeIn 0.6s ease" }}>
            <span className="idle-section-label">YOUR RECOMMENDED PLAN</span>
            <div style={{
              background: planColors[result.plan], border: `1px solid ${planBorders[result.plan]}`,
              padding: "48px 40px", marginBottom: "40px", marginTop: "32px", borderRadius: "4px",
            }}>
              <h2 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 900, fontSize: "clamp(52px,8vw,100px)", color: "#fff", letterSpacing: "-0.06em", lineHeight: 1, marginBottom: "24px" }}>
                {result.plan}
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: "560px" }}>
                {result.reason}
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
              <Link to="/plans" className="idle-btn idle-btn-orange">
                Go to {result.plan.charAt(0) + result.plan.slice(1).toLowerCase()} plan →
              </Link>
              <Link to="/plans" className="idle-btn idle-btn-outline">
                Compare all plans
              </Link>
            </div>

            <button
              onClick={() => { setStep(0); setAnswers({}); setDone(false); }}
              style={{ display: "block", marginTop: "24px", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "none", padding: 0 }}
            >
              Retake quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
