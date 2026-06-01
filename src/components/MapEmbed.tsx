import styles from "./MapEmbed.module.css";

/**
 * Office location panel. A link-out (not a third-party iframe) keeps the page fast
 * and cookie-free for the Lighthouse best-practices gate; an interactive embed can
 * be added later if the perf budget allows.
 */
export function MapEmbed({ query, label }: { query: string; label: string }) {
  const href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  return (
    <a
      className={styles.map}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${label} in Google Maps`}
    >
      <span className={styles.pin} aria-hidden="true">
        ◎
      </span>
      <span className={styles.addr}>{label}</span>
      <span className={styles.cta}>Open in Google Maps →</span>
    </a>
  );
}
