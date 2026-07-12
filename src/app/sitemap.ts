import type { MetadataRoute } from "next";
import { raceResults } from "@/data/site";
import { locales } from "@/lib/i18n";
import { pagePath, type PageKey } from "@/lib/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://derka1385.github.io/Lamera_Racetrack";
const lastModified = new Date("2026-07-10");

export const dynamic = "force-static";

const pages: PageKey[] = [
  "home",
  "privateTesting",
  "raceWithUs",
  "lamera",
  "team",
  "calendar",
  "results",
  "contact",
  "privacy",
  "legal",
  "cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages = raceResults.some((result) => result.verified)
    ? pages
    : pages.filter((page) => page !== "results");

  return locales.flatMap((locale) =>
    publicPages.map((page) => ({
      url: `${siteUrl}/${locale}${pagePath(page)}`,
      lastModified,
      changeFrequency: page === "calendar" ? "weekly" : "monthly",
      priority: page === "home" ? 1 : 0.7,
    })),
  );
}
