# PLAN.md — Oceanic Project Consultants rebuild

**Phase 0 deliverable.** Ingest, asset audit, data model, scaffold — complete and gate-green.
This document is the contract for Phases 1–4. Sources are never conflated:
`reference/content/` = copy/data truth (verbatim); `reference/design/` = the approved visual target.
Open questions needing your sign-off are collected in **§13**.

---

## 1. Setup reconciliation (what I changed before starting)

The kickoff assumed files at specific paths; the repo had them flat with `oceanic-` prefixes. I reorganized to match `CLAUDE.md`'s own contract (non-destructive — originals preserved under `reference/`):

| Now at | Was |
|---|---|
| `CLAUDE.md` | `oceanic-CLAUDE.md` (also kept as `reference/oceanic-CLAUDE.md.orig`) |
| `reference/content/oceanic-content-reference.md` | `oceanic-content-reference.md` (the 7 pages, consolidated — there were never 7 separate files) |
| `reference/design/oceanic-{homepage,projects}-redesign-mockup.html` | repo root |
| `reference/oceanic-claude-code-kickoff-prompt.md` | repo root |

- **No separate design-tokens file existed** — tokens live inline in the mockups' `:root` and in `CLAUDE.md`. Phase 1 extracts them to `src/styles/tokens.css`.
- **Node:** environment is **18.20.8**; `CLAUDE.md` asks for Node 20 LTS. Next 15 builds fine on 18.18+, and the build is green, but **I recommend Node 20 for parity with Vercel** — flagged, not blocking (`engines` set to `>=18.18.0`).

## 2. Architecture decisions (one call each; flag if you disagree)

1. **"Static (SSG)" = statically-prerendered Next app on Vercel, NOT `output: "export"`.** Reason: the 301 redirect requirement and `next/image` optimization both need the server/CDN layer, which a bare static export removes. Every page prerenders at build (no runtime data), so it is effectively static — just deployed as a Next app. If you ever need a pure export to a dumb host, redirects move to host config and images go `unoptimized`/custom-loader. **(Recommended.)**
2. **301, not 308.** `CLAUDE.md` says "301". Next's `permanent: true` emits 308, so I set `statusCode: 301` explicitly. Verified live (see §4).
3. **Data once, rendered three ways.** `src/content/projects.ts` is the single dataset; `/projects`, `/gallery`, `/projects/certificates` are selectors over it. No hand-authored duplicates.
4. **CSS Modules + `tokens.css`, `next/font`, `next/image`** — exactly per `CLAUDE.md`. No Tailwind, no CSS-in-JS.
5. **Data-model interface extended** beyond the `CLAUDE.md` sketch with display-projection fields (`kicker`, `locality`, `specs[]`, `certificateImage`, `ongoing`). Every value traces to verbatim source or the approved mockup; documented at the top of `projects.ts`. **Flag if you want the interface trimmed.**

## 3. Routes

| Route | Page | Source of content |
|---|---|---|
| `/` | Home | Home teaser + condensed capabilities + selected work + testimonial + founder |
| `/about` | About | Company blurb, founder, **R.S. Vasisht testimonial** (Review) |
| `/services` | Services | Full **Detailed Scope of Work** (see §13 — 11-vs-13 group count) |
| `/projects` | Projects | Filterable card portfolio (18 records) |
| `/projects/certificates` | Certificates | 5 records with PDF + thumbnail |
| `/gallery` | Gallery | 12 records with images, **2 groups** (Hospitals / Diagnostics & Fertility) |
| `/contact` | Contact | Phones, address, LinkedIn, map, email TODO |

## 4. Redirect map (301 — verified live)

All six legacy Weebly `.html` slugs → clean routes, `statusCode: 301`, in `next.config.ts`. Tested against a running build: each returns **301** with the correct `Location` (destinations 404 until Phase 2 builds them — expected sequencing).

