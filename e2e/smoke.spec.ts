import { expect, test } from "@playwright/test";

// Phase 0 placeholder smoke test. Phase 2 expands per-page coverage (nav, filter,
// certificate links, axe scans). Requires a Chromium binary:
//   pnpm exec playwright install chromium
test("home page renders with exactly one h1", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
});
