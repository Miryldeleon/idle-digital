import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

const principles = [
  {
    num: "01", title: "CLEAR COVERAGE",
    desc: "Know what's included before the work starts.",
  },
  {
    num: "02", title: "LESS MEETINGS",
    desc: "Communication should help the work move — not become the work.",
  },
  {
    num: "03", title: "CONSISTENT EXECUTION",
    desc: "Small recurring tasks deserve the same care as larger ones.",
  },
  {
    num: "04", title: "QUIETLY HANDLED",
    desc: "Submit it. Track it. Let it move.",
  },
];

export default function About() {
  const s1 = useInView();
  const s2 = useInView(0.1);

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>

      {/* ═══════════════ HERO — BLACK ═══════════════ */}
      <section style={{ background: "#000", padding: "160px 80px 120px", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "flex-end" }} className="idle-hiw-hero">
        <span className="idle-section-label reveal delay-1">WE'RE CALLED IDLE.</span>
        <h1 style={{
          fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800,
          fontSize: "clamp(48px,8.5vw,132px)", letterSpacing: "-0.04em",
          color: "#fff", lineHeight: 0.95, margin: "24px 0 48px",
        }} className="reveal delay-2">
          Because your digital work<br />shouldn't live in your head.
        </h1>
        <div style={{ maxWidth: "560px" }} className="reveal delay-3">
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "20px" }}>
            Idle Digital was built for businesses that always have something digital waiting to be done.
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: "20px" }}>
            A website update.
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: "20px" }}>
            Next week's content.
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
            A newsletter that should have gone out yesterday.
          </p>
        </div>
        <div style={{ marginTop: "48px" }} className="reveal delay-4">
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: "520px" }}>
            Instead of hiring separately, chasing freelancers or starting a new project every time — you put it on Idle.
          </p>
        </div>
      </section>

      {/* ═══════════════ PHILOSOPHY — NAVY ═══════════════ */}
      <section style={{ background: "#000051", padding: "140px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "80px" }} className="idle-about-philo-grid">
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", paddingTop: "12px" }}>THE IDEA</span>
          <div>
            <h2 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(40px,6vw,88px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.0, marginBottom: "48px" }}>
              Less managing.<br />More handled.
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "18px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: "24px", maxWidth: "600px" }}>
              The goal isn't to give you another person, platform or process to manage.
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "18px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "600px" }}>
              The goal is to quietly keep recurring digital work moving in the background.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ PRINCIPLES — WHITE ═══════════════ */}
      <section ref={s1.ref} style={{ background: "#fff", padding: "120px 80px" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.15em", color: "#ed4e00", textTransform: "uppercase", display: "block", marginBottom: "64px" }}>HOW WE WORK</span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid rgba(0,0,0,0.1)" }} className="idle-principles-grid">
          {principles.map((p, i) => (
            <div
              key={p.num}
              style={{
                padding: "64px 40px 64px 0",
                borderRight: i % 2 === 0 ? "1px solid rgba(0,0,0,0.1)" : "none",
                borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.1)" : "none",
                paddingLeft: i % 2 === 1 ? "40px" : "0",
                opacity: s1.vis ? 1 : 0, transform: s1.vis ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
              }}
            >
              <span style={{
                fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800,
                fontSize: "clamp(52px,7vw,88px)", letterSpacing: "-0.05em",
                color: "#ed4e00", display: "block", marginBottom: "24px",
              }}>
                {p.num}
              </span>
              <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.1em", color: "#000", marginBottom: "16px" }}>{p.title}</h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "rgba(0,0,0,0.6)", lineHeight: 1.65, maxWidth: "300px" }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ ABOUT CTA — BLACK ═══════════════ */}
      <section ref={s2.ref} style={{ background: "#000", padding: "120px 80px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <span className="idle-section-label">READY TO PUT IT ON IDLE?</span>
        <h2 style={{
          fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800,
          fontSize: "clamp(52px,9vw,130px)", letterSpacing: "-0.04em",
          color: "#fff", lineHeight: 0.95, marginBottom: "48px", marginTop: "24px",
          opacity: s2.vis ? 1 : 0, transform: s2.vis ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}>
          Tell us what needs<br />handling.
        </h2>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Link to="/contact" className="idle-btn idle-btn-orange">
            Get in touch <span className="btn-arrow">→</span>
          </Link>
          <Link to="/how-it-works" className="idle-btn idle-btn-outline">
            View Plans →
          </Link>
        </div>
      </section>
    </div>
  );
}
