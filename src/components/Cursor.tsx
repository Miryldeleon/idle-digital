import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnterProject = () => setExpanded(true);
    const onLeaveProject = () => setExpanded(false);

    document.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);

    document.querySelectorAll("[data-cursor-expand]").forEach((el) => {
      el.addEventListener("mouseenter", onEnterProject);
      el.addEventListener("mouseleave", onLeaveProject);
    });

    const obs = new MutationObserver(() => {
      document.querySelectorAll("[data-cursor-expand]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnterProject);
        el.removeEventListener("mouseleave", onLeaveProject);
        el.addEventListener("mouseenter", onEnterProject);
        el.addEventListener("mouseleave", onLeaveProject);
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${expanded ? "expanded" : ""}`}>
        <span className="cursor-label">VIEW ↗</span>
      </div>
    </>
  );
}
