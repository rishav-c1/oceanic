import type { ReactNode } from "react";
import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";
import styles from "./FounderSplit.module.css";

/**
 * Bordered founder split with a cyan inset frame on the portrait panel.
 * Portrait is a placeholder until the Rajesh Chatterjee photo is supplied
 * (TODO(asset)); swap the panel for next/image then.
 */
export function FounderSplit({
  eyebrow,
  name,
  children,
  cta,
}: {
  eyebrow: string;
  name: string;
  children: ReactNode;
  cta?: { label: string; href: string };
}) {
  return (
    <div className={styles.founder}>
      <div className={styles.photo}>
        <span>[ Founder portrait ]</span>
      </div>
      <div className={styles.body}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.bio}>{children}</p>
        {cta ? (
          <div className={styles.cta}>
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
