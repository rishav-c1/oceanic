import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { EndCTA } from "@/components/EndCTA";
import { FounderSplit } from "@/components/FounderSplit";
import { GradText } from "@/components/GradText";
import { PageHero } from "@/components/PageHero";
import { Quote } from "@/components/Quote";
import { FOUNDER } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import styles from "./About.module.css";

export const metadata: Metadata = pageMeta({
  title: "About Oceanic — Healthcare Consultancy in Kolkata",
  description:
    "An organization with an excellent track record in healthcare consultancy, promoted by Rajesh Chatterjee, whose name is well known across Eastern India.",
  path: "/about",
});

// Verbatim R.S. Vasisht testimonial (plain text for the Review schema).
const TESTIMONIAL =
  "His main strength lies in his in-depth knowledge of each aspect associated with a Healthcare project; starting from layout designing, assessing medical equipment, central gas line network, electrical load calculation, planning of air-conditioning and also Human Resource planning and execution, impeccable monitoring coupled with time-bound execution of the jobs with an eye for details adds lot of value to his work. The sincerity and commitment with which he has guided us in executing the whole project, we would gladly recommend him and his organization to any project in this sector and also wish him and his organization a very successful career ahead.";

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "About", path: "/about" }]} />
      <PageHero
        eyebrow="About · Eastern India"
        title={
          <>
            About Oceanic <GradText>Project Consultants</GradText>
          </>
        }
        lead="An organization with an excellent track record in healthcare consultancy, operating from its city office in Kolkata."
      />

      <section className={styles.narrative}>
        <Container>
          <div className={styles.prose}>
            <p>
              Oceanic Project Consultants is an organization with an excellent track
              record in healthcare consultancy. Operating from its city office at 65,
              Garfa Main Road (Kolkata – 700 078), it is promoted by experienced
              consultant Mr. Rajesh Chatterjee whose name is well-known in the
              healthcare sector in Eastern India.
            </p>
            <p>
              A few of the prestigious projects that have been executed by the principal
              consultant-cum-founder of the company include Columbia Asia Hospital
              (67 000 sq ft 100 bedded Multi-speciality Hospital in Salt Lake, Kolkata,
              West Bengal), RSV Hospital (40 000 sq ft 100 bedded Multi-speciality
              Hospital in Tollygunge Phari, Kolkata, West Bengal), JJ Hospital and
              Research Centre Pvt. Ltd. (160 000 sq ft 300 bedded Multi-speciality
              Hospital in Silchar, Cachar, Assam), and numerous other projects, the
              details of which can be found listed on the Projects page.
            </p>
            <p>
              It gives us immense pride to mention that our clients are all extremely
              impressed with our performance and track record.
            </p>
          </div>
        </Container>
      </section>

      <Container>
        <FounderSplit
          eyebrow="The consultant"
          name={FOUNDER.name}
          cta={{ label: "Detailed scope of work →", href: "/services" }}
        >
          Promoted by experienced consultant Mr. Rajesh Chatterjee — the principal
          consultant-cum-founder of the company — whose name is well-known in the
          healthcare sector in Eastern India.
        </FounderSplit>
      </Container>

      <Quote
        full
        author="R.S. Vasisht"
        role="Chairman · RSV Hospital (An NABH Certified Hospital)"
        schemaBody={TESTIMONIAL}
      >
        His main strength lies in his{" "}
        <GradText>in-depth knowledge of each aspect</GradText> associated with a
        Healthcare project; starting from layout designing, assessing medical
        equipment, central gas line network, electrical load calculation, planning of
        air-conditioning and also Human Resource planning and execution, impeccable
        monitoring coupled with time-bound execution of the jobs with an eye for
        details adds lot of value to his work. The sincerity and commitment with which
        he has guided us in executing the whole project, we would gladly recommend him
        and his organization to any project in this sector and also wish him and his
        organization a very successful career ahead.
      </Quote>

      <EndCTA
        align="center"
        title="Planning a healthcare facility? Let's build it right."
        actions={[
          { label: "Start a conversation →", href: "/contact", variant: "grad" },
          { label: "See the projects", href: "/projects" },
        ]}
      />
    </>
  );
}
