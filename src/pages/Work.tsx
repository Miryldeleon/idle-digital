import { useState } from "react";
import { Link } from "react-router";

const categories = ["ALL", "BRANDING", "SOCIAL", "CAMPAIGN", "CONTENT", "WEB"];

const projects = [
  {
    id: "01", client: "PROJECT A", name: "Brand Identity & Social System",
    category: "BRANDING", year: "2026", slug: "project-a",
    img: "https://images.unsplash.com/photo-1702479744181-2d6b58941583?w=1200&h=700&fit=crop&auto=format",
    full: true, aspect: "idle-aspect-wide",
  },
  {
    id: "02", client: "PROJECT B", name: "Campaign Direction & Content",
    category: "CAMPAIGN", year: "2025", slug: "project-b",
    img: "https://images.unsplash.com/photo-1576289412237-698ae5427f27?w=800&h=1000&fit=crop&auto=format",
    full: false, aspect: "idle-aspect-port",
  },
  {
    id: "03", client: "PROJECT C", name: "Digital Experience Launch",
    category: "WEB", year: "2025", slug: "project-c",
    img: "https://images.unsplash.com/photo-1678690832311-bb6e361989ca?w=800&h=1000&fit=crop&auto=format",
    full: false, aspect: "idle-aspect-port",
  },
  {
    id: "04", client: "PROJECT D", name: "Social Content System",
    category: "SOCIAL", year: "2026", slug: "project-d",
    img: "https://images.unsplash.com/photo-1763705857736-2b4f16a33758?w=900&h=1100&fit=crop&auto=format",
    full: false, aspect: "idle-aspect-port",
  },
  {
    id: "05", client: "PROJECT E", name: "Strategy & Creative Direction",
    category: "CONTENT", year: "2025", slug: "project-e",
    img: "https://images.unsplash.com/photo-1779228900994-5b055597a0ec?w=900&h=1100&fit=crop&auto=format",
    full: false, aspect: "idle-aspect-port",
  },
  {
    id: "06", client: "PROJECT F", name: "Launch Campaign",
    category: "CAMPAIGN", year: "2026", slug: "project-f",
    img: "https://images.unsplash.com/photo-1702479744120-98fffb81bf6d?w=1400&h=700&fit=crop&auto=format",
    full: true, aspect: "idle-aspect-cinema",
  },
];

export default function Work() {
  const [active, setActive] = useState("ALL");
  const filtered = active === "ALL" ? projects : projects.filter((p) => p.category === active);

  return (
    <div style={{ background: "var(--idle-black)", minHeight: "100vh" }}>
      {/* Hero */}
      <div className="idle-section" style={{ paddingTop: "160px", paddingBottom: "80px" }}>
        <span className="idle-section-label reveal delay-1">WORK / SELECTED PROJECTS</span>
        <h1 className="idle-h2 reveal delay-2" style={{ fontSize: "clamp(56px,10vw,150px)", marginBottom: "32px" }}>
          Things we've put<br />into the world.
        </h1>
        <p className="idle-body reveal delay-3" style={{ maxWidth: "520px" }}>
          A selection of brands, campaigns, content and digital experiences we've helped bring to life.
        </p>
      </div>

      {/* Filters */}
      <div className="idle-section" style={{ paddingTop: 0, paddingBottom: "40px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                fontFamily: "Inter, sans-serif", fontSize: "12px",
                letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "8px 16px",
                border: `1px solid ${active === cat ? "var(--idle-orange)" : "rgba(255,255,255,0.2)"}`,
                color: active === cat ? "var(--idle-orange)" : "rgba(255,255,255,0.5)",
                background: "transparent", cursor: "none", transition: "all 0.2s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="idle-section">
        <div className="idle-project-grid">
          {filtered.map((p) => (
            <Link
              key={p.id}
              to={`/work/${p.slug}`}
              data-cursor-expand
              className={`idle-project-item ${p.full ? "idle-project-full" : ""}`}
            >
              <div className={`idle-project-visual ${p.aspect}`} style={{ marginBottom: "16px" }}>
                <img
                  src={p.img}
                  alt={`${p.client} — ${p.name}`}
                  className="proj-img"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <div>
                  <span className="idle-project-client">{p.id} — {p.client} / {p.year}</span>
                  <h3 className="idle-project-title">{p.name}</h3>
                  <p className="idle-project-tags" style={{ color: "var(--idle-orange)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {p.category}
                  </p>
                </div>
                <span className="idle-project-cta">View project ↗</span>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: "1/-1", padding: "120px 0", textAlign: "center" }}>
              <p className="idle-body">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
