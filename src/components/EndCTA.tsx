import type { ReactNode } from "react";
import { Button } from "./Button";
import { Container } from "./Container";
import { CONTACT } from "@/content/site";
import styles from "./EndCTA.module.css";

export interface CTAAction {
  label: string;
  href: string;
  variant?: "grad" | "outline";
  external?: boolean;
}

/** Full-bleed --grad-dark closing band. "between" = home layout w/ contacts; "center" = inner pages. */
export function EndCTA({
  title,
  contacts = false,
  actions,
  align = "center",
}: {
  title: ReactNode;
  contacts?: boolean;
  actions: CTAAction[];
  align?: "between" | "center";
}) {
  return (
    <section className={styles.endcta}>
      <Container className={align === "between" ? styles.between : styles.center}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.side}>
          {contacts ? (
            <div className={styles.contacts}>
              <div>
                <b>{CONTACT.phones[0]}</b> &nbsp;·&nbsp; <b>{CONTACT.phones[1]}</b>
              </div>
              <div>{CONTACT.addressLine}</div>
            </div>
          ) : null}
          <div className={styles.btns}>
            {actions.map((a) => (
              <Button
                key={`${a.href}-${a.label}`}
                href={a.href}
                variant={a.variant ?? "outline"}
                external={a.external}
                onDark
              >
                {a.label}
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
