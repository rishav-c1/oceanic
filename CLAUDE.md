# CLAUDE.md: Oceanic Project Consultants Website

Persistent project memory. Read every turn. If a request conflicts with anything here, stop and flag it rather than improvising.

## What this is

Marketing/content website for **Oceanic Project Consultants**, a healthcare-project consultancy in Kolkata, India (founder & sole consultant: **Rajesh Chatterjee**; office: 65, Garfa Main Road, Kolkata – 700078). They provide end-to-end consultancy for healthcare setups, hospitals, diagnostic centres, fertility clinics, from conceptual planning through inauguration and operations.

This is a **UI/UX overhaul**, not a faithful re-skin. Two distinct sources, do not conflate them:

- **Content & structure source of truth** = the Weebly extracts in `/reference/content/` (Markdown of all seven pages). Carry copy, project data, and contacts from here verbatim. The Weebly *visual design is discarded*, do not reproduce its layout, look, markup, classes, or scripts.
- **Design source of truth** = `/reference/design/`, the approved homepage and projects redesign mockups (`oceanic-homepage-redesign-mockup.html`, `oceanic-projects-redesign-mockup.html`) plus the design system below. The build matches this design language across all pages; extend it faithfully to pages the mockups don't show (About, Services, Gallery, Certificates, Contact) rather than inventing a second style.

The original is a Weebly site (`cdn2.editmysite.com` assets); the rebuild target is **Next.js, static (SSG)**, redesigned.

Current production domain: **oceanicprojectconsultants.com** (currently served over HTTP, the rebuild MUST be HTTPS).

## Stack (do not substitute without sign-off)

- Next.js (latest stable), **App Router**, React Server Components by default.
- TypeScript, `strict: true`. No `any`, no non-null `!` to silence the compiler.
- Styling: **CSS Modules** + a global `tokens.css`. No Tailwind, no CSS-in-JS runtime.
- Implement the design system below, matched to the mockup. Do not substitute fonts, palette, or the aesthetic without sign-off.
- Images: `next/image` only. No `<img>`. Every image needs meaningful `alt`.
- Content lives in a **typed content layer**: `src/content/*.ts`. **No CMS, no DB** unless a task explicitly adds one.
- Package manager: pnpm. Node 20 LTS.

## The central data model (most important section)

The Projects, Project Gallery, and Project Certificates pages are **three views of one dataset**. Model it once, render three ways. Do NOT hand-author three independent pages.

`src/content/projects.ts`, a typed array of project records:

```ts
type ProjectCategory = "hospital" | "diagnostic" | "fertility";
interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  unitType: string;        // "100 Bedded Multi-speciality Hospital"
  config?: string;         // "B+G+9, 67000 sqft."
  location: string;
  implementation: string;  // "June 2008" | "Ongoing"
  scope: string[];         // bullet points from Job Specification
  contactPerson?: string;  // carry verbatim; may be omitted for privacy, see TODO
  galleryImage?: string;   // /public path after asset migration
  certificatePdf?: string; // /public path after asset migration
}
```

- **Projects page**: a **filterable card portfolio** (not tables) grouped by the three categories, see the projects mockup in `/reference/design/`. Specs adapt per category so there are no empty fields.
- **Gallery page**: image grid filtered to records with `galleryImage`.
- **Certificates page**: records with `certificatePdf`, linked for view/download.

Carry every row verbatim from the reference. Records present in the source: ~8 hospitals, ~6 diagnostic centres, ~4 fertility clinics (reconcile exact counts from `/reference/` during Phase 0). Some are "Ongoing" with no date and no contact, preserve as-is.

## Asset migration (real work, Weebly didn't give us local files)

All binary assets currently live on Weebly `/uploads/1/3/2/8/132812941/...` paths. They must be **downloaded into `/public/`** and referenced locally, never hot-linked to the old host (it will disappear).

- ~12 project JPGs (collages per project).
- 5 certificate PDFs (Columbia Asia, RSV, Atlas, Unipon, Sparsh).
- In Phase 0, produce an **asset manifest**: every remote URL → intended local path → whether it downloaded successfully. Flag any 404/missing as `TODO(asset)`. Do not invent or substitute images.

## Design system (binding, matches `/reference/design/` mockup)

