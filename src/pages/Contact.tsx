import { useState, FormEvent } from "react";
import { Link } from "react-router";

const areaOptions = [
  "Website Maintenance",
  "Social + Creative",
  "Email Marketing",
  "All three",
];

const planOptions = [
  "Starter",
  "Core",
  "Plus",
  "Not sure yet",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [form, setForm] = useState({ name: "", company: "", email: "", website: "", message: "" });

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) {
    return (
      <div style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ textAlign: "center", maxWidth: "560px" }}>
          <div style={{ marginBottom: "48px", display: "flex", justifyContent: "center" }}>
            <div style={{
              width: "64px", height: "64px",
              border: "1px solid rgba(237,78,0,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: "#ed4e00", fontSize: "22px" }}>→</span>
            </div>
          </div>
          <h2 style={{
            fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800,
            fontSize: "clamp(44px,8vw,100px)", letterSpacing: "-0.05em",
            color: "#fff", lineHeight: 0.95, marginBottom: "24px",
          }}>
            Consider it moving.
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>
            We've got your details and we'll be in touch.
          </p>
        </div>
      </div>
    );
  }

  const chipStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: "Inter, sans-serif", fontSize: "13px",
    padding: "10px 18px",
    border: `1px solid ${active ? "#ed4e00" : "rgba(255,255,255,0.15)"}`,
    color: active ? "#ed4e00" : "rgba(255,255,255,0.45)",
    background: active ? "rgba(237,78,0,0.06)" : "transparent",
    cursor: "pointer", transition: "all 0.2s ease",
  });

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <div className="idle-section" style={{ paddingTop: "160px" }}>

        {/* Hero */}
        <div style={{ marginBottom: "80px" }}>
          <h1 className="idle-h2 reveal delay-1" style={{ fontSize: "clamp(60px,10vw,160px)", marginBottom: "24px", lineHeight: 0.95 }}>
            Ready to put it<br />on idle?
          </h1>
          <p className="idle-body reveal delay-2" style={{ maxWidth: "480px", fontSize: "17px", lineHeight: 1.65 }}>
            Tell us what your business needs help keeping on top of. If you already know which plan you're interested in, let us know. If you're unsure, we can help you figure it out.
          </p>
        </div>

        {/* Form + sidebar */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "80px", alignItems: "start" }} className="idle-contact-grid">
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "48px" }}>

            <div>
              <label className="idle-input-label">NAME</label>
              <input
                type="text" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="idle-input" placeholder="Full name"
              />
            </div>

            <div>
              <label className="idle-input-label">BUSINESS / COMPANY</label>
              <input
                type="text" value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="idle-input" placeholder="Your business or brand name"
              />
            </div>

            <div>
              <label className="idle-input-label">EMAIL</label>
              <input
                type="email" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="idle-input" placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="idle-input-label">WEBSITE URL</label>
              <input
                type="url" value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="idle-input" placeholder="https://yourwebsite.com"
              />
            </div>

            <div>
              <label className="idle-input-label">WHICH AREA NEEDS THE MOST SUPPORT?</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px" }}>
                {areaOptions.map((a) => (
                  <button type="button" key={a} style={chipStyle(selectedArea === a)} onClick={() => setSelectedArea(a)}>
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="idle-input-label">WHICH PLAN ARE YOU INTERESTED IN?</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px" }}>
                {planOptions.map((p) => (
                  <button type="button" key={p} style={chipStyle(selectedPlan === p)} onClick={() => setSelectedPlan(p)}>
                    {p}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>Not sure which plan?</span>
                <Link to="/quiz" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#ed4e00", textDecoration: "none" }}>Take the Plan Quiz →</Link>
              </div>
            </div>

            <div>
              <label className="idle-input-label">ANYTHING WE SHOULD KNOW?</label>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.25)", marginBottom: "12px", marginTop: "4px" }}>
                Tell us what's currently taking up too much of your time.
              </p>
              <textarea
                rows={5} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="idle-input" placeholder="Tell us what's on the pile..."
                style={{ resize: "none" }}
              />
            </div>

            <button type="submit" className="idle-btn idle-btn-orange" style={{ width: "fit-content" }}>
              Let's get started <span className="btn-arrow">→</span>
            </button>
          </form>

          {/* Sidebar */}
          <div style={{ position: "sticky", top: "100px", display: "flex", flexDirection: "column", gap: "40px" }}>
            <div>
              <span className="idle-section-label">Or email us directly</span>
              <a href="mailto:hello@idledigital.com" style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#fff", textDecoration: "none", display: "block", marginBottom: "4px" }}>
                hello@idledigital.com
              </a>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>(placeholder)</span>
            </div>
            <div>
              <span className="idle-section-label">Based in</span>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.5)" }}>Manila, PH</p>
            </div>
            <div>
              <span className="idle-section-label">Status</span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="idle-status-dot" />
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.5)" }}>Currently: not idle.</p>
              </div>
            </div>
            <div style={{ paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <span className="idle-section-label" style={{ marginBottom: "16px" }}>Not sure where to start?</span>
              <Link to="/how-it-works" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.4)", textDecoration: "none", display: "block", marginBottom: "8px" }}>
                See how it works →
              </Link>
              <Link to="/how-it-works" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.4)", textDecoration: "none", display: "block" }}>
                Compare plans →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
