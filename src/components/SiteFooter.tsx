import Link from "next/link";
import { Brand } from "./Brand";
import { Container } from "./Container";
import { CONTACT, NAV, SITE } from "@/content/site";
import styles from "./SiteFooter.module.css";

/** Site footer — also the JS-off navigation fallback (full nav + LinkedIn). */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.brandCol}>
          <Brand />
          <p className={styles.addr}>{CONTACT.addressLine}</p>
          <p className={styles.phones}>{CONTACT.phones.join(" · ")}</p>
        </div>
        <nav aria-label="Footer" className={styles.links}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact">Contact</Link>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </nav>
      </Container>
      <Container className={styles.base}>
        <span>
          © {year} {SITE.name} · Kolkata, West Bengal
        </span>
        <span>{SITE.tagline}</span>
      </Container>
    </footer>
  );
}
