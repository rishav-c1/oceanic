import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const ROUTES: [name: string, path: string][] = [
  ["home", "/"],
  ["about", "/about"],
  ["services", "/services"],
  ["projects", "/projects"],
  ["certificates", "/projects/certificates"],
  ["gallery", "/gallery"],
  ["contact", "/contact"],
];

for (const [name, path] of ROUTES) {
  test(`${name}: full-page screenshot + zero axe violations`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");

    // exactly one h1 per page (SEO / a11y)
    await expect(page.locator("h1")).toHaveCount(1);

    await page.screenshot({ path: `test-results/${name}.png`, fullPage: true });

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(
      results.violations,
      JSON.stringify(
        results.violations.map((v) => ({ id: v.id, help: v.help, nodes: v.nodes.length })),
        null,
        2,
      ),
    ).toEqual([]);
  });
}

test("projects filter is progressive-enhancement (all 18 cards render server-side)", async ({
  page,
}) => {
  await page.goto("/projects");
  await expect(page.locator("[data-cat]")).toHaveCount(18);
});
