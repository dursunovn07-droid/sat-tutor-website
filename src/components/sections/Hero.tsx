"use client";

import {
  motion,
  type MotionValue,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { CalendarCheck, Sparkles, TrendingUp, Trophy } from "lucide-react";
import { useRef } from "react";
import { heroCards, site } from "@/content/site";
import { useAppReady } from "@/components/Providers";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Portrait } from "@/components/ui/Portrait";
import { SplitText } from "@/components/ui/SplitText";
import { EASE_OUT } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, delay, ease: EASE_OUT } },
});

export function Hero() {
  const { ready } = useAppReady();
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  // Parallax only on large screens, and never for reduced-motion users
  const reduce = reduceMotion || !isDesktop;
  const ref = useRef<HTMLElement>(null);
  const state = ready ? "show" : "hidden";

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const yCards = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const yBigNum = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 220]);

  // Pointer-following spotlight
  const mx = useMotionValue(70);
  const my = useMotionValue(30);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${smx}% ${smy}%, rgba(77,124,255,0.16), transparent 60%)`;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  const score = site.tutor.heroScore;
  const ratio = score / 1600;

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onMove}
      aria-labelledby="hero-title"
      className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink pt-32 pb-20 md:pt-36 lg:pb-24"
    >
      {/* ── Background layers ─────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_30%,transparent_80%)]" />
        <motion.div
          className="absolute -top-[20%] left-[8%] h-[620px] w-[620px] rounded-full bg-cobalt/30 blur-[140px]"
          animate={reduceMotion ? undefined : { x: [0, 80, -20, 0], y: [0, 40, 80, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[30%] -right-[10%] h-[520px] w-[520px] rounded-full bg-[#5b3dff]/20 blur-[140px]"
          animate={reduceMotion ? undefined : { x: [0, -60, 30, 0], y: [0, -50, 20, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
        {/* Editorial oversized numerals */}
        <motion.div
          style={{ y: yBigNum }}
          className="absolute right-[-4vw] bottom-[-6vw] font-display text-[34vw] leading-none font-extrabold tracking-[-0.08em] text-transparent select-none [-webkit-text-stroke:1px_rgba(143,176,255,0.07)] lg:text-[26vw]"
        >
          1600
        </motion.div>
      </div>

      <div className="container-x relative grid w-full items-center gap-16 lg:grid-cols-12 lg:gap-10">
        {/* ── Copy ─────────────────────────────── */}
        <motion.div style={{ y: yText, opacity: fade }} className="lg:col-span-7">
          <motion.div
            initial="hidden"
            animate={state}
            variants={fadeUp(0)}
            className="glass mb-8 inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 text-[12.5px] text-ivory/75"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-cobalt/90 px-2.5 py-1 text-[11px] font-semibold text-white">
              <Sparkles className="size-3" aria-hidden /> New
            </span>
            Now enrolling for the [Season] Digital SAT
          </motion.div>

          <SplitText
            as="h1"
            id="hero-title"
            play={ready}
            delay={0.1}
            stagger={0.07}
            className="font-display text-[clamp(2.8rem,6.1vw,5.9rem)] leading-[0.95] font-semibold tracking-[-0.055em] text-ivory"
            text={[
              { text: "Your SAT Score." },
              { text: "\n" },
              { text: "Your Next " },
              { text: "Chapter.", className: "font-serif font-normal italic tracking-[-0.03em] text-gradient pr-[0.08em]" },
            ]}
          />

          <motion.p
            initial="hidden"
            animate={state}
            variants={fadeUp(0.55)}
            className="mt-8 max-w-[34rem] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-relaxed text-ivory/60"
          >
            Personalized SAT preparation designed to help ambitious students achieve their highest
            potential.
          </motion.p>

          <motion.div
            initial="hidden"
            animate={state}
            variants={fadeUp(0.7)}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button href="#contact" variant="primary" size="lg">
              Book a Free Consultation
            </Button>
            <Button href="#results" variant="glass" size="lg">
              Explore My Results
            </Button>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={state}
            variants={fadeUp(0.85)}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-ivory/50"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5" aria-hidden>
                {["#2f5bff", "#5b3dff", "#8fb0ff", "#1c2a5c"].map((c, i) => (
                  <span
                    key={c}
                    className="grid size-8 place-items-center rounded-full text-[10px] font-semibold text-white ring-2 ring-ink"
                    style={{ background: c }}
                  >
                    {["JS", "MK", "AL", "RT"][i]}
                  </span>
                ))}
              </div>
              <span>
                <strong className="font-semibold text-ivory">300+</strong> students mentored
              </span>
            </div>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span>
              <strong className="font-semibold text-ivory">1:1</strong> online &amp; in person
            </span>
          </motion.div>
        </motion.div>

        {/* ── Visual ─────────────────────────────── */}
        <div className="relative mx-auto w-full max-w-[460px] lg:col-span-5 lg:max-w-none">
          <motion.div
            style={{ y: yPortrait }}
            initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 }}
            animate={ready ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 } : undefined}
            transition={{ duration: 1.4, delay: 0.2, ease: EASE_OUT }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] ring-1 ring-white/10"
          >
            <Portrait priority className="absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
            <div className="absolute right-6 bottom-6 hidden justify-end text-right sm:flex">
              <div>
                <p className="font-display text-lg font-semibold tracking-[-0.02em] text-ivory">{site.tutor.name}</p>
                <p className="text-[13px] text-ivory/55">{site.tutor.title}</p>
              </div>
            </div>
          </motion.div>

          {/* Score card */}
          <motion.div
            style={{ y: yCards }}
            className="absolute -bottom-10 -left-4 w-[260px] sm:-left-12 sm:w-[290px] lg:-left-10 xl:-left-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{ duration: 1.1, delay: 0.75, ease: EASE_OUT }}
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="ring-gradient glass rounded-3xl bg-night/70 p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-ivory/50">Total score</span>
                  <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                    Top 1%
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <div className="relative size-[86px] shrink-0">
                    <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
                      <defs>
                        <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor="#8fb0ff" />
                          <stop offset="1" stopColor="#2f5bff" />
                        </linearGradient>
                      </defs>
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="url(#ring)"
                        strokeWidth="7"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={ready ? { pathLength: ratio } : undefined}
                        transition={{ duration: 2.2, delay: 0.9, ease: EASE_OUT }}
                      />
                    </svg>
                    <span className="absolute inset-0 grid place-items-center text-[11px] font-medium text-ivory/60">
                      {Math.round(ratio * 100)}%
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-[42px] leading-none font-bold tracking-[-0.05em] text-ivory">
                      <Counter to={score} from={400} start={ready} delay={0.9} duration={2.2} />
                    </p>
                    <p className="mt-1 text-sm text-ivory/40">/ 1600</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/[0.07] pt-4 text-[12px]">
                  {[
                    { k: "Math", v: 790 },
                    { k: "Reading & Writing", v: 750 },
                  ].map((s, i) => (
                    <div key={s.k}>
                      <p className="text-ivory/45">{s.k}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="font-semibold text-ivory tabular-nums">{s.v}</span>
                        <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                          <motion.span
                            className="block h-full origin-left rounded-full bg-gradient-to-r from-electric to-sky"
                            initial={{ scaleX: 0 }}
                            animate={ready ? { scaleX: s.v / 800 } : undefined}
                            transition={{ duration: 1.6, delay: 1.2 + i * 0.15, ease: EASE_OUT }}
                          />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[10px] tracking-wide text-ivory/30 uppercase">Sample student result</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Floating achievement cards */}
          <FloatingCard
            ready={ready}
            delay={0.95}
            float={7}
            className="absolute top-8 -right-3 sm:-right-8 lg:-right-10"
            icon={<TrendingUp className="size-4" />}
            kicker={heroCards[0].kicker}
            value={heroCards[0].value}
            note={heroCards[0].note}
            yParallax={yCards}
          />
          <FloatingCard
            ready={ready}
            delay={1.1}
            float={8}
            className="absolute top-[42%] -right-4 hidden sm:block sm:-right-14 lg:-right-16"
            icon={<Trophy className="size-4" />}
            kicker={heroCards[1].kicker}
            value={heroCards[1].value}
            note={heroCards[1].note}
            yParallax={yCards}
          />
          <FloatingCard
            ready={ready}
            delay={1.25}
            float={6.5}
            className="absolute top-[18%] -left-6 hidden md:block lg:-left-24"
            icon={<CalendarCheck className="size-4" />}
            kicker={heroCards[2].kicker}
            value={heroCards[2].value}
            note={heroCards[2].note}
            yParallax={yCards}
          />
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-ivory/35 uppercase lg:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-ivory/70"
            animate={reduceMotion ? undefined : { y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}

function FloatingCard({
  ready,
  delay,
  float,
  className,
  icon,
  kicker,
  value,
  note,
  yParallax,
}: {
  ready: boolean;
  delay: number;
  float: number;
  className?: string;
  icon: React.ReactNode;
  kicker: string;
  value: string;
  note: string;
  yParallax: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div style={{ y: yParallax }} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ duration: 1, delay, ease: EASE_OUT }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: float, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.04 }}
          className="glass flex items-center gap-3 rounded-2xl bg-night/60 py-3 pr-5 pl-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-cobalt/20 text-sky ring-1 ring-cobalt/30">
            {icon}
          </span>
          <div className="leading-tight">
            <p className="text-[10.5px] tracking-wide text-ivory/45 uppercase">{kicker}</p>
            <p className="font-display text-lg font-bold tracking-[-0.03em] text-ivory">
              {value} <span className="text-[11px] font-medium tracking-normal text-ivory/40">{note}</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
