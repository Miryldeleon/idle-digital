import { useParams, Link } from "react-router";

const studies: Record<string, {
  client: string; title: string; tags: string; year: string;
  overview: string; industry: string; services: string;
  challenge: string; idea: string;
  metrics: Array<{ value: string; label: string }>;
  heroImg: string; galleryImgs: string[];
  nextSlug: string; nextTitle: string; nextImg: string;
}> = {
  "project-a": {
    client: "PROJECT A", title: "Brand Identity & Social System",
    tags: "Branding / Social Media", year: "2026",
    overview: "A complete brand identity and social media system built for a growing consumer brand looking to establish a recognisable digital presence across all platforms.",
    industry: "Consumer / Retail",
    services: "Brand Identity, Visual Systems, Social Strategy, Content Production",
    challenge: "The brand had no consistent visual language. Every piece of communication felt disconnected—different fonts, different tones, different energy. The brief was clear: build something they could own and sustain.",
    idea: "We started with what the brand believed in, not just what it sold. From that foundation we built an identity system flexible enough to work across social, packaging and digital—but distinctive enough to be immediately recognisable.",
    metrics: [{ value: "+130%", label: "Engagement rate" }, { value: "2.4M", label: "Impressions" }, { value: "3×", label: "Profile growth" }],
    heroImg: "https://images.unsplash.com/photo-1702479744181-2d6b58941583?w=1600&h=900&fit=crop&auto=format",
    galleryImgs: [
      "https://images.unsplash.com/photo-1702479743967-3dcccd4a671d?w=1400&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1763705857736-2b4f16a33758?w=700&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1779228900994-5b055597a0ec?w=700&h=500&fit=crop&auto=format",
    ],
    nextSlug: "project-b", nextTitle: "Campaign Direction & Content",
    nextImg: "https://images.unsplash.com/photo-1576289412237-698ae5427f27?w=1400&h=700&fit=crop&auto=format",
  },
  "project-b": {
    client: "PROJECT B", title: "Campaign Direction & Content",
    tags: "Campaign / Content", year: "2025",
    overview: "A multi-channel campaign concept and content rollout for a brand entering a new market with a fresh positioning.",
    industry: "FMCG / Lifestyle",
    services: "Campaign Strategy, Creative Direction, Content Production, Social Rollout",
    challenge: "The brand had the product and the ambition, but no clear campaign idea. They needed a lead concept that could anchor every execution—from a 15-second social clip to a full OOH billboard.",
    idea: "We led with the one truth that made this brand different. Everything else followed—the visual language, the tone, the media choices. The campaign ran across four channels with one unifying idea holding it together.",
    metrics: [{ value: "+38%", label: "Conversion rate" }, { value: "4", label: "Channels activated" }, { value: "Complete", label: "Content system" }],
    heroImg: "https://images.unsplash.com/photo-1576289412237-698ae5427f27?w=1600&h=900&fit=crop&auto=format",
    galleryImgs: [
      "https://images.unsplash.com/photo-1697292866722-13f228a35326?w=1400&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1702479744120-98fffb81bf6d?w=700&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1543441235-e8c913dea2d7?w=700&h=500&fit=crop&auto=format",
    ],
    nextSlug: "project-c", nextTitle: "Digital Experience Launch",
    nextImg: "https://images.unsplash.com/photo-1678690832311-bb6e361989ca?w=1400&h=700&fit=crop&auto=format",
  },
  "project-c": {
    client: "PROJECT C", title: "Digital Experience Launch",
    tags: "Web / Digital", year: "2025",
    overview: "A new digital experience designed to bring the brand together—from strategy and UX through to final design and development.",
    industry: "Technology / Services",
    services: "Website Strategy, UI/UX Design, Website Design, Creative Development",
    challenge: "The existing site didn't reflect where the brand had gone. It was outdated, hard to navigate, and visually disconnected from how the business actually operated.",
    idea: "We designed the experience around how people actually use the site—not around the organisational structure. Clear hierarchy, confident design, and a system the internal team could manage and grow.",
    metrics: [{ value: "+85%", label: "Time on site" }, { value: "New", label: "Identity launched" }, { value: "Complete", label: "Digital system" }],
    heroImg: "https://images.unsplash.com/photo-1678690832311-bb6e361989ca?w=1600&h=900&fit=crop&auto=format",
    galleryImgs: [
      "https://images.unsplash.com/photo-1678690832871-8b9993c76aa8?w=1400&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=700&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1595683363301-1e94594a550d?w=700&h=500&fit=crop&auto=format",
    ],
    nextSlug: "project-a", nextTitle: "Brand Identity & Social System",
    nextImg: "https://images.unsplash.com/photo-1702479744181-2d6b58941583?w=1400&h=700&fit=crop&auto=format",
  },
};

