import { CONTACT } from "@/content/site";
import styles from "./ContactList.module.css";

/**
 * Verbatim contact details. Phones are click-to-call; email is intentionally
 * absent (TODO(content): no confirmed address — see PLAN.md §13.1), so phone +
 * LinkedIn are the channels.
 */
export function ContactList() {
  return (
    <dl className={styles.list}>
      <div className={styles.row}>
        <dt className={styles.k}>Call</dt>
        <dd className={styles.v}>
          {CONTACT.phones.map((p, i) => (
            <a key={p} className={styles.phone} href={`tel:${CONTACT.phonesTel[i]}`}>
              {p}
            </a>
          ))}
        </dd>
      </div>
      <div className={styles.row}>
        <dt className={styles.k}>Office</dt>
        <dd className={styles.v}>{CONTACT.addressLine}</dd>
      </div>
      <div className={styles.row}>
        <dt className={styles.k}>LinkedIn</dt>
        <dd className={styles.v}>
          <a
            className={styles.link}
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            Rajesh Chatterjee →
          </a>
        </dd>
      </div>
    </dl>
  );
}