**Aesthetic:** precise, modern healthcare-infrastructure brand. Blueprint-grade grid and spec-as-credential treatment (beds, sqft, floor configs rendered in mono), now carried by the **brand cyan `#0097b2` and gradients derived from it** rather than flat colour. Confident and clean; gradients used with intention (hero glow, dark "selected work" band, CTAs, emphasis spans), not smeared across every surface. Avoid generic SaaS/AI aesthetic (purple gradients, frosted card soup) and avoid soft rounded "healthcare teal" cuteness, keep the precision. **Brand voice: foreground the word "healthcare" prominently** in the wordmark lockup and in hero/section headlines (e.g. the homepage H1 emphasises "healthcare facility"; the Projects H1 leads with "Healthcare facilities") so the sector is unmistakable above the fold.

**Tokens** (CSS custom properties in `tokens.css`):
```
--bg:#f5f8f9; --bg-2:#eaf1f3; --white:#ffffff;            /* cool near-white grounds */
--ink:#101a1d; --ink-soft:#37474c; --ink-mute:#65767b;    /* text */
--brand:#0097b2;        /* BRAND, primary */
--brand-700:#0b6e84; --brand-900:#063a46;                 /* deeper, for dark grounds */
--brand-400:#36b5cc; --brand-200:#9fe0ea;                 /* lighter, on dark */
--grad-brand:linear-gradient(135deg,#00b9d4 0%,#0097b2 46%,#0b6e84 100%);  /* primary brand gradient */
--grad-dark:linear-gradient(155deg,#063a46 0%,#0a5566 55%,#0097b2 165%);   /* dark sections */
--grad-soft:linear-gradient(135deg,#e3f5f8 0%,#f5f8f9 70%);                 /* subtle tint / hovers */
--line:rgba(16,26,29,.13); --line-soft:rgba(16,26,29,.07);
```
`#0097b2` and its gradients are the entire accent system, no second accent hue (no amber). Gradient usage: `--grad-brand` for primary CTAs, the leading rule on eyebrow labels, and emphasis text (`background-clip:text`); `--grad-dark` for the projects band and end-CTA; a soft radial cyan glow in the hero. Keep large body text in ink, not gradient, for legibility/contrast.

**Type** (all sans-serif, `next/font/google`, `display:swap`):
- Display / headings, **Schibsted Grotesk** (500–800). Clean editorial grotesque; not Inter/Roboto/Space Grotesk.
- Body / UI, **Hanken Grotesk** (400–700).
- Mono / labels / spec data, **Spline Sans Mono**: eyebrow labels (uppercase, tracked), all numeric credentials (beds, sqft, configs, phone), section numbering. (Mono is a sans-family technical device, not a serif, it carries the spec-as-data concept.)

**Signature elements (from the mockup):** mono eyebrow labels with a short gradient leading rule; faint blueprint grid + radial cyan glow in the hero, masked to fade; gradient emphasis word in the H1 and gradient hero stat numbers; capability cards with a gradient top-border that wipes in on hover; full-bleed `--grad-dark` "selected work" band with translucent-bordered project cards whose specs sit in a mono footer row; centered display pull-quote with a gradient emphasis span; bordered founder split with a cyan inset frame; gradient-dark end-CTA. Thin 1px `--line` rules as the primary structural device, borders over shadows (shadows only as a soft cyan glow under gradient CTAs).

**Motion:** one orchestrated page-load with staggered reveals (hero), gradient-border wipe + lift on cards, underline-grow nav. Respect `prefers-reduced-motion`. No parallax, no scroll-jacking.

**Responsive:** the `/projects` page is a **filterable card portfolio, not tables** (see `/reference/design/oceanic-projects-redesign-mockup.html`), a sticky category filter (All / Hospitals / Diagnostic Centres / Fertility & IVF) over a 3→2→1-col card grid grouped by category. Each card carries category, name, location, scope, an **adaptive spec row** (hospitals: beds / sq ft / config as mono chips; diagnostics & clinics: a single type chip, so there are no empty cells, which is why tables were dropped), implementation date, and the client name (de-emphasised; confirm public-use with client). Hero stat row 4→2 cols; nav collapses to a sheet. Match the mockups' breakpoints (~900/860/600px). Filtering is the only client-side interactivity here; keep it a small progressive-enhancement leaf, all cards render server-side and remain visible with JS off.



