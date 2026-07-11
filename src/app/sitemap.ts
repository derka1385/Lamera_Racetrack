import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { pagePath, type PageKey } from "@/lib/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://racetrack-competition.example";
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
  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${siteUrl}/${locale}${pagePath(page)}`,
      lastModified,
      changeFrequency: page === "calendar" ? "weekly" : "monthly",
      priority: page === "home" ? 1 : 0.7,
    })),
  );
}
