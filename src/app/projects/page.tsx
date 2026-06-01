import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { EndCTA } from "@/components/EndCTA";
import { GradText } from "@/components/GradText";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProjectFilter } from "@/components/ProjectFilter";
import { ProjectGroup } from "@/components/ProjectGroup";
import {
  CATEGORY_ORDER,
  countByCategory,
  projects,
  projectsByCategory,
  TOTAL_PROJECTS,
} from "@/content/projects";
import type { Stat } from "@/content/site";
import { itemListSchema } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import styles from "./Projects.module.css";

export const metadata: Metadata = pageMeta({
  title: "Healthcare Projects in Eastern India — Oceanic",
  description:
    "Healthcare facilities planned, built and handed over across Eastern India: hospitals, diagnostic centres and fertility clinics, from concept to working facility.",
  path: "/projects",
});

const PROJECT_STATS: Stat[] = [
  { value: "18", label: "Projects" },
  { value: "725", label: "Beds planned" },
  { value: "20+", label: "Years" },
  { value: "3", label: "States" },
];

export default function ProjectsPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Projects", path: "/projects" }]} />
      <PageHero
        eyebrow="Selected work · Eastern India"
        title={
          <>
            Healthcare facilities, planned,
            <br />
            built and <GradText>handed over.</GradText>
          </>
        }
        lead="Two decades of healthcare projects, from 30-bed nursing homes to a 300-bed multi-speciality hospital, each taken from conceptual layout to a working, licensed facility."
        stats={PROJECT_STATS}
      />

      <ProjectFilter
        total={TOTAL_PROJECTS}
        counts={{
          hospital: countByCategory("hospital"),
          diagnostic: countByCategory("diagnostic"),
          fertility: countByCategory("fertility"),
        }}
      />

      <Container>
        <div className={styles.groups}>
          {CATEGORY_ORDER.map((category) => (
            <ProjectGroup
              key={category}
              category={category}
              projects={projectsByCategory(category)}
            />
          ))}
        </div>
      </Container>

      <EndCTA
        align="center"
        title="Planning a healthcare facility? Let's build it right."
        actions={[
          { label: "Start a conversation →", href: "/contact", variant: "grad" },
          { label: "See the gallery", href: "/gallery" },
        ]}
      />

      <JsonLd
        data={itemListSchema(
          "Healthcare projects by Oceanic Project Consultants",
          projects.map((p) => ({ name: p.name, path: `/projects#${p.slug}` })),
        )}
      />
    </>
  );
}
