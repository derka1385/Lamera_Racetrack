import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import { defaultLocale, type Locale, locales } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://derka1385.github.io/Lamera_Racetrack";

const pagePaths = {
  home: "",
  privateTesting: "/private-testing",
  raceWithUs: "/race-with-us",
  lamera: "/the-lamera",
  team: "/team",
  calendar: "/calendar",
  results: "/results",
  contact: "/contact",
  privacy: "/privacy",
  legal: "/legal",
  cookies: "/cookies",
} as const;

export type PageKey = keyof typeof pagePaths;

export function pagePath(page: PageKey) {
  return pagePaths[page];
}

export function createMetadata(locale: Locale, page: PageKey): Metadata {
  const dictionary = getDictionary(locale);
  const meta = dictionary.meta[page];
  const path = pagePath(page);
  const canonical = `/${locale}${path}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        locales.map((lang) => [lang, `/${lang}${path}`]),
      ),
    },
    openGraph: {
      title: `${meta.title} | RaceTrack Competition`,
      description: meta.description,
      url: `${siteUrl}${canonical}`,
      siteName: "RaceTrack Competition",
      locale,
      type: "website",
      images: [
        {
          url: "/images/hero/hero-poster.webp",
          width: 1920,
          height: 1080,
          alt: "RaceTrack Competition motorsport visual",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.title} | RaceTrack Competition`,
      description: meta.description,
      images: ["/images/hero/hero-poster.webp"],
    },
  };
}

export function organizationJsonLd(locale: Locale) {
  const dictionary = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: "RaceTrack Competition",
    url: `${siteUrl}/${defaultLocale}`,
    logo: `${siteUrl}/brand/racetrack-competition-logo-source.png`,
    description: dictionary.meta.home.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "LU",
    },
    sport: "Motorsport",
  };
}

export function breadcrumbJsonLd(locale: Locale, items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}/${locale}${item.path}`,
    })),
  };
}
