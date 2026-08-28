import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

/* ─── Editorial plan column ─── */
function PlanCol({ num, name, best, tag, cta, idx, vis }: {
  num: string; name: string; best: string; tag: string | null; cta: string; idx: number; vis: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "40px 32px",
        borderRight: idx < 2 ? "1px solid rgba(0,0,0,0.1)" : "none",
        background: hov ? "#1612d3" : "#fff",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: `background 0.4s ease, opacity 0.6s ease ${idx * 100}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${idx * 100}ms`,
      }}
    >
      {tag && <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.14em", color: "#ed4e00", display: "block", marginBottom: "12px" }}>{tag}</span>}
      <span style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(52px,6vw,80px)", letterSpacing: "-0.06em", color: hov ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.07)", display: "block", lineHeight: 1, marginBottom: "8px", transition: "color 0.4s ease" }}>{num}</span>
      <h3 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(22px,2.5vw,34px)", letterSpacing: "-0.04em", color: hov ? "#fff" : "#000", marginBottom: "12px", transition: "color 0.4s ease" }}>{name}</h3>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: hov ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)", lineHeight: 1.6, marginBottom: "32px", minHeight: "52px", transition: "color 0.4s ease" }}>{best}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0", borderTop: `1px solid ${hov ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}`, marginBottom: "32px" }}>
        {[
          { label: "Website Maintenance", val: "Monthly coverage based on plan scope." },
          { label: "Social + Creative",   val: "Ongoing creative coverage based on plan scope." },
          { label: "Email Marketing",     val: "Email support based on plan scope." },
          { label: "Turnaround",          val: "Depends on request complexity and active workload." },
        ].map((row) => (
          <div key={row.label} style={{ padding: "14px 0", borderBottom: `1px solid ${hov ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}` }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: hov ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)", display: "block", marginBottom: "3px", transition: "color 0.4s ease" }}>{row.label}</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: hov ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)", lineHeight: 1.4, display: "block", transition: "color 0.4s ease" }}>{row.val}</span>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: hov ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)", fontStyle: "italic", marginBottom: "20px" }}>Pricing — TBC</p>
      <Link to="/contact" style={{
        fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em",
        color: hov ? "#fff" : "#000",
        border: `1px solid ${hov ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.2)"}`,
        padding: "12px 20px", textDecoration: "none",
        display: "inline-flex", alignItems: "center", gap: "8px",
        transition: "all 0.3s ease",
        width: "100%", justifyContent: "space-between",
      }}>
        {cta} <span>→</span>
      </Link>
    </div>
  );
}

