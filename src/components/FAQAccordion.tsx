"use client";

import type { FAQItem } from "@/types/content";
import { t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type FAQAccordionProps = {
  items: FAQItem[];
  locale: Locale;
  variant?: "standard" | "race";
};

export function FAQAccordion({ items, locale, variant = "standard" }: FAQAccordionProps) {
  return (
    <div className={cn("grid", variant === "race" ? "gap-0 border-y border-white/10" : "gap-3")}>
      {items.map((item, index) => (
        <details
          key={t(item.question, locale)}
          className={cn(
            "group",
            variant === "race"
              ? "border-b border-white/10 bg-transparent py-5 last:border-b-0"
              : "rounded border border-white/10 bg-surface p-5",
          )}
        >
          <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-center gap-4 font-display text-2xl font-semibold uppercase focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand">
            {variant === "race" ? <span className="race-meta text-[var(--rtc-green)]">{String(index + 1).padStart(2, "0")}</span> : null}
            {t(item.question, locale)}
            <span aria-hidden="true" className="h-3 w-3 rotate-45 border-r-2 border-b-2 border-[var(--rtc-green)] transition group-open:rotate-[225deg]" />
          </summary>
          <p className="mt-4 leading-7 text-muted">{t(item.answer, locale)}</p>
        </details>
      ))}
    </div>
  );
}
