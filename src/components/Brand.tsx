import Link from "next/link";
import styles from "./Brand.module.css";

/** Wordmark lockup: "Oceanic" with a baseline-aligned mono "Healthcare Projects" descriptor. */
export function Brand() {
  return (
    <Link
      href="/"
      className={styles.brand}
      aria-label="Oceanic Project Consultants — home"
    >
      <span className={styles.mark}>Oceanic</span>
      <span className={styles.sub}>Healthcare&nbsp;Projects</span>
    </Link>
  );
}
