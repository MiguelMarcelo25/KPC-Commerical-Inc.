import type { Metadata } from "next";

import { findIndustry, IndustryPage } from "@/components/industry-page";

const industry = findIndustry("hospitality");

export const metadata: Metadata = {
  title: `${industry.name} — ${industry.headline}`,
  description: industry.pitch,
};

export default function HospitalityIndustryPage() {
  return (
    <IndustryPage
      industry={industry}
      serviceSlugs={[
        "water-damage",
        "fire-damage",
        "reconstruction",
        "commercial-cleaning",
      ]}
      testimonialIndex={1}
    />
  );
}
