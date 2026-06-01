import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  CATEGORY_ORDER,
  certificateProjects,
  countByCategory,
  galleryProjects,
  projects,
  projectYear,
} from "./projects";

const onDisk = (publicRelPath: string): boolean =>
  existsSync(join(process.cwd(), "public", publicRelPath));

describe("projects dataset", () => {
  it("has 18 records in the documented category split (8 / 6 / 4)", () => {
    expect(projects).toHaveLength(18);
    expect(countByCategory("hospital")).toBe(8);
    expect(countByCategory("diagnostic")).toBe(6);
    expect(countByCategory("fertility")).toBe(4);
  });

  it("has unique, URL-safe slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  it("wires exactly 12 gallery images and 5 certificates", () => {
    expect(galleryProjects).toHaveLength(12);
    expect(certificateProjects).toHaveLength(5);
  });

  it("marks only Ongoing projects as ongoing and gives dated projects a 4-digit year", () => {
    for (const p of projects) {
      if (p.ongoing) {
        expect(p.implementation).toBe("Ongoing");
        expect(projectYear(p)).toBe("Ongoing");
      } else {
        expect(projectYear(p)).toMatch(/^\d{4}$/);
      }
    }
  });

  it("references only migrated /public assets that exist on disk (no hot-linking)", () => {
    for (const p of projects) {
      for (const asset of [
        p.galleryImage,
        p.certificateImage,
        p.certificatePdf,
      ]) {
        if (asset) {
          expect(asset.startsWith("/"), `${p.slug}: ${asset}`).toBe(true);
          expect(onDisk(asset), `${p.slug}: missing ${asset}`).toBe(true);
        }
      }
    }
  });

  it("gives every certificate record both a PDF and a thumbnail image", () => {
    for (const p of certificateProjects) {
      expect(p.certificatePdf, p.slug).toBeTruthy();
      expect(p.certificateImage, p.slug).toBeTruthy();
    }
  });

  it("gives every project at least one spec chip and a known category", () => {
    for (const p of projects) {
      expect(p.specs.length, p.slug).toBeGreaterThanOrEqual(1);
      expect(CATEGORY_ORDER).toContain(p.category);
    }
  });
});
