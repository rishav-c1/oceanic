import type { ReactNode } from "react";
import styles from "./CapabilityCard.module.css";

/** Capability cell: mono number, heading, body. Gradient top-border wipes in on hover. */
export function CapabilityCard({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.cap}>
      <div className={styles.num}>{num}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{children}</p>
    </div>
  );
}
