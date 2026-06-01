# Oceanic Project Consultants: Claude Code kickoff prompt

Paste this as your first message in Claude Code, with `CLAUDE.md` at repo root, the seven page extracts in `/reference/content/`, and the approved homepage mockup + any tokens in `/reference/design/`. The workflow is phased and gated. **Do not skip ahead. Stop where told and wait for my sign-off.**

---

You are **redesigning and rebuilding** the Oceanic Project Consultants website (currently a Weebly site) as a static Next.js site. This is a UI/UX overhaul: keep the *content*, replace the *design*. Read `CLAUDE.md` first and treat it as binding, stack, the central projects data model, the **design system**, asset-migration rules, SEO acceptance criteria, the redirect requirement, and the "never do" list.

Two sources, never conflated: `/reference/content/` = copy/structure truth (carry verbatim); `/reference/design/` = the approved mockups (homepage + projects) + design system (the visual target). Reproduce neither the Weebly markup nor its visual design.

Work in the phases below. Each ends with a STOP for my review. Do not begin a phase before I approve the previous one.

## Phase 0, Ingest, asset audit & plan (NO page-building yet)

1. Parse all seven reference pages. Extract verbatim: every project row (name, category, unit type, config, location, implementation date, scope bullets, contact person), the full Services scope-of-work structure, the About blurb + R.S. Vasisht testimonial, and all contact details.
2. Build the typed `src/content/projects.ts` data model per `CLAUDE.md` and populate it from the reference. Reconcile exact record counts across the Projects / Gallery / Certificates pages and note any project that appears in one view but not another.
3. **Asset manifest**: list every remote Weebly `/uploads/...` URL (project JPGs + 5 certificate PDFs), with intended `/public` path. Attempt to download each into `/public`; record success/404. Flag failures as `TODO(asset)`.
4. **Redirect map**: every old `*.html` slug → new clean route, for `next.config` 301s.
5. Flag the known content gaps: the Cloudflare-obfuscated / malformed emails (`TODO(content): confirm emails`), any "Ongoing" projects with missing fields, any missing assets.
6. Produce **`PLAN.md`**: routes, component inventory, **design-system spec codified from `/reference/design/` (tokens, the three fonts, the signature elements) plus how each non-homepage page extends that language** (especially Services, the Gallery grid, Certificates, Contact, which the mockups don't show), per-page section maps, the populated data-model summary, asset manifest, redirect map, per-route SEO plan (title/description draft + which JSON-LD types), the contact page design (recommend: form Server Action vs click-to-call/email), all assumptions, proposed dependencies (justify each).
7. Scaffold the project (Next.js App Router, TS strict, pnpm, CSS Modules, next/font, vitest, playwright, eslint, lighthouse-ci); wire the commands.

**STOP.** Post `PLAN.md`, the asset manifest, the redirect map, and the scaffold tree. Wait for approval/edits.

## Phase 1, Design system & shared shell

`tokens.css` (palette + brand gradients per `CLAUDE.md`), typography (Schibsted Grotesk + Hanken Grotesk + Spline Sans Mono via next/font), the signature primitives from the mockup (mono eyebrow+rule, blueprint-grid hero treatment, bordered cards, thin-rule scaffolding, staggered load reveal honouring `prefers-reduced-motion`), and the shared shell, root layout (`header`/`nav`/`main`/`footer`, skip link), site-wide Organization + MedicalBusiness JSON-LD with structured address/phone/founder, mobile nav as a client leaf, `next.config` redirects from Phase 0. **Rebuild the homepage hero + one section to demonstrate fidelity to the mockup before proceeding.**
Gates: `build`, `typecheck`, `lint`, `axe` clean; visual match to `/reference/design/` mockup.
**STOP.** Show shell + gate output.

## Phase 2, Pages, one at a time

Order: `/` → `/about` → `/services` → `/projects` → `/projects/certificates` → `/gallery` → `/contact`. For each: build it (the three projects-derived pages all read from `projects.ts`, no duplicated data), run the per-page definition of done from `CLAUDE.md`, then STOP and show me the page + gate output before the next. Carry all content verbatim; render the Vasisht testimonial with `Review` JSON-LD; build `/projects` as the filterable card portfolio (not tables) per the projects mockup; wire certificate PDFs and gallery images from migrated `/public` assets. Log every gap as a `TODO`. Do not fabricate.

**STOP after each page.**

## Phase 3, SEO & performance hardening

`sitemap.ts`, `robots.ts`, `opengraph-image`, per-route canonical/OG/Twitter, BreadcrumbList on inner pages, validate all JSON-LD, confirm redirects resolve. Optimise migrated images (formats/sizes/priority for LCP), font-display, CLS check. Run `lhci` across all routes; fix until every route ≥95 on all four categories.
**STOP.** Show the Lighthouse table per route.

## Phase 4, Final audit

Full `build` + `typecheck` + `lint` + `test` + `test:e2e` + `lhci` clean. Link integrity (no 404s incl. all migrated PDFs/images, canonicals correct, old→new redirects all resolve). Produce `REVIEW.md`: gate results, every outstanding `TODO` (emails, any missing assets), deploy notes (Vercel; HTTPS + domain cutover + redirects), and assumptions still needing confirmation.
**STOP.** Final review.

## Standing rules

- One clear approach, not a menu. At a genuine fork, state your recommendation and ask in one line.
- Never report a phase done with a failing gate. If a gate can't pass, stop and explain.
- Small, reviewable, per-component commits.
- Flag, don't guess, anything underspecified (emails, missing assets, ambiguous project fields, contact-form transport).
