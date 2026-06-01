/**
 * Oceanic Project Consultants — central project dataset.
 *
 * This is the SINGLE source for three views (CLAUDE.md "model once, render three ways"):
 *   - /projects             → filterable card portfolio (all 18 records)
 *   - /gallery              → records with `galleryImage`
 *   - /projects/certificates→ records with `certificatePdf`
 *
 * Content is carried VERBATIM from reference/content/oceanic-content-reference.md
 * (the source of truth). Nothing here is invented; missing source fields are left
 * undefined and flagged with TODO(content), never filled.
 *
 * Deviations from the base interface sketched in CLAUDE.md (all documented in PLAN.md):
 *   + `kicker`           — the mono category line shown on each card (from projects mockup)
 *   + `locality`         — the short curated location line on cards (from projects mockup);
 *                          `location` keeps the full verbatim postal address.
 *   + `specs: SpecChip[]`— the adaptive spec row (hospitals: 3 chips; others: 1 "lone" chip).
 *                          Values trace to verbatim unitType/config; abbreviations ("67k")
 *                          are the approved mockup's presentation, not new facts.
 *   + `ongoing`          — true for the two "Ongoing" records (no date).
 *   + `certificateImage` — the certificates-page thumbnail (distinct from `galleryImage`).
 */

export type ProjectCategory = "hospital" | "diagnostic" | "fertility";

export interface SpecChip {
  /** Mono credential, e.g. "100", "67k", "B+G+9", "CT". */
  value: string;
  /** Short uppercase label, e.g. "Beds", "Sq ft", "Config", "Multi-slice CT scan". */
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  /** Mono kicker line on the card, e.g. "Multi-speciality · Salt Lake". */
  kicker: string;
  /** Verbatim unit description, e.g. "100 Bedded Multi-speciality". */
  unitType: string;
  /** Verbatim floor/area config, e.g. "B+G+9, 67000 sq ft". Omitted where source has none. */
  config?: string;
  /** Full verbatim postal address (incl. JV / unit-of parentheticals). */
  location: string;
  /** Short curated card location line, e.g. "Salt Lake, Kolkata · JV with Columbia Asia Hospitals". */
  locality: string;
  /** Verbatim implementation date: "June 2008" … or "Ongoing". */
  implementation: string;
  /** True when implementation is "Ongoing" (no date in source). */
  ongoing?: boolean;
  /** Verbatim scope clauses (split on the source's "; "). Empty when source says n/a. */
  scope: string[];
  /** Verbatim contact(s) incl. role(s). Omitted where source says n/a. */
  contactPerson?: string;
  /** Adaptive spec row. One element → rendered as a single "lone" chip. */
  specs: SpecChip[];
  /** /public path — present on the 12 records that have a gallery collage. */
  galleryImage?: string;
  /** /public path — certificates-page thumbnail (5 records). */
  certificateImage?: string;
  /** /public path — completion/recommendation certificate (5 records). */
  certificatePdf?: string;
}

