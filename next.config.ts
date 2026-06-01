import type { NextConfig } from "next";

/**
 * Dual-target build.
 *  - Default (Vercel, production): a Next server build with `next/image` optimization
 *    and the legacy .html → clean-route 301 redirects.
 *  - GITHUB_PAGES=true: a fully static export (`output: "export"`) for GitHub Pages —
 *    a static host can't run server redirects or the image optimizer, so those are
 *    dropped here (the Vercel build keeps them). NEXT_PUBLIC_BASE_PATH (e.g. "/oceanic")
 *    is the project-pages subpath.
 */
const isExport = process.env.GITHUB_PAGES === "true";
const basePath = isExport ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "") : "";

const legacyRedirects: { source: string; destination: string }[] = [
  { source: "/about-oceanic-project-consultants.html", destination: "/about" },
  {
    source: "/detailed-scope-of-work-oceanic-project-consultants.html",
    destination: "/services",
  },
  { source: "/projects-oceanic-project-consultants.html", destination: "/projects" },
  {
    source: "/project-certificates-oceanic-project-consultants.html",
    destination: "/projects/certificates",
  },
  { source: "/project-gallery-oceanic-project-consultants.html", destination: "/gallery" },
  { source: "/contact-oceanic-project-consultants.html", destination: "/contact" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isExport
    ? {
        output: "export",
        basePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        images: { formats: ["image/avif", "image/webp"] },
        async redirects() {
          // Spec requires 301 (Next's permanent:true emits 308); set it explicitly.
          return legacyRedirects.map((r) => ({ ...r, statusCode: 301 }));
        },
      }),
};

export default nextConfig;
