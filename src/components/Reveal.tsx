import type { CSSProperties, ElementType, ReactNode } from "react";
import styles from "./Reveal.module.css";

/**
 * Staggered page-load reveal. CSS-only (stays a Server Component) and collapses
 * to instant under prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag
      className={[styles.rv, className].filter(Boolean).join(" ")}
      style={{ animationDelay: `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
