import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

import { CASE_STUDIES, type CaseStudy } from "@/lib/content";
import { PhoneButton } from "@/components/phone-button";
import { CaseStudyCard } from "@/components/case-study-card";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const c = CASE_STUDIES.find((x) => x.slug === slug);
  if (!c) return { title: "Case study not found" };
  return {
    title: `${c.property} — ${c.type} case study`,
    description: `${c.loss}. Outcome: ${c.outcome}.`,
  };
}

/**
 * Per-loss recap derived from the case body. We render a fixed scaffold
 * ("what we did" bullets) generated per type so every page holds shape
 * even if a future case study gets added with a sparse body field.
 */
function whatWeDid(c: CaseStudy): string[] {
  const base = [
    "Mobilized within 90 minutes of first call",
    "Stood up containment and documentation before extraction",
    "Ran daily moisture and progress reports to ownership and adjuster",
    "Coordinated reconstruction under the same project manager",
    "Released the property with a written completion certificate",
  ];
  if (c.type === "Healthcare") {
    base.splice(2, 0, "Coordinated with infection prevention and EVS leadership under ICRA-IV protocols");
  } else if (c.type === "Hospitality") {
    base.splice(2, 0, "Worked off-hours to protect occupancy and brand standards");
  } else if (c.type === "Multifamily") {
    base.splice(2, 0, "Issued resident notification door-tags and tracked unit-level access");
  }
  return base;
}

export default async function CaseStudyPage({ params }: RouteParams) {
  const { slug } = await params;
  const c = CASE_STUDIES.find((x) => x.slug === slug);
  if (!c) notFound();

  const others = CASE_STUDIES.filter((x) => x.slug !== c.slug);
  const bullets = whatWeDid(c);

  return (
    <>
      {/* HERO */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition mb-8"
          >
            <ArrowLeft className="size-4" />
            All case studies
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-md bg-white/10 text-white/85 text-xs uppercase tracking-[0.18em]">
              {c.type}
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-white/50">
              Outcome: {c.metric}
            </span>
          </div>

          <h1 className="font-display text-display-xl font-semibold text-white max-w-5xl">
            {c.property}
          </h1>
          <p className="mt-7 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
            {c.loss}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-3xl">
            <div className="card-dark p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-kpc-signal mb-2">
                Headline metric
              </div>
              <div className="font-display text-3xl font-semibold text-white">{c.metric}</div>
            </div>
            <div className="card-dark p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-kpc-signal mb-2">
                Outcome
              </div>
              <div className="text-white text-base leading-snug">{c.outcome}</div>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="section-paper">
        <div className="container-kpc grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <span className="eyebrow">The work</span>
            <h2 className="mt-4 font-display text-display-md font-semibold text-kpc-ink">
              What the loss looked like, what we did about it.
            </h2>
            <div className="mt-8 prose prose-lg max-w-none">
              <p className="text-lg text-kpc-ink/85 leading-relaxed text-pretty">{c.body}</p>
              <p className="mt-6 text-lg text-kpc-ink/85 leading-relaxed text-pretty">
                Documentation flowed to the adjuster nightly: photo log, moisture readings,
                affected-area schematics, and an updated Xactimate scope when the work changed.
                Ownership received a same-day written summary by 6 p.m. every day the crews were
                on-site.
              </p>
            </div>

            {/* What we did bullets */}
            <div className="mt-12 card-light p-7 md:p-8">
              <h3 className="font-display text-2xl font-semibold text-kpc-ink mb-5">
                What we did
              </h3>
              <ul className="space-y-3">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-kpc-ink/85">
                    <span className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-kpc-signal/15 text-kpc-signal">
                      <Check className="size-3" />
                    </span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-4">
              <div className="card-light p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-kpc-muted mb-3">
                  Property
                </div>
                <div className="font-display text-lg font-semibold text-kpc-ink mb-1">
                  {c.property}
                </div>
                <div className="text-sm text-kpc-muted">{c.type}</div>
              </div>
              <div className="card-light p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-kpc-muted mb-3">
                  Loss
                </div>
                <div className="text-sm text-kpc-ink leading-relaxed">{c.loss}</div>
              </div>
              <div className="card-light p-6 bg-kpc-night text-white">
                <div className="text-xs uppercase tracking-[0.18em] text-kpc-signal mb-3">
                  Have a similar loss?
                </div>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  Same crew, same documentation, available now.
                </p>
                <PhoneButton pulse withLabel={false} className="w-full" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* OTHER CASES */}
      {others.length > 0 && (
        <section className="section-light">
          <div className="container-kpc">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <span className="eyebrow">Other cases</span>
                <h2 className="mt-4 font-display text-display-md font-semibold text-kpc-ink">
                  More from the file room.
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm font-semibold text-kpc-ink hover:text-kpc-signal transition"
              >
                See all
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none">
              <div className="flex gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 min-w-max sm:min-w-0">
                {others.map((o) => (
                  <div key={o.slug} className="w-[320px] sm:w-auto flex-shrink-0">
                    <CaseStudyCard c={o} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative text-center">
          <span className="eyebrow justify-center">Yours next</span>
          <h2 className="mt-5 mx-auto font-display text-display-lg font-semibold text-white max-w-3xl">
            Same playbook. Different building.
          </h2>
          <p className="mt-5 mx-auto max-w-xl text-white/70 leading-relaxed">
            The case above ran the same five-step process every loss does. Call now and a
            dispatcher routes the right crew to your site within the hour.
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <PhoneButton pulse magnetic size="xl" />
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
    </>
  );
}