export const projects: Project[] = [
  // ─── Hospitals (8) ──────────────────────────────────────────────────────
  {
    slug: "columbia-asia-hospital",
    name: "Columbia Asia Hospital",
    category: "hospital",
    kicker: "Multi-speciality · Salt Lake",
    unitType: "100 Bedded Multi-speciality",
    config: "B+G+9, 67000 sq ft",
    location:
      "IB-193, Sec-III, Salt Lake, Kolkata-700091 (JV of Navketan Nursing Home Pvt. Ltd. & Columbia Asia Hospitals Pvt. Ltd.)",
    locality: "Salt Lake, Kolkata · JV with Columbia Asia Hospitals",
    implementation: "June 2008",
    // Scope clauses preserve the source's exact casing (the second clause is a
    // lowercase continuation in the reference); cards render them as one "; "-joined line.
    scope: [
      "Complete project planning and execution",
      "handover to Columbia Asia Hospitals Pvt. Ltd. before inauguration",
    ],
    contactPerson: "Ms. Monalisha Menani [Director]",
    specs: [
      { value: "100", label: "Beds" },
      { value: "67k", label: "Sq ft" },
      { value: "B+G+9", label: "Config" },
    ],
    galleryImage: "/projects/ca-collage_orig.jpg",
    certificateImage: "/certificates/casia-project_orig.jpg",
    certificatePdf: "/certificates/columbiaasiacertificate.pdf",
  },
  {
    slug: "rsv-hospital",
    name: "RSV Hospital",
    category: "hospital",
    kicker: "Multi-speciality · Tollygunge",
    unitType: "100 Bedded Multi-speciality",
    config: "B+G+6, 30000 sq ft; B+G+5, 10000 sq ft",
    location: "40 & 36 Deshapran Sashmal Road, Kolkata-700033",
    locality: "Tollygunge, Kolkata · Phase I & II · NABH certified",
    implementation: "July 2007",
    scope: [
      "Complete project planning and execution",
      "Administrative Head (CEO) since 2007",
    ],
    contactPerson: "Mr. R.S. Vasisht [Chairman]; Mr. Rahul Vasisht [Vice-Chairman]",
    specs: [
      { value: "100", label: "Beds" },
      { value: "40k", label: "Sq ft" },
      { value: "B+G+6", label: "Config" },
    ],
    galleryImage: "/projects/rsv-projectfinalfinal_orig.jpg",
    certificateImage: "/certificates/rsv-s_orig.jpg",
    certificatePdf: "/certificates/rsvcertificate.pdf",
  },
  {
    slug: "jeevan-jyoti-hospital",
    // NOTE: Called "JJ Hospital and Research Centre" in the About blurb; reconciled here
    // to the Projects/Gallery name. Flag to client (TODO(content): confirm canonical name).
    name: "Jeevan Jyoti Hospital & Research Centre Pvt. Ltd.",
    category: "hospital",
    kicker: "Multi-speciality · Silchar",
    unitType: "300 Bedded Multi-speciality",
    config: "B+G+8, 160000 sq ft",
    location: "Meherpur, Silchar, Cachar, Assam-788015",
    locality: "Silchar, Cachar, Assam",
    implementation: "July 2018",
    scope: [
      "Conceptual project planning, layouts, and part-execution [up to superstructure and brickwork]",
    ],
    contactPerson: "Mr. Prem Kiran Nath [CEO]",
    specs: [
      { value: "300", label: "Beds" },
      { value: "160k", label: "Sq ft" },
      { value: "B+G+8", label: "Config" },
    ],
    galleryImage: "/projects/jj-project-1_orig.jpg",
  },
  {
    slug: "medella-cancer-cure-centre",
    name: "Medella Cancer Cure Centre",
    category: "hospital",
    kicker: "Oncology · Agarpara",
    unitType: "45 Bedded Oncology Hospital",
    config: "G+1, 17000 sq ft",
    location:
      "87F Barrackpore Trunk Road, Kamathati, Agarpara, Kolkata-700058 (A Unit of Vanshil Jindal Medicure LLP)",
    locality: "Agarpara, Kolkata · Vanshil Jindal Medicure LLP",
    implementation: "August 2019",
    scope: ["Complete project planning and execution"],
    contactPerson: "Dr Rajesh Jindel; Mr. Sushil Agarwal [Owner]",
    specs: [
      { value: "45", label: "Beds" },
      { value: "17k", label: "Sq ft" },
      { value: "G+1", label: "Config" },
    ],
    galleryImage: "/projects/projectmedella_orig.jpg",
  },
  {
    slug: "unipon-hospital",
    name: "Unipon Hospital & Medical Sciences Pvt. Ltd.",
    category: "hospital",
    kicker: "Multi-speciality · Metiaburz",
    unitType: "50 Bedded Multi-speciality",
    config: "G+5, 16000 sq ft",
    location: "Unit Metiaburz, V/122/A/2 S.A. Farooquie Road, Kolkata-700018",
    locality: "Metiaburz, Kolkata",
    implementation: "August 2011",
    scope: ["Complete project planning and execution"],
    contactPerson: "Mr. M.A. Laskar [Chairman]",
    specs: [
      { value: "50", label: "Beds" },
      { value: "16k", label: "Sq ft" },
      { value: "G+5", label: "Config" },
    ],
    galleryImage: "/projects/unipon-collage_orig.jpg",
    certificateImage: "/certificates/unipon_orig.jpg",
    certificatePdf: "/certificates/uniponcertificate.pdf",
  },
  {
    slug: "rotary-club-purulia-hospital",
    name: "Hospital of Rotary Club of Purulia",
    category: "hospital",
    kicker: "Multi-speciality · Purulia",
    unitType: "50 Bedded Multi-speciality",
    config: "G+2, 20000 sq ft",
    location: "Purulia, WB-723101",
    locality: "Purulia, West Bengal",
    implementation: "May 2018",
    scope: ["Complete project planning and execution"],
    contactPerson: "Mr. Rajkumar Sil; Mr. Jayanta Mahato [Project Incharge]",
    specs: [
      { value: "50", label: "Beds" },
      { value: "20k", label: "Sq ft" },
      { value: "G+2", label: "Config" },
    ],
    galleryImage: "/projects/purulia-project-3_orig.jpg",
  },
  {
    slug: "atlas-health-point",
    name: "Atlas Health Point Pvt. Ltd.",
    category: "hospital",
    kicker: "Multi-speciality · Sonarpur",
    unitType: "30 Bedded Multi-speciality",
    config: "G+4, 12500 sq ft",
    location: "282 Purba Baidya Para, Rajpur, Sonarpur, WB-700150",
    locality: "Rajpur Sonarpur, West Bengal",
    implementation: "February 2019",
    scope: ["Complete project planning and execution"],
    contactPerson: "Mr. Mukesh Khettry [Director]; Mr. Rohan Khettry [Director]",
    specs: [
      { value: "30", label: "Beds" },
      { value: "12.5k", label: "Sq ft" },
      { value: "G+4", label: "Config" },
    ],
    galleryImage: "/projects/atlas-project-1_orig.jpg",
    certificateImage: "/certificates/atlas_orig.jpg",
    certificatePdf: "/certificates/atlascertificate.pdf",
  },
  {
    slug: "dr-duttas-clinic",
    name: "Dr. Dutta's Clinic",
    category: "hospital",
    kicker: "Multi-speciality · Chandan Nagar",
    unitType: "50 Bedded Multi-speciality",
    config: "B+G+5, 17000 sq ft",
    location: "Chandan Nagar",
    locality: "Chandan Nagar",
    implementation: "Ongoing",
    ongoing: true,
    // TODO(content): source scope is "n/a" for this Ongoing project — left empty, not filled.
    scope: [],
    contactPerson: "Dr. Santanu Dutta [Director]",
    specs: [
      { value: "50", label: "Beds" },
      { value: "17k", label: "Sq ft" },
      { value: "B+G+5", label: "Config" },
    ],
  },

  // ─── Diagnostic Centres (6) ─────────────────────────────────────────────
  {
    slug: "sparsh-diagnostica",
    name: "Sparsh Diagnostica Pvt. Ltd.",
    category: "diagnostic",
    kicker: "Diagnostic Centre",
    unitType: "Diagnostic Centre [with multi-slice CT Scan]",
    location: "231/1 NSC Bose Road, Bansdroni, Kolkata-700047",
    locality: "Bansdroni, Kolkata",
    implementation: "May 2013",
    scope: [
      "Complete project planning and execution",
      "Director [2013–2019]",
    ],
    contactPerson: "Mr. Aditya Bothra [Managing Director]",
    specs: [{ value: "CT", label: "Multi-slice CT scan" }],
    galleryImage: "/projects/sparsh-project_orig.jpg",
    certificateImage: "/certificates/sparsh-diagnostica_orig.jpg",
    certificatePdf: "/certificates/sparshcertificate.pdf",
  },
  {
    slug: "rsv-diagnostic-golf-green",
    name: "RSV Diagnostic Centre, Golf Green",
    category: "diagnostic",
    kicker: "Diagnostic Centre · RSV",
    unitType: "Diagnostic Centre",
    location:
      "7/1 Bijoygarh, Regent Park, Kolkata-700032 (unit of RSV Hospital Pvt. Ltd.)",
    locality: "Regent Park, Kolkata · unit of RSV Hospital",
    implementation: "January 2017",
    scope: ["Complete project planning and execution"],
    contactPerson: "Mr. R.S. Vasisht [Chairman]; Mr. Rahul Vasisht [Vice-Chairman]",
    specs: [{ value: "Dx", label: "Diagnostics" }],
    galleryImage: "/projects/gg-project_orig.jpg",
  },
  {
    slug: "rsv-diagnostic-fern-road",
    name: "RSV Diagnostic Centre, Fern Road",
    category: "diagnostic",
    kicker: "Diagnostic Centre · RSV",
    unitType: "Diagnostic Centre",
    location: "19 Fern Road, Ballygunge, Kolkata-700019 (unit of RSV Hospital Pvt. Ltd.)",
    locality: "Ballygunge, Kolkata · unit of RSV Hospital",
    implementation: "May 2017",
    scope: ["Complete project planning and execution"],
    contactPerson: "Mr. R.S. Vasisht [Chairman]; Mr. Rahul Vasisht [Vice-Chairman]",
    specs: [{ value: "Dx", label: "Diagnostics" }],
    galleryImage: "/projects/fern-project-1_orig.jpg",
  },
  {
    slug: "mercury-diagnostics",
    name: "Mercury Diagnostics Centre",
    category: "diagnostic",
    kicker: "Diagnostic Centre",
    unitType: "Diagnostic Centre",
    location: "187-B Ho Chi Minh Sarani, Behala, Kolkata-700061",
    locality: "Behala, Kolkata",
    implementation: "November 2019",
    scope: ["Complete project planning and execution"],
    contactPerson: "Mr. Jaideep Khaitan [Founder/Mentor]",
    specs: [{ value: "Dx", label: "Diagnostics" }],
    galleryImage: "/projects/mercury-project_orig.jpg",
  },
  {
    slug: "jmg-speciality-diagnostics",
    name: "JMG Speciality Diagnostics",
    category: "diagnostic",
    kicker: "Diagnostic Centre · Odisha",
    unitType: "Diagnostic Centre",
    location: "Manglabad, Cuttack, Odisha-753007",
    locality: "Manglabad, Cuttack, Odisha",
    implementation: "July 2015",
    scope: ["Complete project planning and execution"],
    contactPerson: "Mr. Pradip Agarwal",
    specs: [{ value: "Dx", label: "Diagnostics" }],
  },
  {
    slug: "chikitsha-medicare",
    name: "Chikitsha Medicare Centre Pvt. Ltd.",
    category: "diagnostic",
    kicker: "Diagnostic Centre",
    unitType: "Diagnostic Centre",
    location: "6 Ajanta Road, Behala, Kolkata-700040",
    locality: "Behala, Kolkata",
    implementation: "July 2005",
    scope: ["Complete project planning and execution"],
    contactPerson: "Mr. Jaideep Khaitan [Director]",
    specs: [{ value: "Dx", label: "Diagnostics" }],
  },

  // ─── Fertility & IVF Clinics (4) ────────────────────────────────────────
  {
    slug: "kolkata-global-ivf",
    name: "Kolkata Global IVF Clinic",
    category: "fertility",
    kicker: "Fertility & IVF",
    unitType: "Fertility & IVF Clinic",
    location: "129 Arya Vidyalaya Road, Kolkata-700078",
    locality: "Arya Vidyalaya Road, Kolkata",
    implementation: "September 2016",
    scope: ["Complete project planning and execution"],
    contactPerson: "Dr. Madhab C. Das [Founder Director]",
    specs: [{ value: "IVF", label: "Fertility clinic" }],
  },
  {
    slug: "east-end-fertility",
    // [sic] Projects page spells this "East End Fertity Clinic"; Gallery spells it
    // "East End Fertility Clinic". Using "Fertility". TODO(content): confirm with client.
    name: "East End Fertility Clinic",
    category: "fertility",
    kicker: "Fertility & IVF",
    unitType: "Fertility & IVF Clinic",
    location: "841 Tagore Park Road, Kasba, Kolkata-700033",
    locality: "Kasba, Kolkata",
    implementation: "October 2018",
    scope: ["Complete project planning and execution"],
    contactPerson: "Dr. G.B. Dutta [Founder Director]",
    specs: [{ value: "IVF", label: "Fertility clinic" }],
    galleryImage: "/projects/eastend-project_orig.jpg",
  },
  {
    slug: "fetomat-foundation",
    name: "Fetomat Foundation Pregnancy Care Centre",
    category: "fertility",
    kicker: "Speciality Diagnostic Clinic",
    unitType: "Speciality Diagnostic Clinic",
    location: "28A Sarat Banerjee Road, Kalighat, Kolkata-700018",
    locality: "Kalighat, Kolkata · Pregnancy Care Centre",
    implementation: "April 2015",
    scope: ["Complete project planning and execution"],
    contactPerson: "Dr. Pradip Goswami [Director]",
    specs: [{ value: "Dx", label: "Speciality clinic" }],
  },
  {
    slug: "body-n-mind-clinic",
    name: "Body N Mind Clinic",
    category: "fertility",
    kicker: "Gynae · Fertility & IVF",
    unitType: "Gynaecology/Obstetric, Fertility & IVF Clinic",
    location: "Salt Lake, Kolkata",
    locality: "Salt Lake, Kolkata",
    implementation: "Ongoing",
    ongoing: true,
    // TODO(content): source scope is "n/a" and contact is "n/a" for this Ongoing project.
    scope: [],
    specs: [{ value: "IVF", label: "Gynae & fertility" }],
  },
];

