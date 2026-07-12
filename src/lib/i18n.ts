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

export function localizedHref(
  locale: Locale,
  href = "",
  params?: Record<string, string | number | boolean | null | undefined>,
) {
  const path = localizedPath(locale, href);
  const search = new URLSearchParams();

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      search.set(key, String(value));
    }
  });

  const query = search.toString();
  return query ? `${path}?${query}` : path;
}

export function contactHref(
  locale: Locale,
  params?: Record<string, string | number | boolean | null | undefined>,
) {
  return localizedHref(locale, "/contact", params);
}

export function stripLocale(pathname: string) {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) {
    const stripped = `/${parts.slice(2).join("/")}`;
    const normalized = stripped.length > 1 ? stripped.replace(/\/$/, "") : stripped;
    return normalized === "/" ? "" : normalized;
  }

  return pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
}

export function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00Z`));
}
