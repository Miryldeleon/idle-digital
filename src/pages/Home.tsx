import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "../components/Marquee";
import LoadingScreen from "../components/LoadingScreen";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

/* Module-level flag: resets on hard refresh, persists during SPA navigation */
let loaderHasShown = false;

/* ─── In-view hook for sections below hero ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

/* ─── Seeded RNG for stable star positions ─── */
function seededRng(seed: number) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

/* ─── CSS variable sky color interpolation ─── */
function hexToRgb(h: string): [number, number, number] {
  const n = parseInt(h.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function lerpHex(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return `rgb(${Math.round(ar + (br - ar) * t)},${Math.round(ag + (bg - ag) * t)},${Math.round(ab + (bb - ab) * t)})`;
}

/* Five-stage sky: night → predawn → dawn → early morning → daylight */
const SKY_STAGES = [
  { top: "#05052F", mid: "#000051", bot: "#0C0B64" }, // night
  { top: "#0B0B58", mid: "#16116F", bot: "#27209A" }, // predawn
  { top: "#171579", mid: "#2421B8", bot: "#5B47D8" }, // dawn
  { top: "#1612D3", mid: "#2D68D8", bot: "#4B9FE8" }, // early morning
  { top: "#1612D3", mid: "#42A0EB", bot: "#78C9F2" }, // daylight
];

function getSkyColor(stage: typeof SKY_STAGES, p: number, key: "top" | "mid" | "bot"): string {
  const clamped = Math.min(Math.max(p, 0), 3.9999);
  const i = Math.floor(clamped);
  return lerpHex(stage[i][key], stage[i + 1][key], clamped - i);
}

/* ─── FAQ row ─── */
const FAQS = [
  { q: "Is this one-time?",            a: "No. Idle Digital is subscription-based. You subscribe to a plan and we handle your recurring digital work on an ongoing basis." },
  { q: "Do we need calls?",            a: "No. Meetings are completely optional. Most of our process runs through our task portal — no check-ins required unless you want them." },
  { q: "How do we start?",             a: "Complete the short questionnaire, we confirm the scope, and onboarding begins. You'll be submitting your first task within 24 hours." },
  { q: "What tools do you use?",       a: "Canva for creative, WordPress/Elementor for web, and whichever email marketing platform your business already uses." },
  { q: "How fast will you respond?",   a: "All task requests are confirmed within 24 hours. Execution timing depends on complexity and your plan." },
  { q: "Can I request multiple tasks?", a: "Yes — depending on your plan and available coverage. Every request is tracked through our Trello-style task portal so nothing falls through." },
];

function FaqRow({ q, a, dark }: { q: string; a: string; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const fg     = dark ? "rgba(255,255,255,0.85)" : "#000";
  const sub    = dark ? "rgba(255,255,255,0.55)"  : "rgba(0,0,0,0.6)";
  const border = dark ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.1)";
  return (
    <div style={{ borderBottom: `1px solid ${border}` }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <span style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: "clamp(16px,1.8vw,22px)", color: fg, letterSpacing: "-0.02em" }}>{q}</span>
        <span style={{ color: "#ed4e00", fontSize: "18px", flexShrink: 0, transition: "transform 0.25s ease", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      <div style={{ maxHeight: open ? "200px" : "0", overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: sub, lineHeight: 1.7, paddingBottom: "22px", maxWidth: "600px" }}>{a}</p>
      </div>
    </div>
  );
}

/* ─── Editorial plan column ─── */
function PlanColumn({ num, name, best, tag, cta, highlight, idx, vis }: {
  num: string; name: string; best: string; tag: string | null; cta: string;
  highlight: boolean; idx: number; vis: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "40px 32px",
        borderRight: idx < 2 ? "1px solid rgba(0,0,0,0.1)" : "none",
        background: hov || highlight ? "#1612d3" : "#fff",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: `background 0.4s ease, opacity 0.6s ease ${idx * 100}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${idx * 100}ms`,
      } as React.CSSProperties}
    >
      {tag && <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.14em", color: "#ed4e00", display: "block", marginBottom: "12px" }}>{tag}</span>}
      <span style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(52px,6vw,80px)", letterSpacing: "-0.06em", color: hov || highlight ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)", display: "block", lineHeight: 1, marginBottom: "8px" }}>{num}</span>
      <h3 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(22px,2.5vw,34px)", letterSpacing: "-0.04em", color: hov || highlight ? "#fff" : "#000", marginBottom: "12px", transition: "color 0.4s ease" }}>{name}</h3>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: hov || highlight ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)", lineHeight: 1.6, marginBottom: "32px", minHeight: "52px", transition: "color 0.4s ease" }}>{best}</p>
      <div style={{ borderTop: `1px solid ${hov || highlight ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}`, marginBottom: "32px" }}>
        {[
          { label: "Website",    val: "Monthly coverage based on plan scope." },
          { label: "Social",     val: "Ongoing creative coverage based on plan scope." },
          { label: "Email",      val: "Email support based on plan scope." },
          { label: "Turnaround", val: "Depends on request complexity." },
        ].map((row) => (
          <div key={row.label} style={{ padding: "14px 0", borderBottom: `1px solid ${hov || highlight ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}` }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: hov || highlight ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)", display: "block", marginBottom: "3px", transition: "color 0.4s ease" }}>{row.label}</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: hov || highlight ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)", lineHeight: 1.4, display: "block", transition: "color 0.4s ease" }}>{row.val}</span>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: hov || highlight ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)", fontStyle: "italic", marginBottom: "20px" }}>Pricing — TBC</p>
      <Link to="/contact" style={{
        fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em",
        color: hov || highlight ? "#fff" : "#000",
        border: `1px solid ${hov || highlight ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.2)"}`,
        padding: "12px 20px", textDecoration: "none",
        display: "inline-flex", alignItems: "center", gap: "8px",
        transition: "all 0.3s ease", width: "100%", justifyContent: "space-between",
      }}>
        {cta} <span>→</span>
      </Link>
    </div>
  );
}

