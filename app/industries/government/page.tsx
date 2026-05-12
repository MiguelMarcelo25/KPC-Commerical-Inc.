import type { Metadata } from "next";

import { findIndustry, IndustryPage } from "@/components/industry-page";

const industry = findIndustry("government");

export const metadata: Metadata = {
  title: `${industry.name} — ${industry.headline}`,
  description: industry.pitch,
};

export default function GovernmentIndustryPage() {
  return (
    <IndustryPage
      industry={industry}
      serviceSlugs={[
        "storm-response",
        "biohazard-cleanup",
        "reconstruction",
        "commercial-cleaning",
      ]}
      testimonialIndex={0}
    />
  );
}
