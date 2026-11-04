"use client";

import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "glass" | "dark" | "light" | "outline-dark";

const styles: Record<Variant, string> = {
  primary:
    "bg-cobalt text-white shadow-[0_10px_40px_-10px_rgba(47,91,255,0.8),inset_0_1px_0_rgba(255,255,255,0.25)] hover:bg-electric",
  glass:
    "glass text-ivory hover:bg-white/10",
  dark:
    "bg-night text-ivory shadow-[0_10px_30px_-12px_rgba(5,7,15,0.6)] hover:bg-navy",
  light:
    "bg-ivory text-night hover:bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]",
  "outline-dark":
    "border border-night/15 text-night hover:border-night/40 hover:bg-night/[0.03]",
};

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  icon?: boolean;
  size?: "md" | "lg";
  children: ReactNode;
  magnetic?: boolean;
};

/** Pill CTA link with magnetic hover, sliding-arrow micro-interaction and shine sweep. */
export function Button({
  variant = "primary",
  icon = true,
  size = "md",
  magnetic = true,
  className,
  children,
  ...rest
}: ButtonProps) {
  const inner = (
    <a
      data-cursor="hover"
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full font-medium tracking-[-0.01em]",
        "transition-[background-color,border-color,box-shadow,transform] duration-500 ease-out-expo active:scale-[0.97]",
        size === "lg" ? "h-14 pl-7 pr-2 text-[15px]" : "h-12 pl-6 pr-1.5 text-sm",
        !icon && (size === "lg" ? "pr-7" : "pr-6"),
        styles[variant],
        className,
      )}
      {...rest}
    >
      {/* shine sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 ease-out-expo group-hover:left-[120%] group-hover:opacity-100"
      />
      <span className="relative">{children}</span>
      {icon && (
        <span
          aria-hidden
          className={cn(
            "relative grid place-items-center overflow-hidden rounded-full transition-transform duration-500 ease-out-expo group-hover:scale-105",
            size === "lg" ? "size-10" : "size-9",
            variant === "primary" && "bg-white text-cobalt",
            variant === "glass" && "bg-ivory text-night",
            variant === "dark" && "bg-cobalt text-white",
            variant === "light" && "bg-night text-ivory",
            variant === "outline-dark" && "bg-night text-ivory",
          )}
        >
          <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-5 group-hover:-translate-y-5" />
          <ArrowUpRight className="absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </a>
  );
  return magnetic ? <Magnetic strength={0.25}>{inner}</Magnetic> : inner;
}
