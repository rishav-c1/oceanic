import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { ContactList } from "@/components/ContactList";
import { GradText } from "@/components/GradText";
import { MapEmbed } from "@/components/MapEmbed";
import { PageHero } from "@/components/PageHero";
import { pageMeta } from "@/lib/seo";
import styles from "./Contact.module.css";

export const metadata: Metadata = pageMeta({
  title: "Contact Oceanic — Healthcare Consultants, Kolkata",
  description:
    "Have a question? Contact Oceanic Project Consultants in Kolkata. Office at 65, Garfa Main Road, Kolkata 700078 — call us or connect on LinkedIn to start.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Contact", path: "/contact" }]} />
      <PageHero
        eyebrow="Get in touch · Kolkata"
        title={
          <>
            Contact Oceanic <GradText>Project Consultants</GradText>
          </>
        }
        lead="Have a question? Contact us — the quickest way to reach us today is by phone or on LinkedIn."
      />
      <section className={styles.section}>
        <Container>
          <div className={styles.split}>
            <div className={styles.details}>
              <ContactList />
              <p className={styles.note}>
                Email is being finalised — please call or connect on LinkedIn in the
                meantime.
              </p>
            </div>
            <MapEmbed
              query="65, Garfa Main Road, Kolkata 700078, West Bengal, India"
              label="65, Garfa Main Road, Kolkata – 700078"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
