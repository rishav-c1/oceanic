import type { SpecChip } from "@/content/projects";
import styles from "./SpecRow.module.css";

/** Adaptive spec row: 3 bordered chips for hospitals; a single "lone" chip otherwise. */
export function SpecRow({ specs }: { specs: SpecChip[] }) {
  const lone = specs.length === 1;
  return (
    <div className={styles.specs}>
      {specs.map((s) => (
        <div
          key={s.label}
          className={[styles.spec, lone && styles.lone].filter(Boolean).join(" ")}
        >
          <span className={styles.v}>{s.value}</span>
          <span className={styles.k}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
