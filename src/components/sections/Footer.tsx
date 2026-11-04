import { nav, site } from "@/content/site";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Logo } from "./Navbar";
import { BackToTop } from "./BackToTop";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink pt-20 pb-10 text-ivory">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm leading-relaxed text-ivory/50">
              Premium one-on-one Digital SAT preparation for ambitious students — online worldwide.
            </p>
            <div className="mt-8 flex gap-2">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in a new tab)`}
                  className="grid size-11 place-items-center rounded-full text-ivory/60 ring-1 ring-white/10 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:bg-cobalt hover:text-white hover:ring-cobalt"
                >
                  <SocialIcon name={s.icon} className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="eyebrow text-ivory/35">Navigate</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="link-underline text-ivory/70 transition-colors hover:text-ivory">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq" className="link-underline text-ivory/70 transition-colors hover:text-ivory">
                  FAQ
                </a>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="eyebrow text-ivory/35">Contact</h2>
            <ul className="mt-5 space-y-3 text-ivory/70">
              <li>
                <a href={`mailto:${site.contact.email}`} className="link-underline hover:text-ivory">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`} className="link-underline hover:text-ivory">
                  {site.contact.phone}
                </a>
              </li>
              <li className="text-ivory/50">{site.contact.location}</li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-20 bg-gradient-to-b from-sky/25 via-cobalt/10 to-transparent bg-clip-text pb-2 font-display text-[clamp(4rem,19vw,17rem)] leading-[0.85] font-bold tracking-[-0.07em] text-transparent select-none"
        >
          {site.brand}.
        </p>

        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/[0.06] pt-8 text-sm text-ivory/40 md:flex-row md:items-center">
          <p>
            © {year} {site.brand} {site.brandSuffix}. All rights reserved.
          </p>
          <p className="max-w-md text-xs leading-relaxed text-ivory/30">
            SAT® is a trademark registered by the College Board, which is not affiliated with, and
            does not endorse, this website.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
