"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { GraduationCap, Award, Clock, BadgeCheck } from "lucide-react";
import { useRef } from "react";
import { about, site } from "@/content/site";
import { Counter } from "@/components/ui/Counter";
import { Portrait } from "@/components/ui/Portrait";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollText } from "@/components/ui/ScrollText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { EASE_OUT } from "@/lib/motion";

const credIcons = [GraduationCap, Award, Clock, BadgeCheck];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-60, 60]);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 120]);

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative overflow-hidden rounded-t-[40px] bg-ivory text-night md:rounded-t-[56px]"
    >
      <div aria-hidden className="bg-grid-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_40%)]" />

      <div className="container-x relative py-24 md:py-36">
        <SectionLabel index="01" tone="light">About the tutor</SectionLabel>

        <ScrollText
          text={about.intro}
          className="mt-10 max-w-[64rem] font-display text-[clamp(1.75rem,3.8vw,3.4rem)] leading-[1.12] font-semibold tracking-[-0.045em] text-night"
          dim="text-night/15"
        />

        <div ref={ref} className="mt-20 grid gap-14 md:mt-28 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div className="relative lg:sticky lg:top-28">
              <motion.div
                initial={{ clipPath: "inset(10% 10% 10% 10%)", opacity: 0 }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.3, ease: EASE_OUT }}
                className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-30px_rgba(8,12,26,0.45)]"
              >
                <motion.div style={{ y: imgY }} className="absolute -inset-y-16 inset-x-0">
                  <Portrait className="absolute inset-0" tone="light" />
                </motion.div>
              </motion.div>

              {/* Rotating seal */}
              <motion.div
                style={{ rotate: badgeRotate }}
                className="absolute -top-8 -right-4 hidden size-28 md:block lg:-right-8"
                aria-hidden
              >
                <svg viewBox="0 0 120 120" className="size-full">
                  <defs>
                    <path id="circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                  </defs>
                  <circle cx="60" cy="60" r="58" fill="#2f5bff" />
                  <text fill="#fff" fontSize="10.5" fontWeight="600" letterSpacing="3.2">
                    <textPath href="#circle">DIGITAL SAT · SPECIALIST · 1:1 MENTOR ·</textPath>
                  </text>
                  <path d="M60 44 L76 60 L60 76 L44 60 Z" fill="none" stroke="#fff" strokeWidth="2" />
                  <circle cx="60" cy="60" r="4" fill="#fff" />
                </svg>
              </motion.div>

              <div className="mt-6 flex items-center justify-between text-sm">
                <div>
                  <p className="font-display text-lg font-semibold tracking-[-0.02em]">{site.tutor.name}</p>
                  <p className="text-night/55">{site.tutor.title}</p>
                </div>
                <span className="placeholder-chip rounded-full bg-night/[0.06] px-3 py-1.5 text-night/50">Est. [Year]</span>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-7 lg:pl-6">
            <SplitText
              id="about-title"
              as="h2"
              className="font-display text-[clamp(2.2rem,4.6vw,4rem)] leading-[1] font-semibold tracking-[-0.05em]"
              text={[{ text: "Hi, I'm " }, { text: site.tutor.firstName + ".", className: "font-serif font-normal italic text-cobalt" }]}
            />

            <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-night/65">
              {about.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>

            {/* Philosophy */}
            <Reveal delay={0.1} className="mt-14">
              <figure className="relative overflow-hidden rounded-[28px] bg-night p-8 text-ivory md:p-10">
                <div aria-hidden className="absolute -top-24 -right-24 size-72 rounded-full bg-cobalt/40 blur-[90px]" />
                <p className="eyebrow relative text-sky/80">Teaching philosophy</p>
                <blockquote className="relative mt-5 font-serif text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.25] italic tracking-[-0.01em]">
                  “{about.philosophy}”
                </blockquote>
                <figcaption className="relative mt-6 flex items-center gap-3 text-sm text-ivory/50">
                  <span className="h-px w-8 bg-ivory/30" /> {site.tutor.name}
                </figcaption>
              </figure>
            </Reveal>

            {/* Credentials */}
            <div className="mt-14">
              <Reveal>
                <h3 className="eyebrow text-night/45">Background &amp; qualifications</h3>
              </Reveal>
              <dl className="mt-5 divide-y divide-night/10 border-y border-night/10">
                {about.credentials.map((c, i) => {
                  const Icon = credIcons[i % credIcons.length];
                  return (
                    <Reveal key={c.label} delay={i * 0.06} y={16}>
                      <div className="group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-1 py-5 sm:grid-cols-[auto_200px_1fr]">
                        <span className="grid size-10 place-items-center rounded-xl bg-night/[0.05] text-cobalt transition-all duration-500 ease-out-expo group-hover:scale-110 group-hover:bg-cobalt group-hover:text-white">
                          <Icon className="size-[18px]" aria-hidden />
                        </span>
                        <dt className="text-sm text-night/50">{c.label}</dt>
                        <dd className="col-start-2 font-display text-[17px] font-semibold tracking-[-0.02em] sm:col-start-3">
                          {c.value}
                        </dd>
                      </div>
                    </Reveal>
                  );
                })}
              </dl>
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] bg-night/10 ring-1 ring-night/10">
              {about.stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08} y={16} className="bg-paper p-6 md:p-8">
                  <p className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-none font-semibold tracking-[-0.05em] text-night">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-3 text-sm text-night/55">{s.label}</p>
                </Reveal>
              ))}
            </div>
            <p className="mt-3 text-xs text-night/40">* Figures are placeholders — update in <code>src/content/site.ts</code>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
