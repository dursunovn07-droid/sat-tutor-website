"use client";

import { motion, useInView } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import { results } from "@/content/site";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { EASE_OUT } from "@/lib/motion";

function SampleBadge() {
  return (
    <span className="placeholder-chip rounded-full bg-white/[0.06] px-2.5 py-1 text-ivory/45 ring-1 ring-white/10">
      Sample data
    </span>
  );
}

export function Results() {
  return (
    <section id="results" aria-labelledby="results-title" className="relative overflow-hidden bg-ink py-24 md:py-36">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent)]" />
      <div aria-hidden className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-cobalt/20 blur-[140px]" />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel index="04" className="justify-center">Results &amp; achievements</SectionLabel>
          <SplitText
            id="results-title"
            className="mt-8 font-display text-[clamp(2.4rem,5.4vw,4.8rem)] leading-[0.98] font-semibold tracking-[-0.055em] text-ivory"
            text={[{ text: "Progress you can " }, { text: "measure.", className: "font-serif font-normal italic text-gradient pr-[0.06em]" }]}
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-ivory/55">
              Every student is tracked with full-length adaptive practice tests, so improvements are
              visible — section by section, week by week.
            </p>
          </Reveal>
        </div>

        {/* Headline stats */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] bg-white/[0.07] ring-1 ring-white/[0.07] md:mt-20 md:grid-cols-3">
          {results.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} y={20} className="relative bg-ink p-8 md:p-10">
              <p className="font-display text-[clamp(3rem,6vw,5rem)] leading-none font-semibold tracking-[-0.06em] text-ivory">
                <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} duration={2.4} />
              </p>
              <p className="mt-4 text-ivory/55">{s.label}</p>
            </Reveal>
          ))}
        </div>

        {/* Bento */}
        <div className="mt-5 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" y={40}>
            <ProgressionChart />
          </Reveal>
          <Reveal className="lg:col-span-5" y={40} delay={0.1}>
            <Improvements />
          </Reveal>
        </div>

        {/* Success stories */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {results.stories.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} y={30}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative h-full overflow-hidden rounded-[28px] bg-white/[0.03] p-7 ring-1 ring-white/[0.08] transition-colors duration-500 hover:bg-white/[0.05] hover:ring-white/15"
              >
                <div
                  aria-hidden
                  className="absolute -right-16 -bottom-16 size-48 rounded-full bg-cobalt/0 blur-3xl transition-colors duration-700 group-hover:bg-cobalt/30"
                />
                <div className="relative flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cobalt/15 px-3 py-1 text-xs font-semibold text-sky ring-1 ring-cobalt/30">
                    <Sparkles className="size-3" aria-hidden /> {s.tag}
                  </span>
                  <ArrowRight className="size-4 -rotate-45 text-ivory/30 transition-all duration-500 ease-out-expo group-hover:rotate-0 group-hover:text-ivory" aria-hidden />
                </div>
                <h3 className="relative mt-8 font-display text-2xl font-semibold tracking-[-0.035em] text-ivory">{s.title}</h3>
                <p className="relative mt-3 text-[15px] leading-relaxed text-ivory/50">{s.text}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Line chart: mock exam progression ───────────────────────────── */
function ProgressionChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const data = results.progression;
  const W = 640;
  const H = 300;
  const pad = { l: 44, r: 16, t: 20, b: 34 };
  const min = 1100;
  const max = 1600;
  const x = (i: number) => pad.l + (i / (data.length - 1)) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - (v - min) / (max - min)) * (H - pad.t - pad.b);

  // Smooth curve (Catmull-Rom → Bézier)
  const pts = data.map((v, i) => [x(i), y(v)] as const);
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
  }
  const area = `${d} L ${pts[pts.length - 1][0]} ${H - pad.b} L ${pts[0][0]} ${H - pad.b} Z`;
  const gridVals = [1100, 1200, 1300, 1400, 1500, 1600];
  const last = data[data.length - 1];
  const first = data[0];

  return (
    <div ref={ref} className="flex h-full flex-col rounded-[28px] bg-white/[0.03] p-6 ring-1 ring-white/[0.08] md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-ivory">Mock exam progression</h3>
          <p className="mt-1 text-sm text-ivory/45">Typical student · full-length practice tests</p>
        </div>
        <div className="flex items-center gap-3">
          <SampleBadge />
          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm font-semibold text-emerald-300 tabular-nums">
            +{last - first}
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-6 mb-6 w-full"
        role="img"
        aria-label={`Line chart: practice test scores rising from ${first} to ${last} across ${data.length} mock exams (sample data).`}
      >
        <defs>
          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4d7cff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#4d7cff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2f5bff" />
            <stop offset="1" stopColor="#8fb0ff" />
          </linearGradient>
        </defs>
        {gridVals.map((g) => (
          <g key={g}>
            <line x1={pad.l} x2={W - pad.r} y1={y(g)} y2={y(g)} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 5" />
            <text x={pad.l - 10} y={y(g) + 4} textAnchor="end" className="fill-ivory/35 text-[11px]">
              {g}
            </text>
          </g>
        ))}
        {data.map((_, i) => (
          <text key={i} x={x(i)} y={H - 10} textAnchor="middle" className="fill-ivory/35 text-[11px]">
            {i === 0 ? "Diag." : `T${i}`}
          </text>
        ))}
        <motion.path
          d={area}
          fill="url(#area)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 1.2, delay: 0.8 }}
        />
        <motion.path
          d={d}
          fill="none"
          stroke="url(#stroke)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 2, ease: EASE_OUT }}
        />
        {pts.map(([px, py], i) => (
          <motion.circle
            key={i}
            cx={px}
            cy={py}
            r={i === pts.length - 1 ? 6 : 3.5}
            fill={i === pts.length - 1 ? "#8fb0ff" : "#05070f"}
            stroke="#8fb0ff"
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : undefined}
            transition={{ delay: 0.25 + (i / pts.length) * 1.6, duration: 0.5, ease: EASE_OUT }}
            style={{ transformOrigin: `${px}px ${py}px` }}
          />
        ))}
        <motion.g
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <rect x={pts[pts.length - 1][0] - 58} y={pts[pts.length - 1][1] - 46} width="62" height="28" rx="14" fill="#2f5bff" />
          <text x={pts[pts.length - 1][0] - 27} y={pts[pts.length - 1][1] - 27} textAnchor="middle" className="fill-white text-[13px] font-semibold">
            {last}
          </text>
        </motion.g>
      </svg>

      <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-white/[0.07] pt-6">
        {[
          { k: "Diagnostic", v: String(first) },
          { k: "Latest mock", v: String(last) },
          { k: "Mock exams", v: String(data.length - 1) },
        ].map((m) => (
          <div key={m.k}>
            <dt className="text-xs text-ivory/40">{m.k}</dt>
            <dd className="mt-1 font-display text-2xl font-semibold tracking-[-0.04em] text-ivory tabular-nums">{m.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ── Before/after comparison bars ───────────────────────────── */
function Improvements() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const min = 800;
  const max = 1600;
  const pct = (v: number) => (v - min) / (max - min);

  return (
    <div ref={ref} className="flex h-full flex-col rounded-[28px] bg-gradient-to-b from-navy/80 to-night p-6 ring-1 ring-white/[0.08] md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-ivory">Score improvements</h3>
          <p className="mt-1 text-sm text-ivory/45">Diagnostic vs. official SAT</p>
        </div>
        <SampleBadge />
      </div>

      <ul className="mt-8 flex flex-1 flex-col justify-around gap-6">
        {results.improvements.map((s, i) => (
          <li key={s.name}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-ivory/70">{s.name}</span>
              <span className="tabular-nums text-ivory/45">
                {s.before} <ArrowRight className="inline size-3" aria-label="to" />{" "}
                <span className="font-semibold text-ivory">{s.after}</span>
                <span className="ml-2 font-semibold text-emerald-300">+{s.after - s.before}</span>
              </span>
            </div>
            <div className="relative mt-2.5 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="absolute inset-y-0 left-0 origin-left rounded-full bg-gradient-to-r from-cobalt to-sky"
                style={{ width: `${pct(s.after) * 100}%` }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : undefined}
                transition={{ duration: 1.6, delay: 0.3 + i * 0.12, ease: EASE_OUT }}
              />
              <motion.div
                className="absolute inset-y-0 left-0 origin-left rounded-full bg-white/25"
                style={{ width: `${pct(s.before) * 100}%` }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : undefined}
                transition={{ duration: 1.2, delay: 0.15 + i * 0.12, ease: EASE_OUT }}
              />
            </div>
            <p className="mt-1.5 text-[11px] text-ivory/35">{s.weeks} weeks of preparation</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-5 border-t border-white/[0.07] pt-5 text-xs text-ivory/50">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-white/30" /> Diagnostic
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-gradient-to-r from-cobalt to-sky" /> Final score
        </span>
      </div>
    </div>
  );
}
