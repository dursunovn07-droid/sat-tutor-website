import Image from "next/image";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/**
 * Tutor portrait. Set `site.tutor.portrait` to an image path in /public to use
 * a real photo; otherwise an art-directed studio placeholder is rendered.
 */
export function Portrait({
  className,
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  label = true,
  tone = "dark",
}: {
  className?: string;
  priority?: boolean;
  sizes?: string;
  label?: boolean;
  tone?: "dark" | "light";
}) {
  const src = site.tutor.portrait;
  return (
    <div className={cn("overflow-hidden", className ?? "relative")}>
      {src ? (
        <Image
          src={src}
          alt={`Portrait of ${site.tutor.name}, ${site.tutor.title}`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <PortraitPlaceholder tone={tone} label={label} />
      )}
    </div>
  );
}

function PortraitPlaceholder({ tone, label }: { tone: "dark" | "light"; label: boolean }) {
  const id = tone;
  return (
    <div
      role="img"
      aria-label={`Portrait placeholder for ${site.tutor.name}`}
      className={cn(
        "grain absolute inset-0",
        tone === "dark"
          ? "bg-[radial-gradient(120%_80%_at_50%_0%,#1c2a5c_0%,#0b1124_55%,#05070f_100%)]"
          : "bg-[radial-gradient(120%_80%_at_50%_0%,#dfe6fb_0%,#c9d2ea_45%,#a9b4d3_100%)]",
      )}
    >
      {/* key light */}
      <div
        className={cn(
          "absolute -top-1/4 left-1/2 h-3/4 w-3/4 -translate-x-1/2 rounded-full blur-3xl",
          tone === "dark" ? "bg-cobalt/35" : "bg-white/70",
        )}
      />
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id={`body-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={tone === "dark" ? "#22305f" : "#3a4a7a"} />
            <stop offset="1" stopColor={tone === "dark" ? "#070b18" : "#141c38"} />
          </linearGradient>
          <linearGradient id={`rim-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8fb0ff" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#4d7cff" stopOpacity="0.15" />
            <stop offset="1" stopColor="#8fb0ff" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id={`face-${id}`} cx="0.4" cy="0.35" r="0.8">
            <stop offset="0" stopColor={tone === "dark" ? "#2d3d75" : "#4b5c90"} />
            <stop offset="1" stopColor={tone === "dark" ? "#0d1430" : "#1a2448"} />
          </radialGradient>
        </defs>
        {/* shoulders */}
        <path
          d="M40 520 C 50 410, 120 365, 200 360 C 280 365, 350 410, 360 520 Z"
          fill={`url(#body-${id})`}
          stroke={`url(#rim-${id})`}
          strokeWidth="1.5"
        />
        {/* collar */}
        <path d="M168 362 L200 410 L232 362" fill="none" stroke="#8fb0ff" strokeOpacity="0.25" strokeWidth="1.5" />
        {/* neck */}
        <path d="M176 300 L176 362 Q200 376 224 362 L224 300 Z" fill={`url(#face-${id})`} />
        {/* head */}
        <ellipse cx="200" cy="232" rx="66" ry="80" fill={`url(#face-${id})`} stroke={`url(#rim-${id})`} strokeWidth="1.5" />
      </svg>
      {label && (
        <span
          className={cn(
            "placeholder-chip absolute top-4 left-4 rounded-full px-2.5 py-1 backdrop-blur",
            tone === "dark" ? "bg-white/10 text-ivory/70" : "bg-night/10 text-night/60",
          )}
        >
          Portrait placeholder
        </span>
      )}
    </div>
  );
}
