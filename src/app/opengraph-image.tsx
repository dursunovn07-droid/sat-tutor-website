import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.tutor.name} — Premium SAT Tutor`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 20% 0%, #2f5bff 0%, #0b1124 45%, #05070f 100%)",
          color: "#f6f3ec",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.7, letterSpacing: 4, textTransform: "uppercase", display: "flex" }}>
          {`${site.brand} ${site.brandSuffix}`}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Your SAT Score.</div>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1.05, color: "#8fb0ff" }}>
            Your Next Chapter.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, opacity: 0.75 }}>
          <span>{`${site.tutor.name} · ${site.tutor.title}`}</span>
          <span>{`${site.tutor.heroScore} / 1600`}</span>
        </div>
      </div>
    ),
    size,
  );
}
