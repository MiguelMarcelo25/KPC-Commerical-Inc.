import type { Metadata } from "next";

import { findIndustry, IndustryPage } from "@/components/industry-page";

const industry = findIndustry("education");

export const metadata: Metadata = {
  title: `${industry.name} — ${industry.headline}`,
  description: industry.pitch,
};

export default function EducationIndustryPage() {
  return (
    <IndustryPage
      industry={industry}
      serviceSlugs={[
        "water-damage",
        "mold-remediation",
        "reconstruction",
        "commercial-cleaning",
      ]}
      testimonialIndex={1}
    />
  );
}
