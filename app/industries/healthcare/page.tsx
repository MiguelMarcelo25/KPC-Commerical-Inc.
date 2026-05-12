import type { Metadata } from "next";

import { findIndustry, IndustryPage } from "@/components/industry-page";

const industry = findIndustry("healthcare");

export const metadata: Metadata = {
  title: `${industry.name} — ${industry.headline}`,
  description: industry.pitch,
};

export default function HealthcareIndustryPage() {
  return (
    <IndustryPage
      industry={industry}
      serviceSlugs={[
        "water-damage",
        "mold-remediation",
        "biohazard-cleanup",
        "commercial-cleaning",
      ]}
      testimonialIndex={0}
    />
  );
}
