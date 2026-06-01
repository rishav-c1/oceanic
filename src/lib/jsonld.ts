/**
 * Typed JSON-LD builders. Emitted via the <JsonLd> component.
 * Oceanic is a consultancy, so the LocalBusiness signal is modelled as
 * ProfessionalService (accurate) rather than MedicalBusiness (which implies a
 * care provider); CLAUDE.md permits either. Healthcare sector is conveyed via
 * serviceType / knowsAbout. Email is omitted everywhere until confirmed.
 */
import { CONTACT, FOUNDER, SITE } from "@/content/site";

type Json = Record<string, unknown>;

const ORG_ID = `${SITE.url}/#organization`;
const FOUNDER_ID = `${SITE.url}/#founder`;

const postalAddress = (): Json => ({
  "@type": "PostalAddress",
  streetAddress: CONTACT.address.street,
  addressLocality: CONTACT.address.locality,
  postalCode: CONTACT.address.postalCode,
  addressRegion: CONTACT.address.region,
  addressCountry: CONTACT.address.countryCode,
});

const founderPerson = (): Json => ({
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: FOUNDER.name,
  jobTitle: FOUNDER.role,
});

/** Site-wide @graph: Organization + ProfessionalService (LocalBusiness) + founder. */
export const siteGraph = (): Json => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      sameAs: [CONTACT.linkedin],
      founder: { "@id": FOUNDER_ID },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE.url}/#service`,
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      parentOrganization: { "@id": ORG_ID },
      telephone: CONTACT.phones,
      address: postalAddress(),
      areaServed: ["Kolkata", "West Bengal", "Eastern India"],
      serviceType: "Healthcare project consultancy",
      knowsAbout: [
        "Hospital planning",
        "Diagnostic centre setup",
        "Fertility clinic setup",
        "Medical equipment planning",
        "Healthcare licensing",
      ],
      founder: { "@id": FOUNDER_ID },
    },
    founderPerson(),
  ],
});

export const breadcrumbSchema = (
  trail: { name: string; path: string }[],
): Json => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: `${SITE.url}${t.path}`,
  })),
});

/** Review for the verbatim R.S. Vasisht testimonial — no rating is invented. */
export const reviewSchema = (args: {
  body: string;
  authorName: string;
  authorTitle: string;
}): Json => ({
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: { "@id": `${SITE.url}/#service` },
  reviewBody: args.body,
  author: {
    "@type": "Person",
    name: args.authorName,
    jobTitle: args.authorTitle,
  },
});

export const itemListSchema = (
  name: string,
  items: { name: string; path: string }[],
): Json => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  numberOfItems: items.length,
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    url: `${SITE.url}${it.path}`,
  })),
});
