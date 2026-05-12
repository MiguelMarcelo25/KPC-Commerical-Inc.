"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { Button } from "./button";
import { cn } from "@/lib/cn";
import { KPC_EASE } from "@/lib/motion";

const TOPICS = [
  { value: "general", label: "General inquiry" },
  { value: "era", label: "Emergency Response Agreement" },
  { value: "estimate", label: "Estimate / Bid" },
  { value: "insurance", label: "Insurance / Adjuster" },
  { value: "careers", label: "Careers" },
  { value: "press", label: "Press" },
] as const;

const schema = z.object({
  name: z.string().min(2, "Required"),
  company: z.string().optional(),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "10-digit number required"),
  topic: z.enum(["general", "era", "estimate", "insurance", "careers", "press"]),
  message: z.string().min(10, "Tell us a bit more"),
});

type FormData = z.infer<typeof schema>;

/**
 * Contact form posting to /api/dispatch (which is currently a stub that
 * echoes the payload). Mirrors the EmergencyDialog success-state pattern.
 *
 * Optional `defaultTopic` lets routes like /contact?type=era preselect
 * the relevant topic without a useSearchParams suspense boundary here —
 * the wrapper page handles that detail.
 */
export function ContactForm({ defaultTopic = "general" }: { defaultTopic?: FormData["topic"] }) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { topic: defaultTopic },
  });

  const onSubmit = async (data: FormData) => {
    await fetch("/api/dispatch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "contact", ...data }),
    }).catch(() => {
      /* swallow — stub endpoint */
    });
    setSubmitted(true);
  };

  return (
    <div className="card-light p-7 md:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: KPC_EASE }}
            className="text-center py-8"
          >
            <div className="mx-auto w-14 h-14 rounded-full bg-kpc-success/10 border border-kpc-success/30 flex items-center justify-center mb-5">
              <CheckCircle2 className="size-7 text-kpc-success" />
            </div>
            <h3 className="font-display text-2xl font-semibold mb-2 text-kpc-ink">
              Message received.
            </h3>
            <p className="text-sm text-kpc-muted max-w-sm mx-auto mb-6">
              A project manager will respond within one business day. If this is an active loss,
              call now — we pick up.
            </p>
            <Button
              variant="ghostDark"
              onClick={() => {
                setSubmitted(false);
                reset();
              }}
            >
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" error={errors.name?.message}>
                <input
                  {...register("name")}
                  type="text"
                  autoComplete="name"
                  className={inputClass}
                  placeholder="Your name"
                />
              </Field>
              <Field label="Company" error={errors.company?.message}>
                <input
                  {...register("company")}
                  type="text"
                  autoComplete="organization"
                  className={inputClass}
                  placeholder="Property / firm"
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  className={inputClass}
                  placeholder="you@company.com"
                />
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <input
                  {...register("phone")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className={cn(inputClass, "tabular-nums")}
                  placeholder="(323) 555-0119"
                />
              </Field>
            </div>

            <Field label="Topic" error={errors.topic?.message}>
              <select {...register("topic")} className={inputClass}>
                {TOPICS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Message" error={errors.message?.message}>
              <textarea
                {...register("message")}
                rows={5}
                className={cn(inputClass, "resize-none h-auto py-3")}
                placeholder="What's going on? Property type, what happened, when, and how big."
              />
            </Field>

            <Button type="submit" variant="signal" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Send message"}
            </Button>
            <p className="text-xs text-kpc-muted">
              Response within one business day. Active losses should call instead.
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