/* ════════════════════════════════════════════
   HERO SCENE — GSAP ScrollTrigger
════════════════════════════════════════════ */
function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  /* Three stable star groups with different opacities for staggered fade */
  const [starsA, starsB, starsC] = useMemo(() => {
    const rand = seededRng(217);
    const all = Array.from({ length: 55 }, () => ({
      x: rand() * 100, y: rand() * 72,
      size: rand() * 1.6 + 0.5,
      opacity: rand() * 0.4 + 0.25,
    }));
    return [all.slice(0, 18), all.slice(18, 37), all.slice(37)];
  }, []);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = sceneRef.current;
    if (!scene) return;

    /* Update background directly on scene root — never transparent */
    const setSkyBg = (top: string, mid: string, bot: string) => {
      scene.style.background = `linear-gradient(180deg, ${top} 0%, ${mid} 55%, ${bot} 100%)`;
    };
    setSkyBg(SKY_STAGES[0].top, SKY_STAGES[0].mid, SKY_STAGES[0].bot);

    if (prefersReduced) {
      setSkyBg(SKY_STAGES[4].top, SKY_STAGES[4].mid, SKY_STAGES[4].bot);
      scene.querySelectorAll<HTMLElement>("[data-morning]").forEach(el => { el.style.opacity = "1"; });
      (scene.querySelector(".stars-a") as HTMLElement).style.opacity = "0";
      (scene.querySelector(".stars-b") as HTMLElement).style.opacity = "0";
      (scene.querySelector(".stars-c") as HTMLElement).style.opacity = "0";
      (scene.querySelector(".hero-bottom-fade") as HTMLElement).style.opacity = "1";
      return;
    }

    const ctx = gsap.context(() => {
      /* ── Labels (one compact hero scene) ── */
      const TL_END = 6.6;

      /* ── Initial states ── */
      gsap.set(".horizon-glow",   { autoAlpha: 0 });
      gsap.set(".sun-orb",        { y: "40vh", autoAlpha: 0.16 });
      gsap.set(".sun-rays",       { autoAlpha: 0, scale: 0.78, transformOrigin: "50% 50%" });
      gsap.set(".cloud-back",     { autoAlpha: 0, y: 22 });
      gsap.set(".cloud-mid",      { autoAlpha: 0, y: 16 });
      gsap.set(".cloud-front",    { autoAlpha: 0, y: 10 });
      gsap.set(".atmos-day",      { autoAlpha: 0 });
      gsap.set(".hero-bottom-fade", { autoAlpha: 0 });

      const tl = gsap.timeline();

      tl.addLabel("night",        0);
      tl.addLabel("predawn",      1.0);
      tl.addLabel("dawn",         2.0);
      tl.addLabel("earlyMorning", 3.7);
      tl.addLabel("daylight",     5.4);

      const skyProxy = { p: 0 };
      const updateSky = () => setSkyBg(
        getSkyColor(SKY_STAGES, skyProxy.p, "top"),
        getSkyColor(SKY_STAGES, skyProxy.p, "mid"),
        getSkyColor(SKY_STAGES, skyProxy.p, "bot"),
      );
      tl.to(skyProxy, { p: 4, duration: 5.4, ease: "power1.inOut", onUpdate: updateSky }, 0);

      /* ── STARS: staggered three-group fade ── */
      tl.to(".stars-a", { y: "-6vh", ease: "none", duration: TL_END }, 0);
      tl.to(".stars-b", { y: "-5vh", ease: "none", duration: TL_END }, 0);
      tl.to(".stars-c", { y: "-4vh", ease: "none", duration: TL_END }, 0);
      tl.to(".stars-a", { autoAlpha: 0, ease: "power1.inOut", duration: 2.2 }, "predawn+=0.2");
      tl.to(".stars-b", { autoAlpha: 0, ease: "power1.inOut", duration: 2.4 }, "predawn+=0.45");
      tl.to(".stars-c", { autoAlpha: 0, ease: "power1.inOut", duration: 2.6 }, "predawn+=0.7");

      /* ── MOON: descends as predawn gives way to daylight ── */
      tl.to(".moon", { y: "105vh", autoAlpha: 0, ease: "power1.inOut", duration: 4.2 }, "predawn");

      /* ── HORIZON GLOW: begins faint at predawn, peaks at dawn, reduces at morning ── */
      tl.to(".horizon-glow", { autoAlpha: 0.46, ease: "power1.inOut", duration: 2.45 }, 0.05);
      tl.to(".horizon-glow", { autoAlpha: 0,    ease: "power1.inOut", duration: 1.4 }, "daylight-=0.1");

      tl.to(".sun-orb", { y: 0, autoAlpha: 1, ease: "power1.inOut", duration: 5.7 }, 0);
      tl.to(".sun-rays", { autoAlpha: 0.36, scale: 0.94, ease: "power1.inOut", duration: 1.7 }, "daylight-=0.3");

      tl.to(".cloud-back",  { autoAlpha: 0.38, y: 6,  ease: "power1.inOut", duration: 2.8 }, "dawn+=0.35");
      tl.to(".cloud-mid",   { autoAlpha: 0.52, y: 4,  ease: "power1.inOut", duration: 2.5, stagger: 0.18 }, "earlyMorning-=0.1");
      tl.to(".cloud-front", { autoAlpha: 0.42, y: 4,  ease: "power1.inOut", duration: 1.8 }, "daylight-=0.15");
      tl.to(".cloud-back",  { x: 6,  ease: "none", duration: TL_END }, 0);
      tl.to(".cloud-mid",   { x: -8, ease: "none", duration: TL_END }, 0);
      tl.to(".cloud-front", { x: 10, ease: "none", duration: TL_END }, 0);
      tl.to(".atmos-day", { autoAlpha: 0.72, ease: "power1.inOut", duration: 2.4 }, "earlyMorning-=0.2");
      tl.to(".hero-bottom-fade", { autoAlpha: 1, ease: "power1.inOut", duration: 2.2 }, "earlyMorning-=0.4");

      /* ── HEADLINE drifts up ── */
      tl.to(".headline-block", { y: "-1.5vh", ease: "none", duration: TL_END }, 0);
      tl.to([".night-note", ".scroll-cue"], { autoAlpha: 0, y: -6, ease: "power1.inOut", duration: 1.4 }, "dawn-=0.25");

      /* ── ScrollTrigger ── */
      ScrollTrigger.create({
        animation:     tl,
        trigger:       scene,
        start:         "top top",
        end:           "bottom top",
        scrub:         1.8,
      });
    }, scene);

    return () => ctx.revert();
  }, []);

  const starStyle = (s: { x: number; y: number; size: number; opacity: number }) => ({
    position: "absolute" as const,
    left: `${s.x}%`, top: `${s.y}%`,
    width: `${s.size}px`, height: `${s.size}px`,
    borderRadius: "50%", background: "#fff",
    opacity: s.opacity,
  });

  const sunRays = Array.from({ length: 10 }, (_, i) => {
    const a = (i * 36 * Math.PI) / 180;
    return { x1: Math.cos(a) * 78, y1: Math.sin(a) * 78, x2: Math.cos(a) * 96, y2: Math.sin(a) * 96 };
  });

  return (
    <div ref={sceneRef} style={{
      height: "100vh", overflow: "hidden", position: "relative",
      background: "linear-gradient(180deg, #05052F 0%, #000051 55%, #0C0B64 100%)",
    }}>

      {/* STARS */}
      <div className="stars-a" style={{ position: "absolute", inset: 0, pointerEvents: "none", willChange: "transform, opacity" }}>
        {starsA.map((s, i) => <div key={i} style={starStyle(s)} />)}
      </div>
      <div className="stars-b" style={{ position: "absolute", inset: 0, pointerEvents: "none", willChange: "transform, opacity" }}>
        {starsB.map((s, i) => <div key={i} style={starStyle(s)} />)}
      </div>
      <div className="stars-c" style={{ position: "absolute", inset: 0, pointerEvents: "none", willChange: "transform, opacity" }}>
        {starsC.map((s, i) => <div key={i} style={starStyle(s)} />)}
      </div>

      {/* HORIZON GLOW */}
      <div className="horizon-glow" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "45%",
        background: "radial-gradient(ellipse at 50% 100%, rgba(237,78,0,0.42) 0%, rgba(237,78,0,0.18) 40%, transparent 68%)",
        pointerEvents: "none", willChange: "opacity",
      }} />

      {/* ATMOSPHERIC DAY LAYERS */}
      <div className="atmos-day" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <path d="M-100 680 Q360 620 720 655 Q1080 690 1540 620 L1540 900 L-100 900 Z"
            fill="#78C4F2" opacity="0.18" />
          <path d="M-100 740 Q420 682 720 712 Q1060 742 1540 682 L1540 900 L-100 900 Z"
            fill="#4B9FE8" opacity="0.14" />
          <path d="M880 480 Q1100 408 1540 460 L1540 680 Q1100 628 880 680 Z"
            fill="#2D68D8" opacity="0.10" />
        </svg>
      </div>

      {/* BACK CLOUDS */}
      <div className="cloud-back" style={{ position: "absolute", top: "11vh", left: "-7vw", pointerEvents: "none", willChange: "transform, opacity" }}>
        <svg viewBox="0 0 280 100" width="clamp(180px,22vw,320px)" height="auto" style={{ display: "block" }}>
          <circle cx="58"  cy="64" r="30" fill="#FFFFFF" opacity="0.90" />
          <circle cx="100" cy="48" r="28" fill="#FFFFFF" />
          <circle cx="146" cy="55" r="26" fill="#FFFFFF" opacity="0.95" />
          <circle cx="184" cy="64" r="20" fill="#FFFFFF" opacity="0.88" />
          <ellipse cx="118" cy="80" rx="78" ry="17" fill="#DDF4FF" opacity="0.78" />
        </svg>
      </div>
      <div className="cloud-back" style={{ position: "absolute", top: "20vh", right: "10vw", pointerEvents: "none", willChange: "transform, opacity" }}>
        <svg viewBox="0 0 220 88" width="clamp(140px,18vw,260px)" height="auto" style={{ display: "block" }}>
          <circle cx="48"  cy="54" r="24" fill="#FFFFFF" opacity="0.85" />
          <circle cx="88"  cy="40" r="23" fill="#FFFFFF" opacity="0.90" />
          <circle cx="130" cy="47" r="20" fill="#FFFFFF" opacity="0.88" />
          <circle cx="164" cy="55" r="16" fill="#FFFFFF" opacity="0.82" />
          <ellipse cx="106" cy="68" rx="66" ry="14" fill="#CBE9FF" opacity="0.70" />
        </svg>
      </div>

      {/* MID CLOUDS */}
      <div className="cloud-mid" style={{ position: "absolute", top: "7vh", left: "16vw", pointerEvents: "none", willChange: "transform, opacity" }}>
        <svg viewBox="0 0 360 126" width="clamp(240px,30vw,440px)" height="auto" style={{ display: "block" }}>
          <circle cx="82"  cy="78" r="42" fill="#FFFFFF" opacity="0.92" />
          <circle cx="140" cy="56" r="40" fill="#FFFFFF" />
          <circle cx="204" cy="64" r="36" fill="#FFFFFF" opacity="0.95" />
          <circle cx="258" cy="76" r="28" fill="#FFFFFF" opacity="0.88" />
          <circle cx="306" cy="84" r="22" fill="#FFFFFF" opacity="0.82" />
          <ellipse cx="196" cy="100" rx="128" ry="24" fill="#DDF4FF" opacity="0.74" />
        </svg>
      </div>
      <div className="cloud-mid" style={{ position: "absolute", top: "15vh", left: "48vw", pointerEvents: "none", willChange: "transform, opacity" }}>
        <svg viewBox="0 0 310 114" width="clamp(200px,24vw,370px)" height="auto" style={{ display: "block" }}>
          <circle cx="68"  cy="72" r="35" fill="#FFFFFF" opacity="0.88" />
          <circle cx="120" cy="52" r="33" fill="#FFFFFF" opacity="0.92" />
          <circle cx="178" cy="58" r="30" fill="#FFFFFF" />
          <circle cx="232" cy="70" r="24" fill="#FFFFFF" opacity="0.90" />
          <ellipse cx="150" cy="88" rx="104" ry="20" fill="#DDF4FF" opacity="0.72" />
        </svg>
      </div>

      {/* FRONT CLOUD */}
      <div className="cloud-front" style={{ position: "absolute", top: "26vh", left: "-12vw", pointerEvents: "none", willChange: "transform, opacity" }}>
        <svg viewBox="0 0 440 148" width="clamp(300px,38vw,540px)" height="auto" style={{ display: "block" }}>
          <circle cx="102" cy="96"  r="52" fill="#FFFFFF" opacity="0.90" />
          <circle cx="176" cy="66"  r="52" fill="#FFFFFF" />
          <circle cx="256" cy="74"  r="46" fill="#FFFFFF" opacity="0.95" />
          <circle cx="328" cy="92"  r="38" fill="#FFFFFF" opacity="0.88" />
          <ellipse cx="214" cy="120" rx="158" ry="28" fill="#DDF4FF" opacity="0.76" />
        </svg>
      </div>

      {/* SUN */}
      <div className="sun-orb" style={{
        position: "absolute",
        top: "clamp(55px, 9vh, 150px)",
        right: "clamp(55px, 13vw, 190px)",
        width: "clamp(130px, 15vw, 190px)",
        height: "clamp(130px, 15vw, 190px)",
        pointerEvents: "none", willChange: "transform, opacity",
      }}>
        <div className="sun-rays" style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: "clamp(320px, 42vw, 520px)",
          height: "clamp(320px, 42vw, 520px)",
          marginTop: "clamp(-160px, -21vw, -260px)",
          marginLeft: "clamp(-160px, -21vw, -260px)",
          willChange: "transform, opacity",
        }}>
          <svg viewBox="-100 -100 200 200" style={{ width: "100%", height: "100%" }}>
            {sunRays.map((r, i) => (
              <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
                stroke="#FFD95A" strokeWidth="4.5" strokeLinecap="round" opacity="0.62" />
            ))}
          </svg>
        </div>
        <div style={{
          position: "absolute", inset: "-70%", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,217,90,0.28) 0%, rgba(255,197,61,0.12) 45%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "radial-gradient(circle at 38% 35%, #FFE77B 0%, #FFD95A 45%, #FFC13D 82%)",
          boxShadow: "0 0 32px rgba(255,217,90,0.55), 0 0 64px rgba(255,197,61,0.28)",
        }} />
        <div style={{
          position: "absolute", inset: "14%", borderRadius: "50%",
          background: "radial-gradient(circle at 40% 36%, #FFF8C0 0%, rgba(255,231,123,0.55) 52%, transparent 78%)",
        }} />
      </div>

      {/* ── MOON — chunky gold crescent, matches loading pill crescent style ── */}
      <div className="moon" style={{
        position: "absolute", top: "5%", right: "clamp(48px, 8vw, 120px)",
        pointerEvents: "none", willChange: "transform",
        filter: "drop-shadow(0 0 18px rgba(255,226,89,0.25)) drop-shadow(0 0 50px rgba(255,197,61,0.12))",
      }}>
        <svg
          viewBox="0 0 120 120"
          style={{ width: "clamp(100px, 13vw, 190px)", height: "clamp(100px, 13vw, 190px)", overflow: "visible" }}
        >
          <defs>
            <mask id="hero-crescent-mask">
              <circle cx="56" cy="60" r="42" fill="white" />
              <circle cx="76" cy="49" r="35" fill="black" />
            </mask>
            <radialGradient id="hero-moon-body" cx="30%" cy="36%" r="74%" fx="30%" fy="36%">
              <stop offset="0%"   stopColor="#FFF0A0" />
              <stop offset="40%"  stopColor="#FFE259" />
              <stop offset="75%"  stopColor="#FFC53D" />
              <stop offset="100%" stopColor="#E5A21B" />
            </radialGradient>
            <radialGradient id="hero-moon-edge" cx="78%" cy="52%" r="42%">
              <stop offset="0%"   stopColor="rgba(237,78,0,0.20)" />
              <stop offset="100%" stopColor="rgba(237,78,0,0)" />
            </radialGradient>
          </defs>
          {/* Soft outer aura */}
          <circle cx="56" cy="60" r="46" fill="rgba(255,226,89,0.07)" mask="url(#hero-crescent-mask)" />
          {/* Main crescent body */}
          <circle cx="56" cy="60" r="42" fill="url(#hero-moon-body)" mask="url(#hero-crescent-mask)" />
          {/* Warm edge shading toward the dark limb */}
          <circle cx="56" cy="60" r="42" fill="url(#hero-moon-edge)" mask="url(#hero-crescent-mask)" />
          {/* Surface patch 1 */}
          <circle cx="42" cy="50" r="6"   fill="rgba(229,162,27,0.40)" mask="url(#hero-crescent-mask)" />
          <circle cx="43" cy="49" r="3"   fill="rgba(237,78,0,0.18)"   mask="url(#hero-crescent-mask)" />
          {/* Surface patch 2 */}
          <circle cx="36" cy="70" r="5"   fill="rgba(229,162,27,0.35)" mask="url(#hero-crescent-mask)" />
          <circle cx="37" cy="69" r="2.5" fill="rgba(237,78,0,0.14)"   mask="url(#hero-crescent-mask)" />
          {/* Surface patch 3 — small accent near tip */}
          <circle cx="48" cy="84" r="4"   fill="rgba(229,162,27,0.30)" mask="url(#hero-crescent-mask)" />
          {/* Leading limb highlight */}
          <ellipse cx="28" cy="57" rx="5" ry="10" fill="rgba(255,255,180,0.28)"
            transform="rotate(-22 28 57)" mask="url(#hero-crescent-mask)" />
          {/* Inner upper highlight */}
          <ellipse cx="38" cy="44" rx="4" ry="7" fill="rgba(255,248,200,0.20)"
            transform="rotate(-15 38 44)" mask="url(#hero-crescent-mask)" />
        </svg>
      </div>

      <div className="hero-bottom-fade" style={{
        position: "absolute", left: 0, right: 0, bottom: "-1px", zIndex: 12,
        height: "42vh",
        background: "linear-gradient(180deg, rgba(120,201,242,0) 0%, rgba(120,201,242,0.18) 34%, rgba(120,201,242,0.72) 76%, #78C9F2 100%)",
        pointerEvents: "none", willChange: "opacity",
      }} />

      {/* ── HEADLINE ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 20,
        padding: "80px clamp(24px, 6vw, 80px) 0",
        display: "flex", flexDirection: "column", justifyContent: "center",
        pointerEvents: "none",
      }}>
        <div className="headline-block" style={{ willChange: "transform", userSelect: "none" }}>
          {["PUT YOUR", "DIGITAL WORK", "ON IDLE"].map((line, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <span style={{
                display: "block",
                fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800,
                fontSize: "clamp(58px, 11.5vw, 188px)", letterSpacing: "-0.05em",
                color: "#fff", lineHeight: 0.87,
              }}>
                {line}{i === 2 && <span style={{ color: "#ed4e00" }}>.</span>}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── NIGHT NOTE ── */}
      <div style={{ position: "absolute", bottom: "clamp(44px, 8vh, 88px)", left: "clamp(24px, 6vw, 80px)", zIndex: 30 }}>
        <div className="night-note" data-night style={{ willChange: "transform, opacity" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(13px, 1.2vw, 16px)", color: "rgba(255,255,255,0.55)", letterSpacing: "0.05em", lineHeight: 1.6, margin: 0 }}>
            YOU CAN SWITCH OFF.
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="scroll-cue" style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", pointerEvents: "none", willChange: "transform, opacity" }}>
        <div style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.18)" }} />
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.18)", textTransform: "uppercase" }}>Scroll</span>
      </div>

    </div>
  );
}

