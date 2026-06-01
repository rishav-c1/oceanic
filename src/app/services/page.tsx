import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { EndCTA } from "@/components/EndCTA";
import { GradText } from "@/components/GradText";
import { PageHero } from "@/components/PageHero";
import { ServiceGroup } from "@/components/ServiceGroup";
import { SERVICE_GROUPS } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import styles from "./Services.module.css";

export const metadata: Metadata = pageMeta({
  title: "Healthcare Project Services & Scope of Work — Oceanic",
  description:
    "Detailed scope of work for a healthcare setup: conceptual layouts, electrical, HVAC and fire, licensing, equipment, IT, HR and finance — planned end to end.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Services", path: "/services" }]} />
      <PageHero
        eyebrow="What we do"
        title={
          <>
            Detailed <GradText>Scope of Work</GradText>
          </>
        }
        lead="Every system in the building, planned and commissioned under one accountable consultant — across conceptual planning, engineering services, licensing, equipment, IT, finance and human resources."
      />
      <section className={styles.section}>
        <Container>
          <div className={styles.groups}>
            {SERVICE_GROUPS.map((g, i) => (
              <ServiceGroup
                key={g.title}
                index={String(i + 1).padStart(2, "0")}
                title={g.title}
                bullets={g.bullets}
              />
            ))}
          </div>
        </Container>
      </section>
      <EndCTA
        align="center"
        title="From concept to commissioning — let's plan it right."
        actions={[
          { label: "Start a conversation →", href: "/contact", variant: "grad" },
          { label: "See the projects", href: "/projects" },
        ]}
      />
    </>
  );
}
