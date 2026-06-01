import Link from "next/link";
import styles from "./Brand.module.css";

/** Wordmark lockup: gradient dot + "Oceanic" + mono "Healthcare Projects" sub. */
export function Brand() {
  return (
    <Link
      href="/"
      className={styles.brand}
      aria-label="Oceanic Project Consultants — home"
    >
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.mark}>Oceanic</span>
      <span className={styles.sub}>Healthcare&nbsp;Projects</span>
    </Link>
  );
}