/* ════════════════════════════════════════════
   HOME PAGE
════════════════════════════════════════════ */
export default function Home() {
  const [showLoader, setShowLoader] = useState(!loaderHasShown);

  const problemRef = useInView(0.1);
  const svcRef     = useInView(0.1);
  const processRef = useInView(0.1);
  const posRef     = useInView(0.15);
  const plansRef   = useInView(0.05);

  return (
    <div>
      {showLoader && (
        <LoadingScreen onDone={() => {
          loaderHasShown = true;
          setShowLoader(false);
          /* Recalculate ScrollTrigger pin distances after loader exits */
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              ScrollTrigger.refresh();
            });
          });
        }} />
      )}

      {/* ═══════════════ HERO — GSAP day/night environment ═══════════════ */}
      <div style={{ background: "#000051", minHeight: "100vh" }}>
        <HeroScene />
      </div>

      {/* ═══════════════ PROBLEM → RELIEF — WHITE ═══════════════ */}
      <section
        ref={problemRef.ref}
        data-section="hero-to-white"
        style={{
          marginTop: "-1px",
          background: "linear-gradient(180deg, #78C9F2 0%, #78C9F2 62%, #A9E4FA 74%, #DDF5FF 87%, #F8FDFF 96%, #fff 100%)",
          padding: "200px 80px 170px",
        }}
      >
        <div style={{ maxWidth: "900px" }}>
          {[
            { text: "Websites go outdated.", color: "rgba(0,0,0,0.2)" },
            { text: "Content gets delayed.", color: "rgba(0,0,0,0.2)" },
            { text: "Email doesn't ship.",   color: "rgba(0,0,0,0.2)" },
          ].map((line, i) => (
            <div key={i} style={{
              overflow: "hidden", marginBottom: "8px",
              opacity: problemRef.vis ? 1 : 0,
              transform: problemRef.vis ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.7s ease ${i * 120}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms`,
            }}>
              <p style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(36px,5.5vw,80px)", letterSpacing: "-0.04em", color: line.color, lineHeight: 1.05, margin: 0 }}>
                {line.text}
              </p>
            </div>
          ))}
          <div style={{
            marginTop: "48px", paddingTop: "48px", borderTop: "1px solid rgba(0,0,0,0.1)",
            opacity: problemRef.vis ? 1 : 0,
            transform: problemRef.vis ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease 0.45s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s",
          }}>
            <p style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(36px,5.5vw,80px)", letterSpacing: "-0.04em", color: "#000", lineHeight: 1.05, margin: "0 0 32px" }}>
              Idle Digital runs the work<br />in the background.
            </p>
            <Link to="/how-it-works" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", color: "#fff", background: "#1612d3", border: "none", padding: "14px 24px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              See how it works <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES PREVIEW — ELECTRIC BLUE ═══════════════ */}
      <section ref={svcRef.ref} style={{ background: "#1612d3", padding: "96px 80px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "64px", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>ID — 01 / WHAT WE HANDLE</span>
            <h2 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,72px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.0 }}>
              The digital work<br />that keeps piling up.
            </h2>
          </div>
          <Link to="/how-it-works" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "auto", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "2px" }}>
            Full breakdown ↗
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "1px solid rgba(255,255,255,0.12)" }} className="idle-services-grid">
          {[
            { num: "01", title: "Website Maintenance", items: ["Updates", "Fixes", "New pages", "Blog publishing"], delay: 0 },
            { num: "02", title: "Social + Creative",   items: ["Carousels", "Stock-based reels", "Copywriting", "Scheduling"], delay: 80 },
            { num: "03", title: "Email Marketing",     items: ["Newsletters", "Sequences", "Automations", "Setup"], delay: 160 },
          ].map((s, i) => (
            <div key={s.num} style={{
              padding: "48px 40px 48px 0",
              borderRight: i < 2 ? "1px solid rgba(255,255,255,0.12)" : "none",
              paddingLeft: i > 0 ? "40px" : "0",
              opacity: svcRef.vis ? 1 : 0,
              transform: svcRef.vis ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.6s ease ${s.delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${s.delay}ms`,
            }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.14em", color: "#ed4e00", display: "block", marginBottom: "24px" }}>{s.num}</span>
              <h3 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: "clamp(22px,2.5vw,34px)", color: "#fff", letterSpacing: "-0.03em", marginBottom: "28px", lineHeight: 1.1 }}>{s.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {s.items.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.65)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ PROCESS PREVIEW — WHITE ═══════════════ */}
      <section ref={processRef.ref} style={{ background: "#fff", padding: "120px 80px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "64px", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.14em", color: "#ed4e00", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>ID — 02 / HOW IDLE WORKS</span>
            <h2 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,72px)", letterSpacing: "-0.04em", color: "#000", lineHeight: 1.0 }}>
              Simple from the<br />start. Every time.
            </h2>
          </div>
          <Link to="/how-it-works" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(0,0,0,0.4)", textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.15)", paddingBottom: "2px" }}>
            Full process ↗
          </Link>
        </div>
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
          {[
            { num: "01", title: "CHOOSE A PLAN",             sub: "Pick the level of support that fits your business.", delay: 0 },
            { num: "02", title: "TELL US WHAT NEEDS HANDLING", sub: "Quick onboarding questionnaire — your business, systems and priorities.", delay: 80 },
            { num: "03", title: "OPTIONAL DISCOVERY CALL",   sub: "Only when it's actually useful.", delay: 160 },
            { num: "04", title: "SUBSCRIBE + SUBMIT TASKS",  sub: "Everything runs through a clear Trello-style task portal.", delay: 240 },
            { num: "05", title: "WE GET MOVING",             sub: "Confirmed within 24 hours. Execution begins based on your plan.", delay: 320 },
          ].map((step) => (
            <div key={step.num} style={{
              display: "grid", gridTemplateColumns: "100px 1fr",
              gap: "32px", padding: "28px 0",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              opacity: processRef.vis ? 1 : 0,
              transform: processRef.vis ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.5s ease ${step.delay}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${step.delay}ms`,
            }} className="idle-step-row">
              <span style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(40px,5vw,72px)", letterSpacing: "-0.06em", color: "rgba(0,0,0,0.07)", lineHeight: 1 }}>{step.num}</span>
              <div style={{ paddingTop: "8px" }}>
                <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "0.1em", color: "#000", marginBottom: "6px" }}>{step.title}</h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(0,0,0,0.5)", lineHeight: 1.6 }}>{step.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ POSITIONING — BLACK ═══════════════ */}
      <section ref={posRef.ref} style={{ background: "#000", padding: "120px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "end" }} className="idle-pos-grid">
          <div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", display: "block", marginBottom: "24px" }}>NOT AN AGENCY.</span>
            <h2 style={{
              fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800,
              fontSize: "clamp(44px,6vw,96px)", letterSpacing: "-0.04em",
              color: "#fff", lineHeight: 1.0, margin: 0,
              opacity: posRef.vis ? 1 : 0,
              transform: posRef.vis ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}>
              Built to feel<br />like a partner.
            </h2>
          </div>
          <div>
            {["Calm process.", "Premium output.", "Clear coverage.", "Less meetings."].map((line, i) => (
              <p key={line} style={{
                fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700,
                fontSize: "clamp(22px,2.5vw,36px)", color: "rgba(255,255,255,0.65)",
                letterSpacing: "-0.02em", marginBottom: "8px",
                opacity: posRef.vis ? 1 : 0,
                transform: posRef.vis ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.6s ease ${0.1 + i * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s`,
              }}>
                {line}
              </p>
            ))}
            <div style={{ marginTop: "40px" }}>
              <Link to="/about" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "2px" }}>
                More about Idle ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PLANS PREVIEW — WHITE (editorial) ═══════════════ */}
      <section ref={plansRef.ref} style={{ background: "#fff", padding: "120px 80px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "64px", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.14em", color: "#ed4e00", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>ID — 03 / PLANS 01—03</span>
            <h2 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(36px,5vw,72px)", letterSpacing: "-0.04em", color: "#000", lineHeight: 1.0 }}>
              Simple plans.<br />Clear coverage.
            </h2>
          </div>
          <Link to="/how-it-works" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(0,0,0,0.4)", textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.15)", paddingBottom: "2px" }}>
            Compare all plans →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "1px solid rgba(0,0,0,0.1)" }} className="idle-plans-grid">
          {[
            { num: "01", name: "STARTER", tag: null,           best: "Businesses that need a baseline of digital maintenance.", cta: "Choose Starter", highlight: false },
            { num: "02", name: "CORE",    tag: "MOST POPULAR", best: "Growing businesses that want consistent output across all three areas.", cta: "Choose Core", highlight: false },
            { num: "03", name: "PLUS",    tag: null,           best: "Maximum coverage and faster execution.", cta: "Choose Plus", highlight: false },
          ].map((plan, i) => (
            <PlanColumn key={plan.name} {...plan} idx={i} vis={plansRef.vis} />
          ))}
        </div>
        <div style={{ marginTop: "32px", display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(0,0,0,0.4)" }}>Not sure which fits?</span>
          <Link to="/quiz" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#ed4e00", textDecoration: "none", fontWeight: 600 }}>
            Take the Plan Quiz →
          </Link>
        </div>
      </section>

      {/* ═══════════════ QUIZ CTA — ELECTRIC BLUE ═══════════════ */}
      <section style={{ background: "#1612d3", padding: "120px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-80px", opacity: 0.07, pointerEvents: "none" }}>
          <svg viewBox="0 0 72 72" fill="none" style={{ width: "400px", height: "400px" }}>
            <path d="M36 12C49.255 12 60 22.745 60 36C60 49.255 49.255 60 36 60C29.5 60 23.7 57.4 19.5 53.1C25 55.9 33.5 49.5 33.5 36C33.5 22.5 25 16.1 19.5 18.9C23.7 14.6 29.5 12 36 12Z" fill="#fff" />
            <circle cx="40" cy="36" r="18.5" fill="#1612d3" />
          </svg>
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "700px" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", display: "block", marginBottom: "24px" }}>NOT SURE WHICH ONE FITS?</span>
          <h2 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(40px,6vw,88px)", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.0, marginBottom: "24px" }}>
            Answer a few questions.<br />We'll point you<br />in the right direction.
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginBottom: "48px", maxWidth: "400px", lineHeight: 1.6 }}>
            Not sure which plan fits your business? Take two minutes and we'll recommend a starting point.
          </p>
          <Link to="/quiz" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", color: "#000", background: "#fff", border: "none", padding: "14px 24px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            Take the Plan Quiz <span>→</span>
          </Link>
        </div>
      </section>

      {/* ═══════════════ FAQ — DEEP NAVY ═══════════════ */}
      <section style={{ background: "#000051", padding: "120px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "80px" }} className="idle-faq-grid">
          <div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.14em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>ID — 04 / FAQ</span>
            <h2 style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: "clamp(28px,3vw,44px)", color: "#fff", letterSpacing: "-0.03em" }}>Common questions.</h2>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {FAQS.map((f) => <FaqRow key={f.q} {...f} dark />)}
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
          <Link to="/how-it-works" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", color: "#000", background: "#fff", padding: "14px 24px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            View Plans <span>→</span>
          </Link>
          <Link to="/contact" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", letterSpacing: "0.04em", color: "rgba(255,255,255,0.7)", background: "transparent", border: "1px solid rgba(255,255,255,0.3)", padding: "14px 24px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            Get in touch ↗
          </Link>
        </div>
        <div style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800, fontSize: "clamp(80px,16vw,240px)", letterSpacing: "-0.06em", color: "rgba(255,255,255,0.07)", lineHeight: 0.85, userSelect: "none" }}>
          idle.
        </div>
      </section>

      {/* ═══════════════ MARQUEE — BEFORE FOOTER ═══════════════ */}
      <div data-section="marquee">
        <Marquee text="WEBSITE MAINTENANCE - SOCIAL CONTENT - EMAIL MARKETING - ON IDLE - ALWAYS HANDLED -" variant="blue" />
      </div>
    </div>
  );
}
