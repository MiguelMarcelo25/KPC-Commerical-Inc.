import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, ClipboardCheck, FileSignature } from "lucide-react";

import { PhoneButton } from "@/components/phone-button";
import { ProcessTimeline } from "@/components/process-timeline";

export const metadata: Metadata = {
  title: "Our Process — Five steps. Zero confusion.",
  description:
    "Inside the KPC restoration process: dispatch, document, mitigate, restore, and reconstruct. One project manager. One insurance file. Predictable timelines.",
};

const DETAIL_ROWS = [
  {
    n: "01",
    title: "Call & Dispatch",
    detail:
      "Dispatch is staffed 24/7/365 — no answering service, no overflow queue. The intake captures property type, damage source, access details, and on-site contact. Trucks are rolling within 15 minutes of the call ending. Properties on an Emergency Response Agreement skip the intake — we already have it.",
  },
  {
    n: "02",
    title: "Assess & Document",
    detail:
      "Crew lead arrives with thermal imaging, pinless moisture meters, and a digital scope tablet. Every affected room is photographed, mapped, and categorized per IICRC S500 (water) or S520 (mold). Adjuster notification goes out before the first piece of equipment is staged.",
  },
  {
    n: "03",
    title: "Mitigate & Stabilize",
    detail:
      "Containment first. Negative-pressure barriers, HEPA filtration, and PPE on-site before extraction starts. Drying chambers are sized to the loss — not to whatever was on the truck. Daily moisture readings start day one and run through release.",
  },
  {
    n: "04",
    title: "Restore & Clean",
    detail:
      "Once dry, antimicrobial treatment per IICRC S500 protocol, contents cleaning, and (where relevant) independent post-remediation verification. We don&apos;t pass a job to a clearance contractor we own — third-party means third-party.",
  },
  {
    n: "05",
    title: "Reconstruct & Return",
    detail:
      "The same project manager who ran mitigation runs reconstruction. Drywall, paint, flooring, finish carpentry, MEP coordination — all under our GC license. Final walk includes the property manager, written punch list, and signed completion certificate the same day.",
  },
];

const PROMISES = [
  {
    icon: Clock,
    title: "Predictable timelines",
    body: "Every job opens with a written schedule keyed to your operations — not to our equipment availability.",
  },
  {
    icon: ClipboardCheck,
    title: "Daily written updates",
    body: "Property manager and adjuster receive a same-day report by 6 p.m. — moisture readings, photos, next-day plan.",
  },
  {
    icon: FileSignature,
    title: "One signature line",
    body: "Mitigation, drying, reconstruction, and final invoice all sit under one contract with one accountable signer.",
  },
];

export default function ProcessPage() {
  return (
    <>
      {/* HERO */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative">
          <span className="eyebrow">Our process</span>
          <h1 className="mt-5 font-display text-display-xl font-semibold text-white max-w-5xl">
            How we restore.
            <br />
            <span className="text-gradient-signal">Five steps. Zero confusion.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
            Most restoration firms freelance the workflow — every job runs differently because
            every crew lead does it differently. We don&apos;t. The process below is the same on a
            14-unit multifamily as it is on a hospital ward.
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

      {/* TIMELINE — reusing existing component on a light background via wrapping in dark sub-band */}
      <section className="section-light">
        <div className="container-kpc">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="eyebrow">The five steps</span>
              <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink">
                One workflow. Repeated 10,000+ times.
              </h2>
            </div>
            <p className="max-w-md text-kpc-muted leading-relaxed">
              The visual below is the operational playbook every crew lead executes against —
              audited monthly, refined quarterly.
            </p>
          </div>

          {/* The ProcessTimeline component renders on a dark interior card so the
              orange line and white type stay legible while the page section is light. */}
          <div className="rounded-3xl bg-kpc-night text-white p-8 md:p-14 lg:p-16 grain-overlay relative overflow-hidden">
            <div className="relative">
              <ProcessTimeline />
            </div>
          </div>
        </div>
      </section>

      {/* PER-STEP DETAIL */}
      <section className="section-paper">
        <div className="container-kpc">
          <div className="max-w-2xl mb-14">
            <span className="eyebrow">Inside each step</span>
            <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink">
              What actually happens behind each label.
            </h2>
          </div>
          <div className="space-y-3">
            {DETAIL_ROWS.map((r) => (
              <article
                key={r.n}
                className="grid grid-cols-12 gap-6 card-light p-7 md:p-8 items-start"
              >
                <div className="col-span-12 md:col-span-3">
                  <div className="font-display text-sm font-semibold text-kpc-signal tabular-nums tracking-wider">
                    Step {r.n}
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-kpc-ink leading-tight">
                    {r.title}
                  </h3>
                </div>
                <p
                  className="col-span-12 md:col-span-9 text-kpc-muted leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: r.detail }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROMISES */}
      <section className="section-light">
        <div className="container-kpc">
          <div className="max-w-2xl mb-14">
            <span className="eyebrow">What you get</span>
            <h2 className="mt-4 font-display text-display-lg font-semibold text-kpc-ink">
              Three deliverables, on every job.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {PROMISES.map((p) => {
              const Icon = p.icon;
              return (
                <article key={p.title} className="card-light p-7 md:p-8 h-full">
                  <div className="size-12 rounded-2xl bg-kpc-night text-kpc-signal flex items-center justify-center mb-5">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-kpc-ink leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-kpc-muted leading-relaxed">{p.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-dark grain-overlay">
        <div className="container-kpc relative text-center">
          <span className="eyebrow justify-center">Ready to start</span>
          <h2 className="mt-5 mx-auto font-display text-display-lg font-semibold text-white max-w-3xl">
            Every loss starts at step one.
          </h2>
          <p className="mt-5 mx-auto max-w-xl text-white/70 leading-relaxed">
            Call now and a dispatcher walks you through it in under two minutes — or open a damage
            report and our team takes it from there.
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
