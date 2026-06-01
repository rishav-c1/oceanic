import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CertificateCard } from "@/components/CertificateCard";
import { Container } from "@/components/Container";
import { EndCTA } from "@/components/EndCTA";
import { GradText } from "@/components/GradText";
import { PageHero } from "@/components/PageHero";
import { certificateProjects } from "@/content/projects";
import { pageMeta } from "@/lib/seo";
import styles from "./Certificates.module.css";

export const metadata: Metadata = pageMeta({
  title: "Project Certificates — Oceanic Healthcare Consultancy",
  description:
    "Client completion and recommendation certificates for Oceanic's healthcare projects: Columbia Asia, RSV Hospital, Atlas, Unipon and Sparsh Diagnostica.",
  path: "/projects/certificates",
});

export default function CertificatesPage() {
  return (
    <>
      <Breadcrumbs
        trail={[
          { name: "Projects", path: "/projects" },
          { name: "Certificates", path: "/projects/certificates" },
        ]}
      />
      <PageHero
        eyebrow="Client certificates · Verified work"
        title={
          <>
            Recommendations from the people we <GradText>built for.</GradText>
          </>
        }
        lead="Client completion and recommendation certificates from across Oceanic's healthcare projects."
      />
      <section className={styles.section}>
        <Container>
          <div className={styles.grid}>
            {certificateProjects.map((p, i) => (
              <CertificateCard key={p.slug} project={p} priority={i === 0} />
            ))}
          </div>
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
