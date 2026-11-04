"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  blur?: boolean;
  once?: boolean;
  amount?: number;
};

/** Scroll-triggered fade/slide entrance. */
export function Reveal({
  delay = 0,
  y = 28,
  blur = true,
  once = true,
  amount = 0.3,
  children,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
