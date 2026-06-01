"use client";

import { useState } from "react";
import type { ProjectCategory } from "@/content/projects";
import { Container } from "./Container";
import styles from "./ProjectFilter.module.css";

type Filter = "all" | ProjectCategory;

/**
 * Sticky category filter. Progressive enhancement: every card + group is
 * server-rendered and visible by default; this only toggles the display of
 * server-rendered nodes (which React does not own), so with JS off all 18 show.
 */
export function ProjectFilter({
  counts,
  total,
}: {
  counts: Record<ProjectCategory, number>;
  total: number;
}) {
  const [active, setActive] = useState<Filter>("all");

  const apply = (f: Filter) => {
    setActive(f);
    document.querySelectorAll<HTMLElement>("[data-cat]").forEach((el) => {
      el.style.display = f === "all" || el.dataset.cat === f ? "" : "none";
    });
    document.querySelectorAll<HTMLElement>("[data-grp]").forEach((el) => {
      el.style.display = f === "all" || el.dataset.grp === f ? "" : "none";
    });
  };

  const chips: { f: Filter; label: string; count: number }[] = [
    { f: "all", label: "All", count: total },
    { f: "hospital", label: "Hospitals", count: counts.hospital },
    { f: "diagnostic", label: "Diagnostic Centres", count: counts.diagnostic },
    { f: "fertility", label: "Fertility & IVF", count: counts.fertility },
  ];

  return (
    <div className={styles.filter}>
      <Container className={styles.bar}>
        {chips.map((c) => (
          <button
            key={c.f}
            type="button"
            className={[styles.chip, active === c.f && styles.on]
              .filter(Boolean)
              .join(" ")}
            aria-pressed={active === c.f}
            onClick={() => apply(c.f)}
          >
            {c.label} <span className={styles.c}>{c.count}</span>
          </button>
        ))}
      </Container>
    </div>
  );
}
