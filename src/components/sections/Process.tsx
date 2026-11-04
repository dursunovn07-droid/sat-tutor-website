"use client";

import { motion, useInView, useScroll, useSpring } from "motion/react";
import { ClipboardCheck, Map, Target, LineChart, Trophy } from "lucide-react";
import { useRef } from "react";
import { process } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

const icons = [ClipboardCheck, Map, Target, LineChart, Trophy];

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="process" aria-labelledby="process-title" className="relative overflow-hidden bg-ink py-24 md:py-36">
      <div aria-hidden className="absolute top-1/3 -left-40 size-[520px] rounded-full bg-cobalt/15 blur-[140px]" />
      <div className="container-x relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index="02">Learning experience</SectionLabel>
            <SplitText
              id="process-title"
              className="mt-8 font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.98] font-semibold tracking-[-0.05em] text-ivory"
              text={[{ text: "A clear path from " }, { text: "diagnostic", className: "font-serif font-normal italic text-gradient pr-[0.06em]" }, { text: " to test day." }]}
            />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ivory/55">
                Five deliberate stages. No guesswork, no wasted hours — just a structured process
                that compounds week after week.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10">
              <Button href="#contact" variant="glass">Start with a free diagnostic</Button>
            </Reveal>
          </div>
        </div>

        <ol ref={ref} className="relative lg:col-span-7">
          {/* track */}
          <span aria-hidden className="absolute top-2 bottom-2 left-[27px] w-px bg-white/10 md:left-[31px]" />
          <motion.span
            aria-hidden
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-[27px] w-px origin-top bg-gradient-to-b from-sky via-electric to-cobalt shadow-[0_0_12px_rgba(77,124,255,0.8)] md:left-[31px]"
          />
          {process.map((p, i) => (
            <Step key={p.step} index={i} {...p} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({
  index,
  step,
  title,
  text,
  detail,
}: {
  index: number;
  step: string;
  title: string;
  text: string;
  detail: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { amount: 0.6, margin: "0px 0px -20% 0px" });
  const Icon = icons[index];
  const last = index === process.length - 1;

  return (
    <li ref={ref} className={cn("relative flex gap-6 md:gap-8", !last && "pb-12 md:pb-16")}>
      <motion.span
        animate={{
          backgroundColor: inView ? "#2f5bff" : "rgba(11,17,36,1)",
          boxShadow: inView ? "0 0 0 6px rgba(47,91,255,0.15), 0 0 40px rgba(47,91,255,0.6)" : "0 0 0 0px rgba(47,91,255,0)",
        }}
        transition={{ duration: 0.6 }}
        className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl text-ivory ring-1 ring-white/10 md:size-16"
      >
        <Icon className="size-5 md:size-6" aria-hidden />
      </motion.span>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className={cn(
          "group flex-1 rounded-3xl border p-6 transition-colors duration-700 md:p-8",
          inView ? "border-white/[0.12] bg-white/[0.04]" : "border-white/[0.05] bg-transparent",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="font-display text-sm font-semibold text-sky tabular-nums">Step {step}</span>
          <span className="rounded-full bg-white/[0.06] px-3 py-1 text-[11.5px] text-ivory/55">{detail}</span>
        </div>
        <h3 className="mt-4 font-display text-[clamp(1.4rem,2.2vw,1.85rem)] font-semibold tracking-[-0.035em] text-ivory">
          {title}
        </h3>
        <p className="mt-3 max-w-lg leading-relaxed text-ivory/55">{text}</p>
      </motion.div>
    </li>
  );
}
