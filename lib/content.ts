/**
 * Content sources — services, industries, case studies, testimonials, FAQ, stats.
 * Real production copy. No Lorem Ipsum, no "we care", no "trusted partner".
 */
import type { ServiceSlug, IndustrySlug } from "./site";

export interface Service {
  slug: ServiceSlug;
  number: string;
  name: string;
  pitch: string;
  description: string;
  bullets: string[];
  responseTime: string;
  outcomes: string[];
  // IMAGE: industrial-grade photography for each service
  image: string;
}

export const SERVICES: Service[] = [
  {
    slug: "water-damage",
    number: "01",
    name: "Water Damage",
    pitch: "Burst pipes, sewage backups, flood events. Stabilized within the first hour.",
    description:
      "Water damages a building three ways at once: it spreads, it weakens, and it cultivates microbial growth within 24 hours. Our crews arrive with truck-mounted extraction, desiccant dehumidifiers, and IICRC-trained technicians who document every category and class on arrival — so the insurance file builds itself while the building dries.",
    bullets: [
      "Category 1, 2, and 3 water assessment",
      "Truck-mounted extraction up to 250 GPM",
      "Desiccant + LGR dehumidification",
      "Moisture mapping with thermal + pinless meters",
      "Antimicrobial treatment per IICRC S500",
      "Daily drying logs delivered to adjusters",
    ],
    responseTime: "60 min on-site, mitigation begins within the first hour",
    outcomes: [
      "92% of structures dried in standard within 4 days",
      "Average 38% lower mold-remediation follow-on vs. industry baseline",
    ],
    image: "/images/services/water-damage.jpg",
  },
  {
    slug: "fire-damage",
    number: "02",
    name: "Fire Damage",
    pitch: "Soot, smoke residue, structural soot odor. Restored — not just cleaned.",
    description:
      "Fire damage is mostly what fire leaves behind: corrosive soot that etches metal in 24 hours, smoke odor that travels through HVAC, and water from suppression that creates a secondary loss. We secure the structure, document contents, and execute a sequenced cleaning plan that prevents permanent staining and recovers high-value finishes.",
    bullets: [
      "24/7 emergency board-up and tarping",
      "Soot characterization (wet vs. dry vs. protein)",
      "HEPA air scrubbing during all activity",
      "Hydroxyl + ozone deodorization (occupied vs. unoccupied protocols)",
      "Contents pack-out with itemized inventory",
      "Coordination with fire investigators and adjusters",
    ],
    responseTime: "60 min secure-and-stabilize on first call",
    outcomes: [
      "Average 22% structural-content recovery rate above industry",
      "Zero re-do contracts on smoke-odor warranty in 5 years",
    ],
    image: "/images/services/fire-damage.jpg",
  },
  {
    slug: "mold-remediation",
    number: "03",
    name: "Mold Remediation",
    pitch: "Containment-first protocols. Independent post-clearance. No shortcuts.",
    description:
      "We never start mold work without containment. Negative-pressure barriers, HEPA filtration, and PPE are deployed before the first piece of drywall comes out. Independent third-party clearance testing follows every job — because if you can't prove it's gone, you didn't really fix it.",
    bullets: [
      "ANSI/IICRC S520 compliant remediation",
      "Negative-pressure containment with HEPA",
      "Antimicrobial application per surface type",
      "Independent post-remediation verification (PRV)",
      "Source-cause documentation for insurance",
      "Crawlspace, attic, and HVAC specialists",
    ],
    responseTime: "Initial assessment within 24 hrs of call",
    outcomes: [
      "100% pass rate on first PRV in last 18 months",
      "Sub-clinical post-clearance spore counts on 94% of jobs",
    ],
    image: "/images/services/mold-remediation.jpg",
  },
  {
    slug: "storm-response",
    number: "04",
    name: "Storm Response",
    pitch: "Catastrophe trailers pre-staged. Multi-property dispatch in one call.",
    description:
      "When a storm hits, every restoration company in the region is at capacity. We're not. KPC pre-stages catastrophe trailers — generators, pumps, board-up materials, drying equipment — so a single call dispatches a fleet, not a phone tree. Multi-property portfolios get a dedicated incident commander.",
    bullets: [
      "Pre-staged CAT trailers across the region",
      "Roof tarping and emergency board-up",
      "Generator-powered drying for outage zones",
      "Multi-property incident command",
      "Coordination with adjusters and TPA's",
      "Reconstruction handoff from same firm",
    ],
    responseTime: "First-truck dispatch within 30 min of activation",
    outcomes: [
      "Handled 14-property portfolio loss in 9 hours during 2023 atmospheric river",
      "Average 4-day return-to-occupancy on hospitality assets",
    ],
    image: "/images/services/storm-response.jpg",
  },
  {
    slug: "biohazard-cleanup",
    number: "05",
    name: "Biohazard Cleanup",
    pitch: "Crime scene, trauma, infectious disease. Discreet, regulated, certified.",
    description:
      "Biohazard work is regulated, dignified, and invisible. KPC technicians are OSHA Bloodborne Pathogens trained, work under PPE protocols, and deliver scenes back to occupants without trace. Waste manifests, chain-of-custody, and discreet vehicle markings are standard.",
    bullets: [
      "OSHA Bloodborne Pathogen certified crews",
      "Trauma, suicide, and unattended death scenes",
      "Infectious disease decontamination (incl. C. diff, MRSA)",
      "Sharps and regulated medical waste handling",
      "Discreet, unmarked response vehicles",
      "Insurance-billable in most policies",
    ],
    responseTime: "60 min, day or night",
    outcomes: [
      "Sub-2-hour turn for active hospital decon contracts",
      "Confidential scene management on every engagement",
    ],
    image: "/images/services/biohazard-cleanup.jpg",
  },
  {
    slug: "reconstruction",
    number: "06",
    name: "Reconstruction",
    pitch: "From mitigation to move-back, one accountable contractor.",
    description:
      "Most restoration firms hand you off to a general contractor after mitigation. KPC carries you through reconstruction with the same project manager, the same insurance documentation, and the same accountability. One throat to choke, one schedule to track, one final invoice.",
    bullets: [
      "Licensed general contractor (CA #1067432)",
      "Drywall, flooring, cabinetry, paint, finish carpentry",
      "Roofing and structural framing",
      "MEP coordination through licensed subs",
      "Insurance scope alignment with Xactimate",
      "Final-walk QA with property manager sign-off",
    ],
    responseTime: "Reconstruction scoping within 48 hrs of mitigation completion",
    outcomes: [
      "On-time delivery on 91% of reconstructions",
      "Single point of contact from first call to final invoice",
    ],
    image: "/images/services/reconstruction.jpg",
  },
  {
    slug: "commercial-cleaning",
    number: "07",
    name: "Commercial Cleaning",
    pitch: "Recurring, deep, post-construction. Built for property managers.",
    description:
      "Commercial cleaning isn't janitorial — it's predictable execution at scale. KPC handles post-construction final cleans, recurring deep cleans for hospitality and healthcare, and biohazard-adjacent decontamination. Every recurring contract gets a dedicated account manager.",
    bullets: [
      "Post-construction final and rough cleans",
      "Hospitality turnover and deep cleans",
      "Healthcare environmental services support",
      "Carpet, hard surface, and stone restoration",
      "HVAC and duct cleaning to NADCA standards",
      "Account-managed recurring contracts",
    ],
    responseTime: "Same-week mobilization on recurring contracts",
    outcomes: [
      "Avg. 0.04 complaint rate per 1,000 hotel keys cleaned",
      "30+ active recurring property contracts",
    ],
    image: "/images/services/commercial-cleaning.jpg",
  },
];

