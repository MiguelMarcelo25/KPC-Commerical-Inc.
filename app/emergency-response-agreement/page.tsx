import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Map, Receipt, Check } from "lucide-react";

import { PhoneButton } from "@/components/phone-button";
import { FaqAccordion } from "@/components/faq-accordion";
import type { Faq } from "@/lib/content";

export const metadata: Metadata = {
  title: "Emergency Response Agreement — Skip the chaos. Sign an ERA.",
  description:
    "An Emergency Response Agreement gets your facility into KPC's priority dispatch tier — pre-mapped building, pre-negotiated rates, and a 30-minute response target.",
};

const VALUE_PROPS = [
  {
    icon: Zap,
    title: "Priority dispatch",
    body: "ERA properties move to the front of the queue. 30-minute response target. Crews know the building before they roll.",
  },
  {
    icon: Map,
    title: "Pre-mapped facility",
    body: "Utility shutoffs, sensitive areas, after-hours access, and life-safety contacts logged before the loss — not during it.",
  },
  {
    icon: Receipt,
    title: "Pre-negotiated rates",
    body: "Time-and-material rates, equipment fees, and project management hours fixed in advance. No mid-loss negotiation.",
  },
];

const INCLUDED = [
  "On-site facility walk and pre-loss documentation",
  "Utility shutoff map (water, power, gas, HVAC isolation)",
  "Sensitive-area protocols (server rooms, archives, MRI suites)",
  "After-hours and weekend access procedures",
  "24/7 priority dispatch with 30-minute response target",
  "Pre-negotiated time-and-material rate sheet",
  "Designated project manager familiar with your portfolio",
  "Quarterly contact-list refresh and re-validation",
  "Annual building re-walk at no additional cost",
  "Direct adjuster intro letter on file with your carrier",
];

const FOR_WHOM = [
  {
    label: "Commercial property managers",
    body: "Class A office, mixed-use, and industrial portfolios where downtime translates directly to tenant complaints.",
  },
  {
    label: "Hospitals & healthcare systems",
    body: "Joint Commission-surveyed facilities that cannot tolerate ad-hoc vendor mobilization.",
  },
  {
    label: "Hotels & hospitality groups",
    body: "Branded properties with revenue-per-available-room exposure on every out-of-service night.",
  },
  {
    label: "Multifamily owners & operators",
    body: "Mid-to-large portfolios with multi-property storm exposure and resident-facing communication needs.",
  },
];

const ERA_FAQS: Faq[] = [
  {
    q: "Does an ERA cost anything?",
    a: "No. The agreement, the building walk, the pre-mapping, and the rate sheet are all delivered at no charge. We invest the time because pre-staged knowledge is what makes a 30-minute response possible.",
  },
  {
    q: "Are we obligated to use KPC if we sign?",
    a: "No. The ERA is non-exclusive. You can call us, you can call someone else, you can call no one. The agreement just guarantees that if you do call us, you skip intake and land at the top of dispatch.",
  },
  {
    q: "How long does setup take?",
    a: "About four weeks from first call to fully operational ERA: initial meeting, on-site walk (2-4 hours per building), document review, and rate-sheet sign-off. Most clients are live within 30 days.",
  },
  {
    q: "What if we already have a preferred restoration vendor?",
    a: "Many of our ERA clients keep us as a secondary or overflow contact behind a primary vendor — particularly during regional CAT events when the primary is at capacity. We&apos;re comfortable being second-call.",
  },
  {
    q: "Can the ERA span multiple properties?",
    a: "Yes. We routinely sign single ERAs covering 5-20 properties under one ownership structure, with per-property building walks and a master rate sheet. Portfolio pricing applies above five properties.",
  },
];

export default function EraPage() {
  return (
    <>
      {/* HERO */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative">
          <span className="eyebrow">Emergency Response Agreement</span>
          <h1 className="mt-5 font-display text-display-xl font-semibold text-white max-w-5xl">
            Skip the chaos.
            <br />
            <span className="text-gradient-signal">Sign an ERA.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
            A no-cost pre-positioning agreement that gets your facility into our priority
            dispatch tier. We learn your building before the loss — so when something happens,
            there&apos;s nothing to negotiate.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact?type=era">
              <span className="inline-flex h-14 items-center gap-2 rounded-xl bg-kpc-signal px-8 font-semibold text-white shadow-kpc-glow hover:brightness-110 transition focus-ring">
                Become a priority client
                <ArrowRight className="size-4" />
              </span>
            </Link>
            <PhoneButton pulse magnetic />
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="section-light">
        <div className="container-kpc">
          <div className="max-w-2xl mb-14">
            <span className="eyebrow">Why an ERA</span>
            <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink">
              Three reasons. Each one matters at 2 a.m.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {VALUE_PROPS.map((p) => {
              const Icon = p.icon;
              return (
                <article key={p.title} className="card-light p-7 md:p-8 h-full">
                  <div className="size-12 rounded-2xl bg-kpc-night text-kpc-signal flex items-center justify-center mb-5">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-kpc-ink leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-kpc-muted leading-relaxed">{p.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="section-paper">
        <div className="container-kpc grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="eyebrow">What&apos;s included</span>
            <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink">
              Ten deliverables. One signed page.
            </h2>
            <p className="mt-5 text-kpc-muted leading-relaxed max-w-md">
              The agreement itself is two pages. The intelligence behind it — building walks,
              shutoff maps, contact trees — is what does the work when an event happens.
            </p>
          </div>
          <ul className="lg:col-span-7 space-y-3">
            {INCLUDED.map((it) => (
              <li
                key={it}
                className="flex items-start gap-4 card-light p-5"
              >
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-kpc-signal text-white">
                  <Check className="size-3.5" />
                </span>
                <span className="text-kpc-ink leading-relaxed">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="section-light">
        <div className="container-kpc">
          <div className="max-w-2xl mb-14">
            <span className="eyebrow">Who signs ERAs</span>
            <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink">
              Property owners with downtime exposure.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {FOR_WHOM.map((f) => (
              <article key={f.label} className="card-light p-7 md:p-8">
                <h3 className="font-display text-xl font-semibold text-kpc-ink leading-snug">
                  {f.label}
                </h3>
                <p className="mt-3 text-kpc-muted leading-relaxed">{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-paper">
        <div className="container-kpc grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">ERA FAQ</span>
            <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink">
              The questions every signer asks.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={ERA_FAQS} />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative text-center">
          <span className="eyebrow justify-center">Free to set up. Worth it the first call.</span>
          <h2 className="mt-5 mx-auto font-display text-display-lg font-semibold text-white max-w-3xl">
            Become a priority client.
          </h2>
          <p className="mt-5 mx-auto max-w-xl text-white/70 leading-relaxed">
            Schedule a 30-minute discovery call. We&apos;ll walk you through the agreement, the
            building-walk process, and the rate sheet — no commitment until you&apos;ve seen the
            paper.
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <Link href="/contact?type=era">
              <span className="inline-flex h-16 items-center gap-2 rounded-xl bg-kpc-signal px-10 text-lg font-semibold text-white shadow-kpc-glow hover:brightness-110 transition focus-ring">
                Become a priority client
                <ArrowRight className="size-5" />
              </span>
            </Link>
            <PhoneButton pulse magnetic size="xl" />
          </div>
        </div>
      </section>
    </>
  );
}
