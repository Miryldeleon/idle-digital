import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import IdleLogo from "./IdleLogo";

const links = [
  { label: "How It Works", to: "/how-it-works" },
  { label: "About",        to: "/about" },
  { label: "Contact",      to: "/contact" },
];

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (to: string) => pathname === to || (to === "/how-it-works" && pathname.startsWith("/how-it-works"));

  const navClass = ["idle-nav", scrolled && !menuOpen ? "scrolled" : "", menuOpen ? "menu-open" : ""].filter(Boolean).join(" ");

  return (
    <>
      <nav className={navClass}>
        <Link to="/" aria-label="Idle Digital — home">
          <IdleLogo variant="dark" height={36} />
        </Link>

        <div className="idle-nav-links">
          {links.map((l) => (
            <Link key={l.label} to={l.to} className={`idle-nav-link ${isActive(l.to) ? "active" : ""}`}>
              {l.label}
            </Link>
          ))}
          <Link to="/how-it-works" className="idle-nav-cta">
            View Plans <span className="btn-arrow">→</span>
          </Link>
        </div>

        <button className="idle-nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span style={{ transform: menuOpen ? "rotate(45deg) translateY(10px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-10px)" : "none" }} />
        </button>
      </nav>

      <div className={`idle-mobile-menu ${menuOpen ? "open" : ""}`}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingTop: "40px" }}>
          {links.map((l) => (
            <Link key={l.label} to={l.to} className="idle-mobile-menu-link">{l.label}</Link>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Link to="/how-it-works" className="idle-btn idle-btn-outline" style={{ width: "fit-content" }}>
            View Plans →
          </Link>
          <div style={{ marginTop: "8px" }}>
            <IdleLogo variant="dark" height={28} />
          </div>
        </div>
      </div>
    </>
  );
}
