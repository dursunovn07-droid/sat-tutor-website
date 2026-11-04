"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <a
      href="#home"
      className="group inline-flex items-center gap-2 text-ivory/60 transition-colors hover:text-ivory"
    >
      Back to top
      <span className="grid size-9 place-items-center rounded-full ring-1 ring-white/15 transition-all duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:bg-ivory group-hover:text-night">
        <ArrowUp className="size-4" aria-hidden />
      </span>
    </a>
  );
}
