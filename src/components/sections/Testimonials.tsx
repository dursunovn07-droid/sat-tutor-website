"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

type T = (typeof testimonials)[number];

export function Testimonials() {
  const [featured, ...rest] = testimonials;
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="relative overflow-hidden rounded-[40px] bg-ivory py-24 text-night md:rounded-[56px] md:py-36"
    >
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel index="05" tone="light">Testimonials</SectionLabel>
            <SplitText
              id="testimonials-title"
              className="mt-8 max-w-3xl font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.98] font-semibold tracking-[-0.05em]"
              text={[{ text: "In their " }, { text: "own words.", className: "font-serif font-normal italic text-cobalt pr-[0.06em]" }]}
            />
          </div>
          <Reveal delay={0.15}>
            <div className="flex items-center gap-4">
              <div className="flex gap-0.5 text-cobalt" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-night/55">
                <strong className="font-semibold text-night">5.0</strong> average from students &amp; parents
                <span className="ml-1 text-night/35">(placeholder)</span>
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE_OUT }}
            className="md:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            <TiltCard className="h-full">
              <FeaturedCard t={featured} />
            </TiltCard>
          </motion.div>
          {rest.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: (i % 2) * 0.1 + 0.05, ease: EASE_OUT }}
            >
              <TiltCard className="h-full">
                <Card t={t} />
              </TiltCard>
            </motion.div>
          ))}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.1, ease: EASE_OUT }}
            className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[28px] bg-cobalt p-8 text-white shadow-[0_40px_80px_-30px_rgba(47,91,255,0.7)] lg:col-span-2"
          >
            <div aria-hidden className="absolute -right-20 -bottom-24 size-80 rounded-full bg-white/20 blur-3xl transition-transform duration-1000 ease-out-expo group-hover:scale-125" />
            <div aria-hidden className="bg-grid absolute inset-0 opacity-60 [mask-image:linear-gradient(to_left,#000,transparent)]" />
            <p className="eyebrow relative text-white/70">Your story next</p>
            <div className="relative flex flex-wrap items-end justify-between gap-6">
              <p className="max-w-md font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.05] font-semibold tracking-[-0.045em]">
                Become the next success story.
              </p>
              <span className="inline-flex items-center gap-3 rounded-full bg-white py-2 pr-2 pl-5 text-sm font-medium text-cobalt transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
                Book a free consultation
                <span className="grid size-8 place-items-center rounded-full bg-cobalt text-white transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </span>
            </div>
          </motion.a>
        </div>
        <p className="mt-6 text-center text-xs text-night/40">
          Testimonials are placeholders — replace with real quotes shared with permission.
        </p>
      </div>
    </section>
  );
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-5, 5]), { stiffness: 200, damping: 20 });

  return (
    <motion.div
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={cn("group", className)}
    >
      {children}
    </motion.div>
  );
}

function ScorePill({ score, gain, dark }: { score: number; gain: string; dark?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full py-1 pr-1 pl-3 text-sm",
        dark ? "bg-white/[0.08] text-ivory ring-1 ring-white/10" : "bg-night/[0.05] text-night",
      )}
    >
      <span className="font-display font-semibold tabular-nums">{score}</span>
      <span className="rounded-full bg-cobalt px-2 py-0.5 text-[11px] font-semibold text-white tabular-nums">{gain}</span>
    </div>
  );
}

function Avatar({ name, dark }: { name: string; dark?: boolean }) {
  const initials = name.replace(/[\[\]]/g, "").split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-11 place-items-center rounded-full font-display text-sm font-semibold",
        dark ? "bg-gradient-to-br from-electric to-cobalt text-white" : "bg-night text-ivory",
      )}
    >
      {initials}
    </span>
  );
}

function FeaturedCard({ t }: { t: T }) {
  return (
    <figure className="relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] bg-night p-8 text-ivory shadow-[0_40px_80px_-30px_rgba(8,12,26,0.6)] md:p-10">
      <div aria-hidden className="absolute -top-20 -left-20 size-72 rounded-full bg-cobalt/40 blur-[90px] transition-transform duration-1000 group-hover:translate-x-10" />
      <Quote className="relative size-10 text-sky" aria-hidden />
      <blockquote className="relative mt-10 font-serif text-[clamp(1.6rem,2.4vw,2.15rem)] leading-[1.25] italic">
        “{t.quote}”
      </blockquote>
      <figcaption className="relative mt-12 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
        <div className="flex items-center gap-3">
          <Avatar name={t.name} dark />
          <div>
            <p className="font-semibold">{t.name}</p>
            <p className="text-sm text-ivory/50">{t.meta}</p>
          </div>
        </div>
        <ScorePill score={t.score} gain={t.gain} dark />
      </figcaption>
    </figure>
  );
}

function Card({ t }: { t: T }) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-[28px] bg-paper p-7 ring-1 ring-night/[0.07] shadow-[0_20px_50px_-35px_rgba(8,12,26,0.4)] transition-[box-shadow,ring-color] duration-500 group-hover:shadow-[0_35px_70px_-35px_rgba(47,91,255,0.45)] group-hover:ring-cobalt/25">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex gap-0.5 text-cobalt" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-current" aria-hidden />
            ))}
          </div>
          <ScorePill score={t.score} gain={t.gain} />
        </div>
        <blockquote className="mt-6 text-[16.5px] leading-relaxed text-night/75">“{t.quote}”</blockquote>
      </div>
      <figcaption className="mt-8 flex items-center gap-3">
        <Avatar name={t.name} />
        <div>
          <p className="font-semibold">{t.name}</p>
          <p className="text-sm text-night/50">{t.meta}</p>
        </div>
      </figcaption>
    </figure>
  );
}
