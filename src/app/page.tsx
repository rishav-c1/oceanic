import {
  countByCategory,
  TOTAL_PROJECTS,
  certificateProjects,
  galleryProjects,
} from "@/content/projects";

// Phase 0 placeholder home page — proves the data layer + path alias compile and
// gives the e2e smoke test a single <h1>. Phase 1 rebuilds this against the mockup.
export default function HomePage() {
  return (
    <main style={{ padding: "3rem", maxWidth: "60ch", marginInline: "auto" }}>
      <h1>Oceanic Project Consultants</h1>
      <p>Consultants in Healthcare Projects · Kolkata, West Bengal.</p>
      <p>
        Scaffold ready — {TOTAL_PROJECTS} projects modelled (
        {countByCategory("hospital")} hospitals, {countByCategory("diagnostic")}{" "}
        diagnostic centres, {countByCategory("fertility")} fertility clinics);{" "}
        {galleryProjects.length} gallery images and {certificateProjects.length}{" "}
        certificates migrated. Design system and pages arrive in Phase 1+.
      </p>
    </main>
  );
}
