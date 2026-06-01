import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

// Phase 0 placeholder metadata. Phase 1+ replaces this with per-route
// generateMetadata, canonical/OG/Twitter, and site-wide JSON-LD.
export const metadata: Metadata = {
  title: "Oceanic Project Consultants",
  description: "Consultants in Healthcare Projects — Kolkata, West Bengal.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
