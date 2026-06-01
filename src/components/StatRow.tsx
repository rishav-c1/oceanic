import type { Stat } from "@/content/site";
import { GradText } from "./GradText";
import styles from "./StatRow.module.css";

/** Hero stat band. "grid" = bordered 4-col (home); "inline" = flex row (inner pages). */
export function StatRow({
  stats,
  layout = "grid",
}: {
  stats: Stat[];
  layout?: "grid" | "inline";
}) {
  return (
    <div className={layout === "grid" ? styles.grid : styles.inline}>
      {stats.map((s) => (
        <div key={s.label} className={styles.stat}>
          <div className={styles.n}>
            <GradText>{s.value}</GradText>
          </div>
          <div className={styles.l}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