export interface Industry {
  slug: IndustrySlug;
  name: string;
  headline: string;
  pitch: string;
  stats: { label: string; value: string }[];
  considerations: string[];
  image: string;
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    headline: "Joint Commission ready. Always.",
    pitch:
      "Healthcare facilities can't shut down. Our crews work around active wards with negative-pressure containment, ICRA-Class IV protocols, and infection-prevention coordination — so patients keep moving while you keep restoring.",
    stats: [
      { label: "ICRA Class IV crews", value: "12" },
      { label: "Active hospital contracts", value: "8" },
      { label: "Avg. ward turnaround", value: "36 hrs" },
    ],
    considerations: [
      "ICRA Class III and IV barrier construction",
      "Negative-pressure work zones with HEPA scrubbing",
      "Infection prevention coordination with EVS leadership",
      "Joint Commission survey-ready documentation",
      "Off-hours and shift-aware scheduling",
    ],
    image: "/images/industries/healthcare.jpg",
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    headline: "Rooms back online before the next reservation.",
    pitch:
      "A hotel room out of service is a room not earning ADR. We compress mitigation and reconstruction timelines, work overnight when needed, and brief front desk so guest comms stay on-message.",
    stats: [
      { label: "Hotels under recurring contract", value: "11" },
      { label: "Avg. room return-to-revenue", value: "4 days" },
      { label: "After-hours crews", value: "24/7" },
    ],
    considerations: [
      "Overnight and split-shift work to protect occupancy",
      "Coordinated front-desk and revenue-management comms",
      "Brand-standard finish matching (Marriott, Hilton, Hyatt)",
      "Floor-by-floor staging that protects adjacent rooms",
      "Single-PM accountability across mitigation and reconstruction",
    ],
    image: "/images/industries/hospitality.jpg",
  },
  {
    slug: "multifamily",
    name: "Multifamily",
    headline: "Resident-aware response. Owner-aware reporting.",
    pitch:
      "Multifamily losses are political: residents need clarity, owners need cost control, and the property manager is in the middle. KPC delivers resident-facing notice templates, daily owner reports, and unit-by-unit completion sign-off.",
    stats: [
      { label: "Units restored YTD", value: "640+" },
      { label: "Avg. unit return-to-lease", value: "11 days" },
      { label: "Resident-facing notice templates", value: "Standard" },
    ],
    considerations: [
      "Resident notification templates and door-tag delivery",
      "Unit-by-unit lockbox and key coordination",
      "Common-area protection and dust control",
      "Daily progress reports to property manager",
      "Reconstruction scope priced to insurance scope",
    ],
    image: "/images/industries/multifamily.jpg",
  },
  {
    slug: "government",
    name: "Government",
    headline: "Cleared, bonded, and contract-ready.",
    pitch:
      "Government work demands paperwork, prevailing wage compliance, and on-site security clearance. KPC operates under master service agreements with three municipalities and one federal facility — and has the insurance and bonding to add yours.",
    stats: [
      { label: "Active municipal MSAs", value: "3" },
      { label: "Federal facility experience", value: "Yes" },
      { label: "Bonded capacity", value: "$5M" },
    ],
    considerations: [
      "Davis-Bacon and prevailing wage compliance",
      "Background-check eligible field staff",
      "MSA, IDIQ, and emergency PO contracting",
      "Daily Force Account labor reports",
      "Disposal manifests for regulated waste",
    ],
    image: "/images/industries/government.jpg",
  },
  {
    slug: "education",
    name: "Education",
    headline: "Restored over the weekend. Open Monday.",
    pitch:
      "K–12 and higher-ed losses are scheduled around academic calendars. We mobilize Friday at last bell and hand the building back at first bell Monday — or work around active classrooms with vetted staff and CDPH-aligned protocols.",
    stats: [
      { label: "K-12 districts served", value: "6" },
      { label: "Higher-ed campuses", value: "2" },
      { label: "Weekend turnarounds completed", value: "47" },
    ],
    considerations: [
      "Background-checked, fingerprinted field staff",
      "CDPH-aligned indoor air quality protocols",
      "Weekend and break-week scheduling",
      "Coordination with district facilities directors",
      "Furniture and AV equipment protection",
    ],
    image: "/images/industries/education.jpg",
  },
];

