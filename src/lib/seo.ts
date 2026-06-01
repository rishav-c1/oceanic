import type { Metadata } from "next";
import { SITE } from "@/content/site";

/** Build per-route metadata: absolute title (no template suffix), canonical, OG + Twitter. */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE.url}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      url,
      title,
      description,
      locale: "en_IN",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
