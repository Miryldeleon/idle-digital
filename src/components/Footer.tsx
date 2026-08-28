import { Link } from "react-router";
import IdleLogo from "./IdleLogo";

const navLinks = [
  { label: "How It Works", to: "/how-it-works" },
  { label: "About",        to: "/about" },
  { label: "Contact",      to: "/contact" },
];

const socials = ["Instagram", "LinkedIn"];

export default function Footer() {
  return (
    <footer className="idle-footer">
      <div style={{ marginBottom: "48px" }}>
        <IdleLogo variant="dark" height={64} />
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "16px", letterSpacing: "0.05em" }}>
          Idle Digital — on idle, always handled.
        </p>
      </div>

      <div className="idle-footer-grid">
        <div>
          <Link to="/how-it-works" className="idle-btn idle-btn-orange-outline" style={{ marginBottom: "12px", display: "inline-flex" }}>
            View Plans →
          </Link>
        </div>
        <div>
          <span className="idle-footer-label">Navigate</span>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="idle-footer-link">{l.label}</Link>
          ))}
          <Link to="/how-it-works" className="idle-footer-link">View Plans</Link>
        </div>
        <div>
          <span className="idle-footer-label">Social</span>
          {socials.map((s) => (
            <a key={s} href="#" className="idle-footer-link">{s}</a>
          ))}
        </div>
        <div>
          <span className="idle-footer-label">Contact</span>
          <a href="mailto:hello@idledigital.com" className="idle-footer-link">hello@idledigital.com</a>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.2)", fontStyle: "italic", display: "block" }}>(placeholder)</span>
        </div>
      </div>

      <div className="idle-footer-bottom">
        <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
          <span className="idle-footer-meta">© 2026 IDLE DIGITAL</span>
          <span className="idle-footer-meta">MANILA, PH</span>
          <a href="#" className="idle-footer-meta" style={{ textDecoration: "none" }}>PRIVACY</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="idle-status-dot" />
          <span className="idle-footer-meta">CURRENTLY: NOT IDLE</span>
        </div>
      </div>
    </footer>
  );
}