export interface CaseStudy {
  slug: string;
  property: string;
  type: string;
  loss: string;
  outcome: string;
  metric: string;
  body: string;
  image: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "downtown-medical-tower-pipe-burst",
    property: "Downtown Medical Tower",
    type: "Healthcare",
    loss: "8th-floor riser failure — 14,000 sqft impacted",
    outcome: "Cardiac wing back online in 38 hours, zero patient relocations beyond floor",
    metric: "38 hr",
    body:
      "Sunday night riser failure flooded the 8th and 7th floors of an active cardiac care wing. KPC mobilized two CAT trailers and 22 technicians within 90 minutes. Negative-pressure containment was up by hour 3. Cardiology resumed scheduled procedures on the 8th floor by Tuesday morning.",
    image: "/images/case-studies/medical-tower.jpg",
  },
  {
    slug: "boutique-hotel-kitchen-fire",
    property: "Sea Cliff Boutique Hotel",
    type: "Hospitality",
    loss: "Kitchen fire — Class K + smoke migration to 14 rooms",
    outcome: "All 14 rooms returned to revenue in under 5 days, brand-standard finish match",
    metric: "5 days",
    body:
      "Class K kitchen fire with significant smoke migration via shared HVAC plenum. KPC sealed off the affected floor, ran hydroxyl deodorization on a 36-hour cycle in unoccupied rooms, and re-finished four soft-good replacements to brand standard. Zero guest complaints post-reopen.",
    image: "/images/case-studies/boutique-hotel.jpg",
  },
  {
    slug: "multifamily-storm-portfolio",
    property: "12-Building Multifamily Portfolio",
    type: "Multifamily",
    loss: "Atmospheric river — 92 units across 12 buildings",
    outcome: "Single incident command, daily owner reports, all 92 units released within 14 days",
    metric: "14 days",
    body:
      "January 2023 atmospheric river produced 92 wind-driven rain losses across a single owner's portfolio. KPC stood up incident command, allocated three crew leads by region, and delivered nightly written reports to ownership. All units back to lease-ready within 14 days.",
    image: "/images/case-studies/multifamily-storm.jpg",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  property: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We called KPC at 2:14 a.m. on a Sunday. Trucks were on-site by 3:08. By Tuesday lunch we were running cardiac procedures again. That's the difference.",
    name: "Maria Chen",
    role: "Director of Facilities",
    property: "Downtown Medical Tower",
  },
  {
    quote:
      "Our adjuster told me the documentation KPC delivered was the cleanest restoration file he'd seen all year. The claim moved in days, not weeks.",
    name: "Daniel Ortega",
    role: "Regional Asset Manager",
    property: "Hospitality Portfolio (11 properties)",
  },
  {
    quote:
      "We have an ERA in place. We don't shop restoration when something happens. KPC is the call. They already know the building.",
    name: "Priya Patel",
    role: "Director of Property Management",
    property: "Class A Office Tower, DTLA",
  },
];