| Old slug (301) | → New |
|---|---|
| `/about-oceanic-project-consultants.html` | `/about` |
| `/detailed-scope-of-work-oceanic-project-consultants.html` | `/services` |
| `/projects-oceanic-project-consultants.html` | `/projects` |
| `/project-certificates-oceanic-project-consultants.html` | `/projects/certificates` |
| `/project-gallery-oceanic-project-consultants.html` | `/gallery` |
| `/contact-oceanic-project-consultants.html` | `/contact` |

Home: old Weebly home was the bare `/` (no `.html`), which already serves the new home — **no home redirect needed**. Drop the legacy `meta-keywords` and the blank `editmysite` OG placeholder; migrate to HTTPS. Carry the Google site-verification token only if the Search Console property is still used (§13).

## 5. Data model — summary & cross-view reconciliation

`src/content/projects.ts`: **18 records** (verified by an independent adversarial audit + a unit test).

| Category | Count | Slugs |
|---|---|---|
| Hospital | **8** | columbia-asia-hospital, rsv-hospital, jeevan-jyoti-hospital, medella-cancer-cure-centre, unipon-hospital, rotary-club-purulia-hospital, atlas-health-point, dr-duttas-clinic |
| Diagnostic | **6** | sparsh-diagnostica, rsv-diagnostic-golf-green, rsv-diagnostic-fern-road, mercury-diagnostics, jmg-speciality-diagnostics, chikitsha-medicare |
| Fertility | **4** | kolkata-global-ivf, east-end-fertility, fetomat-foundation, body-n-mind-clinic |

**Cross-view presence** (which record appears in which page) — reconciled exactly:

| Appears in | Count | Which |
|---|---|---|
| Projects **+ Gallery + Certificates** | 5 | Columbia Asia, RSV, Atlas, Unipon, **Sparsh** (only non-hospital with a certificate) |
| Projects **+ Gallery** only | 7 | Jeevan Jyoti, Medella, Rotary Purulia, RSV Golf Green, RSV Fern Road, Mercury, East End |
| Projects **only** (no image, no cert) | 6 | Dr. Dutta's, JMG, Chikitsha, Kolkata Global IVF, Fetomat, Body N Mind |

