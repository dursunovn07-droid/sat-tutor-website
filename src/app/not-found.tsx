import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-ink px-6 text-center text-ivory">
      <div>
        <p className="eyebrow text-sky">Error 404</p>
        <h1 className="mt-6 font-display text-[clamp(3rem,10vw,8rem)] leading-none font-semibold tracking-[-0.06em]">
          Off the <span className="font-serif font-normal italic text-gradient">map.</span>
        </h1>
        <p className="mt-6 text-ivory/55">This page doesn&apos;t exist — but your next chapter does.</p>
        <Link
          href="/"
          className="mt-10 inline-flex h-12 items-center rounded-full bg-cobalt px-7 text-sm font-medium text-white transition hover:bg-electric"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
