"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, CheckCircle2, Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useRef, useState } from "react";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

type Status = "idle" | "loading" | "success";
type Errors = Partial<Record<"name" | "email", string>>;

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const orbScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.6, 1.15]);
  const orbY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [120, 0]);

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-title"
      className="grain relative isolate overflow-hidden bg-ink pt-16 pb-24 md:pt-24 md:pb-32"
    >
      <motion.div
        aria-hidden
        style={{ scale: orbScale, y: orbY }}
        className="absolute top-[10%] left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,91,255,0.55)_0%,rgba(47,91,255,0.15)_40%,transparent_70%)] blur-2xl"
      />
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000,transparent)]" />

      <div className="container-x">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12.5px] text-ivory/75">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Limited spots available this season
            </span>
          </Reveal>
          <SplitText
            id="contact-title"
            className="mt-8 font-display text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.06em] text-ivory"
            text={[
              { text: "Ready to write" },
              { text: "\n" },
              { text: "your " },
              { text: "next chapter?", className: "font-serif font-normal italic text-gradient pr-[0.06em]" },
            ]}
          />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-xl text-[clamp(1.05rem,1.4vw,1.2rem)] leading-relaxed text-ivory/60">
              Book a free 30-minute consultation. We&apos;ll review your goals, map a realistic target
              score and outline the plan to get there.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-5 md:mt-20 lg:grid-cols-5">
          <Reveal className="lg:col-span-3" y={40}>
            <ConsultForm />
          </Reveal>
          <Reveal className="lg:col-span-2" y={40} delay={0.1}>
            <div className="flex h-full flex-col gap-3">
              {[
                { icon: Mail, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
                { icon: Phone, label: "Phone", value: site.contact.phone, href: `tel:${site.contact.phone.replace(/[^\d+]/g, "")}` },
                { icon: MapPin, label: "Location", value: site.contact.location },
                { icon: Clock, label: "Hours", value: site.contact.hours },
              ].map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cobalt/15 text-sky ring-1 ring-cobalt/25 transition-colors duration-500 group-hover:bg-cobalt group-hover:text-white">
                      <Icon className="size-[18px]" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-ivory/40">{label}</span>
                      <span className="block truncate text-[15px] font-medium text-ivory">{value}</span>
                    </span>
                    {href && (
                      <ArrowUpRight className="size-4 text-ivory/30 transition-all duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ivory" aria-hidden />
                    )}
                  </>
                );
                const cls = "group glass flex items-center gap-4 rounded-2xl p-4 transition-colors duration-500";
                return href ? (
                  <a key={label} href={href} className={cn(cls, "hover:bg-white/[0.08]")}>
                    {content}
                  </a>
                ) : (
                  <div key={label} className={cls}>
                    {content}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
  htmlFor,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  htmlFor: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-xs font-medium text-ivory/55">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${htmlFor}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 text-xs text-rose-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl bg-white/[0.04] px-4 py-3.5 text-[15px] text-ivory placeholder:text-ivory/25 ring-1 ring-white/10 outline-none transition-[box-shadow,background-color] duration-300 hover:ring-white/20 focus:bg-white/[0.06] focus:ring-2 focus:ring-electric";

function ConsultForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? "")) next.email = "Please enter a valid email.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("loading");
    /**
     * TODO: connect to your form backend (Formspree, Resend, a Next.js route
     * handler, etc.). Until then, the request is handed to the visitor's email
     * client with all details pre-filled, so no enquiry is lost.
     */
    await new Promise((r) => setTimeout(r, 900));
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Grade: ${data.grade || "—"}`,
      `Target score: ${data.target || "—"}`,
      "",
      data.message || "",
    ].join("\n");
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      "Free SAT consultation request",
    )}&body=${encodeURIComponent(body)}`;
    setStatus("success");
  };

  return (
    <div className="ring-gradient glass relative h-full overflow-hidden rounded-[28px] bg-night/60 p-6 md:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="flex h-full min-h-[420px] flex-col items-center justify-center text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
              className="grid size-16 place-items-center rounded-full bg-cobalt text-white shadow-[0_0_40px_rgba(47,91,255,0.7)]"
            >
              <CheckCircle2 className="size-8" aria-hidden />
            </motion.span>
            <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.03em] text-ivory">Almost there!</h3>
            <p className="mt-3 max-w-sm text-ivory/55">
              Your email app should open with your request pre-filled — just hit send. I reply within
              one business day.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="link-underline mt-6 text-sm text-sky"
            >
              Send another request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, scale: 0.98 }}
            onSubmit={onSubmit}
            noValidate
            className="grid gap-4 sm:grid-cols-2"
            aria-label="Free consultation request"
          >
            <Field label="Full name *" htmlFor="name" error={errors.name}>
              <input
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Jane Doe"
                className={inputCls}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
            </Field>
            <Field label="Email *" htmlFor="email" error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="jane@email.com"
                className={inputCls}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </Field>
            <Field label="Grade" htmlFor="grade">
              <select id="grade" name="grade" defaultValue="" className={cn(inputCls, "appearance-none")}>
                <option value="" disabled className="bg-night">
                  Select grade
                </option>
                {["9th grade", "10th grade", "11th grade", "12th grade", "Gap year / other"].map((g) => (
                  <option key={g} className="bg-night">
                    {g}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Target score" htmlFor="target">
              <input id="target" name="target" inputMode="numeric" placeholder="e.g. 1500" className={inputCls} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Anything I should know?" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Test date, previous scores, goals…"
                  className={cn(inputCls, "resize-none")}
                />
              </Field>
            </div>
            <div className="mt-2 flex flex-col items-start justify-between gap-4 sm:col-span-2 sm:flex-row sm:items-center">
              <p className="text-xs text-ivory/35">Free · No obligation · Reply within 24h</p>
              <Magnetic strength={0.2}>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative inline-flex h-13 items-center gap-3 overflow-hidden rounded-full bg-cobalt py-3.5 pr-2 pl-7 text-[15px] font-medium text-white shadow-[0_10px_40px_-10px_rgba(47,91,255,0.9)] transition-[background-color,transform] duration-500 hover:bg-electric active:scale-[0.97] disabled:opacity-80"
                >
                  <span>{status === "loading" ? "Sending…" : "Book a Free Consultation"}</span>
                  <span className="grid size-9 place-items-center rounded-full bg-white text-cobalt">
                    {status === "loading" ? (
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                    ) : (
                      <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" aria-hidden />
                    )}
                  </span>
                </button>
              </Magnetic>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
