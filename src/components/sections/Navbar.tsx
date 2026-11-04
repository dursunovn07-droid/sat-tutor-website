"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { EASE_OUT, EASE_IN_OUT } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { useAppReady } from "@/components/Providers";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#home"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label={`${site.brand} ${site.brandSuffix} — home`}
    >
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-electric to-cobalt shadow-[0_6px_24px_-6px_rgba(47,91,255,0.9),inset_0_1px_0_rgba(255,255,255,0.35)]">
        <svg viewBox="0 0 24 24" className="size-[18px] text-white transition-transform duration-700 ease-out-expo group-hover:rotate-[225deg]" aria-hidden>
          <path d="M12 3 L21 12 L12 21 L3 12 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="2.4" fill="currentColor" />
        </svg>
      </span>
      <span className="font-display text-[17px] leading-none font-bold tracking-[-0.03em] text-ivory">
        {site.brand}
        <span className="ml-1.5 font-medium text-ivory/50">{site.brandSuffix}</span>
      </span>
    </a>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const { ready } = useAppReady();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 600 && y > prev + 4 && !open);
    if (y < prev - 4) setHidden(false);
  });

  // Track which section is in view
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lock scroll + close on Escape for the mobile menu
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: ready ? (hidden ? -110 : 0) : -100, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex items-center justify-between rounded-full transition-all duration-700 ease-out-expo",
            scrolled
              ? "glass max-w-[1180px] bg-night/80 py-2 pr-2 pl-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
              : "max-w-[1280px] border border-transparent py-3 pr-2 pl-4 md:pl-6",
          )}
        >
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? "true" : undefined}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300",
                    active === item.href ? "text-ivory" : "text-ivory/55 hover:text-ivory",
                  )}
                >
                  {active === item.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.08] ring-1 ring-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button href="#contact" variant="primary" className="h-11 text-[13px]">
                Book a Free Consultation
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-full bg-white/[0.07] text-ivory ring-1 ring-white/10 transition hover:bg-white/15 active:scale-95 lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            transition={{ duration: 0.8, ease: EASE_IN_OUT }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-6 pt-28 pb-10 lg:hidden"
          >
            <div aria-hidden className="pointer-events-none absolute -top-40 right-0 size-[480px] rounded-full bg-cobalt/25 blur-[120px]" />
            <ul className="relative flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: EASE_OUT }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-white/[0.07] py-4"
                  >
                    <span className="text-xs text-ivory/30 tabular-nums">0{i + 1}</span>
                    <span
                      className={cn(
                        "font-display text-4xl font-semibold tracking-[-0.04em] transition-colors",
                        active === item.href ? "text-ivory" : "text-ivory/60 group-hover:text-ivory",
                      )}
                    >
                      {item.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="relative mt-auto flex flex-col gap-6 pt-10"
            >
              <Button href="#contact" variant="primary" size="lg" magnetic={false} onClick={() => setOpen(false)} className="justify-between">
                Book a Free Consultation
              </Button>
              <div className="flex items-center justify-between text-sm text-ivory/50">
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                <div className="flex gap-3">
                  {site.social.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-ivory/60 hover:text-ivory">
                      <SocialIcon name={s.icon} className="size-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
