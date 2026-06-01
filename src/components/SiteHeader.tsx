import { Brand } from "./Brand";
import { Button } from "./Button";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { Nav } from "./Nav";
import styles from "./SiteHeader.module.css";

/** Sticky, blurred site header: brand + primary nav + "Get in touch" CTA + mobile sheet. */
export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Container className={styles.bar}>
        <Brand />
        <Nav />
        <div className={styles.right}>
          <Button href="/contact" variant="grad" className={styles.cta}>
            Get in touch →
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
