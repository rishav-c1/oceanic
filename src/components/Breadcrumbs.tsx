import Link from "next/link";
import { breadcrumbSchema } from "@/lib/jsonld";
import { Container } from "./Container";
import { JsonLd } from "./JsonLd";
import styles from "./Breadcrumbs.module.css";

/** Visible breadcrumb trail + BreadcrumbList JSON-LD. Home is prepended automatically. */
export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  const full = [{ name: "Home", path: "/" }, ...trail];
  return (
    <nav aria-label="Breadcrumb" className={styles.bc}>
      <Container>
        <ol className={styles.list}>
          {full.map((c, i) => {
            const last = i === full.length - 1;
            return (
              <li key={c.path} className={styles.item}>
                {last ? (
                  <span aria-current="page">{c.name}</span>
                ) : (
                  <Link href={c.path}>{c.name}</Link>
                )}
                {last ? null : (
                  <span className={styles.sep} aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
      <JsonLd data={breadcrumbSchema(full)} />
    </nav>
  );
}