const fallback = {
  client: "PROJECT", title: "Selected Work",
  tags: "Creative / Digital", year: "2026",
  overview: "Placeholder case study — full content to be supplied.",
  industry: "TBC", services: "TBC",
  challenge: "Challenge copy to be supplied.", idea: "Idea copy to be supplied.",
  metrics: [{ value: "+00%", label: "Metric A" }, { value: "0.0M", label: "Metric B" }, { value: "+00%", label: "Metric C" }],
  heroImg: "https://images.unsplash.com/photo-1702479744181-2d6b58941583?w=1600&h=900&fit=crop&auto=format",
  galleryImgs: [
    "https://images.unsplash.com/photo-1702479744120-98fffb81bf6d?w=1400&h=700&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1763705857736-2b4f16a33758?w=700&h=500&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1779228900994-5b055597a0ec?w=700&h=500&fit=crop&auto=format",
  ],
  nextSlug: "project-a", nextTitle: "Brand Identity & Social System",
  nextImg: "https://images.unsplash.com/photo-1702479744181-2d6b58941583?w=1400&h=700&fit=crop&auto=format",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif", fontSize: "11px",
  letterSpacing: "0.15em", textTransform: "uppercase",
  color: "rgba(255,255,255,0.35)", display: "block",
};

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const cs = (slug && studies[slug]) || fallback;

  return (
    <div style={{ background: "var(--idle-black)", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ position: "relative", minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "160px 80px 80px", overflow: "hidden" }}>
        <img
          src={cs.heroImg}
          alt={cs.title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.6) 100%)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <span style={{ ...labelStyle, marginBottom: "12px" }} className="reveal delay-1">{cs.client}</span>
          <h1 className="idle-h2 reveal delay-2" style={{ fontSize: "clamp(48px,8vw,120px)", marginBottom: "24px" }}>{cs.title}</h1>
          <p style={{ ...labelStyle, color: "rgba(255,255,255,0.45)" }} className="reveal delay-3">{cs.tags} / {cs.year}</p>
        </div>
      </div>

      {/* Overview */}
      <section className="idle-section" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "80px" }}>
          <div>
            <span className="idle-section-label" style={{ marginBottom: "40px" }}>THE PROJECT</span>
            {[
              { label: "Client",   val: cs.client },
              { label: "Industry", val: cs.industry },
              { label: "Services", val: cs.services },
              { label: "Year",     val: cs.year },
            ].map((m) => (
              <div key={m.label} style={{ marginBottom: "20px" }}>
                <span style={{ ...labelStyle, fontSize: "10px", marginBottom: "4px" }}>{m.label}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#fff" }}>{m.val}</span>
              </div>
            ))}
          </div>
          <p className="idle-body" style={{ fontSize: "18px", maxWidth: "600px" }}>{cs.overview}</p>
        </div>
      </section>

      {/* Challenge */}
      <section className="idle-section" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "80px" }}>
          <span className="idle-section-label">01 / THE CHALLENGE</span>
          <div>
            <h2 className="idle-h3" style={{ marginBottom: "32px" }}>What needed to change.</h2>
            <p className="idle-body">{cs.challenge}</p>
          </div>
        </div>
      </section>

      {/* Idea */}
      <section className="idle-section" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "80px" }}>
          <span className="idle-section-label">02 / THE IDEA</span>
          <div>
            <h2 className="idle-h3" style={{ marginBottom: "32px" }}>The thinking behind it.</h2>
            <p className="idle-body">{cs.idea}</p>
          </div>
        </div>
      </section>

      {/* Work gallery */}
      <section style={{ paddingBottom: "96px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="idle-section" style={{ paddingBottom: "40px" }}>
          <span className="idle-section-label">03 / THE WORK</span>
        </div>
        {/* Full bleed hero */}
        <div style={{ width: "100%", aspectRatio: "16/7", overflow: "hidden" }}>
          <img src={cs.galleryImgs[0]} alt="Project work — full visual" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s ease" }} />
        </div>
        {/* Pair */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "12px 80px 0" }}>
          {cs.galleryImgs.slice(1).map((img, i) => (
            <div key={i} style={{ aspectRatio: "4/3", overflow: "hidden" }}>
              <img src={img} alt={`Project detail ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }} />
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="idle-section" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <span className="idle-section-label" style={{ marginBottom: "12px" }}>04 / RESULTS</span>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.18)", fontStyle: "italic", marginBottom: "48px" }}>
          Placeholder metrics — not real Idle Digital results
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {cs.metrics.map((m, i) => (
            <div key={i} style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none", padding: "48px 32px 48px", paddingLeft: i > 0 ? "32px" : "0" }}>
              <span className="idle-metric-value">{m.value}</span>
              <p className="idle-body" style={{ marginTop: "8px" }}>{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next project */}
      <section className="idle-section">
        <span className="idle-section-label" style={{ marginBottom: "32px" }}>NEXT PROJECT</span>
        <Link to={`/work/${cs.nextSlug}`} data-cursor-expand className="idle-project-item" style={{ display: "block" }}>
          <div className="idle-project-visual idle-aspect-cinema" style={{ marginBottom: "20px" }}>
            <img
              src={cs.nextImg}
              alt={cs.nextTitle}
              className="proj-img"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }} />
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <h3 className="idle-h3">{cs.nextTitle}</h3>
            <span className="idle-project-cta">View next project →</span>
          </div>
        </Link>
      </section>
    </div>
  );
}
