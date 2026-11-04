"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { Check, Clock } from "lucide-react";
import { programs } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

export function Programs() {
  return (
    <section
      id="programs"
      aria-labelledby="programs-title"
      className="relative overflow-hidden rounded-[40px] bg-ivory py-24 text-night md:rounded-[56px] md:py-36"
    >
      <div aria-hidden className="absolute top-0 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-cobalt/10 blur-[120px]" />
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <SectionLabel index="03" tone="light">SAT programs</SectionLabel>
            <SplitText
              id="programs-title"
              className="mt-8 font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.98] font-semibold tracking-[-0.05em]"
              text={[{ text: "Choose the pace " }, { text: "that fits", className: "font-serif font-normal italic text-cobalt pr-[0.06em]" }, { text: " your goal." }]}
            />
          </div>
          <Reveal delay={0.15} className="max-w-sm">
            <p className="text-[17px] leading-relaxed text-night/60">
              Every program is fully one-on-one and built around your diagnostic. Not sure where to
              start? The consultation is free.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-3 lg:items-stretch">
          {programs.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1, delay: i * 0.12, ease: EASE_OUT }}
              className={cn(p.featured && "lg:-my-4")}
            >
              <ProgramCard program={p} />
            </motion.div>
          ))}
        </div>

        <Reveal className="mt-10 text-center text-sm text-night/45">
          Prices shown as placeholders. Custom packages and group rates available on request.
        </Reveal>
      </div>
    </section>
  );
}

function ProgramCard({ program: p }: { program: (typeof programs)[number] }) {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, ${
    p.featured ? "rgba(77,124,255,0.28)" : "rgba(47,91,255,0.10)"
  }, transparent 65%)`;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const dark = p.featured;

  return (
    <motion.article
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(-200);
        my.set(-200);
      }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      aria-labelledby={`${p.id}-name`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[32px] p-8 md:p-10",
        dark
          ? "ring-gradient bg-night text-ivory shadow-[0_50px_100px_-30px_rgba(47,91,255,0.55)]"
          : "bg-paper text-night ring-1 ring-night/[0.08] shadow-[0_30px_60px_-40px_rgba(8,12,26,0.35)] transition-shadow duration-500 hover:shadow-[0_40px_80px_-40px_rgba(8,12,26,0.45)]",
      )}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />
      {dark && (
        <div aria-hidden className="absolute -top-32 left-1/2 size-80 -translate-x-1/2 rounded-full bg-cobalt/40 blur-[90px]" />
      )}

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className={cn("text-sm", dark ? "text-sky" : "text-cobalt")}>{p.tagline}</p>
          <h3 id={`${p.id}-name`} className="mt-2 font-display text-[26px] font-semibold tracking-[-0.035em]">
            {p.name}
          </h3>
        </div>
        {p.featured && (
          <span className="shrink-0 rounded-full bg-cobalt px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase shadow-[0_0_24px_rgba(47,91,255,0.7)]">
            Most popular
          </span>
        )}
      </div>

      <p className={cn("relative mt-5 leading-relaxed", dark ? "text-ivory/60" : "text-night/60")}>{p.description}</p>

      <div className={cn("relative mt-8 flex items-baseline gap-2 border-y py-6", dark ? "border-white/10" : "border-night/10")}>
        <span className="font-display text-5xl font-semibold tracking-[-0.05em]">{p.price}</span>
        <span className={cn("text-sm", dark ? "text-ivory/45" : "text-night/45")}>{p.priceNote}</span>
      </div>

      <p className={cn("relative mt-6 flex items-center gap-2 text-sm", dark ? "text-ivory/70" : "text-night/70")}>
        <Clock className={cn("size-4", dark ? "text-sky" : "text-cobalt")} aria-hidden /> {p.duration}
      </p>

      <ul className="relative mt-6 flex-1 space-y-3.5">
        {p.features.map((f) => (
          <li key={f} className={cn("flex items-start gap-3 text-[15px]", dark ? "text-ivory/80" : "text-night/75")}>
            <span
              className={cn(
                "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                dark ? "bg-cobalt text-white" : "bg-cobalt/10 text-cobalt",
              )}
            >
              <Check className="size-3" strokeWidth={3} aria-hidden />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="relative mt-10">
        <Button
          href="#contact"
          variant={dark ? "primary" : "dark"}
          className="w-full justify-between"
          magnetic={false}
          aria-label={`Enquire about ${p.name}`}
        >
          Book a consultation
        </Button>
      </div>
    </motion.article>
  );
}
