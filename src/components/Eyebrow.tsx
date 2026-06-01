import type { ReactNode } from "react";
import styles from "./Eyebrow.module.css";

/** Mono uppercase label with a short gradient leading rule. */
export function Eyebrow({
  children,
  tone = "light",
  align = "start",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <span
      className={[
        styles.eyebrow,
        tone === "dark" && styles.dark,
        align === "center" && styles.center,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
