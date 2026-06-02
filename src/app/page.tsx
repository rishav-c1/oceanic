import { Button } from "@/components/Button";
import { CapabilityCard } from "@/components/CapabilityCard";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { Container } from "@/components/Container";
import { DarkProjectCard } from "@/components/DarkProjectCard";
import { EndCTA } from "@/components/EndCTA";
import { Eyebrow } from "@/components/Eyebrow";
import { FounderSplit } from "@/components/FounderSplit";
import { GradText } from "@/components/GradText";
import { Quote } from "@/components/Quote";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { StatRow } from "@/components/StatRow";
import { FOUNDER, STATS } from "@/content/site";
import styles from "./Home.module.css";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
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

      {/* Capabilities */}
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

      {/* Selected work — dark band (curated copy, mirrors the mockup) */}
      <section className={styles.projects}>
        <Container>
          <SectionHead
            onDark
            eyebrow="Selected work"
            title="Facilities planned, built and handed over."
            lead="A track record across multi-speciality hospitals, oncology centres, diagnostics and IVF clinics in Eastern India."
          />
          <div className={styles.pgrid}>
            <DarkProjectCard
              tag="Multi-speciality · Salt Lake"
              name="Columbia Asia Hospital"
              line="Complete planning & execution · handover before inauguration"
              specs={[
                { v: "100", k: "Beds" },
                { v: "67k", k: "Sq ft" },
                { v: "B+G+9", k: "Config" },
              ]}
            />
            <DarkProjectCard
              tag="Multi-speciality · Tollygunge"
              name="RSV Hospital"
              line="Phase I & II · planning, execution & CEO since 2007"
              specs={[
                { v: "100", k: "Beds" },
                { v: "40k", k: "Sq ft" },
                { v: "NABH", k: "Certified" },
              ]}
            />
            <DarkProjectCard
              tag="Multi-speciality · Silchar, Assam"
              name="Jeevan Jyoti H&RC"
              line="Conceptual planning, layouts & part-execution to superstructure"
              specs={[
                { v: "300", k: "Beds" },
                { v: "160k", k: "Sq ft" },
                { v: "B+G+8", k: "Config" },
              ]}
            />
          </div>
          <div className={styles.viewAll}>
            <Button href="/projects" accent>
              View all 18 projects →
            </Button>
          </div>
        </Container>
      </section>

      {/* Testimonial — verbatim excerpt of the R.S. Vasisht quote (full quote lives on /about) */}
      <Quote author="R.S. Vasisht" role="Chairman · RSV Hospital (NABH Certified)">
        His main strength lies in his{" "}
        <GradText>in-depth knowledge of each aspect</GradText> associated with a
        Healthcare project…
      </Quote>

      {/* Founder — verbatim-composed from the reference (About blurb + home teaser) */}
      <Container className={styles.founderWrap}>
        <FounderSplit
          eyebrow="The consultant"
          name={FOUNDER.name}
          cta={{ label: "More about Oceanic →", href: "/about" }}
        >
          Promoted by experienced consultant Mr. Rajesh Chatterjee, whose name is
          well-known in the healthcare sector in Eastern India. The emphasis we lay on
          consultant and client relationship helps both newcomers and veterans in the
          industry place trust in us and successfully establish state-of-the-art
          healthcare projects.
        </FounderSplit>
      </Container>

      {/* End CTA — centered (contacts live in the footer) */}
      <EndCTA
        align="center"
        title={
          <>
            Planning a healthcare facility?{" "}
            <span className={styles.ctaAccent}>Let&apos;s build it right.</span>
          </>
        }
        actions={[
          { label: "Start a conversation →", href: "/contact", variant: "grad" },
          { label: "Explore our projects", href: "/projects" },
        ]}
      />
    </>
  );
}
