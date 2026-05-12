"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, AlertTriangle, CheckCircle2 } from "lucide-react";

import { useEmergencyDialog } from "./providers";
import { Button } from "./button";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";
import { KPC_EASE } from "@/lib/motion";

const DAMAGE_TYPES = [
  { value: "water", label: "Water" },
  { value: "fire", label: "Fire" },
  { value: "mold", label: "Mold" },
  { value: "storm", label: "Storm" },
  { value: "biohazard", label: "Biohazard" },
  { value: "other", label: "Other" },
] as const;

const schema = z.object({
  name: z.string().min(2, "Required"),
  phone: z.string().min(10, "10-digit US number required"),
  address: z.string().min(5, "Required"),
  damageType: z.enum(["water", "fire", "mold", "storm", "biohazard", "other"]),
  description: z.string().max(800).optional(),
  callMeNow: z.boolean().default(true),
});

type FormData = z.infer<typeof schema>;

export function EmergencyDialog() {
  const { isOpen, close } = useEmergencyDialog();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { damageType: "water", callMeNow: true },
  });

  const damageType = watch("damageType");
  const callMeNow = watch("callMeNow");

  const onSubmit = async (data: FormData) => {
    // POST to a placeholder API route — replace with real CRM/Slack/email integration.
    await fetch("/api/dispatch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => {
      /* intentionally swallow — API route is a stub for now */
    });
    setSubmitted(true);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      close();
      // Reset after exit animation completes (~250ms)
      setTimeout(() => {
        setSubmitted(false);
        reset();
      }, 300);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-kpc-night/70 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                // Framer Motion owns ALL transforms here — combining Tailwind
                // -translate-* with motion's y prop loses the centering because
                // motion rewrites the transform string on every keyframe.
                initial={{ opacity: 0, scale: 0.96, x: "-50%", y: "calc(-50% + 16px)" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                exit={{ opacity: 0, scale: 0.96, x: "-50%", y: "calc(-50% + 16px)" }}
                transition={{ duration: 0.3, ease: KPC_EASE }}
                className="fixed left-1/2 top-1/2 z-50 w-[min(640px,calc(100vw-2rem))] max-h-[90vh] overflow-y-auto rounded-3xl border border-white/8 bg-kpc-deep text-white shadow-kpc-card"
              >
                <div className="p-7 md:p-9">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="eyebrow !text-kpc-emergency">
                        24/7 Emergency Dispatch
                      </span>
                      <Dialog.Title className="font-display text-3xl font-semibold mt-2 leading-tight">
                        Get a crew on the way.
                      </Dialog.Title>
                      <Dialog.Description className="text-sm text-white/60 mt-2">
                        Two minutes to fill. Crew dispatched within 30 minutes of submit.
                      </Dialog.Description>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label="Close"
                        className="rounded-lg text-white/60 hover:text-white hover:bg-white/5 p-2 -mt-1 -mr-1 focus-ring"
                      >
                        <X className="size-5" />
                      </button>
                    </Dialog.Close>
                  </div>

                  {submitted ? (
                    <SubmittedState onClose={() => handleOpenChange(false)} />
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Name" error={errors.name?.message}>
                          <input
                            {...register("name")}
                            type="text"
                            autoComplete="name"
                            className="kpc-input"
                            placeholder="Your name"
                          />
                        </Field>
                        <Field label="Phone" error={errors.phone?.message}>
                          <input
                            {...register("phone")}
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            className="kpc-input tabular-nums"
                            placeholder="(323) 555-0119"
                          />
                        </Field>
                      </div>

                      <Field label="Property address" error={errors.address?.message}>
                        <input
                          {...register("address")}
                          type="text"
                          autoComplete="street-address"
                          className="kpc-input"
                          placeholder="Street, city, ZIP"
                        />
                      </Field>

                      <Field label="Damage type">
                        <div className="grid grid-cols-3 gap-2">
                          {DAMAGE_TYPES.map((opt) => {
                            const active = damageType === opt.value;
                            return (
                              <button
                                type="button"
                                key={opt.value}
                                onClick={() => setValue("damageType", opt.value, { shouldValidate: true })}
                                className={cn(
                                  "h-11 rounded-xl border text-sm font-medium transition focus-ring",
                                  active
                                    ? "bg-kpc-signal text-white border-kpc-signal shadow-kpc-glow"
                                    : "bg-white/5 text-white/80 border-white/10 hover:border-white/30",
                                )}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </Field>

                      <Field label="Brief description (optional)">
                        <textarea
                          {...register("description")}
                          rows={3}
                          className="kpc-input resize-none"
                          placeholder="What happened, when, and how big?"
                        />
                      </Field>

                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          {...register("callMeNow")}
                          className="mt-1 size-4 rounded accent-kpc-emergency"
                        />
                        <span className="text-sm text-white/80">
                          <span className="font-semibold text-white">Call me now.</span>{" "}
                          Dispatcher rings within 60 seconds of submit.
                        </span>
                      </label>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          className="flex-1"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Dispatching…" : "Dispatch a crew"}
                        </Button>
                        <Button
                          type="button"
                          variant="ghostLight"
                          size="lg"
                          className="flex-1"
                          asChild
                        >
                          <a href={SITE.phoneHref}>Or call now</a>
                        </Button>
                      </div>

                      {callMeNow && (
                        <p className="text-xs text-white/50 flex items-center gap-1.5">
                          <AlertTriangle className="size-3 text-kpc-emergency" aria-hidden />
                          Dispatcher will call from a {SITE.address.state} number.
                        </p>
                      )}
                    </form>
                  )}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

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
      <span className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
        {label}
      </span>
      {children}
      {error && <span className="block mt-1.5 text-xs text-kpc-emergency">{error}</span>}
    </label>
  );
}

function SubmittedState({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center py-6">
      <div className="mx-auto w-14 h-14 rounded-full bg-kpc-success/10 border border-kpc-success/30 flex items-center justify-center mb-5">
        <CheckCircle2 className="size-7 text-kpc-success" />
      </div>
      <h3 className="font-display text-2xl font-semibold mb-2">Crew is on the way.</h3>
      <p className="text-sm text-white/70 max-w-sm mx-auto mb-6">
        A dispatcher is calling you within 60 seconds. Keep your phone nearby. Do
        not enter unsafe areas.
      </p>
      <Button variant="ghostLight" onClick={onClose}>
        Close
      </Button>
    </div>
  );
}
