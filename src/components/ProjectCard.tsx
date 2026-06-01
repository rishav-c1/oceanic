import type { Project } from "@/content/projects";
import { projectYear } from "@/content/projects";
import { SpecRow } from "./SpecRow";
import styles from "./ProjectCard.module.css";

/** Portfolio card for one project. `data-cat` + `id` support the client filter and ItemList anchors. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article id={project.slug} className={styles.card} data-cat={project.category}>
      <div className={styles.top}>
        <span className={styles.cat}>{project.kicker}</span>
        <span
          className={[styles.date, project.ongoing && styles.live]
            .filter(Boolean)
            .join(" ")}
        >
          {projectYear(project)}
        </span>
      </div>
      <h3 className={styles.name}>{project.name}</h3>
      <div className={styles.loc}>{project.locality}</div>
      {project.scope.length > 0 ? (
        <p className={styles.scope}>{project.scope.join("; ")}</p>
      ) : null}
      <SpecRow specs={project.specs} />
      {project.contactPerson ? (
        <div className={styles.client}>
          Client · <b>{project.contactPerson}</b>
        </div>
      ) : null}
    </article>
  );
}
