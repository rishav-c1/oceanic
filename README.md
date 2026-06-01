# Oceanic Project Consultants — website

A static (SSG) **Next.js** rebuild of the Oceanic Project Consultants site (a Kolkata
healthcare-project consultancy), replacing the legacy Weebly site. This is a **UI/UX
overhaul**: the content is carried verbatim, the design is rebuilt against an approved mockup.

> Binding rules live in [`CLAUDE.md`](./CLAUDE.md). Two sources, never conflated:
> `reference/content/` = copy/data truth (verbatim); `reference/design/` = the approved
> visual target. The current plan and open questions are in [`PLAN.md`](./PLAN.md).

## Stack

- Next.js (App Router, RSC) · TypeScript `strict` · CSS Modules + global `tokens.css`
- `next/font` (Schibsted Grotesk · Hanken Grotesk · Spline Sans Mono) · `next/image`
- Typed content layer in `src/content/` (no CMS, no DB)
- pnpm · Node 20 LTS recommended (builds on 18.18+)

## Commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` | Production build (static prerender) |
| `pnpm start` | Serve the build |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint (`next lint`) |
| `pnpm test` | Vitest (unit / data-model invariants) |
| `pnpm test:e2e` | Playwright smoke + a11y (needs `pnpm exec playwright install chromium`) |
| `pnpm lhci` | Lighthouse CI across all routes (target ≥95 mobile) |
| `pnpm fetch:assets` | Re-download the migrated Weebly assets into `/public` |

`build`, `typecheck`, and `lint` must pass clean before any phase is "done".

## Structure

```
CLAUDE.md                 binding project rules
PLAN.md                   routes, design spec, manifests, SEO plan, TODOs
reference/content/        verbatim Weebly content (source of truth)
reference/design/         approved redesign mockups (visual target)
scripts/fetch-assets.sh   asset migration (Weebly → /public)
public/projects/          12 migrated gallery images
public/certificates/      5 certificate PDFs + 5 thumbnail images
src/content/projects.ts   the central dataset (Projects + Gallery + Certificates)
src/app/                  App Router pages (built in Phase 2)
e2e/                      Playwright tests
```

## Build phases

Gated, phase-by-phase (see the kickoff brief in `reference/`):

- **Phase 0 — ingest, asset audit, data model, scaffold** ✅ (this commit)
- **Phase 1 — design system (`tokens.css`, fonts) + shared shell** ⏳
- **Phase 2 — pages, one at a time** (`/` → `/about` → `/services` → `/projects` → `/projects/certificates` → `/gallery` → `/contact`)
- **Phase 3 — SEO & performance hardening** (sitemap, robots, OG, JSON-LD, Lighthouse ≥95)
- **Phase 4 — final audit** (`REVIEW.md`, deploy notes)

## Deploy

Target: **Vercel** (HTTPS, custom domain `oceanicprojectconsultants.com`). Legacy
Weebly `*.html` URLs 301-redirect to the new clean routes via `next.config.ts`.
