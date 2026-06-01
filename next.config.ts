import type { NextConfig } from "next";

/**
 * Legacy Weebly slugs → new clean routes. Carried as 301s (permanent) to
 * preserve crawl equivalence. Source: reference/content (Legacy SEO / redirects).
 * NOTE: these run at the server/CDN layer (Vercel), which is why the build is
 * deployed as a Next app, not a bare `output: "export"` (see PLAN.md).
 */
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
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Spec requires 301 (classic permanent). Next's `permanent: true` would emit
    // 308; we set statusCode explicitly so legacy .html URLs return a true 301.
    return legacyRedirects.map((r) => ({ ...r, statusCode: 301 }));
  },
};

export default nextConfig;
