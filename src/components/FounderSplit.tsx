import Image from "next/image";
import type { ReactNode } from "react";
import { withBase } from "@/lib/paths";
import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";
import styles from "./FounderSplit.module.css";

/** Bordered founder split: the Rajesh Chatterjee portrait in a cyan inset frame, beside the bio. */
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
        <Image
          src={withBase("/founder/rajesh-chatterjee.jpg")}
          alt="Rajesh Chatterjee, Chief Consultant & Founder of Oceanic Project Consultants"
          fill
          sizes="(max-width: 760px) 100vw, 40vw"
          className={styles.img}
        />
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
