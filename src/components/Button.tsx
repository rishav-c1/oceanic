import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Button.module.css";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "grad" | "outline";
  onDark?: boolean;
  className?: string;
  /** Force a plain external anchor (new tab). */
  external?: boolean;
  /** Offer the target as a download (for migrated PDFs). */
  download?: boolean;
};

const isFile = (href: string) => /\.(pdf|jpe?g|png|webp|avif)$/i.test(href);

/** Link/button with grad + outline variants; onDark recolours for dark grounds. */
export function Button({
  children,
  href,
  variant = "outline",
  onDark,
  className,
  external,
  download,
}: Props) {
  const cls = [
    styles.btn,
    variant === "grad" && styles.grad,
    onDark && styles.onDark,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href && (external || download || isFile(href) || !href.startsWith("/"))) {
    return (
      <a
        className={cls}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: true } : {})}
      >
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link className={cls} href={href}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} type="button">
      {children}
    </button>
  );
}
