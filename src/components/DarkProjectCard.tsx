import styles from "./DarkProjectCard.module.css";

/**
 * Translucent card for the home "Selected work" --grad-dark band. Takes curated
 * props (not raw project.specs) so the band can mirror the mockup — e.g. RSV's
 * "NABH / Certified" chip — while /projects stays faithful to the data model.
 */
export function DarkProjectCard({
  tag,
  name,
  line,
  specs,
}: {
  tag: string;
  name: string;
  line: string;
  specs: { v: string; k: string }[];
}) {
  return (
    <article className={styles.pcard}>
      <span className={styles.tag}>{tag}</span>
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.loc}>{line}</div>
      <div className={styles.specs}>
        {specs.map((s) => (
          <div key={s.k}>
            <span className={styles.v}>{s.v}</span>
            <span className={styles.k}>{s.k}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
