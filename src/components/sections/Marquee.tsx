import { domains } from "@/content/site";

/** Infinite marquee of the official Digital SAT skill domains. */
export function Marquee() {
  const items = [...domains, ...domains];
  return (
    <div className="relative border-y border-white/[0.06] bg-ink py-6" aria-label="Digital SAT skill domains covered">
      <div className="mask-fade-x flex overflow-hidden">
        <ul className="flex w-max shrink-0 animate-marquee items-center gap-10 pr-10 hover:[animation-play-state:paused]">
          {items.map((d, i) => (
            <li
              key={i}
              aria-hidden={i >= domains.length}
              className="flex items-center gap-10 font-display text-[clamp(1.1rem,2vw,1.6rem)] font-medium tracking-[-0.03em] whitespace-nowrap text-ivory/35 transition-colors duration-300 hover:text-ivory"
            >
              {d}
              <svg viewBox="0 0 24 24" className="size-3.5 text-cobalt" aria-hidden>
                <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="currentColor" />
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