- `/`, Home (intro + about teaser)
- `/about`, About (company blurb, founder, RSV testimonial)
- `/services`, Services (the long "Detailed Scope of Work", many grouped bullet sections)
- `/projects`, Projects (filterable card portfolio from the data model)
- `/projects/certificates`, Project Certificates (PDF links + images)
- `/gallery`, Project Gallery (image grid)
- `/contact`, Contact (phone, email, address, LinkedIn, map)

Preserve crawl equivalence to the old URLs: add **301 redirects** from the old Weebly slugs (e.g. `/about-oceanic-project-consultants.html`) to the new clean routes, via `next.config` redirects. List them all in PLAN.md.

## Content carried verbatim (do NOT fabricate)

- Company blurb, services bullets, project rows, the **R.S. Vasisht testimonial** (About page), all verbatim.
- **Contact details**: phones `+91 98307 70755`, `+91 99039 99648`; address as above; LinkedIn `linkedin.com/in/rajesh-chatterjee-3010b25b`. The site's emails are **Cloudflare-obfuscated** (`/cdn-cgi/l/email-protection#...`) and one footer `mailto` is malformed (`rajeshchatterjee1@gmail`, missing `.com`). Do NOT guess the addresses, log `TODO(content): confirm email addresses` and leave a placeholder until the client confirms.
- Never invent stats, dates, bed counts, or client names. If a field is missing in the source, omit it; don't fill it.

## SEO requirements (acceptance criteria)

- `generateMetadata` per route: unique title, description (the old site's descriptions are a usable starting draft, refine, don't keyword-stuff), absolute canonical (https), `openGraph`, `twitter` (`summary_large_image`). **Drop** the legacy `meta-keywords` tag entirely.
- Replace the blank Weebly OG placeholder with a real OG image (1200×630) via `opengraph-image`; per-page project images where apt.
- JSON-LD in root layout: `Organization` + `MedicalBusiness`/`ProfessionalService` with `address` (PostalAddress, Kolkata), `telephone`, `founder` (Person: Rajesh Chatterjee). `Review` for the Vasisht testimonial on About. `BreadcrumbList` on inner pages. `ItemList` for the projects listing is optional-nice.
- `app/sitemap.ts` + `app/robots.ts` (allow all, link sitemap).
- One `<h1>` per page; logical heading nesting. Semantic landmarks (`header`/`main`/`footer`/`nav aria-label`), skip-to-content link.
- LocalBusiness signals matter here (single physical office, regional firm), get the structured address/phone right.

## Performance / a11y bar

- Lighthouse (mobile) ≥ 95 on Performance, SEO, Best Practices, Accessibility for every route.
- Zero `axe-core` violations. Tables must be real `<table>` with `<th scope>`; the projects tables need a sensible responsive treatment (cards on narrow screens) without losing semantics.
- Optimise the migrated JPGs (they're Weebly originals, likely oversized): use `next/image`, serve modern formats, set sizes. Reserve space → CLS ~0. Respect `prefers-reduced-motion`.

## Never do

- Never hot-link the old Weebly `/uploads` URLs in the final build, migrate to `/public`.
- Never copy Weebly markup/classes/scripts, and never reproduce the Weebly *visual design*, this is a redesign against the mockup.
- Never drift from the design system (fonts, palette, the architectural-precision aesthetic) or default to generic SaaS/AI styling.
- Never fabricate copy, project rows, dates, contacts, or emails. Missing → `TODO`.
- Never keep the legacy keyword-stuffed meta, the blank OG placeholder, or HTTP.
- Never add a dependency, CMS, DB, or analytics without it being in the approved PLAN.md.
- Never use `<img>`, raw Google-Fonts `<link>`, `any`, or client components where a server component works.
- Never mark a phase complete with failing gates.

## Commands

```
pnpm dev · pnpm build · pnpm typecheck · pnpm lint · pnpm test · pnpm test:e2e · pnpm lhci
```
`pnpm build`, `typecheck`, `lint` MUST pass clean before any phase is "done".

## Definition of done (per page)

build clean · typecheck clean · lint clean · content carried verbatim (nothing fabricated) · matches the design system / mockup language · metadata + JSON-LD present and valid · old URL redirects in place · Lighthouse ≥95 · axe clean · Playwright smoke passing · TODOs logged in PLAN.md.
