import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { site } from "@/content/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const title = `${site.tutor.name} — Premium Private SAT Tutor`;
const description =
  "Personalized one-on-one Digital SAT preparation designed to help ambitious students achieve their highest potential. Book a free consultation.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.brand} ${site.brandSuffix}` },
  description,
  keywords: ["SAT tutor", "Digital SAT", "SAT prep", "private SAT tutoring", "SAT coach", "1500+ SAT"],
  authors: [{ name: site.tutor.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description,
    siteName: `${site.brand} ${site.brandSuffix}`,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${serif.variable}`}>
      <body>
        <noscript>
          <style>{`#preloader{display:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only z-[200] rounded-full bg-cobalt px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
