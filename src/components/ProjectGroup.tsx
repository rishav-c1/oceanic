import type { Project, ProjectCategory } from "@/content/projects";
import { CATEGORY_META } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import styles from "./ProjectGroup.module.css";

/** A category section: mono rule heading + responsive card grid. `data-grp` drives the filter. */
export function ProjectGroup({
  category,
  projects,
}: {
  category: ProjectCategory;
  projects: Project[];
}) {
  return (
    <section className={styles.grp} data-grp={category}>
      <h2 className={styles.grpTitle}>{CATEGORY_META[category].plural}</h2>
      <div className={styles.grid}>
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
