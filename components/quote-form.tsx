"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Camera, Droplet, Flame, Wind, Bug, AlertOctagon, MoreHorizontal } from "lucide-react";

import { Button } from "./button";
import { cn } from "@/lib/cn";
import { KPC_EASE } from "@/lib/motion";
import { SITE } from "@/lib/site";

const DAMAGE_OPTIONS = [
  { value: "water", label: "Water", icon: Droplet },
  { value: "fire", label: "Fire", icon: Flame },
  { value: "storm", label: "Storm", icon: Wind },
  { value: "mold", label: "Mold", icon: Bug },
  { value: "biohazard", label: "Biohazard", icon: AlertOctagon },
  { value: "other", label: "Other", icon: MoreHorizontal },
] as const;

const schema = z.object({
  address: z.string().min(5, "Property address required"),
  contactName: z.string().min(2, "Name required"),
  contactEmail: z.string().email("Valid email required"),
  contactPhone: z.string().min(10, "10-digit number required"),
  damageType: z.enum(["water", "fire", "storm", "mold", "biohazard", "other"]),
  squareFootage: z
    .string()
    .min(1, "Approximate square footage required")
    .regex(/^[\d,]+$/, "Numbers only"),
  occurredAt: z.string().min(1, "When did it happen?"),
  carrier: z.string().optional(),
  description: z.string().min(20, "A few sentences, please"),
});

type FormData = z.infer<typeof schema>;

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [ticket, setTicket] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { damageType: "water" },
  });

  const damageType = watch("damageType");

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/dispatch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "quote", ...data }),
    }).catch(() => null);

    if (res) {
      try {
        const json = (await res.json()) as { ticket?: string };
        if (json?.ticket) setTicket(json.ticket);
      } catch {
        /* ignore parse errors */
      }
    }
    setSubmitted(true);
  };

  return (
    <div className="card-light p-7 md:p-9">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: KPC_EASE }}
            className="text-center py-10"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-kpc-success/10 border border-kpc-success/30 flex items-center justify-center mb-6">
              <CheckCircle2 className="size-8 text-kpc-success" />
            </div>
            <h3 className="font-display text-3xl font-semibold mb-3 text-kpc-ink">
              Damage report received.
            </h3>
            <p className="text-kpc-muted max-w-md mx-auto mb-2">
              A dispatcher will call within 30 minutes to confirm details and quote an arrival
              window. Have photos ready — they&apos;ll ask you to text or email them.
            </p>
            {ticket && (
              <p className="text-xs uppercase tracking-[0.2em] text-kpc-muted mt-4">
                Ticket {ticket}
              </p>
            )}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" size="lg" asChild>
                <a href={SITE.phoneHref}>Or call now</a>
              </Button>
              <Button
                variant="ghostDark"
                size="lg"
                onClick={() => {
                  setSubmitted(false);
                  setTicket(null);
                  reset();
                }}
              >
                File another report
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-7"
          >
            {/* PROPERTY */}
            <fieldset className="space-y-5">
              <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-kpc-signal mb-1">
                Property
              </legend>
              <Field label="Property address" error={errors.address?.message}>
                <input
                  {...register("address")}
                  type="text"
                  autoComplete="street-address"
                  className={inputClass}
                  placeholder="Street, city, ZIP"
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Approx. square footage affected" error={errors.squareFootage?.message}>
                  <input
                    {...register("squareFootage")}
                    type="text"
                    inputMode="numeric"
                    className={cn(inputClass, "tabular-nums")}
                    placeholder="e.g. 4,500"
                  />
                </Field>
                <Field label="When did it happen?" error={errors.occurredAt?.message}>
                  <input
                    {...register("occurredAt")}
                    type="datetime-local"
                    className={inputClass}
                  />
                </Field>
              </div>
            </fieldset>

            {/* DAMAGE TYPE — RADIO CARDS */}
            <fieldset>
              <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-kpc-signal mb-3">
                Damage type
              </legend>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {DAMAGE_OPTIONS.map((opt) => {
                  const active = damageType === opt.value;
                  const Icon = opt.icon;
                  return (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() =>
                        setValue("damageType", opt.value, { shouldValidate: true })
                      }
                      className={cn(
                        "h-20 rounded-2xl border text-sm font-semibold transition focus-ring flex flex-col items-center justify-center gap-1.5",
                        active
                          ? "bg-kpc-signal text-white border-kpc-signal shadow-kpc-glow"
                          : "bg-white text-kpc-ink border-black/10 hover:border-kpc-signal/40",
                      )}
                      aria-pressed={active}
                    >
                      <Icon className="size-5" />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* CONTACT */}
            <fieldset className="space-y-5">
              <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-kpc-signal mb-1">
                Contact
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your name" error={errors.contactName?.message}>
                  <input
                    {...register("contactName")}
                    type="text"
                    autoComplete="name"
                    className={inputClass}
                    placeholder="Full name"
                  />
                </Field>
                <Field label="Phone" error={errors.contactPhone?.message}>
                  <input
                    {...register("contactPhone")}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    className={cn(inputClass, "tabular-nums")}
                    placeholder="(323) 555-0119"
                  />
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" error={errors.contactEmail?.message}>
                  <input
                    {...register("contactEmail")}
                    type="email"
                    autoComplete="email"
                    className={inputClass}
                    placeholder="you@company.com"
                  />
                </Field>
                <Field label="Insurance carrier (optional)" error={errors.carrier?.message}>
                  <input
                    {...register("carrier")}
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Travelers"
                  />
                </Field>
              </div>
            </fieldset>

            {/* DESCRIPTION */}
            <fieldset>
              <Field label="What happened?" error={errors.description?.message}>
                <textarea
                  {...register("description")}
                  rows={5}
                  className={cn(inputClass, "resize-none h-auto py-3")}
                  placeholder="Source of the loss, what's affected, any safety concerns, current state of utilities."
                />
              </Field>
            </fieldset>

            {/* PHOTO NOTICE */}
            <div className="rounded-2xl border border-kpc-signal/30 bg-kpc-signal/5 p-5 flex items-start gap-4">
              <div className="size-10 rounded-xl bg-kpc-signal/15 text-kpc-signal flex items-center justify-center shrink-0">
                <Camera className="size-5" />
              </div>
              <div className="text-sm text-kpc-ink leading-relaxed">
                <strong className="font-semibold">Attach photos when our dispatcher calls.</strong>
                <br />
                <span className="text-kpc-muted">
                  We&apos;ll text you a secure upload link the moment we receive this report. Wide
                  shots first, then close-ups of damage.
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="submit"
                variant="signal"
                size="lg"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting…" : "Submit damage report"}
              </Button>
              <Button type="button" variant="primary" size="lg" className="flex-1" asChild>
                <a href={SITE.phoneHref}>Or call now</a>
              </Button>
            </div>
            <p className="text-xs text-kpc-muted">
              Dispatcher will respond within 30 minutes. Active life-safety emergencies should
              call 911 first.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass =
  "w-full h-11 rounded-xl bg-white border border-black/10 px-3.5 text-sm text-kpc-ink placeholder:text-kpc-muted/70 focus:outline-none focus:border-kpc-signal focus:ring-2 focus:ring-kpc-signal/30 transition";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-kpc-ink/70 mb-2">
        {label}
      </span>
      {children}
      {error && <span className="block mt-1.5 text-xs text-kpc-emergency">{error}</span>}
    </label>
  );
}
