import Image from "next/image";
import type { Project } from "@/content/projects";
import { Button } from "./Button";
import styles from "./CertificateCard.module.css";

/** Certificate card: thumbnail + view/download links to the migrated local PDF. */
export function CertificateCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  if (!project.certificateImage || !project.certificatePdf) return null;
  const spec = [project.unitType, project.config].filter(Boolean).join(" · ");
  return (
    <article className={styles.card}>
      <span className={styles.tag}>Client recommendation</span>
      <div className={styles.thumb}>
        <Image
          src={project.certificateImage}
          alt={`Completion and recommendation certificate for ${project.name}`}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          className={styles.img}
          priority={priority}
          quality={50}
        />
      </div>
      <h3 className={styles.name}>{project.name}</h3>
      <div className={styles.spec}>{spec}</div>
      <div className={styles.actions}>
        <Button href={project.certificatePdf} variant="grad" external>
          View PDF →
        </Button>
        <Button href={project.certificatePdf} download>
          Download
        </Button>
      </div>
    </article>
  );
}
