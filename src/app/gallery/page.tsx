import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { EndCTA } from "@/components/EndCTA";
import { GalleryGrid } from "@/components/GalleryGrid";
import { GradText } from "@/components/GradText";
import { PageHero } from "@/components/PageHero";
import { galleryProjects } from "@/content/projects";
import { pageMeta } from "@/lib/seo";
import styles from "./Gallery.module.css";

export const metadata: Metadata = pageMeta({
  title: "Healthcare Project Gallery — Oceanic, Kolkata",
  description:
    "A visual gallery of healthcare projects planned and executed by Oceanic: hospitals, diagnostic centres and fertility clinics across West Bengal, Assam and Odisha.",
  path: "/gallery",
});

// Two groups per the source gallery (§6): Hospitals, then Diagnostics & Fertility.
const groups = [
  {
    title: "Hospitals",
    items: galleryProjects.filter((p) => p.category === "hospital"),
  },
  {
    title: "Diagnostics & Fertility",
    items: galleryProjects.filter((p) => p.category !== "hospital"),
  },
];

export default function GalleryPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Gallery", path: "/gallery" }]} />
      <PageHero
        eyebrow="Project gallery"
        title={
          <>
            Healthcare facilities we have <GradText>built.</GradText>
          </>
        }
        lead="Project collages from completed hospitals, diagnostic centres and fertility clinics across Eastern India."
      />
      <section className={styles.section}>
        <Container>
          <GalleryGrid groups={groups} />
        </Container>
      </section>
      <EndCTA
        align="center"
        title="Planning a healthcare facility? Let's build it right."
        actions={[
          { label: "Start a conversation →", href: "/contact", variant: "grad" },
          { label: "See all 18 projects", href: "/projects" },
        ]}
      />
    </>
  );
}
