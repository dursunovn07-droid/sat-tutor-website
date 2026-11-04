"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { ElementType } from "react";

type Segment = { text: string; className?: string };

type SplitTextProps = {
  /** Plain string, or an array of styled segments. */
  text: string | Segment[];
  as?: ElementType;
  className?: string;
  id?: string;
  delay?: number;
  stagger?: number;
  by?: "word" | "char";
  /** If provided, animation is controlled by this flag instead of scroll position. */
  play?: boolean;
};

/**
 * Masked word-by-word (or character-by-character) heading reveal.
 * Screen readers receive the full string via aria-label.
 */
export function SplitText({
  text,
  as: Tag = "h2",
  className,
  id,
  delay = 0,
  stagger = 0.06,
  by = "word",
  play,
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const segments: Segment[] = typeof text === "string" ? [{ text }] : text;
  const full = segments.map((s) => (s.text === "\n" ? " " : s.text)).join("").replace(/\s+/g, " ").trim();

  let index = 0;
  const trigger =
    play !== undefined
    ? { animate: play ? ("show" as const) : ("hidden" as const) }
    : { whileInView: "show" as const, viewport: { once: true, amount: 0.5 } };

  return (
    <Tag id={id} className={className} aria-label={full}>
      <motion.span
        aria-hidden
        className="inline"
        initial="hidden"
        {...trigger}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {segments.map((seg, si) => {
          if (seg.text === "\n") return <br key={`br-${si}`} />;
          const words = seg.text.split(/(\s+)/).filter(Boolean);
          return words.map((word, wi) => {
            if (/^\s+$/.test(word)) return <span key={`${si}-${wi}`}> </span>;
            const units = by === "char" ? Array.from(word) : [word];
            return (
              <span
                key={`${si}-${wi}`}
                className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top"
              >
                {units.map((u) => {
                  index++;
                  return (
                    <motion.span
                      key={index}
                      className={cn("inline-block will-change-transform", seg.className)}
                      variants={{
                        hidden: reduce ? { opacity: 0 } : { y: "110%", rotate: 4, opacity: 0 },
                        show: {
                          y: "0%",
                          rotate: 0,
                          opacity: 1,
                          transition: { duration: 1, ease: EASE_OUT },
                        },
                      }}
                    >
                      {u}
                    </motion.span>
                  );
                })}
              </span>
            );
          });
        })}
      </motion.span>
    </Tag>
  );
}
