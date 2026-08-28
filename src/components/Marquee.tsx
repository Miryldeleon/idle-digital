interface MarqueeProps {
  text: string;
  variant?: "dark" | "light" | "blue";
}

export default function Marquee({ text, variant = "dark" }: MarqueeProps) {
  const repeated = `${text} ${text} `;
  return (
    <div className={`idle-marquee ${variant}`}>
      <div className="idle-marquee-track">
        <span className="idle-marquee-text">{repeated}</span>
        <span className="idle-marquee-text">{repeated}</span>
      </div>
    </div>
  );
}
