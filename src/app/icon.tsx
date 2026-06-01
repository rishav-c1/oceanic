import { ImageResponse } from "next/og";

// Brand favicon: an "O" on the brand gradient. Next emits <link rel="icon">.
export const dynamic = "force-static"; // prerender for output: export (GitHub Pages)
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#00b9d4 0%,#0097b2 46%,#0b6e84 100%)",
          borderRadius: "7px",
          color: "#fff",
          fontFamily: "sans-serif",
          fontSize: "24px",
          fontWeight: 700,
        }}
      >
        O
      </div>
    ),
    { ...size },
  );
}
