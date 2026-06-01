import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

const PATHS = [
  "",
  "/about",
  "/services",
  "/projects",
  "/projects/certificates",
  "/gallery",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PATHS.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