export interface Stat {
  label: string;
  target: number;
  prefix?: string;
  suffix?: string;
}

export const STATS: Stat[] = [
  { label: "Average on-site response", target: 60, suffix: " min" },
  { label: "Dispatch availability", target: 365, prefix: "24/7/" },
  { label: "Losses handled to date", target: 10000, suffix: "+" },
  { label: "Commercial property restored", target: 50, prefix: "$", suffix: "M+" },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "Is restoration covered by my commercial property insurance?",
    a: "In most cases, yes. Sudden and accidental water, fire, and storm losses are typically covered under commercial property policies. KPC documents every job to Xactimate scope and works directly with your adjuster — most clients pay only their deductible.",
  },
  {
    q: "How fast can crews actually arrive?",
    a: "Our standard is 60 minutes on-site within our Southern California service area, 24/7/365. Properties on an Emergency Response Agreement get priority dispatch and a 30-minute target.",
  },
  {
    q: "Do you handle the insurance claim, or do I?",
    a: "We handle the documentation — moisture maps, photo logs, daily drying records, Xactimate scopes — and submit them directly to your adjuster. You stay informed without becoming a claims processor.",
  },
  {
    q: "Can you do reconstruction too, or just mitigation?",
    a: "Both. KPC is a licensed general contractor (CA #1067432). Carrying mitigation and reconstruction under one firm means one project manager, one schedule, and one accountability chain.",
  },
  {
    q: "What's an Emergency Response Agreement?",
    a: "A no-cost pre-positioning agreement that gets your facility into our priority dispatch tier. We pre-map your building (utility shutoffs, sensitive areas, contact tree) and pre-negotiate rates — so when something happens, there's nothing to negotiate.",
  },
  {
    q: "Do you work with my insurance carrier?",
    a: "We work with every major commercial carrier including Travelers, Chubb, Liberty Mutual, FM Global, Zurich, AIG, and the Hartford — plus most TPA's. Bring us into the claim or have your carrier do it.",
  },
];
