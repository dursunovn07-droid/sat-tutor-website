"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CounterProps = {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Start immediately instead of on scroll into view. */
  start?: boolean;
};

const fmt = new Intl.NumberFormat("en-US");

/** Animated number counter that starts when scrolled into view. */
export function Counter({
  to,
  from = 0,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
  className,
  start,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(from);
  const go = start ?? inView;

  useEffect(() => {
    if (!go) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(from, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [go, reduce, from, to, duration, delay]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${fmt.format(to)}${suffix}`}>
      <span aria-hidden className="tabular-nums">
        {prefix}
        {fmt.format(value)}
        {suffix}
      </span>
    </span>
  );
}
