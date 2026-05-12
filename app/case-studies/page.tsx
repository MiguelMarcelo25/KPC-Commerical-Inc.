import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CASE_STUDIES } from "@/lib/content";
import { PhoneButton } from "@/components/phone-button";
import { CaseStudiesGrid } from "@/components/case-studies-grid";

export const metadata: Metadata = {
  title: "Case Studies — Selected work",
  description:
    "Selected commercial restoration case studies from KPC: hospital floods, hotel fires, and multi-property storm responses across Southern California.",
};

export default function CaseStudiesIndexPage() {
  return (
    <>
      {/* HERO */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative">
          <span className="eyebrow">Case studies</span>
          <h1 className="mt-5 font-display text-display-xl font-semibold text-white max-w-5xl">
            Selected work.
            <br />
            <span className="text-gradient-signal">Real losses. Real outcomes.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
            A short list of projects where the timeline, the documentation, or the recovery
            mattered enough to write down. Names of operators are protected; the details are not.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <PhoneButton pulse magnetic />
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition"
            >
              Start a damage report
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="section-light">
        <div className="container-kpc">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div className="max-w-xl">
              <span className="eyebrow">Filter by industry</span>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink">
                Pick a vertical.
              </h2>
            </div>
            <p className="max-w-md text-kpc-muted leading-relaxed">
              Healthcare, hospitality, multifamily — each environment has its own constraints.
              We staff and document accordingly.
            </p>
          </div>

          <CaseStudiesGrid items={CASE_STUDIES} />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative text-center">
          <span className="eyebrow justify-center">Your case is next</span>
          <h2 className="mt-5 mx-auto font-display text-display-lg font-semibold text-white max-w-3xl">
            Most cases never reach this page.
          </h2>
          <p className="mt-5 mx-auto max-w-xl text-white/70 leading-relaxed">
            Confidentiality is the default. If you&apos;d rather your loss not become marketing,
            it won&apos;t — and we&apos;ll still document the work to the same standard.
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <PhoneButton pulse magnetic size="xl" />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition"
            >
              Talk to a project manager
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