const FAQS = [
  { q: "Is there a setup fee?",       a: "No setup fee. You subscribe to a plan, complete a short onboarding questionnaire, and work begins." },
  { q: "Do we need calls?",           a: "No. Meetings are completely optional. The task portal keeps communication structured without requiring check-ins." },
  { q: "What's the task portal?",     a: "A Trello-style board where you submit, track and review requests. Everything in one place — no email chains." },
  { q: "Can I change plans later?",   a: "Yes. Plans are designed to scale as your needs change. We'll guide you on timing and transition." },
  { q: "What if I need something outside the plan scope?", a: "Anything outside your subscription can be quoted separately. Clear boundaries mean no surprises." },
  { q: "How fast are tasks handled?", a: "All requests are confirmed within 24 hours. Execution timing depends on complexity and your plan's coverage." },
];

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <span style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: "clamp(16px,1.8vw,22px)", color: "rgba(255,255,255,0.85)", letterSpacing: "-0.02em" }}>{q}</span>
        <span style={{ color: "#ed4e00", fontSize: "18px", flexShrink: 0, transition: "transform 0.25s ease", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      <div style={{ maxHeight: open ? "200px" : "0", overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, paddingBottom: "22px", maxWidth: "600px" }}>{a}</p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const s1 = useInView();
  const s2 = useInView(0.08);
  const s3 = useInView(0.05);
  const s4 = useInView();

  return (
    <div>

      {/* ═══════════════ HERO — ELECTRIC BLUE ═══════════════ */}
      <section style={{ background: "#1612d3", padding: "160px 80px 120px", minHeight: "72vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative", overflow: "hidden" }} className="idle-hiw-hero">
        {/* Large crescent decorative element */}
        <div style={{ position: "absolute", right: "-80px", top: "50%", transform: "translateY(-50%)", opacity: 0.12, pointerEvents: "none" }}>
          <svg viewBox="0 0 72 72" fill="none" style={{ width: "600px", height: "600px" }}>
            <path d="M36 12C49.255 12 60 22.745 60 36C60 49.255 49.255 60 36 60C29.5 60 23.7 57.4 19.5 53.1C25 55.9 33.5 49.5 33.5 36C33.5 22.5 25 16.1 19.5 18.9C23.7 14.6 29.5 12 36 12Z" fill="#fff" />
            <circle cx="40" cy="36" r="18.5" fill="#1612d3" />
          </svg>
        </div>

        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", display: "block", marginBottom: "24px" }} className="reveal delay-1">HOW IDLE WORKS</span>
        <h1 style={{
          fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800,
          fontSize: "clamp(52px,9vw,140px)", letterSpacing: "-0.04em",
          color: "#fff", lineHeight: 0.95, margin: "0 0 40px",
        }} className="reveal delay-2">
          Digital support<br />without the<br />digital mess.
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.6)", maxWidth: "460px", lineHeight: 1.65, marginBottom: "48px" }} className="reveal delay-3">
          Idle Digital handles recurring website, social and email work through one simple monthly subscription. Less chasing. Less managing. More handled.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }} className="reveal delay-4">
          <button onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })} style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#000", background: "#fff", border: "none", padding: "14px 24px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", letterSpacing: "0.04em" }}>
            View Plans ↓
          </button>
          <button onClick={() => document.getElementById("what-we-handle")?.scrollIntoView({ behavior: "smooth" })} style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.65)", background: "transparent", border: "1px solid rgba(255,255,255,0.25)", padding: "14px 24px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", letterSpacing: "0.04em" }}>
            See what we handle ↓
          </button>
        </div>
      </section>

      {/* ═══════════════ 01 — WEBSITE — BLUE (dark) ═══════════════ */}
      <section id="what-we-handle" style={{ background: "#000051", padding: "120px 80px" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>ID — 01 / WHAT WE HANDLE</span>
        <h2 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(40px,6vw,88px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.0, marginBottom: "80px" }}>
          Three areas.<br />One digital partner.
        </h2>

        {/* Service 01 — Website Maintenance */}
        <div ref={s1.ref} style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center",
          paddingTop: "64px", borderTop: "1px solid rgba(255,255,255,0.08)",
          opacity: s1.vis ? 1 : 0, transform: s1.vis ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }} className="idle-service-row">
          <div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.12em", color: "#ed4e00", display: "block", marginBottom: "20px" }}>01 / WEBSITE MAINTENANCE</span>
            <h3 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,60px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.0, marginBottom: "28px" }}>
              Your website,<br />always current.
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: "400px", marginBottom: "32px" }}>
              Your website shouldn't only get attention when something breaks. Idle Digital keeps the everyday website work moving — from updates and fixes to new pages and publishing.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Updates", "Fixes", "New pages", "Blog publishing", "Website maintenance"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#ed4e00", flexShrink: 0 }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.55)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Service visual — dark, with white badge labels */}
          <div style={{ background: "#000", padding: "40px", display: "flex", flexDirection: "column", gap: "1px", border: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { label: "Homepage update",  status: "PAGE UPDATED ✓",  done: true },
              { label: "Blog post #14",    status: "BLOG PUBLISHED ✓", done: true },
              { label: "Broken link",      status: "FIX DEPLOYED ✓",   done: true },
              { label: "New landing page", status: "IN QUEUE",         done: false },
            ].map((row) => (
              <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>{row.label}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", color: row.done ? "#ed4e00" : "rgba(255,255,255,0.2)" }}>{row.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICE 02 — SOCIAL — WHITE ═══════════════ */}
      <section style={{ background: "#fff", padding: "120px 80px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center",
        }} className="idle-service-row">
          {/* Visual first on this row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {[
              { label: "Carousel 01",    sub: "3 slides ready",   bg: "#1612d3", light: true },
              { label: "Reel draft",     sub: "Stock sourced",     bg: "#f0f0f0", light: false },
              { label: "Copy block",     sub: "Caption approved",  bg: "#000",    light: true },
              { label: "Week 3 sched",   sub: "Scheduled ✓",       bg: "#ed4e00", light: true },
            ].map((tile) => (
              <div key={tile.label} style={{ background: tile.bg, padding: "24px 20px", aspectRatio: "1", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: tile.light ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.35)", display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{tile.sub}</span>
                <span style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: "15px", color: tile.light ? "#fff" : "#000", letterSpacing: "-0.02em" }}>{tile.label}</span>
              </div>
            ))}
          </div>

          <div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.12em", color: "#ed4e00", display: "block", marginBottom: "20px" }}>02 / SOCIAL + CREATIVE</span>
            <h3 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,60px)", letterSpacing: "-0.04em", color: "#000", lineHeight: 1.0, marginBottom: "28px" }}>
              Content that<br />actually ships.
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "rgba(0,0,0,0.55)", lineHeight: 1.7, maxWidth: "400px", marginBottom: "32px" }}>
              Content shouldn't become another unfinished item on your list. We help plan, create and prepare the social content your business needs to keep showing up consistently.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Carousels", "Stock-based reels", "Copywriting", "Content preparation", "Scheduling"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#ed4e00", flexShrink: 0 }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(0,0,0,0.55)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICE 03 — EMAIL — BLACK ═══════════════ */}
      <section style={{ background: "#000", padding: "120px 80px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center",
        }} className="idle-service-row">
          <div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.12em", color: "#ed4e00", display: "block", marginBottom: "20px" }}>03 / EMAIL MARKETING</span>
            <h3 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(32px,4vw,60px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.0, marginBottom: "28px" }}>
              The newsletter<br />that actually goes.
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: "400px", marginBottom: "32px" }}>
              The newsletter shouldn't still be sitting in drafts. We help create, prepare and maintain the email communication that keeps your audience connected.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Newsletters", "Email sequences", "Automations", "Setup", "Campaign preparation"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#ed4e00", flexShrink: 0 }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Email visual */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            <div style={{ background: "#1612d3", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>NEWSLETTER — ISSUE 12</span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, color: "#ed4e00", letterSpacing: "0.08em" }}>SENT ✓</span>
            </div>
            <div style={{ background: "#111", padding: "28px", display: "flex", flexDirection: "column", gap: "12px", border: "1px solid rgba(255,255,255,0.06)", borderTop: "none" }}>
              <div style={{ height: "8px", width: "60%", background: "rgba(255,255,255,0.1)", borderRadius: "2px" }} />
              <div style={{ height: "6px", width: "80%", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }} />
              <div style={{ height: "6px", width: "70%", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }} />
              <div style={{ height: "6px", width: "45%", background: "rgba(255,255,255,0.04)", borderRadius: "2px", marginTop: "4px" }} />
              <div style={{ marginTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ background: "#ed4e00", padding: "8px 16px" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#fff", fontWeight: 700, letterSpacing: "0.04em" }}>Read now →</span>
                </div>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>Sent 08:00 AM</span>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", padding: "12px 16px", display: "flex", gap: "24px", borderTop: "none" }}>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "20px", color: "#fff", display: "block" }}>64%</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>OPEN RATE</span>
              </div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "20px", color: "#fff", display: "block" }}>12%</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>CLICK RATE</span>
              </div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "20px", color: "#ed4e00", display: "block" }}>✓</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>SEQUENCE ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 02 — PROCESS — ELECTRIC BLUE ═══════════════ */}
      <section ref={s2.ref} style={{ background: "#1612d3", padding: "120px 80px" }}>
        <div style={{ marginBottom: "80px" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>ID — 02 / HOW IT WORKS</span>
          <h2 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(44px,7vw,104px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.0 }}>
            Put it on Idle.
          </h2>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          {[
            { num: "01", title: "CHOOSE A PLAN",              body: "Pick the level of support that fits your business.", note: true, delay: 0 },
            { num: "02", title: "TELL US WHAT NEEDS HANDLING", body: "Complete a quick onboarding questionnaire so we understand your business, systems and priorities.", note: false, delay: 80 },
            { num: "03", title: "OPTIONAL DISCOVERY CALL",     body: "We only add a meeting when it's actually useful.", note: false, delay: 160 },
            { num: "04", title: "SUBSCRIBE + SUBMIT TASKS",    body: "Your work lives inside a simple Trello-style task portal so priorities, requests and progress stay clear.", note: false, delay: 240 },
            { num: "05", title: "WE GET MOVING",               body: "Requests are acknowledged and moved into the workflow based on your plan and current priorities.", note: false, delay: 320 },
          ].map((step) => (
            <div key={step.num} style={{
              display: "grid", gridTemplateColumns: "100px 1fr",
              gap: "48px", padding: "48px 0",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              opacity: s2.vis ? 1 : 0, transform: s2.vis ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.6s ease ${step.delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${step.delay}ms`,
            }} className="idle-step-row">
              <span style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(52px,6vw,88px)", letterSpacing: "-0.06em", color: "rgba(255,255,255,0.15)", lineHeight: 1 }}>{step.num}</span>
              <div style={{ paddingTop: "12px" }}>
                <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", marginBottom: "12px" }}>{step.title}</h3>
                <p style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: "clamp(20px,2.5vw,32px)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2, maxWidth: "560px" }}>{step.body}</p>
                {step.note && (
                  <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>Not sure which plan?</span>
                    <Link to="/quiz" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#ed4e00", textDecoration: "none", fontWeight: 600 }}>Take the Plan Quiz →</Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ POSITIONING — BLACK ═══════════════ */}
      <section style={{ background: "#000", padding: "120px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="idle-pos-grid">
          <div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", display: "block", marginBottom: "24px" }}>NOT AN AGENCY.</span>
            <h2 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(40px,6vw,88px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.0, margin: "0" }}>
              Built to feel<br />like a partner.
            </h2>
          </div>
          <div>
            {["Calm process.", "Premium output.", "Clear coverage.", "Less meetings."].map((line) => (
              <p key={line} style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: "clamp(22px,2.5vw,36px)", color: "rgba(255,255,255,0.65)", letterSpacing: "-0.02em", marginBottom: "8px" }}>
                {line}
              </p>
            ))}
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.35)", lineHeight: 1.7, maxWidth: "400px", marginTop: "28px" }}>
              Idle Digital is designed for businesses that need ongoing digital help without building an internal team or starting a new agency project every time something needs doing.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ 03 — PLANS — WHITE (editorial) ═══════════════ */}
      <section id="plans" ref={s3.ref} style={{ background: "#fff", padding: "120px 80px" }}>
        <div style={{ marginBottom: "64px" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.14em", color: "#ed4e00", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>ID — 03 / PLANS 01—03</span>
          <h2 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(40px,6vw,88px)", letterSpacing: "-0.04em", color: "#000", lineHeight: 1.0 }}>
            Simple plans.<br />Clear coverage.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "1px solid rgba(0,0,0,0.1)" }} className="idle-plans-grid">
          {[
            { num: "01", name: "STARTER", tag: null,           best: "Businesses that need a baseline of digital maintenance.", cta: "Choose Starter" },
            { num: "02", name: "CORE",    tag: "MOST POPULAR", best: "Growing businesses that want consistent output across all three areas.", cta: "Choose Core" },
            { num: "03", name: "PLUS",    tag: null,           best: "Maximum coverage and faster execution.", cta: "Choose Plus" },
          ].map((plan, i) => (
            <PlanCol key={plan.name} {...plan} idx={i} vis={s3.vis} />
          ))}
        </div>

        {/* Quiz CTA */}
        <div style={{ marginTop: "40px", padding: "32px 40px", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: "clamp(18px,2vw,28px)", color: "#000", letterSpacing: "-0.02em", marginBottom: "4px" }}>NOT SURE WHICH ONE FITS?</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(0,0,0,0.45)" }}>Answer a few quick questions and we'll point you toward the best starting plan.</p>
          </div>
          <Link to="/quiz" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 700, color: "#ed4e00", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
            Take the Plan Quiz →
          </Link>
        </div>
      </section>

      {/* ═══════════════ 04 — INCLUDED/NOT — DEEP NAVY ═══════════════ */}
      <section style={{ background: "#000051", padding: "120px 80px" }}>
        <div style={{ marginBottom: "64px" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>ID — 04 / SCOPE</span>
          <h2 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(40px,6vw,88px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.0 }}>
            Clear boundaries.<br />No guessing.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }} className="idle-incl-grid">
          <div style={{ padding: "48px 40px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ed4e00" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.12em", color: "#ed4e00" }}>INCLUDED</span>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: "28px" }}>Typical recurring digital tasks covered by your selected plan.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Recurring website updates and fixes", "New page builds (within plan scope)", "Blog and content publishing", "Social content creation and scheduling", "Newsletter creation and send", "Email sequence and automation support", "Task portal access and management"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "#ed4e00", fontSize: "12px", flexShrink: 0, marginTop: "2px" }}>✓</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: "48px 40px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)" }}>NOT INCLUDED</span>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", lineHeight: 1.7, marginBottom: "28px" }}>Work outside the subscription scope or projects requiring separate quoting.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Full website redesigns or rebuilds", "Brand identity and logo design", "Large-scale campaign production", "Custom software or development", "Photography or videography", "Paid media management (ads)", "Out-of-scope project work"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", flexShrink: 0, marginTop: "2px" }}>—</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 05 — FAQ — DEEP NAVY ═══════════════ */}
      <section ref={s4.ref} style={{ background: "#000051", padding: "120px 80px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "80px" }} className="idle-faq-grid">
          <div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>ID — 05 / FAQ</span>
            <h2 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: "clamp(28px,3vw,44px)", color: "#fff", letterSpacing: "-0.03em" }}>Common questions.</h2>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {FAQS.map((f) => <FaqRow key={f.q} {...f} />)}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA — ELECTRIC BLUE ═══════════════ */}
      <section style={{ background: "#1612d3", padding: "120px 80px 80px", position: "relative", overflow: "hidden" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", display: "block", marginBottom: "24px" }}>READY?</span>
        <h2 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(56px,10vw,156px)", letterSpacing: "-0.05em", color: "#fff", lineHeight: 0.9, marginBottom: "56px" }}>
          Ready to set<br />it to<span style={{ color: "#ed4e00" }}> idle.</span>
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "120px" }}>
          <Link to="/contact" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#000", background: "#fff", padding: "14px 24px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", letterSpacing: "0.04em" }}>
            Get started <span>→</span>
          </Link>
          <button onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })} style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.65)", background: "transparent", border: "1px solid rgba(255,255,255,0.25)", padding: "14px 24px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", letterSpacing: "0.04em" }}>
            View Plans ↑
          </button>
        </div>
        <div style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(80px,16vw,240px)", letterSpacing: "-0.06em", color: "rgba(255,255,255,0.07)", lineHeight: 0.85, userSelect: "none" }}>
          idle.
        </div>
      </section>
    </div>
  );
}
