import type { ReactNode } from "react";
import styles from "./GradText.module.css";

/** Inline gradient-clipped emphasis span for headlines and stat numbers. */
export function GradText({ children }: { children: ReactNode }) {
  return <span className={styles.grad}>{children}</span>;
}
