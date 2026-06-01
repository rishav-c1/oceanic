/**
 * Site-wide constants — single source for nav, contact details, org info, and the
 * derived headline stats. Keeps verbatim copy out of components. Nothing here is
 * fabricated; the email is intentionally null (TODO(content), see PLAN.md §13.1).
 */

export interface NavItem {
  label: string;
  href: string;
}

/** Primary nav (Contact is the header CTA, per the mockup). */
export const NAV: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Certificates", href: "/projects/certificates" },
];

export const SITE = {
  name: "Oceanic Project Consultants",
  shortName: "Oceanic",
  tagline: "Consultants in Healthcare Projects",
  url: "https://oceanicprojectconsultants.com",
  description:
    "Full-scale consultancy across the healthcare sector — from conceptual planning of a setup to inaugurating and helping run the centre. Kolkata-based, founder-led.",
} as const;

export const FOUNDER = {
  name: "Rajesh Chatterjee",
  honorific: "Mr. Rajesh Chatterjee",
  role: "Principal Consultant & Founder",
} as const;

export const CONTACT = {
  /** Display form (verbatim). */
  phones: ["+91 98307 70755", "+91 99039 99648"],
  /** tel: form (no spaces). */
  phonesTel: ["+919830770755", "+919903999648"],
  addressLine: "65, Garfa Main Road, Kolkata – 700078",
  address: {
    street: "65, Garfa Main Road",
    locality: "Kolkata",
    postalCode: "700078",
    region: "West Bengal",
    country: "India",
    countryCode: "IN",
  },
  linkedin: "https://www.linkedin.com/in/rajesh-chatterjee-3010b25b/",
  /** TODO(content): three inconsistent forms on the live site — do not guess. */
  email: null as string | null,
} as const;

/**
 * Headline stats shown in hero stat rows. VERIFY before publishing — these are new
 * marketing assertions derived from the project tables (PLAN.md §13.5), not claims
 * the old site made. "Beds planned" is the only honest verb (counts Ongoing +
 * part-executed projects); the sum is exactly 725.
 */
export interface Stat {
  value: string;
  label: string;
}
export const STATS: Stat[] = [
  { value: "20+", label: "Years of practice" },
  { value: "18", label: "Projects" },
  { value: "725", label: "Beds planned" },
  { value: "3", label: "States · WB · Assam · Odisha" },
];
