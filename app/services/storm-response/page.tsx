import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/content";
import { SITE } from "@/lib/site";
import { ServiceDetailLayout } from "@/components/service-detail-layout";

const SLUG = "storm-response" as const;
const service = SERVICES.find((s) => s.slug === SLUG);

export const metadata: Metadata = {
  title: service ? `${service.name} | ${SITE.name}` : SITE.name,
  description: service?.pitch ?? SITE.tagline,
};

export default function StormResponsePage() {
  if (!service) notFound();
  return <ServiceDetailLayout service={service} />;
}
