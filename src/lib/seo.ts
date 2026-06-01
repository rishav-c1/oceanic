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
  // Re-assert the site OG image: a per-route openGraph object otherwise drops the
  // root opengraph-image inherited from the app segment.
  const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: title };
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
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
