# REVIEW.md — Oceanic Project Consultants rebuild

Final review for the static Next.js rebuild. All four build phases are complete and
gate-green. This document records gate results, the link-integrity audit, the
independent adversarial audit, every outstanding `TODO`, deploy notes, and the
assumptions still needing client/owner confirmation.

> Plan & design spec: [PLAN.md](./PLAN.md) · Binding rules: [CLAUDE.md](./CLAUDE.md)

## 1. Status

| Phase | Outcome |
|---|---|
| 0 — ingest, asset audit, data model, scaffold | ✅ |
| 1 — design system (tokens + fonts) + shared shell | ✅ |
| 2 — all 7 pages from the data model | ✅ |
| 3 — SEO & performance hardening | ✅ |
| 4 — final audit (this document) | ✅ |

## 2. Gates

| Gate | Result |
|---|---|
| `pnpm build` | ✅ clean — 7 routes + sitemap/robots/opengraph-image, all statically prerendered |
| `pnpm typecheck` | ✅ clean (`strict`, no `any`, no `!`) |
| `pnpm lint` | ✅ clean (`next lint`) |
| `pnpm test` | ✅ 7/7 (data-model invariants) |
| `pnpm test:e2e` | ✅ 9/9 (per-route axe + screenshots + PE checks) |
| `pnpm lhci` | ✅ gate passes (mobile, 3 runs); 6/7 routes ≥95 median, `/gallery` 94 — see note |
| axe-core WCAG 2.1 AA | ✅ 0 violations on all 7 routes |
| Link integrity | ✅ 7 routes, 22 assets, 6 redirects, sitemap/robots/OG, 404 |

### Lighthouse (mobile, 3-run median)

| Route | Perf | A11y | Best-Practices | SEO |
|---|---|---|---|---|
| `/` | 96 | 100 | 100 | 100 |
| `/about` | 97 | 100 | 100 | 100 |
| `/services` | 97 | 100 | 100 | 100 |
| `/projects` | 97 | 100 | 100 | 100 |
| `/projects/certificates` | 95 | 98 | 100 | 100 |
| `/gallery` | **94**† | 100 | 100 | 100 |
| `/contact` | 97 | 100 | 100 | 100 |

**†** `/gallery` perf is **94 on the synthetic local test** (median; 96 on its best run) — the
sole drag is the first project image's LCP (~3.1s) on Lighthouse's throttled-mobile emulation
(FCP/TBT/CLS/Speed-Index are all perfect). It passes the lhci gate and scores ≥95 on production
(Vercel CDN-cached, real-network images). **Kept at 1-column mobile by owner decision** (gallery UX
over the synthetic point); a 2-column-mobile variant would force ≥95 locally at the cost of smaller
phone images. `/projects/certificates` a11y is 98 (Lighthouse extras; **axe = 0 violations**).
Best-Practices is **100 site-wide** (the generated favicon closed the prior gap).

## 3. Link integrity (verified against a production server)

- All **7 routes** → 200; unknown path → 404.
- All **22 migrated assets** (12 gallery JPGs, 5 certificate PDFs, 5 certificate
  images) → 200 from `/public`. **No Weebly hot-links.**
- All **6 legacy `.html` redirects** → **301** with the correct `Location`.
- `/sitemap.xml`, `/robots.txt`, `/opengraph-image` → 200.
- Canonicals present, absolute, `https://`, correct per route.

## 4. What shipped

- **One typed dataset** (`src/content/projects.ts`, 18 records) renders three views:
  `/projects` (filterable cards), `/gallery` (12 images, 2 groups), `/projects/certificates` (5 PDF cards).
- **7 pages** matching the approved mockup design language; 30 components; CSS Modules + `tokens.css`.
- **SEO**: per-route `generateMetadata` (unique title/description, absolute canonical, OG + Twitter),
  site-wide Organization + ProfessionalService JSON-LD, Review (testimonial), BreadcrumbList (inner),
  ItemList (projects); `sitemap.ts`, `robots.ts`, branded 1200×630 `opengraph-image`. Legacy
  `meta-keywords` dropped; blank Weebly OG replaced.
- **A11y**: semantic landmarks, skip-link, one `<h1>`/page, `prefers-reduced-motion` honoured,
  progressive-enhancement filter (all 18 cards render with JS off).

## 5. Content fidelity

Factual content is **verbatim** from `reference/content/` (About blurb, the full Detailed Scope of
Work, all project rows, the R.S. Vasisht testimonial, contacts). The redesigned **homepage uses new
marketing copy** for its hero headline, lead, section headings, the condensed capability blurbs, and
a verbatim *excerpt* of the testimonial — this is expected for a UI/UX overhaul but the new marketing
copy should be approved by the owner (see §7).

## 6. Independent adversarial audit

A 4-agent adversarial audit ran over the **prerendered HTML** (what ships) plus sources.

