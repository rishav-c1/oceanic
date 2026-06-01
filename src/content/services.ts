/**
 * The Detailed Scope of Work — carried VERBATIM from
 * reference/content/oceanic-content-reference.md §3.
 *
 * NOTE(content): the reference intro says "Eleven grouped service areas" but lists
 * THIRTEEN headed groups. All 13 are carried here verbatim; the count is flagged
 * for the client to reconcile (PLAN.md §13.2 / REVIEW.md). Nothing is merged or cut.
 */

export interface ServiceGroup {
  title: string;
  bullets: string[];
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    title: "Conceptual Planning along with feasible Layout Drawings",
    bullets: [
      "Conceptual planning including area calculation and feasible service selection conforming to the clinical establishment rules and NABH requirements.",
      "Techno-Commercial feasibility study of the project.",
      "Providing the architect with the complete set of conceptual layouts conforming to the existing clinical norms for final layout drawings.",
      "Responsibility of total project work in close association with the architectural and structural team working on the project.",
      "Day to day coordination work at site during project execution.",
    ],
  },
  {
    title: "Electrical system requirement [Planning & Execution]",
    bullets: [
      "Total layout assistance for electrical wiring, switch & socket points, UPS, Generator, Generator points, transformer, and electrical fittings as per required specification.",
      "Calculation of total load with breakup for Raw power, Generator Power and UPS power.",
      "Shortlisting of contractor and providing liaison with the selected contractor.",
      "Overall supervision and installation.",
    ],
  },
  {
    title: "Air-Conditioning requirement [Planning & Execution]",
    bullets: [
      "Guiding the client with proper Cost-benefit analysis (CBA) towards selection of ideal system of HVAC (Heating, Ventilation, and Air-Conditioning).",
      "Planning the AC systems as per temperature and air-change requirement of the project.",
      "Shortlisting of contractor and providing liaison with the selected contractor.",
      "Overall supervision and installation.",
    ],
  },
  {
    title: "Fire Fighting System requirement [Planning & Execution]",
    bullets: [
      "Shortlisting of contractor and providing liaison with the selected contractor.",
      "Overall supervision of installation and commissioning of the same.",
    ],
  },
  {
    title: "Guidance in all Licensing Protocols",
    bullets: [
      "Identifying the required licenses for the proposed project such as Fire license, Pollution Control Board, PNDT, AERB, Clinical License, Trade License, etc.",
      "Providing the complete documentation for all the above licenses.",
      "Providing the management with the required guidance for the procurement of the above mentioned licenses.",
    ],
  },
  {
    title: "Computer Hardware, Networking and Software requirement [Planning & Execution]",
    bullets: [
      "Guiding the client in selecting suitable vendor for EPABX (Electronic Private Automatic Branch Exchange) and computer networking.",
      "Guiding the client in selecting suitable vendor for Hospital Management System (Hospital Software).",
      "Identifying the network requirement for the above mentioned services and guiding the client in taking the necessary steps thereafter.",
      "Overall supervision of installation and commissioning of the same including participation in the software customization.",
    ],
  },
  {
    title: "Guidance in Medical & Utility Equipment [Selection & Installation]",
    bullets: [
      "Evaluation of category of equipment and instruments department-wise.",
      "Analysis of proposals from different vendors and providing management with the comparative study of the mentioned proposals.",
      "Selection of Equipment on the basis of merit in consultation with the Management.",
      "Planning the layout of the selected equipment with proper infrastructural facilities.",
      "Overall supervision of installation and commissioning of the same.",
      "Preparation of proper purchase orders.",
      "Helping management with decision on the selection of vendor for all supplies.",
    ],
  },
  {
    title: "Guidance in Finance as well as Inventory Planning & Management",
    bullets: [
      "Statement of budget on finance requirement monthly during project phase.",
      "Planning of purchase & management of inventory during project phase.",
    ],
  },
  {
    title: "Guidance in Human Resource Planning & Development",
    bullets: [
      "Manpower planning & recruitment of Technical & Non-Technical staff along with issuance of appointment letters and contract forms.",
      "Planning the salary structure of Technical & Non-Technical Staff.",
      "Training of Technical & Non-Technical Staff.",
      "Developing the systems & procedures for smooth running of the Healthcare setup.",
      "Providing the management with the proper guidelines for maintenance of documents (for ISO certification).",
      "Preparation of rosters department-wise.",
      "Performance appraisal report.",
    ],
  },
  {
    title: "Guidance in Financial Management",
    bullets: [
      "Developing the systems and procedures for the easy finance management.",
      "Guiding the management with the general procedure of day-to-day finance management.",
      "Arranging auditors if needed and coordinating with them.",
    ],
  },
  {
    title: "Guidance in Purchase & Inventory Management",
    bullets: [
      "Developing the procedures for easy purchase of necessary amenities and inventory management.",
      "Helping establish online system of purchase and inventory management from day one so as to simplify yet make the entire process more secure with purchase logs, live inventory status, etc.",
      "Helping the management select the suppliers of consumables & disposable amenities.",
      "Equip the staff with methods for easy control of the department.",
    ],
  },
  {
    title: "Guidance in Marketing & Sales Promotion",
    bullets: [
      "Providing the management with possible inputs to enable them to have a strong in-house marketing team.",
      "Developing appropriate strategies for marketing and guiding the marketing team of the Healthcare unit.",
      "Monitoring the performance of marketing staff on a monthly as well as yearly basis.",
      "Preparation of department-wise performance reports.",
    ],
  },
  {
    title: "Guidance in Protocol planning & implementation",
    bullets: [
      "Preparation of medical report formats as per requirement of respective departments.",
      "Establishing In-House and referring doctor management protocol.",
      "Guiding the management with selecting proper software systems to help with day-to-day management of the setup.",
      "Helping the management decide on ideal pricing options of packages based on the respective services provided by the healthcare setup upon the completion of project execution.",
    ],
  },
];
