import logo1 from "@/imports/1.png";
import logo3 from "@/imports/3.png";

interface IdleLogoProps {
  variant?: "dark" | "light";
  height?: number;
  className?: string;
}

/**
 * Renders the Idle Digital logo.
 * variant="dark"  → white/ghost version (for dark + blue backgrounds)
 * variant="light" → black version (for white backgrounds)
 */
export default function IdleLogo({ variant = "dark", height = 36, className = "" }: IdleLogoProps) {
  const src = variant === "dark" ? logo3 : logo1;
  const label = variant === "dark" ? "Idle Digital – white logo" : "Idle Digital – black logo";

  return (
    <img
      src={src}
      alt={label}
      height={height}
      style={{ height, width: "auto", display: "block", objectFit: "contain" }}
      className={className}
    />
  );
}

/** Just the crescent mark — useful as a decorative accent */
export function IdleMark({ size = 32, color = "#ed4e00" }: { size?: number; color?: string }) {
  const r = size / 2;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path
        d="M70 50C70 61.046 61.046 70 50 70C38.954 70 30 61.046 30 50C30 38.954 38.954 30 50 30C44 36 44 64 50 70C56 64 56 36 50 30C61.046 30 70 38.954 70 50Z"
        fill={color}
      />
      <circle cx="58" cy="50" r="22" fill="black" />
      <path
        d="M50 28C61.046 28 70 36.954 70 48C70 59.046 61.046 68 50 68C45 68 40.5 66.2 37 63.1C41.5 65.5 48 60 48 48C48 36 41.5 30.5 37 32.9C40.5 29.8 45 28 50 28Z"
        fill={color}
      />
    </svg>
  );
}
