"use client";

import { AnimatePresence, animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useAppReady } from "@/components/Providers";
import { EASE_IN_OUT } from "@/lib/motion";
import { site } from "@/content/site";

/** Short branded intro: counts to 100 and lifts away like a curtain. */
export function Preloader() {
  const { setReady } = useAppReady();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) {
      setVisible(false);
      setReady(true);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const c = animate(0, 100, {
      duration: 1.3,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        setVisible(false);
        document.documentElement.style.overflow = "";
        setTimeout(() => setReady(true), 250);
      },
    });
    return () => {
      c.stop();
      document.documentElement.style.overflow = "";
    };
  }, [reduce, setReady]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          id="preloader"
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 text-ivory md:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: EASE_IN_OUT }}
        >
          <div className="flex items-center justify-between text-xs tracking-[0.2em] text-ivory/50 uppercase">
            <span>{site.brand} — {site.brandSuffix}</span>
            <span>Digital SAT Preparation</span>
          </div>
          <div className="flex items-end justify-between gap-6">
            <p className="font-display text-[clamp(1.5rem,4vw,3rem)] font-semibold tracking-[-0.04em] text-ivory/90">
              Your next chapter<span className="text-electric">.</span>
            </p>
            <span className="font-display text-[clamp(4rem,14vw,11rem)] leading-[0.8] font-semibold tracking-[-0.06em] tabular-nums">
              {count}
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5">
            <div className="h-full bg-cobalt" style={{ width: `${count}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
