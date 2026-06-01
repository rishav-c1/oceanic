import type { ReactNode } from "react";
import { reviewSchema } from "@/lib/jsonld";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { JsonLd } from "./JsonLd";
import styles from "./Quote.module.css";

/**
 * Centered display pull-quote. Pass `schemaBody` (the verbatim plain-text quote)
 * to also emit Review JSON-LD — used on /about with the full testimonial.
 */
export function Quote({
  eyebrow = "In their words",
  children,
  author,
  role,
  schemaBody,
  full = false,
}: {
  eyebrow?: string;
  children: ReactNode;
  author: string;
  role: string;
  schemaBody?: string;
  /** Readable long-form sizing for the full verbatim testimonial (vs the giant pull-quote). */
  full?: boolean;
}) {
  return (
    <section className={[styles.quote, full && styles.full].filter(Boolean).join(" ")}>
      <Container>
        <div className={styles.ebWrap}>
          <Eyebrow align="center">{eyebrow}</Eyebrow>
        </div>
        <blockquote className={styles.blockquote}>{children}</blockquote>
        <div className={styles.by}>
          <b>{author}</b> · {role}
        </div>
      </Container>
      {schemaBody ? (
        <JsonLd
          data={reviewSchema({
            body: schemaBody,
            authorName: author,
            authorTitle: role,
          })}
        />
      ) : null}
    </section>
  );
}
