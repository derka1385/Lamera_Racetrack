"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { calendarEvents } from "@/data/site";
import type { CalendarEvent } from "@/types/content";
import { type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { EventCard } from "@/components/EventCard";

const filters = ["all", "private-testing", "race-weekend", "available", "limited", "fully-booked"] as const;

type CalendarFiltersProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function CalendarFilters({ locale, dictionary }: CalendarFiltersProps) {
  const [active, setActive] = useState<(typeof filters)[number]>("all");

  const events = useMemo(() => {
    return calendarEvents.filter((event: CalendarEvent) => {
      if (active === "all") return true;
      if (active === "private-testing" || active === "race-weekend") return event.type === active;
      return event.availability === active;
    });
  }, [active]);

  const label = (filter: (typeof filters)[number]) => {
    if (filter === "all") return "All";
    if (filter === "private-testing" || filter === "race-weekend") return dictionary.common.eventTypes[filter];
    return dictionary.common.availability[filter];
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            type="button"
            key={filter}
            onClick={() => setActive(filter)}
            className={cn(
              "min-h-11 rounded border px-4 text-sm font-semibold",
              active === filter
                ? "border-brand bg-brand text-[var(--color-brand-ink)]"
                : "border-white/10 bg-white/5 text-muted hover:text-foreground",
            )}
          >
            {label(filter)}
          </button>
        ))}
      </div>
      <div className="grid gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} locale={locale} dictionary={dictionary} />
        ))}
      </div>
    </div>
  );
}