→ Gallery = 12 (5+7), Certificates = 5, total = 18. **Two records are "Ongoing"** (Dr. Dutta's, Body N Mind): no date; Body N Mind also has no contact and no scope — preserved as-is, nothing filled.

**Audit verdict:** diagnostics/fertility `clean`; hospitals `note`-only. The `Jindel`/`Jindal` spelling and the East End `Fertity`[sic] are faithful reproductions, flagged for the client — not errors.

## 6. Design system (codified) + extension to the 5 mockup-less pages

**Tokens** (→ `src/styles/tokens.css` in Phase 1, verbatim from the mockups' `:root`): grounds `--bg #f5f8f9 / --bg-2 / --white`; ink `--ink #101a1d / --ink-soft / --ink-mute`; brand `--brand #0097b2` + `--brand-700/900/400/200`; gradients `--grad-brand`, `--grad-dark`, `--grad-soft`; rules `--line / --line-soft`. **No second accent hue.**

**Type** (`next/font/google`, `display:swap`): **Schibsted Grotesk** (display/headings), **Hanken Grotesk** (body/UI), **Spline Sans Mono** (eyebrows, all numeric credentials, section numbering).

**Signature elements** (reused everywhere): mono eyebrow + gradient leading rule; blueprint grid + radial cyan glow hero (masked fade); `grad-text` emphasis spans (and the brand-voice rule: foreground "healthcare" in headlines); bordered cards with a `scaleX(0→1)` gradient top-border wipe on hover; full-bleed `--grad-dark` bands; thin 1px `--line` scaffolding over shadows; `.rv` staggered load reveal that collapses under `prefers-reduced-motion`.

**Extension to the 5 pages the mockups don't show** (same language, no second style — full spec drafted, summary here):

- **Shared:** inner pages use the lighter `.phead` hero (from the projects mockup), keeping `/`'s tall blueprint hero unique. Each gets a visible breadcrumb (mono) + `BreadcrumbList`.
- **/about:** company blurb (ink prose); **founder split** with cyan inset frame (reused from home); **R.S. Vasisht testimonial in full** as the centered display pull-quote (+ `Review` JSON-LD).
- **/services:** the **full Detailed Scope of Work** (not the home 6-pillar condensation) as a numbered vertical sequence of bordered group-blocks — mono `01…` spine, thin-rule bullet lists, alternating `--grad-soft` tint, grouped under `.grp-title` dividers to avoid monotony.
- **/gallery:** responsive grid (3→2→1) of `next/image` in CLS-safe `aspect-ratio` boxes, **2 groups** (Hospitals / Diagnostics & Fertility) per the source — deliberately *not* the 3-way `/projects` split.
- **/projects/certificates:** 5 bordered cards, cert thumbnail (portrait, CLS-safe) + "View PDF →" (grad) / "Download" (outline) to **local** `/public` PDFs; "client recommendation" credential framing.
- **/contact:** founder-split layout; phones as mono **`tel:` click-to-call**; address; LinkedIn; framed lazy **map**; **email as a visible `TODO(content)` chip — no `mailto`** (see §11).

## 7. Component inventory (RSC by default; 3 client leaves)

Client leaves (`"use client"`) are **bold**; everything else is a Server Component. Client leaves are progressive-enhancement only.

| Component | Kind | Purpose / pages |
|---|---|---|
| RootLayout | RSC | html/font vars/skip-link/landmarks + site-wide Org+MedicalBusiness JSON-LD · all |
| SiteHeader, Brand, Nav | RSC | sticky blurred header, wordmark (foregrounds "Healthcare"), underline-grow nav · all |
| **MobileNav** | **client** | ≤860px slide-in sheet; `aria-expanded`, focus-trap, Esc, scroll-lock; links work JS-off · all |
| SiteFooter, Container/Wrap | RSC | footer + the one layout primitive (max 1240, pad 32) · all |
| Eyebrow, Button, SectionHead, GradText | RSC | mono label+rule; grad/outline buttons; section header; gradient emphasis span · all |
| StatRow | RSC | stat band (grid 4→2 / inline) · home, projects, (about/services) |
| CapabilityCard + CapabilityGrid | RSC | 6-pillar condensed grid · home, services |
| ProjectCard, SpecRow, **SpecChip** | RSC | portfolio card + adaptive spec row (3 chips / 1 lone) · projects |
| DarkProjectCard | RSC | translucent card for the dark Selected-Work band (curated props — see §13) · home |
| **ProjectFilter** | **client** | sticky chip filter; **all cards render server-side, visible JS-off** · projects |
| ProjectGroup | RSC | category section (`grp-title` + grid) · projects |
| GalleryGrid + GalleryItem | RSC | grouped `next/image` grid · gallery |
| CertificateCard | RSC | thumbnail + view/download local PDF · certificates |
| Quote, FounderSplit, EndCTA | RSC | testimonial; founder split; `--grad-dark` closing band · home/about/all |
| **Reveal** | RSC | `.rv` staggered reveal, CSS-only, honours reduced-motion (stays RSC) · all |
| PageHero, Breadcrumbs | RSC | `.phead` inner-page hero; visible crumb + `BreadcrumbList` · inner pages |
| ServiceGroup | RSC | one of the scope-of-work groups · services |
| ContactList, MapEmbed | RSC | mono contact rows (`tel:`), lazy a11y map · contact |
| JsonLd | RSC | typed `<script type="application/ld+json">` helper · all |

**Supporting (non-visual):** `src/content/site.ts` (nav, contacts, org constants, headline stats flagged VERIFY); `src/lib/jsonld.ts` (typed schema builders); `app/opengraph-image.tsx` (1200×630, replaces blank Weebly placeholder).

## 8. Per-page section map (drives Phase 2)

- **/** (mirrors homepage mockup exactly): hero (eyebrow → H1 w/ grad "healthcare facility" → lead → CTAs, staggered) → stat band (20+/18/725+/3) → capabilities (6) → **dark Selected-Work band** (3 cards + "View all 18") → testimonial → founder split → End-CTA.
- **/projects** (mirrors projects mockup exactly): `.phead` hero + inline stats → sticky filter (All 18 / 8 / 6 / 4) → 3 grouped card grids (hospital/diagnostic/fertility) → demoted concept note → End-CTA.
- **/about:** hero+crumb → 3-para verbatim blurb (+ optional mini stat band) → founder split → **full Vasisht testimonial (+Review)** → End-CTA.
- **/services:** hero+crumb → optional 6-pillar overview → **all scope-of-work groups** (verbatim) → End-CTA.
- **/projects/certificates:** hero+crumb → 5 certificate cards → cross-links → End-CTA.
- **/gallery:** hero+crumb → 2-group image grid (12) → cross-links → End-CTA.
- **/contact:** hero+crumb → contact list (`tel:`, address, LinkedIn, email TODO) → map → End-CTA.

## 9. Asset manifest (migration complete — 22/22, no 404s, no dupes)

All downloaded from `…/uploads/1/3/2/8/132812941/` into `/public` via `scripts/fetch-assets.sh` (re-runnable: `pnpm fetch:assets`). Verified MIME types + unique checksums.

**`/public/projects/` — 12 gallery collages (image/jpeg):** ca-collage, rsv-projectfinalfinal, atlas-project-1, unipon-collage, jj-project-1, projectmedella, purulia-project-3, gg-project, fern-project-1, sparsh-project, mercury-project, eastend-project (`*_orig.jpg`).

**`/public/certificates/` — 5 PDFs + 5 thumbnails:** columbiaasia / rsv / atlas / unipon / sparsh `certificate.pdf`; casia-project, rsv-s, atlas, unipon, sparsh-diagnostica (`*_orig.jpg`).

**Outstanding non-Weebly assets** (`TODO(asset)`): founder portrait (Rajesh Chatterjee), real logo/wordmark, OG share image (1200×630). All have placeholders; none block the build.

## 10. Per-route SEO plan

Domain `https://oceanicprojectconsultants.com` (HTTPS). Per-route `generateMetadata`: unique title, refined description (from real copy, not keyword-stuffed), absolute canonical, OG + Twitter `summary_large_image`. **Legacy `meta-keywords` dropped. Email kept out of all metadata/JSON-LD until confirmed.**

| Route | Title (≤60) | JSON-LD |
|---|---|---|
| `/` | Oceanic Project Consultants — Healthcare Consultancy | Organization + MedicalBusiness/ProfessionalService (site-wide: PostalAddress, 2 phones, founder Rajesh Chatterjee) |
| `/about` | About Oceanic — Healthcare Consultancy in Kolkata | Breadcrumb + **Review** (Vasisht; no invented rating) |
| `/services` | Healthcare Project Services & Scope of Work — Oceanic | Breadcrumb + optional Service |
| `/projects` | Healthcare Projects in Eastern India — Oceanic | Breadcrumb + optional ItemList (18); **no derived stats baked in** |
| `/projects/certificates` | Project Certificates — Oceanic Healthcare Consultancy | 3-level Breadcrumb + optional ItemList (5) |
| `/gallery` | Healthcare Project Gallery — Oceanic, Kolkata | Breadcrumb + ImageGallery (12) |
| `/contact` | Contact Oceanic — Healthcare Consultants, Kolkata | Breadcrumb + ContactPage; **email omitted** |

Site-wide: `app/sitemap.ts`, `app/robots.ts` (allow all + sitemap), `opengraph-image`. Descriptions drafted per route (in the SEO draft) and finalized in Phase 3.

## 11. Contact transport — recommendation

**Recommend `tel:` click-to-call (both verified phones) + LinkedIn as the primary channel; no contact form at launch.** Rationale: static SSG on Vercel has no backend, and **there is no confirmed deliverable email address** (three conflicting forms exist — §13), so a form Server Action would have nowhere trustworthy to send. Revisit a form only after the client confirms a real inbox. **(One-line fork — tell me if you'd rather I wire a form now to a placeholder endpoint.)**

## 12. Dependencies (each justified; nothing else without sign-off)

**Runtime:** `next`, `react`, `react-dom` (the stack); `sharp` (build-time `next/image` optimization of the oversized Weebly JPGs).
**Dev:** `typescript` + `@types/*` (strict TS); `eslint` + `eslint-config-next` (lint gate); `vitest` + `@vitejs/plugin-react` + `jsdom` + `@testing-library/{react,jest-dom}` (unit/data + component tests); `@playwright/test` + `@axe-core/playwright` (e2e smoke + the axe a11y gate); `@lhci/cli` (the Lighthouse ≥95 gate). No CMS, DB, analytics, or UI kit.

## 13. Open questions & TODOs (need your input / client confirmation)

**Content (`TODO(content)`):**
1. **Email** — 3 inconsistent forms (`rajesh@oceanicproject.com`, `rajeschatterjee1@gmail.com`, malformed `rajeshchatterjee1@gmail`). Shipping a placeholder until confirmed. **Which is correct?**
2. **Services group count** — the reference says "**Eleven** grouped service areas" but lists **13** bold headings. I'll carry all 13 verbatim; **confirm the intended grouping/count.**
3. **Canonical names** — "JJ Hospital and Research Centre" (About) = "Jeevan Jyoti Hospital & Research Centre" (Projects); "East End **Fertity**"[sic] → "Fertility". Using the reconciled forms; **confirm.**
4. **Client names public?** — cards show client contacts (e.g. "Ms. Monalisha Menani, Director"). **OK to display publicly, or de-identify?**

**Marketing claims (`VERIFY` before publishing — new assertions, not on the old site):**
5. **Stats:** 18 projects (exact); **725 beds is exactly 725, not "725+"** and counts the *Ongoing* + *part-executed* projects → must read "**beds planned**", never "delivered"; 20+ years (21, from July 2005); 3 states (WB/Assam/Odisha, exact). **Approve the framing, or adjust the numbers/labels.**
6. **Homepage "Projects delivered" label** is loose (2 of 18 are Ongoing). Recommend "Projects" or "Projects engaged". **Your call.**
7. **RSV "NABH certified"** appears on its card (sourced from the testimonial byline, not the projects row). **OK to display as a hospital credential?**

**Design:**
8. **Selected-Work band (home) RSV chip:** the mockup shows `NABH / Certified`; the data model stores `B+G+6 / Config`. The dark band will use curated props to match the mockup while `/projects` stays data-faithful. **Confirm acceptable.**

**Assets (`TODO(asset)`):** founder portrait, logo/wordmark, OG image — placeholders until supplied.

**Infra:** Google Search Console verification token — keep or replace?

## 14. Gates — Phase 0 status

| Gate | Result |
|---|---|
| `pnpm build` | ✅ clean (both routes static-prerendered) |
| `pnpm typecheck` | ✅ clean (`strict`) |
| `pnpm lint` | ✅ clean (`next lint` deprecation notice only — migrate to ESLint CLI before Next 16) |
| `pnpm test` | ✅ 7/7 (data-model invariants: counts, unique slugs, 12 gallery + 5 certs, **assets exist on disk**, no remote URLs) |
| 301 redirects | ✅ all 6 verified live |
| `test:e2e`, `lhci` | wired, not run (Phase 2/3 gates; e2e needs `playwright install chromium`) |

## 15. Phase plan ahead (gated — STOP after each)

- **Phase 1** — `tokens.css` + fonts + shared shell (header/nav/footer/skip-link, mobile-nav client leaf, site-wide JSON-LD, redirects). Rebuild the home hero + one section to prove fidelity. Gates: build/typecheck/lint/axe + visual match.
- **Phase 2** — pages one at a time: `/` → `/about` → `/services` → `/projects` → `/projects/certificates` → `/gallery` → `/contact`. Per-page DoD, STOP after each.
- **Phase 3** — SEO + perf hardening; Lighthouse ≥95 mobile on all 4 categories, all routes.
- **Phase 4** — final audit + `REVIEW.md` + deploy notes (Vercel, HTTPS, domain cutover, redirects).
