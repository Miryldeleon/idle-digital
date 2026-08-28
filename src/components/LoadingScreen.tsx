import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import IdleLogo from "./IdleLogo";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const containerRef    = useRef<HTMLDivElement>(null);
  const exitNightRef    = useRef<HTMLDivElement>(null);
  const logoRef         = useRef<HTMLDivElement>(null);
  const pillRef         = useRef<HTMLDivElement>(null);
  const text1Ref        = useRef<HTMLParagraphElement>(null);
  const text2Ref        = useRef<HTMLParagraphElement>(null);
  const progressRef     = useRef<HTMLDivElement>(null);
  const fillRef         = useRef<HTMLDivElement>(null);

  /* SVG layer refs */
  const dayLayersRef    = useRef<SVGGElement>(null);
  const nightLayersRef  = useRef<SVGGElement>(null);
  const thumbGroupRef   = useRef<SVGGElement>(null);
  const thumbMainRef    = useRef<SVGCircleElement>(null);
  const thumbInnerRef   = useRef<SVGCircleElement>(null);
  const nightCratersRef = useRef<SVGGElement>(null);

  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context> | undefined;
    let cancelled = false;

    const startAnimation = () => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (cancelled) return;
          ctx = gsap.context(() => {
            /* ── Initial states ── */
            gsap.set([logoRef.current, pillRef.current, text1Ref.current, text2Ref.current], {
              autoAlpha: 0, y: 14,
            });
            gsap.set(fillRef.current,       { scaleX: 0, transformOrigin: "left center" });
            gsap.set(exitNightRef.current,  { autoAlpha: 0 });

            /* Pill internals */
            gsap.set(nightLayersRef.current,  { autoAlpha: 0 });
            gsap.set(nightCratersRef.current, { autoAlpha: 0 });
            /* Thumb starts on RIGHT (translateX 232 puts cx=44 → cx=276) */
            gsap.set(thumbGroupRef.current, { x: 232 });

            const tl = gsap.timeline();

            /* 0.15 — Logo */
            tl.to(logoRef.current, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.15);

            /* 0.35 — Pill */
            tl.to(pillRef.current, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.35);

            /* 0.85 — Toggle: DAY → NIGHT (thumb travels RIGHT → LEFT) */
            tl.to(thumbGroupRef.current, { x: 0, duration: 0.72, ease: "power2.inOut" }, 0.85);

            /* Night background cross-fades in over day */
            tl.to(nightLayersRef.current,  { autoAlpha: 1, duration: 0.60, ease: "power1.inOut" }, 0.90);

            /* Thumb: gold → white moon disc */
            tl.to(thumbMainRef.current,  { attr: { fill: "#F7F7F4" }, duration: 0.52, ease: "power1.inOut" }, 0.94);
            tl.to(thumbInnerRef.current, { attr: { fill: "#E8E8E5" }, duration: 0.52, ease: "power1.inOut" }, 0.94);

            /* Craters surface on moon thumb */
            tl.to(nightCratersRef.current, { autoAlpha: 1, duration: 0.38, ease: "power1.out" }, 1.22);

            /* 1.65 — Copy */
            tl.to(text1Ref.current, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, 1.65);
            tl.to(text2Ref.current, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, 1.90);

            /* 2.10 — Progress */
            tl.to(fillRef.current, { scaleX: 1, duration: 0.55, ease: "power1.inOut" }, 2.10);

            /* 2.45 — Fade copy out */
            tl.to([logoRef.current, text1Ref.current, text2Ref.current, progressRef.current], {
              autoAlpha: 0, y: -20, duration: 0.32, ease: "power2.in",
            }, 2.45);

            /* 2.52 — Exit gradient matches hero night exactly (no black) */
            tl.to(exitNightRef.current, { autoAlpha: 1, duration: 0.60, ease: "power2.inOut" }, 2.52);

            /* 2.70 — Pill fades + scales */
            tl.to(pillRef.current, { autoAlpha: 0, scale: 0.90, duration: 0.42, ease: "power2.in" }, 2.70);

            /* 3.05 — Hand off to hero */
            tl.to(containerRef.current, {
              autoAlpha: 0, duration: 0.30, ease: "none",
              onComplete: () => onDoneRef.current(),
            }, 3.05);
          }, containerRef);
        });
      });
    };

    if (document.visibilityState === "visible") {
      startAnimation();
    } else {
      const onVisible = () => {
        if (document.visibilityState === "visible") {
          document.removeEventListener("visibilitychange", onVisible);
          startAnimation();
        }
      };
      document.addEventListener("visibilitychange", onVisible);
      return () => {
        cancelled = true;
        document.removeEventListener("visibilitychange", onVisible);
        ctx?.revert();
      };
    }

    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed", inset: 0, zIndex: 9000,
        background: "#1612d3",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Exit night gradient — matches hero night sky exactly, no black */}
      <div ref={exitNightRef} style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(180deg, #05052F 0%, #000051 55%, #0C0B64 100%)",
      }} />

      {/* Logo */}
      <div ref={logoRef} style={{ marginBottom: "44px", position: "relative", zIndex: 1 }}>
        <IdleLogo variant="dark" height={34} />
      </div>

      {/* ── Toggle Pill ── */}
      <div
        ref={pillRef}
        aria-label="Day to night toggle"
        style={{
          width: "clamp(280px, 32vw, 360px)",
          height: "clamp(72px, 8vw, 92px)",
          borderRadius: "100px",
          overflow: "hidden",
          position: "relative",
          marginBottom: "48px",
          flexShrink: 0,
          zIndex: 1,
          boxShadow: "0 2px 24px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.2)",
        }}
      >
        <svg
          viewBox="0 0 320 80"
          style={{ display: "block", width: "100%", height: "100%" }}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Night crescent mask */}
            <mask id="ls-crescent-mask">
              <circle cx="220" cy="39" r="16" fill="white" />
              <circle cx="230" cy="33" r="13" fill="black" />
            </mask>
            {/* Pill top gloss */}
            <linearGradient id="pill-gloss" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.22)" />
              <stop offset="48%"  stopColor="rgba(255,255,255,0.03)" />
              <stop offset="49%"  stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,60,0.18)" />
            </linearGradient>
            {/* Day sun glow */}
            <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="rgba(255,200,61,0.35)" />
              <stop offset="100%" stopColor="rgba(255,200,61,0)" />
            </radialGradient>
            {/* Day thumb gradient */}
            <radialGradient id="day-thumb-grad" cx="38%" cy="35%" r="65%">
              <stop offset="0%"   stopColor="#FFF4A0" />
              <stop offset="55%"  stopColor="#FFE36A" />
              <stop offset="100%" stopColor="#F5C835" />
            </radialGradient>
            {/* Night crescent gradient */}
            <radialGradient id="crescent-grad" cx="32%" cy="38%" r="70%">
              <stop offset="0%"   stopColor="#FFF0A0" />
              <stop offset="45%"  stopColor="#FFE259" />
              <stop offset="80%"  stopColor="#FFC53D" />
              <stop offset="100%" stopColor="#EFA523" />
            </radialGradient>
            {/* Moon thumb gradient */}
            <radialGradient id="moon-thumb-grad" cx="35%" cy="32%" r="68%">
              <stop offset="0%"   stopColor="#FFFFFF" />
              <stop offset="60%"  stopColor="#F7F7F4" />
              <stop offset="100%" stopColor="#E2E6E8" />
            </radialGradient>
          </defs>

          {/* ══ DAY LAYERS (visible initially) ══ */}
          <g ref={dayLayersRef}>
            {/* Base electric blue */}
            <rect x="0" y="0" width="320" height="80" fill="#1612D3" />
            {/* Mid cobalt wave */}
            <path d="M-10 46 Q70 32 155 45 Q238 57 330 40 L330 80 L-10 80 Z" fill="#2D68D8" opacity="0.75" />
            {/* Foreground lighter blue wave */}
            <path d="M-10 61 Q85 50 168 60 Q252 70 330 56 L330 80 L-10 80 Z" fill="#78C4F2" opacity="0.45" />

            {/* Sun — center-left */}
            <circle cx="106" cy="36" r="22" fill="url(#sun-glow)" />
            <circle cx="106" cy="36" r="13" fill="#FFC83D" />
            <circle cx="106" cy="36" r="8"  fill="#FFD95A" />
            {/* Sun rays — 8 short lines */}
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i * Math.PI) / 4;
              const r1 = 16, r2 = 21;
              return (
                <line
                  key={i}
                  x1={106 + Math.cos(a) * r1} y1={36 + Math.sin(a) * r1}
                  x2={106 + Math.cos(a) * r2} y2={36 + Math.sin(a) * r2}
                  stroke="#FFC83D" strokeWidth="2" strokeLinecap="round" opacity="0.8"
                />
              );
            })}

            {/* Cloud 1 — upper-left, partially overlapping sun */}
            <g>
              <circle cx="58"  cy="28" r="10" fill="#FFFFFF" />
              <circle cx="72"  cy="22" r="9"  fill="#FFFFFF" />
              <circle cx="85"  cy="26" r="8"  fill="#FFFFFF" />
              <circle cx="94"  cy="22" r="7"  fill="#FFFFFF" />
              <ellipse cx="76" cy="33" rx="18" ry="5" fill="#DDF4FF" opacity="0.7" />
            </g>
            {/* Cloud 2 — mid right of center */}
            <g>
              <circle cx="160" cy="22" r="8"  fill="#FFFFFF" opacity="0.9" />
              <circle cx="172" cy="18" r="7"  fill="#FFFFFF" opacity="0.9" />
              <circle cx="183" cy="22" r="6"  fill="#FFFFFF" opacity="0.9" />
              <ellipse cx="171" cy="28" rx="14" ry="4" fill="#CBE9FF" opacity="0.6" />
            </g>
            {/* Cloud 3 — small, upper far right */}
            <g>
              <circle cx="210" cy="18" r="6"  fill="#FFFFFF" opacity="0.7" />
              <circle cx="220" cy="14" r="5"  fill="#FFFFFF" opacity="0.7" />
              <ellipse cx="215" cy="23" rx="9" ry="3" fill="#DDF4FF" opacity="0.5" />
            </g>
          </g>

          {/* ══ NIGHT LAYERS (initially hidden, fades in during toggle) ══ */}
          <g ref={nightLayersRef}>
            {/* Night base */}
            <rect x="0" y="0" width="320" height="80" fill="#000051" />
            {/* Night mid wave */}
            <path d="M-10 48 Q80 34 160 46 Q240 58 330 42 L330 80 L-10 80 Z" fill="#121268" opacity="0.9" />
            {/* Night foreground wave */}
            <path d="M-10 62 Q90 52 170 62 Q252 70 330 56 L330 80 L-10 80 Z" fill="#292672" opacity="0.7" />

            {/* Stars — varied shapes and colors */}
            {/* White dots */}
            <circle cx="158" cy="14" r="1.0" fill="#FFFFFF" opacity="0.90" />
            <circle cx="172" cy="30" r="0.8" fill="#FFFFFF" opacity="0.75" />
            <circle cx="190" cy="11" r="0.9" fill="#A9E8FF" opacity="0.85" />
            <circle cx="238" cy="24" r="0.7" fill="#FFFFFF" opacity="0.70" />
            <circle cx="258" cy="10" r="1.0" fill="#5FC4FF" opacity="0.80" />
            <circle cx="270" cy="36" r="0.8" fill="#FFFFFF" opacity="0.65" />
            <circle cx="246" cy="48" r="0.6" fill="#A9E8FF" opacity="0.70" />
            <circle cx="300" cy="20" r="0.9" fill="#FFFFFF" opacity="0.80" />
            <circle cx="314" cy="42" r="0.7" fill="#FFE266" opacity="0.75" />
            {/* 4-point stars */}
            <g transform="translate(202, 20)" opacity="0.85">
              <path d="M0,-3.5 L0.6,-0.6 L3.5,0 L0.6,0.6 L0,3.5 L-0.6,0.6 L-3.5,0 L-0.6,-0.6 Z" fill="#FFFFFF" />
            </g>
            <g transform="translate(280, 14)" opacity="0.80">
              <path d="M0,-3 L0.5,-0.5 L3,0 L0.5,0.5 L0,3 L-0.5,0.5 L-3,0 L-0.5,-0.5 Z" fill="#5FC4FF" />
            </g>
            {/* 5-point star */}
            <g transform="translate(218, 50)" opacity="0.75">
              <path d="M0,-3.5 L0.86,-1.18 L3.33,-1.08 L1.37,0.45 L2.1,2.95 L0,1.55 L-2.1,2.95 L-1.37,0.45 L-3.33,-1.08 L-0.86,-1.18 Z" fill="#FFE266" />
            </g>
            <g transform="translate(308, 54)" opacity="0.70">
              <path d="M0,-2.8 L0.69,-0.95 L2.66,-0.86 L1.10,0.36 L1.68,2.36 L0,1.24 L-1.68,2.36 L-1.10,0.36 L-2.66,-0.86 L-0.69,-0.95 Z" fill="#ED7955" />
            </g>

            {/* Gold crescent — chunky, in center-right of night env */}
            <circle cx="220" cy="39" r="16" fill="url(#crescent-grad)" mask="url(#ls-crescent-mask)" />
            {/* Crescent surface patches */}
            <circle cx="210" cy="44" r="3.5" fill="#EFA523" opacity="0.55" mask="url(#ls-crescent-mask)" />
            <circle cx="214" cy="34" r="2.5" fill="#EFA523" opacity="0.45" mask="url(#ls-crescent-mask)" />
            <circle cx="207" cy="37" r="1.8" fill="#ED4E00" opacity="0.30" mask="url(#ls-crescent-mask)" />
            {/* Crescent highlight */}
            <ellipse cx="207" cy="36" rx="2.5" ry="4.5" fill="rgba(255,255,200,0.30)" mask="url(#ls-crescent-mask)" transform="rotate(-20 207 36)" />
          </g>

          {/* ══ THUMB (slides RIGHT → LEFT) ══ */}
          {/* Thumb group centered at cx=44; GSAP sets initial x=232 (→ cx=276) then animates to x=0 */}
          <g ref={thumbGroupRef}>
            {/* Outer glow halo */}
            <circle cx="44" cy="40" r="38" fill="rgba(255,227,106,0.14)" />
            {/* Main thumb face */}
            <circle ref={thumbMainRef} cx="44" cy="40" r="34" fill="url(#day-thumb-grad)" />
            {/* Inner ring */}
            <circle ref={thumbInnerRef} cx="44" cy="40" r="26" fill="#FFD95A" />
            {/* Day highlight on inner */}
            <ellipse cx="35" cy="30" rx="7" ry="4.5" fill="rgba(255,255,220,0.38)" transform="rotate(-25 35 30)" />

            {/* Night craters — hidden in day, revealed on night thumb */}
            <g ref={nightCratersRef}>
              {/* Crater 1 — soft curved impression */}
              <ellipse cx="34" cy="30" rx="5" ry="4" fill="rgba(220,231,232,0.38)" />
              <ellipse cx="34" cy="30" rx="3" ry="2.5" fill="rgba(220,231,232,0.22)" />
              {/* Crater 2 */}
              <ellipse cx="26" cy="48" rx="4.5" ry="3.5" fill="rgba(220,231,232,0.32)" />
              <ellipse cx="26" cy="48" rx="2.5" ry="2" fill="rgba(220,231,232,0.18)" />
              {/* Crater 3 */}
              <ellipse cx="46" cy="54" rx="3.5" ry="2.8" fill="rgba(220,231,232,0.28)" />
            </g>

            {/* Thumb border */}
            <circle cx="44" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
          </g>

          {/* ══ PILL GLOSS OVERLAY ══ */}
          <rect x="0" y="0" width="320" height="80" rx="40" fill="url(#pill-gloss)" pointerEvents="none" />

          {/* DAY / NIGHT labels */}
          <text x="14"  y="72" fontFamily="Inter, sans-serif" fontSize="6.5" fill="rgba(255,255,255,0.32)" letterSpacing="1">DAY</text>
          <text x="306" y="72" fontFamily="Inter, sans-serif" fontSize="6.5" fill="rgba(255,255,255,0.32)" letterSpacing="1" textAnchor="end">NIGHT</text>
        </svg>
      </div>

      {/* Copy */}
      <p ref={text1Ref} style={{
        fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800,
        fontSize: "clamp(18px, 3.5vw, 38px)", letterSpacing: "-0.04em",
        color: "#fff", margin: "0 0 5px", position: "relative", zIndex: 1,
      }}>
        YOU CAN SWITCH OFF.
      </p>
      <p ref={text2Ref} style={{
        fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 800,
        fontSize: "clamp(18px, 3.5vw, 38px)", letterSpacing: "-0.04em",
        color: "#ed4e00", margin: "0 0 40px", position: "relative", zIndex: 1,
      }}>
        IDLE DOESN&apos;T.
      </p>

      {/* Progress bar */}
      <div ref={progressRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", position: "relative", zIndex: 1 }}>
        <div style={{ width: "160px", height: "1px", background: "rgba(255,255,255,0.1)", position: "relative", overflow: "hidden" }}>
          <div ref={fillRef} style={{ position: "absolute", inset: 0, background: "#ed4e00" }} />
        </div>
      </div>
    </div>
  );
}
