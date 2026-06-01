import { Button } from "@/components/Button";
import { CapabilityCard } from "@/components/CapabilityCard";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { GradText } from "@/components/GradText";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { StatRow } from "@/components/StatRow";
import { STATS } from "@/content/site";
import styles from "./Home.module.css";

// Phase 1 deliverable: the hero + the capabilities section, built to the mockup.
// The remaining home sections (selected-work band, testimonial, founder, end-CTA)
// are added in Phase 2's full home build.
export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.blueprint} aria-hidden="true" />
        <Container className={styles.heroWrap}>
          <Reveal delay={0.05}>
            <Eyebrow>Consultants in Healthcare Projects · Kolkata</Eyebrow>
          </Reveal>
          <Reveal as="h1" delay={0.12} className={styles.h1}>
            From first layout to a fully operational{" "}
            <GradText>healthcare facility</GradText>.
          </Reveal>
          <Reveal as="p" delay={0.2} className={styles.lead}>
            Oceanic provides full-scale consultancy across the healthcare sector:
            conceptual planning, execution, licensing and commissioning of hospitals,
            diagnostic centres and fertility clinics. End to end, time-bound,
            detail-obsessed.
          </Reveal>
          <Reveal delay={0.28} className={styles.cta}>
            <Button href="/projects" variant="grad">
              Explore our projects →
            </Button>
            <Button href="/services">Detailed scope of work</Button>
          </Reveal>
          <Reveal delay={0.36}>
            <StatRow stats={STATS} layout="grid" />
          </Reveal>
        </Container>
      </section>

      <section className={styles.section}>
        <Container>
          <SectionHead
            eyebrow="What we do"
            title="One consultant, accountable for every system in the building."
            lead="Strategy, execution and commissioning held together by impeccable, time-bound monitoring, so newcomers and veterans alike build with confidence."
          />
          <CapabilityGrid>
            <CapabilityCard num="01" title="Planning & Layouts">
              Conceptual planning, area calculation and feasible layouts conforming
              to clinical-establishment rules and NABH requirements.
            </CapabilityCard>
            <CapabilityCard num="02" title="Electrical & Power">
              Total load calculation (raw, generator and UPS) with wiring layouts,
              contractor liaison and installation oversight.
            </CapabilityCard>
            <CapabilityCard num="03" title="HVAC & Fire">
              Cost-benefit-led HVAC selection by temperature and air-change need, plus
              fire-fighting installation and commissioning.
            </CapabilityCard>
            <CapabilityCard num="04" title="Licensing">
              Identifying and documenting every licence (Fire, Pollution Control,
              PNDT, AERB, Clinical and Trade) and guiding procurement.
            </CapabilityCard>
            <CapabilityCard num="05" title="Equipment & IT">
              Department-wise equipment evaluation, vendor comparatives, HMS and
              networking selection, layout and commissioning.
            </CapabilityCard>
            <CapabilityCard num="06" title="HR, Finance & Ops">
              Manpower planning, salary structures, training, inventory and finance
              systems to run the setup from day one.
            </CapabilityCard>
          </CapabilityGrid>
        </Container>
      </section>
    </>
  );
}
