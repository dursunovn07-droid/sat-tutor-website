"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { faqs, site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-ink py-24 md:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index="06">FAQ</SectionLabel>
            <SplitText
              id="faq-title"
              className="mt-8 font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.98] font-semibold tracking-[-0.05em] text-ivory"
              text={[{ text: "Questions, " }, { text: "answered.", className: "font-serif font-normal italic text-gradient pr-[0.06em]" }]}
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-ivory/55">
                Can&apos;t find what you&apos;re looking for? Write to{" "}
                <a href={`mailto:${site.contact.email}`} className="link-underline text-ivory">
                  {site.contact.email}
                </a>
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="border-t border-white/[0.08]">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05} y={16} amount={0.2}>
                <Item q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <li className="border-b border-white/[0.08]">
      <h3>
        <button
          type="button"
          id={`${id}-btn`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
        >
          <span
            className={cn(
              "font-display text-[clamp(1.1rem,1.8vw,1.4rem)] font-medium tracking-[-0.025em] transition-colors duration-300",
              open ? "text-ivory" : "text-ivory/70 group-hover:text-ivory",
            )}
          >
            {q}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-full ring-1 transition-colors duration-500",
              open ? "bg-cobalt text-white ring-cobalt" : "text-ivory/70 ring-white/15 group-hover:ring-white/40",
            )}
          >
            <Plus className="size-4" aria-hidden />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.55, ease: EASE_OUT }, opacity: { duration: 0.35 } }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="max-w-2xl pr-14 pb-7 leading-relaxed text-ivory/55"
            >
              {a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
