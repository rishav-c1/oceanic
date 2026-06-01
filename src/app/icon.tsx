import { ImageResponse } from "next/og";

// Generated brand favicon (gradient + the wordmark dot motif) until the real
// logo lands — TODO(asset). Next emits the <link rel="icon"> automatically.
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
        }}
      >
        <div
          style={{
            width: "13px",
            height: "13px",
            borderRadius: "50%",
            background: "#fff",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
