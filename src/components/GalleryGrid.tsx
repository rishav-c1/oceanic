import Image from "next/image";
import type { Project } from "@/content/projects";
import { withBase } from "@/lib/paths";
import styles from "./GalleryGrid.module.css";

function GalleryItem({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  if (!project.galleryImage) return null;
  return (
    <figure className={styles.item}>
      <div className={styles.frame}>
        <Image
          src={withBase(project.galleryImage)}
          alt={`${project.name} — ${project.unitType} project by Oceanic`}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          className={styles.img}
          priority={priority}
          quality={45}
        />
      </div>
      <figcaption className={styles.cap}>
        <span className={styles.capName}>{project.name}</span>
        <span className={styles.capLoc}>{project.locality}</span>
      </figcaption>
    </figure>
  );
}

/** Responsive image grid, grouped (Hospitals / Diagnostics & Fertility per the source). */
export function GalleryGrid({
  groups,
}: {
  groups: { title: string; items: Project[] }[];
}) {
  return (
    <>
      {groups.map((g, gi) => (
        <section key={g.title} className={styles.group}>
          <h2 className={styles.groupTitle}>{g.title}</h2>
          <div className={styles.grid}>
            {g.items.map((p, ii) => (
              // Only the first image is the LCP candidate — keep it the sole
              // priority/eager load so it doesn't share bandwidth with the rest.
              <GalleryItem key={p.slug} project={p} priority={gi === 0 && ii === 0} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