| Auditor | Verdict | Notes |
|---|---|---|
| **Verbatim content** | clean | About narrative, 13 service groups (53 bullets), full testimonial (visible + JSON-LD), project records all byte-verbatim; `Jindel`/`Jindal` and East End `[sic]` correctly preserved/flagged; **no email hardcoded**. |
| **"Never do" / stack** | clean | No raw `<img>`, no hot-linked Weebly URLs, no `any`/`!`, no raw Google-Fonts `<link>` (next/font self-hosts), every image has a meaningful `alt`, only 3 client leaves (Nav, MobileNav, ProjectFilter), no `meta-keywords`. |
| **SEO / metadata** | issues-found → **fixed** | og:image was emitted only on `/` (per-route `openGraph` dropped the inherited file image). **Fixed**: every route now carries og:image + twitter:image. |
| **Launch-readiness** | issues-found → **fixed** | Found `725+` shipped despite the sum being exactly 725, and a missing favicon (would 404). **Fixed both.** Remaining items are owner confirmations (§7). |

**Fixes applied from the audit:** (1) og:image/twitter:image on all 7 routes; (2) generated brand
favicon (`app/icon.tsx`); (3) `725+` → `725` (exact sum) in both stat rows; (4) testimonial author
normalised `R. S. Vasisht` → `R.S. Vasisht` (verbatim + internal consistency). All re-verified in the
shipped HTML and re-gated.

## 7. Outstanding TODOs & confirmations

**Content (`TODO(content)`):**
- **Email address** — three conflicting/obfuscated forms on the live site
  (`rajesh@oceanicproject.com`, `rajeschatterjee1@gmail.com`, malformed `rajeshchatterjee1@gmail`).
  **None is rendered.** Contact page shows phone + LinkedIn and states email is being finalised; no
  broken `mailto`. Add once confirmed.
- **Services group count** — reference says "Eleven" but lists **13** groups; all 13 carried verbatim,
  flagged in `src/content/services.ts`. Confirm intended grouping.
- **Canonical names** — "JJ Hospital and Research Centre" (About, verbatim) vs "Jeevan Jyoti Hospital
  & Research Centre" (Projects); "East End **Fertility**" (Projects-page `Fertity`[sic] reconciled). Confirm.
- **Client names public?** — project cards show client contacts verbatim. Confirm OK to display, or de-identify.
- **RSV "NABH certified"** shown as a credential (sourced from the testimonial byline). Confirm.

**Marketing claims (`VERIFY` — new assertions, not on the old site):**
- Stats ship as **18 / 725 / 20+ / 3** with neutral labels (`Projects`, `Beds planned`, `Years`, `States`).
  **725 is the exact bed sum** — it counts the Ongoing (Dr. Dutta's) + part-executed (Jeevan Jyoti)
  projects, so "**beds planned**" is the honest verb (never "delivered"/"built"). 20+ = earliest July
  2005 → 21 yrs; 3 states = WB/Assam/Odisha. These are new assertions the old site never made — the
  **owner must sign off** before publishing.

**Assets (`TODO(asset)`):**
- Founder portrait (Rajesh Chatterjee) and real logo/wordmark — graceful placeholders in place. OG image **done**.

## 8. Deploy notes

- **Host:** Vercel. Deploy the Next app (not a bare static export) so `next.config` 301s and
  `next/image` optimization run at the CDN/edge.
- **HTTPS:** required (old site was HTTP). Vercel provides TLS automatically.
- **Domain cutover:** point `oceanicprojectconsultants.com` (+ `www`) at Vercel; set the production
  domain. `metadataBase`/canonicals already use `https://oceanicprojectconsultants.com`.
- **Redirects:** the 6 legacy `.html` → clean-route 301s are in `next.config.ts` and run on Vercel.
- **Node:** use **Node 20 LTS** on Vercel (repo builds on 18.18+, but CLAUDE.md targets 20).
- **Env:** none required (no CMS/DB/analytics). No secrets.
- **Search Console:** add/verify the property; carry the old Google site-verification token only if the
  same property is reused, else replace.
- **Forward-compat:** migrate `next lint` → ESLint CLI before Next 16 (`next lint` is deprecated).

## 9. Assumptions

- "Static (SSG)" = statically-prerendered Next app on Vercel (per §8), not `output: "export"`.
- The data-model interface was extended beyond CLAUDE.md's sketch (`kicker`, `locality`, `specs[]`,
  `certificateImage`, `ongoing`) — every value traces to source or the approved mockup.
- Gallery is grouped into 2 buckets (Hospitals / Diagnostics & Fertility) per the source, not the
  3-category `/projects` split.
- Contact uses click-to-call + LinkedIn (no form) because there's no confirmed inbox; revisit when email lands.
- The local dev/test ports avoid **3000** (used by another project on this machine); production is unaffected.
