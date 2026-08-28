import { Link } from "react-router";

const plans = [
  {
    id: "starter",
    name: "STARTER",
    tag: null,
    best: "Small businesses that need a reliable baseline of digital maintenance without the overhead.",
    price: "TBC",
    website: {
      included: ["Core content updates", "Bug fixes", "Basic page edits", "Monthly blog post publishing"],
      excluded: ["New page builds", "Design changes", "Priority turnaround"],
    },
    social: {
      included: ["2× carousels per month", "Basic copywriting", "Scheduling support"],
      excluded: ["Reels production", "Daily content", "Strategy sessions"],
    },
    email: {
      included: ["1× monthly newsletter", "List maintenance"],
      excluded: ["Sequences", "Automations", "Platform setup"],
    },
    turnaround: "3–5 business days",
    accent: false,
  },
  {
    id: "core",
    name: "CORE",
    tag: "MOST POPULAR",
    best: "Growing businesses that want consistent output across all three areas without managing multiple providers.",
    price: "TBC",
    website: {
      included: ["All updates & fixes", "New page builds", "Blog publishing", "Performance checks"],
      excluded: ["Full redesigns", "Custom development"],
    },
    social: {
      included: ["Weekly carousels", "Stock-based reels", "Copywriting", "Scheduling + calendar"],
      excluded: ["Paid ad creative", "Influencer coordination"],
    },
    email: {
      included: ["Weekly or bi-weekly newsletters", "Basic sequences", "Platform management"],
      excluded: ["Full automation builds", "A/B testing"],
    },
    turnaround: "2–3 business days",
    accent: true,
  },
  {
    id: "plus",
    name: "PLUS",
    tag: null,
    best: "Established businesses that want maximum coverage, faster turnaround, and a true ongoing partner.",
    price: "TBC",
    website: {
      included: ["Full coverage", "Priority execution", "New builds & landing pages", "Technical support"],
      excluded: [],
    },
    social: {
      included: ["Daily content", "Reels + carousels", "Full scheduling", "Monthly strategy review"],
      excluded: [],
    },
    email: {
      included: ["Full automation setup", "Sequences + nurture flows", "A/B testing support", "Platform optimisation"],
      excluded: [],
    },
    turnaround: "24–48 hours",
    accent: false,
  },
];

function CheckMark({ positive }: { positive: boolean }) {
  return (
    <span style={{
      display: "inline-block", width: "16px", height: "16px", borderRadius: "50%", flexShrink: 0, marginTop: "2px",
      background: positive ? "rgba(237,78,0,0.15)" : "rgba(255,255,255,0.06)",
      color: positive ? "#ed4e00" : "rgba(255,255,255,0.2)",
      fontSize: "9px", textAlign: "center", lineHeight: "16px",
    }}>
      {positive ? "✓" : "–"}
    </span>
  );
}

function CoverageBlock({ label, included, excluded }: { label: string; included: string[]; excluded: string[] }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "12px" }}>{label}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {included.map((item) => (
          <div key={item} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
            <CheckMark positive />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>{item}</span>
          </div>
        ))}
        {excluded.map((item) => (
          <div key={item} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
            <CheckMark positive={false} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.25)", lineHeight: 1.4 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Plans() {
  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ padding: "160px 80px 80px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span className="idle-section-label reveal delay-1">PLANS / 01—03</span>
        <h1 className="idle-h2 reveal delay-2" style={{ fontSize: "clamp(56px,10vw,150px)", marginBottom: "24px" }}>
          Simple plans.<br />Clear coverage.
        </h1>
        <p className="idle-body reveal delay-3" style={{ maxWidth: "520px", marginBottom: "40px" }}>
          Choose the plan that fits where your business is now. Scope and turnaround depend on plan level.
        </p>
        <Link to="/quiz" className="idle-btn idle-btn-orange-outline reveal delay-4">
          Not sure? Take the quiz ↗
        </Link>
      </div>

      {/* Plans grid */}
      <div style={{ padding: "80px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px" }}>
        {plans.map((plan, i) => (
          <div
            key={plan.id}
            style={{
              background: plan.accent ? "rgba(22,18,211,0.07)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${plan.accent ? "rgba(22,18,211,0.35)" : "rgba(255,255,255,0.07)"}`,
              padding: "48px 36px",
              display: "flex", flexDirection: "column",
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: "40px" }}>
              {plan.tag && (
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.15em", color: "#ed4e00", display: "block", marginBottom: "10px" }}>{plan.tag}</span>
              )}
              <h2 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 900, fontSize: "40px", color: "#fff", letterSpacing: "-0.05em", marginBottom: "16px" }}>{plan.name}</h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{plan.best}</p>
            </div>

            {/* Pricing placeholder */}
            <div style={{ padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "36px" }}>
              <span style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: "28px", color: "rgba(255,255,255,0.25)", letterSpacing: "-0.03em" }}>
                Pricing TBC
              </span>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.2)", marginTop: "4px", fontStyle: "italic" }}>/ month — subscription</p>
            </div>

            {/* Coverage */}
            <div style={{ flex: 1 }}>
              <CoverageBlock label="Website Maintenance" included={plan.website.included} excluded={plan.website.excluded} />
              <CoverageBlock label="Social + Creative" included={plan.social.included} excluded={plan.social.excluded} />
              <CoverageBlock label="Email Marketing" included={plan.email.included} excluded={plan.email.excluded} />

              <div style={{ padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.08)", marginBottom: "28px" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "4px" }}>Typical turnaround</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#fff" }}>{plan.turnaround}</span>
              </div>
            </div>

            <Link
              to="/contact"
              className={`idle-btn ${plan.accent ? "idle-btn-orange" : "idle-btn-outline"}`}
              style={{ justifyContent: "center" }}
            >
              Choose {plan.name.toLowerCase()} plan →
            </Link>
          </div>
        ))}
      </div>

      {/* Note */}
      <div style={{ padding: "0 80px 80px", textAlign: "center" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.25)" }}>
          Clear boundaries. Scope depends on plan. <Link to="/contact" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Have questions? Get in touch →</Link>
        </p>
      </div>

      {/* Quiz CTA */}
      <div style={{ background: "#050510", padding: "96px 80px", borderTop: "1px solid rgba(22,18,211,0.2)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <div>
            <span className="idle-section-label">NOT SURE WHICH FITS?</span>
            <h2 className="idle-h2" style={{ fontSize: "clamp(36px,5vw,72px)" }}>Take the quiz.<br />We'll recommend a plan.</h2>
          </div>
          <div>
            <p className="idle-body" style={{ marginBottom: "32px" }}>
              Answer 7 quick questions about your business and we'll point you to the right coverage level.
            </p>
            <Link to="/quiz" className="idle-btn idle-btn-orange">Take the Plan Quiz →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
