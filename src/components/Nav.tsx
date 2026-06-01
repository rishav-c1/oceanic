"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/content/site";
import styles from "./Nav.module.css";

/**
 * Desktop primary nav (hidden ≤860px). Client only to mark the active route via
 * usePathname; the links themselves still render server-side for crawlers.
 */
export function Nav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary" className={styles.nav}>
      <ul className={styles.list}>
        {NAV.map((item) => {
          const current = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={current ? styles.active : undefined}
                aria-current={current ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
