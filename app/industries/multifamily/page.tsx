import type { Metadata } from "next";

import { findIndustry, IndustryPage } from "@/components/industry-page";

const industry = findIndustry("multifamily");

export const metadata: Metadata = {
  title: `${industry.name} — ${industry.headline}`,
  description: industry.pitch,
};

export default function MultifamilyIndustryPage() {
  return (
    <IndustryPage
      industry={industry}
      serviceSlugs={[
        "water-damage",
        "mold-remediation",
        "storm-response",
        "reconstruction",
      ]}
      testimonialIndex={2}
    />
  );
}
