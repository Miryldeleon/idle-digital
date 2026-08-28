import { Link } from "react-router";

const services = [
  {
    num: "01", title: "Website Maintenance",
    headline: "Your website, always current. Always working.",
    body: "We handle the updates, fixes, new pages, and content publishing so your site stays accurate and functional without you having to touch it.",
    caps: ["Content & copy updates", "Bug fixes & troubleshooting", "New page builds", "Blog publishing", "Performance monitoring", "Plugin & platform maintenance"],
    blue: false,
  },
  {
    num: "02", title: "Social + Creative",
    headline: "Consistent content without the constant management.",
    body: "We plan, create, and schedule your social content — carousels, reels, captions and all — so your brand keeps showing up without you having to think about it.",
    caps: ["Carousel design", "Stock-based reels", "Caption copywriting", "Content scheduling", "Monthly content calendar", "Platform management"],
    blue: true,
  },
  {
    num: "03", title: "Email Marketing",
    headline: "Newsletters that actually go out.",
    body: "From recurring newsletters to automated sequences, we handle the writing, design, scheduling and reporting — so your list keeps hearing from you.",
    caps: ["Monthly newsletters", "Welcome sequences", "Nurture automations", "List management", "Platform setup & optimisation", "Performance reporting"],
    blue: false,
  },
];

export default function Services() {
  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ padding: "160px 80px 80px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span className="idle-section-label reveal delay-1">WHAT WE HANDLE</span>
        <h1 className="idle-h2 reveal delay-2" style={{ fontSize: "clamp(52px,9vw,140px)", marginBottom: "32px" }}>
          Three areas.<br />Fully covered.
        </h1>
        <p className="idle-body reveal delay-3" style={{ maxWidth: "560px" }}>
          Website maintenance, social content, and email marketing — handled on a subscription basis so the work never stops when you're busy.
        </p>
      </div>

      {/* Services */}
      {services.map((s, i) => (
        <section
          key={s.num}
          style={{
            background: s.blue ? "#1612d3" : "#000",
            padding: "96px 80px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: "40px" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", paddingTop: "10px" }}>
              {s.num} —
            </span>
            <div>
              <h2 className="idle-h2" style={{ marginBottom: "20px" }}>{s.title}</h2>
              <p style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 600, fontSize: "clamp(18px,2.2vw,28px)", color: "rgba(255,255,255,0.85)", letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: "20px" }}>
                {s.headline}
              </p>
              <p className="idle-body" style={{ maxWidth: "440px" }}>{s.body}</p>
            </div>
            <div style={{ paddingTop: "8px" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "20px" }}>INCLUDES</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {s.caps.map((cap) => (
                  <div key={cap} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#ed4e00", flexShrink: 0 }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section style={{ padding: "120px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div>
            <h2 className="idle-h2" style={{ fontSize: "clamp(44px,6vw,88px)", marginBottom: "24px" }}>
              Need one, two,<br />or all three?
            </h2>
            <p className="idle-body">Every plan covers all three areas. Choose your level.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <Link to="/plans" className="idle-btn idle-btn-orange">View Plans <span className="btn-arrow">→</span></Link>
            <Link to="/quiz"  className="idle-btn idle-btn-outline">Take the Quiz <span className="btn-arrow">↗</span></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
