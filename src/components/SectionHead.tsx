import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import styles from "./SectionHead.module.css";

/** Eyebrow + heading (left) / supporting lead (right), with a bottom rule. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  onDark,
  as: Heading = "h2",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  onDark?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className={[styles.head, onDark && styles.dark].filter(Boolean).join(" ")}>
      <div>
        <Eyebrow tone={onDark ? "dark" : "light"} className={styles.eb}>
          {eyebrow}
        </Eyebrow>
        <Heading className={styles.title}>{title}</Heading>
      </div>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
    </div>
  );
}
