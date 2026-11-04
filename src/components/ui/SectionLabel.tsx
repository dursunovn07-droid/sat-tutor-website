import { cn } from "@/lib/cn";

/** Small numbered eyebrow used to open each section, e.g. "(02) — About". */
export function SectionLabel({
  index,
  children,
  tone = "dark",
  className,
}: {
  index: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "dark" ? "text-sky/80" : "text-cobalt",
        className,
      )}
    >
      <span className={cn("tabular-nums", tone === "dark" ? "text-ivory/40" : "text-night/40")}>
        ({index})
      </span>
      <span className={cn("h-px w-8", tone === "dark" ? "bg-ivory/20" : "bg-night/20")} />
      <span>{children}</span>
    </div>
  );
}
