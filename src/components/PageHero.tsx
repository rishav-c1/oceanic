import type { ReactNode } from "react";
import type { Stat } from "@/content/site";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { StatRow } from "./StatRow";
import styles from "./PageHero.module.css";

/** Lighter inner-page hero (.phead pattern) — radial glow, eyebrow, H1, lead, optional stats. */
export function PageHero({
  eyebrow,
  title,
  lead,
  stats,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  stats?: Stat[];
}) {
  return (
    <section className={styles.phead}>
      <div className={styles.glow} aria-hidden="true" />
      <Container className={styles.wrap}>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal as="h1" delay={0.08} className={styles.h1}>
          {title}
        </Reveal>
        {lead ? (
          <Reveal as="p" delay={0.16} className={styles.lead}>
            {lead}
          </Reveal>
        ) : null}
        {stats ? (
          <Reveal delay={0.24}>
            <StatRow stats={stats} layout="inline" />
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
