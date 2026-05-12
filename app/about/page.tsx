import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, Users } from "lucide-react";

import { SITE } from "@/lib/site";
import { PhoneButton } from "@/components/phone-button";

export const metadata: Metadata = {
  title: "About — Built for the calls nobody else picks up",
  description: `Founded in ${SITE.founded}, ${SITE.name} is a Southern California commercial restoration firm engineered for speed: IICRC certified, OSHA compliant, and dispatched 24/7/365.`,
};

const LEADERSHIP = [
  {
    name: "Karim P. Castillo",
    role: "Founder & Principal",
    bio: "Karim founded KPC in 1989 after a decade running mitigation crews for a national franchise. He still answers the after-hours dispatch line on Sundays.",
  },
  {
    name: "Renata Olufsen",
    role: "VP, Operations",
    bio: "Renata runs the dispatch floor and crew scheduling. Eighteen years in commercial restoration, formerly an ICRA-IV barrier specialist for two LA hospital systems.",
  },
  {
    name: "Marcus Whitfield",
    role: "Director, Reconstruction",
    bio: "Marcus carries every loss from mitigation through final walk. CSL-licensed since 2004, with 600+ commercial reconstructions delivered on his ledger.",
  },
];

const PILLARS = [
  {
    title: "Speed without shortcuts",
    body: "60-minute on-site response is the headline. The discipline behind it is what we recruit, train, and audit for: stocked trucks, pre-mapped facilities, and crew leads with the authority to execute on arrival.",
  },
  {
    title: "Documentation as a deliverable",
    body: "Insurance pays the bill. We treat the claim file the same way a surgeon treats the chart: photo logs, moisture maps, scope alignment with Xactimate, and daily updates to the adjuster — all standard, never a service add.",
  },
  {
    title: "One firm, end to end",
    body: "Mitigation hands off to reconstruction inside the same company, with the same project manager. No renegotiated scope. No second insurance file. No new walk-through six weeks in.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative">
          <span className="eyebrow">About KPC</span>
          <h1 className="mt-5 font-display text-display-xl font-semibold text-white max-w-5xl">
            Built for the calls
            <br />
            <span className="text-gradient-signal">nobody else picks up.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
            Since {SITE.founded}, {SITE.name} has answered the 2 a.m. Sunday calls — burst risers,
            ward floods, kitchen fires, atmospheric rivers. We grew this company on the losses
            other restoration firms rescheduled.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <PhoneButton pulse magnetic />
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition"
            >
              See selected work
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="section-light">
        <div className="container-kpc grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="eyebrow">Our story</span>
            <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink">
              {new Date().getFullYear() - SITE.founded} years. Same phone number.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-lg text-kpc-ink/85 leading-relaxed">
            <p>
              KPC opened in {SITE.founded} with one truck, three technicians, and a single Class A
              office contract in downtown Los Angeles. The first job was a chiller-line failure
              that displaced two floors of tenants on a holiday weekend. We finished it in four days
              and got a second contract before the first invoice cleared.
            </p>
            <p>
              Thirty-plus years later, the company looks different — eight CAT trailers,
              {" "}{LEADERSHIP.length}-person leadership team, three dozen full-time technicians, and a
              reconstruction division licensed under CA #1067432. The phone number on the truck is
              the same one on the original business card.
            </p>
            <p>
              We are deliberately mid-sized. Big enough to roll a fleet to a 14-property storm
              loss; small enough that the founder still works a Sunday rotation on the dispatch line.
              That balance is the product.
            </p>
          </div>
        </div>
      </section>

      {/* WHY WE EXIST */}
      <section className="section-paper">
        <div className="container-kpc">
          <div className="max-w-3xl mb-14">
            <span className="eyebrow">Why we exist</span>
            <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink">
              Property losses already lose money. The response shouldn&apos;t add to it.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {PILLARS.map((p) => (
              <article
                key={p.title}
                className="card-light p-7 md:p-8 h-full"
              >
                <h3 className="font-display text-2xl font-semibold text-kpc-ink leading-snug">
                  {p.title}
                </h3>
                <p className="mt-4 text-kpc-muted leading-relaxed">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS GRID */}
      <section className="section-light">
        <div className="container-kpc">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-xl">
              <span className="eyebrow">Credentials</span>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink">
                Certified, bonded, audited.
              </h2>
              <p className="mt-5 text-kpc-muted leading-relaxed">
                Every certification below is current, individually held by named technicians where
                required, and re-verified on the schedule the issuing body demands.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-kpc-muted">
              <ShieldCheck className="size-4 text-kpc-signal" />
              CA GC License #1067432
            </div>
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {SITE.certifications.map((c) => (
              <div
                key={c.short}
                className="aspect-square rounded-2xl border border-black/8 bg-white p-5 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_-10px_rgba(0,0,0,0.06)]"
              >
                <Award className="size-7 text-kpc-signal mb-3" aria-hidden />
                <div className="font-display font-semibold text-sm text-kpc-ink leading-tight">
                  {c.short}
                </div>
                <div className="mt-1 text-[11px] text-kpc-muted leading-snug">{c.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO BAND PLACEHOLDER */}
      <section className="bg-kpc-night py-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            "Crew loading CAT trailer, 4 a.m.",
            "Negative-pressure containment, hospital corridor",
            "Moisture map review, project manager + adjuster",
            "Final walk, multifamily reconstruction",
          ].map((caption, i) => (
            <div
              key={caption}
              className="relative aspect-[4/5] overflow-hidden bg-kpc-deep"
            >
              {/* IMAGE: documentary photo of {caption} */}
              <div className="absolute inset-0 bg-gradient-to-br from-kpc-deep via-kpc-steel to-kpc-night" />
              <div className="absolute inset-0 grain-overlay" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-kpc-night/95 to-transparent">
                <span className="text-[10px] uppercase tracking-[0.18em] text-kpc-signal">
                  Frame {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-1 text-xs text-white/85 leading-snug">{caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="section-paper">
        <div className="container-kpc">
          <div className="max-w-2xl mb-14">
            <span className="eyebrow">Leadership</span>
            <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink">
              Three people with the authority to say yes.
            </h2>
            <p className="mt-5 text-kpc-muted leading-relaxed">
              The folks below carry the pager, sign the proposals, and pick up when a property
              manager calls at 11 p.m. asking what just happened.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {LEADERSHIP.map((p) => (
              <article key={p.name} className="card-light p-7 md:p-8">
                <div className="flex items-center gap-4 mb-5">
                  <div className="size-14 rounded-2xl bg-kpc-night flex items-center justify-center text-kpc-signal">
                    <Users className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-kpc-ink leading-tight">
                      {p.name}
                    </h3>
                    <div className="text-sm text-kpc-muted mt-0.5">{p.role}</div>
                  </div>
                </div>
                <p className="text-sm text-kpc-muted leading-relaxed">{p.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative text-center">
          <span className="eyebrow justify-center">Talk to a person</span>
          <h2 className="mt-5 mx-auto font-display text-display-lg font-semibold text-white max-w-3xl">
            Want to vet us before you need us?
          </h2>
          <p className="mt-5 mx-auto max-w-xl text-white/70 leading-relaxed">
            That&apos;s the right time to call. We&apos;ll walk a building, set up an Emergency Response
            Agreement, and pre-map your facility — before a loss makes the introduction.
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <PhoneButton pulse magnetic size="xl" />
            <Link
              href="/emergency-response-agreement"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition"
            >
              About Emergency Response Agreements
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
