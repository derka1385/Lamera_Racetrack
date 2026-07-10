"use client";

import type { FAQItem } from "@/types/content";
import { t, type Locale } from "@/lib/i18n";

type FAQAccordionProps = {
  items: FAQItem[];
  locale: Locale;
};

export function FAQAccordion({ items, locale }: FAQAccordionProps) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details key={t(item.question, locale)} className="group rounded border border-white/10 bg-surface p-5">
          <summary className="cursor-pointer list-none font-display text-2xl font-semibold uppercase">
            {t(item.question, locale)}
          </summary>
          <p className="mt-4 leading-7 text-muted">{t(item.answer, locale)}</p>
        </details>
      ))}
    </div>
  );
}
