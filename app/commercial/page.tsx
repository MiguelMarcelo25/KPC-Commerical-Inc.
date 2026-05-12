import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  ShieldCheck,
  Timer,
  Users,
  Wrench,
  FileText,
} from "lucide-react";

import { INDUSTRIES, SERVICES, STATS } from "@/lib/content";
import { SITE } from "@/lib/site";
import { ServiceCard } from "@/components/service-card";
import { StatCounter } from "@/components/stat-counter";
import { PhoneButton } from "@/components/phone-button";
import { MarqueeStrip } from "@/components/marquee-strip";

export const metadata: Metadata = {
  title: "Commercial Restoration — Built for property managers, owners, and carriers",
  description:
    "KPC exists for commercial property. Single-PM accountability, Xactimate-aligned scopes, ICRA Class IV crews, 60-minute response, reconstruction in-house. Become a priority client.",
};

const DIFFERENTIATORS = [
  {
    icon: Users,
    title: "Single-PM accountability",
    body: "One project manager owns the loss from first-call to final walkthrough. No vendor handoffs, no finger-pointing.",
  },
  {
    icon: FileText,
    title: "Xactimate-aligned scopes",
    body: "Every scope is built to the same line items your adjuster prices. Claims close in days, not weeks.",
  },
  {
    icon: ShieldCheck,
    title: "ICRA Class IV crews",
    body: "Negative-pressure containment, HEPA scrubbing, and infection-prevention coordination on every healthcare job.",
  },
  {
    icon: Timer,
    title: "60-minute response",
    body: "Standard on-site within an hour, 24/7/365. ERA properties get a 30-minute target with pre-mapped buildings.",
  },
  {
    icon: Wrench,
    title: "Reconstruction in-house",
    body: "Licensed GC (CA #1067432). Carry the loss from mitigation through finish carpentry without a second contract.",
  },
  {
    icon: ClipboardCheck,
    title: "Emergency Response Agreements",
    body: "No-cost pre-positioning. Pre-mapped utility shutoffs, pre-negotiated rates, priority dispatch.",
  },
];

export default function CommercialPage() {
  return (
    <>
      {/* HERO */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative">
          <span className="eyebrow">Commercial</span>
          <h1 className="mt-5 font-display text-display-xl font-semibold text-white max-w-5xl">
            Built for commercial property.
          </h1>
          <p className="mt-7 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
            We exist for commercial property managers, asset owners, and insurance
            partners. Not consumer cleanup. Not residential carpet. The portfolio losses
            other firms can&rsquo;t staff are the work we built our company around.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <PhoneButton pulse magnetic />
            <Link
              href="/emergency-response-agreement"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition"
            >
              Become a priority client
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-kpc-night pb-24 md:pb-32 -mt-8">
        <div className="container-kpc">
          <StatCounter stats={STATS} />
        </div>
      </section>

      {/* PITCH */}
      <section className="section-light">
        <div className="container-kpc">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="eyebrow">Why we exist</span>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink">
                Consumer cleanup is a different business. We&rsquo;re not it.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-5 text-lg text-kpc-muted leading-relaxed">
              <p>
                Most restoration brands sell residential and commercial out of the same
                truck. The result is predictable: residential carpet gets the A-team,
                your 14,000 sqft loss gets whoever&rsquo;s left.
              </p>
              <p>
                KPC was incorporated in {SITE.founded} for one customer profile —
                commercial property managers, asset owners, and the carriers who insure
                them. Every crew, truck, certification, and document template is built
                for that buyer.
              </p>
              <p className="text-kpc-ink font-medium">
                If you don&rsquo;t manage commercial real estate, we&rsquo;re probably
                the wrong call. If you do, we&rsquo;re the only call you should need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="section-paper">
        <div className="container-kpc">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <span className="eyebrow">Industries</span>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink max-w-2xl">
                Five verticals. Different rules. Same standard.
              </h2>
            </div>
            <p className="max-w-md text-kpc-muted leading-relaxed">
              Each vertical has its own compliance regime, scheduling reality, and
              communication chain. We&rsquo;ve built a playbook for each.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="group relative card-light p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(255,122,26,0.35)] hover:border-kpc-signal/30"
              >
                <div className="flex items-center gap-3 text-kpc-signal">
                  <Building2 className="size-5" />
                  <span className="text-xs uppercase tracking-[0.22em] font-semibold">
                    {ind.name}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl md:text-2xl font-semibold text-kpc-ink leading-tight">
                  {ind.headline}
                </h3>
                <p className="mt-3 text-sm text-kpc-muted leading-relaxed">
                  {ind.pitch}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-kpc-ink group-hover:text-kpc-signal transition-colors">
                  Open the {ind.name.toLowerCase()} playbook
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY KPC — DIFFERENTIATORS */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative">
          <div className="max-w-3xl">
            <span className="eyebrow">Why KPC</span>
            <h2 className="mt-4 font-display text-display-lg font-semibold text-white">
              Six things our competitors can&rsquo;t put on a quote.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="card-dark p-7 hover:border-kpc-signal/30 transition-colors"
              >
                <div className="size-12 rounded-xl bg-white/5 text-kpc-signal flex items-center justify-center mb-5">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm text-white/65 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section-light">
        <div className="container-kpc">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <span className="eyebrow">Services</span>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink max-w-2xl">
                Seven disciplines. One contract.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-kpc-ink hover:text-kpc-signal transition"
            >
              See every service
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SERVICES.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* INSURANCE PARTNERS STRIP */}
      <section className="bg-kpc-night text-white pt-16 pb-4">
        <div className="container-kpc mb-10">
          <div className="flex items-center gap-3 text-white/70">
            <ShieldCheck className="size-5 text-kpc-signal" />
            <span className="text-sm uppercase tracking-[0.22em]">
              Approved by every major commercial carrier
            </span>
          </div>
        </div>
        <MarqueeStrip
          items={[
            { label: "Travelers" },
            { label: "Chubb" },
            { label: "Liberty Mutual" },
            { label: "FM Global" },
            { label: "Zurich" },
            { label: "AIG" },
            { label: "The Hartford" },
            { label: "Nationwide" },
            { label: "CNA" },
            { label: "Sedgwick" },
          ]}
        />
      </section>

      {/* FINAL CTA */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow">Become a priority client</span>
              <h2 className="mt-5 font-display text-display-lg font-semibold text-white">
                Pre-position your portfolio.
                <br />
                Skip the search when something happens.
              </h2>
              <p className="mt-6 max-w-xl text-white/70 leading-relaxed">
                Our Emergency Response Agreement is no-cost. We pre-map your buildings,
                pre-negotiate rates, and put your portfolio into our priority dispatch
                tier. The next loss starts with a 30-minute target instead of a search.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-4">
              <Link
                href="/emergency-response-agreement"
                className="group card-dark p-6 hover:border-kpc-signal/40 transition-colors flex items-center justify-between gap-4"
              >
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-kpc-signal font-semibold">
                    Step 1
                  </div>
                  <div className="mt-1 font-display text-lg text-white">
                    Sign the ERA — no cost
                  </div>
                </div>
                <ArrowRight className="size-5 text-white/60 group-hover:translate-x-1 group-hover:text-white transition" />
              </Link>
              <PhoneButton pulse magnetic size="xl" className="w-full justify-center" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
