"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe2 } from "lucide-react";
import {
  locales,
  localizedPath,
  stripLocale,
  type Locale,
} from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  onLocaleChange?: () => void;
};

export function LanguageSwitcher({ locale, label, onLocaleChange }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <label className="inline-flex min-h-11 items-center gap-2 rounded border border-white/10 bg-white/5 px-3 text-sm text-muted">
      <Globe2 aria-hidden="true" size={16} />
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={locale}
        onChange={(event) => {
          const nextLocale = event.target.value as Locale;
          const query = typeof window === "undefined" ? "" : window.location.search;
          const hash = typeof window === "undefined" ? "" : window.location.hash;
          router.replace(
            `${localizedPath(nextLocale, stripLocale(pathname))}${query}${hash}`,
          );
          onLocaleChange?.();
        }}
        className="cursor-pointer bg-transparent text-foreground outline-none"
      >
        {locales.map((item) => (
          <option key={item} value={item} className="bg-surface text-foreground">
            {item.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