// ─── Category metadata (drives the sticky filter + grouped sections) ───────
export const CATEGORY_META: Record<
  ProjectCategory,
  { label: string; plural: string }
> = {
  hospital: { label: "Hospital", plural: "Hospitals" },
  diagnostic: { label: "Diagnostic Centre", plural: "Diagnostic Centres" },
  fertility: { label: "Fertility & IVF", plural: "Fertility & IVF Clinics" },
};

/** Display order for grouped sections + filter chips. */
export const CATEGORY_ORDER: ProjectCategory[] = [
  "hospital",
  "diagnostic",
  "fertility",
];

// ─── Selectors: render three views from the one dataset ────────────────────
export const projectsByCategory = (category: ProjectCategory): Project[] =>
  projects.filter((p) => p.category === category);

export const countByCategory = (category: ProjectCategory): number =>
  projectsByCategory(category).length;

/** Records that appear in the Gallery view. */
export const galleryProjects: Project[] = projects.filter((p) => p.galleryImage);

/** Records that appear in the Certificates view. */
export const certificateProjects: Project[] = projects.filter(
  (p) => p.certificatePdf,
);

/** Short year for the card date chip; "Ongoing" passes through. */
export const projectYear = (p: Project): string =>
  p.ongoing ? "Ongoing" : (p.implementation.match(/\d{4}/)?.[0] ?? p.implementation);

export const TOTAL_PROJECTS = projects.length;
