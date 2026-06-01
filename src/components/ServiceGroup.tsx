import styles from "./ServiceGroup.module.css";

/** One Detailed-Scope group: mono index + heading (left rail) and a thin-ruled bullet list (right). */
export function ServiceGroup({
  index,
  title,
  bullets,
}: {
  index: string;
  title: string;
  bullets: string[];
}) {
  return (
    <div className={styles.group}>
      <div className={styles.rail}>
        <span className={styles.num}>{index}</span>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <ul className={styles.bullets}>
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
