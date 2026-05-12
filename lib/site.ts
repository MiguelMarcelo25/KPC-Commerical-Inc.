/**
 * Single source of truth for site-wide config: brand, contact, navigation,
 * service & industry catalogs. Everything that appears in multiple places
 * pulls from here so updates are one-file changes.
 */

export const SITE = {
  name: "KPC & Commercial Inc.",
  shortName: "KPC",
  tagline: "Commercial restoration. Engineered for speed.",
  url: "https://kpccommercial.com",
  phone: "(323) 555-0119",
  phoneHref: "tel:+13235550119",
  email: "dispatch@kpccommercial.com",
  address: {
    street: "1450 Industrial Way",
    city: "Los Angeles",
    state: "CA",
    zip: "90021",
  },
  region: "Southern California",
  founded: 1989,
  hours: "24 / 7 / 365",
  social: {
    linkedin: "https://www.linkedin.com/company/kpc-commercial",
    youtube: "https://www.youtube.com/@kpccommercial",
  },
  certifications: [
    { name: "IICRC Certified Firm", short: "IICRC" },
    { name: "OSHA Compliant", short: "OSHA" },
    { name: "EPA Lead-Safe", short: "EPA" },
    { name: "BBB A+ Accredited", short: "BBB A+" },
    { name: "RIA Member", short: "RIA" },
    { name: "Insurance Approved", short: "Insurance Partner" },
  ],
} as const;

export type ServiceSlug =
  | "water-damage"
  | "fire-damage"
  | "mold-remediation"
  | "storm-response"
  | "biohazard-cleanup"
  | "reconstruction"
  | "commercial-cleaning";

export type IndustrySlug =
  | "healthcare"
  | "hospitality"
  | "multifamily"
  | "government"
  | "education";

export const NAV_LINKS = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Water Damage", href: "/services/water-damage" },
      { label: "Fire Damage", href: "/services/fire-damage" },
      { label: "Mold Remediation", href: "/services/mold-remediation" },
      { label: "Storm Response", href: "/services/storm-response" },
      { label: "Biohazard Cleanup", href: "/services/biohazard-cleanup" },
      { label: "Reconstruction", href: "/services/reconstruction" },
      { label: "Commercial Cleaning", href: "/services/commercial-cleaning" },
    ],
  },
  {
    label: "Industries",
    href: "/commercial",
    children: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Hospitality", href: "/industries/hospitality" },
      { label: "Multifamily", href: "/industries/multifamily" },
      { label: "Government", href: "/industries/government" },
      { label: "Education", href: "/industries/education" },
    ],
  },
  { label: "Commercial", href: "/commercial" },
  {
    label: "Resources",
    href: "/process",
    children: [
      { label: "Our Process", href: "/process" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "For Insurance", href: "/insurance" },
      { label: "Service Areas", href: "/locations" },
      { label: "Emergency Response Agreement", href: "/emergency-response-agreement" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
