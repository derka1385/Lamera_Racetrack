import type { LocalizedString } from "@/types/content";

export const locales = ["en", "fr", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function t(value: LocalizedString, locale: Locale) {
  return value[locale] ?? value.en;
}

export function localizedPath(locale: Locale, href = "") {
  if (!href || href === "/") {
    return `/${locale}`;
  }

  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}

export function stripLocale(pathname: string) {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) {
    const stripped = `/${parts.slice(2).join("/")}`;
    return stripped === "/" ? "" : stripped;
  }

  return pathname;
}
