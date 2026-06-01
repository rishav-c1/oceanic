import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

// Site-wide 1200×630 OG image (replaces the blank Weebly editmysite placeholder).
export const dynamic = "force-static"; // prerender for output: export (GitHub Pages)
export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg,#063a46 0%,#0a5566 55%,#0097b2 135%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "24px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#9fe0ea",
          }}
        >
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#36b5cc",
            }}
          />
          Consultants in Healthcare Projects
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div
            style={{ fontSize: "120px", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}
          >
            Oceanic
          </div>
          <div style={{ fontSize: "34px", color: "rgba(255,255,255,0.85)", maxWidth: "820px" }}>
            Healthcare facilities, planned, built and handed over across Eastern India.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "22px",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <span>Kolkata · West Bengal</span>
          <span>oceanicprojectconsultants.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
