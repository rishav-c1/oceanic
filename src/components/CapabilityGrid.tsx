import type { ReactNode } from "react";
import styles from "./CapabilityGrid.module.css";

/** Bordered grid wrapper for CapabilityCards (3 → 2 → 1 cols). */
export function CapabilityGrid({ children }: { children: ReactNode }) {
  return <div className={styles.caps}>{children}</div>;
}
