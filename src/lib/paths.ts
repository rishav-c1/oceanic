/**
 * Deploy base path (e.g. "/oceanic" on GitHub Pages project pages; "" on Vercel).
 * next/link and next/image apply this automatically — use `withBase` only for raw
 * <a href> links to /public assets (e.g. the certificate PDFs).
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const withBase = (path: string): string =>
  path.startsWith("/") ? `${BASE_PATH}${path}` : path;
