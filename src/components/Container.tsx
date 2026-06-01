import type { ElementType, ReactNode } from "react";
import styles from "./Container.module.css";

/** The one layout primitive: max-width 1240 + 32px gutters, centred. */
export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={[styles.wrap, className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}
