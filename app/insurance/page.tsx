import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Camera, Ruler, Clock, Phone, Headphones } from "lucide-react";

import { SITE } from "@/lib/site";
import { PhoneButton } from "@/components/phone-button";

export const metadata: Metadata = {
  title: "For Insurance — Adjuster portal. Or just adjuster-friendly.",
  description:
    "KPC documents every commercial restoration to Xactimate scope, delivers daily photo and moisture logs, and submits 24-hour claim files to TPAs and direct carriers.",
};

const DOC_BLOCKS = [
  {
    icon: Ruler,
    title: "Xactimate-aligned scoping",
    body: "Every loss is scoped to current Xactimate price lists for the affected zip. Line items map cleanly to your estimating platform — no wrestle, no markup surprises.",
  },
  {
    icon: Camera,
    title: "Photo log, geo-tagged",
    body: "Every affected room photographed at arrival, mid-mitigation, and release. Each frame tagged with date, time, and room ID — exportable as PDF or CSV with the file.",
  },
  {
    icon: FileText,
    title: "Moisture mapping & drying logs",
    body: "Daily moisture readings per chamber, recorded in IICRC-format drying logs. Standard at no charge on every Category 1, 2, and 3 water loss.",
  },
  {
    icon: Clock,
    title: "24-hour claim file delivery",
    body: "First file lands in the adjuster's inbox within 24 hours of mitigation start — not 24 hours of completion. The claim moves while the building dries.",
  },
];

const CARRIERS = [
  "Travelers",
  "Chubb",
  "Liberty Mutual",
  "FM Global",
  "Zurich",
  "AIG",
  "The Hartford",
  "CNA",
  "Sentry",
  "Sedgwick (TPA)",
  "Crawford (TPA)",
  "Gallagher Bassett (TPA)",
];

export default function InsurancePage() {
  return (
    <>
      {/* HERO */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative">
          <span className="eyebrow">For insurance professionals</span>
          <h1 className="mt-5 font-display text-display-xl font-semibold text-white max-w-5xl">
            Adjuster portal.
            <br />
            <span className="text-gradient-signal">Or just adjuster-friendly.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
            We work the way claims professionals already work: Xactimate scopes, daily logs,
            cycle-time discipline. Bring KPC into the loss directly or have your insured make the
            assignment — either way, the file is moving.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <PhoneButton pulse magnetic />
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition"
            >
              See documentation samples
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* DOCUMENTATION BLOCKS */}
      <section className="section-light">
        <div className="container-kpc">
          <div className="max-w-2xl mb-14">
            <span className="eyebrow">How we document</span>
            <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink">
              The file builds itself while the building dries.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {DOC_BLOCKS.map((b) => {
              const Icon = b.icon;
              return (
                <article key={b.title} className="card-light p-7 md:p-8">
                  <div className="size-12 rounded-2xl bg-kpc-night text-kpc-signal flex items-center justify-center mb-5">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-kpc-ink leading-snug">
                    {b.title}
                  </h3>
                  <p className="mt-4 text-kpc-muted leading-relaxed">{b.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* DIRECT ADJUSTER LINE */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow">Direct adjuster line</span>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-white">
                Skip the intake. We already know you.
              </h2>
              <p className="mt-5 max-w-xl text-lg text-white/70 leading-relaxed">
                Adjusters and TPA file handlers reach a project manager directly — same number,
                identify yourself as a carrier, and you&apos;re routed past intake to the PM
                running the loss. Same-day callbacks guaranteed.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="card-dark p-7 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="size-12 rounded-2xl bg-kpc-signal/15 text-kpc-signal flex items-center justify-center">
                    <Headphones className="size-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                      Carrier line
                    </div>
                    <div className="text-white font-semibold">Routed to PM, not intake</div>
                  </div>
                </div>
                <PhoneButton pulse withLabel className="w-full" />
                <div className="mt-4 pt-4 border-t border-white/8 text-sm text-white/65">
                  Or email{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-kpc-signal hover:underline"
                  >
                    {SITE.email}
                  </a>{" "}
                  with your claim number — we attach the file and reply within the hour.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARRIERS GRID */}
      <section className="section-paper">
        <div className="container-kpc">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow">Carriers we work with</span>
            <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink">
              Every major commercial carrier. Most TPAs.
            </h2>
            <p className="mt-5 text-kpc-muted leading-relaxed">
              We don&apos;t maintain exclusive panel relationships — every carrier below has had
              losses assigned to KPC in the last 24 months.
            </p>
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {CARRIERS.map((c) => (
              <div
                key={c}
                className="aspect-square rounded-full border border-black/8 bg-white shadow-[0_8px_30px_-10px_rgba(0,0,0,0.06)] flex items-center justify-center p-4 text-center"
                aria-label={`Carrier: ${c}`}
              >
                <span className="font-display text-sm font-semibold text-kpc-ink leading-tight">
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMISE STRIP */}
      <section className="section-light">
        <div className="container-kpc">
          <div className="card-light p-8 md:p-12 grid gap-10 md:grid-cols-12 items-center">
            <div className="md:col-span-7">
              <span className="eyebrow">The promise</span>
              <h2 className="mt-4 font-display text-display-md font-semibold text-kpc-ink">
                24-hour claim file. Every loss. No exceptions.
              </h2>
              <p className="mt-5 text-kpc-muted leading-relaxed max-w-xl">
                Initial scope, photo set, moisture map, and drying plan land in the assigned
                adjuster&apos;s inbox within 24 hours of the truck arriving on-site. That&apos;s
                the standard, in writing, on every engagement.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="card-light bg-kpc-night text-white p-7">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="size-5 text-kpc-signal" />
                  <span className="text-xs uppercase tracking-[0.18em] text-kpc-signal">
                    Direct line
                  </span>
                </div>
                <div className="font-display text-2xl font-semibold mb-4">
                  Make an assignment now
                </div>
                <PhoneButton pulse withLabel className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative text-center">
          <span className="eyebrow justify-center">Two-way street</span>
          <h2 className="mt-5 mx-auto font-display text-display-lg font-semibold text-white max-w-3xl">
            Want a panel agreement?
          </h2>
          <p className="mt-5 mx-auto max-w-xl text-white/70 leading-relaxed">
            We&apos;re selectively open to MSAs and panel additions with carriers and TPAs whose
            commercial portfolio overlaps our service area. Call to talk volume, capacity, and
            preferred-vendor structure.
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <PhoneButton pulse magnetic size="xl" />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition"
            >
              Send a written intro
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
