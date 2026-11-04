"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Subtle custom cursor (dot + trailing ring). Only enabled for fine pointers
 * and when the user hasn't requested reduced motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 350, damping: 32, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const t = e.target as Element | null;
      setHover(!!t?.closest?.("a, button, [data-cursor='hover'], summary, label, select"));
    };
    const leave = () => setHidden(true);
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] mix-blend-difference">
      <motion.div
        style={{ x: rx, y: ry }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: (hover ? 1.75 : 1) * (down ? 0.85 : 1),
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute top-0 left-0 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70"
      />
      <motion.div
        style={{ x, y }}
        animate={{ opacity: hidden || hover ? 0 : 1 }}
        className="absolute top-0 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
      />
    </div>
  );
}
