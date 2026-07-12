"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { calendarEvents } from "@/data/site";
import type { CalendarEvent } from "@/types/content";
import { contactHref, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/CTAButton";
import { EventCard } from "@/components/EventCard";

const filters = ["all", "private-testing", "race-weekend", "available", "limited", "fully-booked"] as const;

type CalendarFiltersProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function CalendarFilters({ locale, dictionary }: CalendarFiltersProps) {
  const [active, setActive] = useState<(typeof filters)[number]>("all");
  const publicEvents = useMemo(
    () => calendarEvents.filter((event) => !event.isDemo),
    [],
  );

  const events = useMemo(() => {
    return publicEvents.filter((event: CalendarEvent) => {
      if (active === "all") return true;
      if (active === "private-testing" || active === "race-weekend") return event.type === active;
      return event.availability === active;
    });
  }, [active, publicEvents]);

  const label = (filter: (typeof filters)[number]) => {
    if (filter === "all") return dictionary.common.all;
    if (filter === "private-testing" || filter === "race-weekend") return dictionary.common.eventTypes[filter];
    return dictionary.common.availability[filter];
  };

  return (
    <div>
      <div className="mb-8 flex snap-x gap-2 overflow-x-auto pb-2" aria-label={`${events.length} results`}>
        {filters.map((filter) => (
          <button
            type="button"
            key={filter}
            onClick={() => setActive(filter)}
            aria-pressed={active === filter}
            className={cn(
              "min-h-11 shrink-0 snap-start rounded border px-4 text-sm font-semibold",
              active === filter
                ? "border-brand bg-brand text-[var(--color-brand-ink)]"
                : "border-white/10 bg-white/5 text-muted hover:text-foreground",
            )}
          >
            {label(filter)}
          </button>
        ))}
      </div>
      {events.length ? (
        <div className="grid gap-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} locale={locale} dictionary={dictionary} />
          ))}
        </div>
      ) : (
        <div className="rounded border border-white/10 bg-surface p-6 md:p-8">
          <p className="max-w-2xl text-lg text-foreground">{dictionary.common.privateDatesOnRequest}</p>
          <CTAButton
            href={contactHref(locale, { objective: "private-test" })}
            className="mt-6"
            variant="secondary"
          >
            {dictionary.common.discussPreferredCircuit}
          </CTAButton>
        </div>
      )}
    </div>
  );
}
