"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { raceResults } from "@/data/site";
import { type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ResultCard } from "@/components/ResultCard";

type ResultsFiltersProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function ResultsFilters({ locale, dictionary }: ResultsFiltersProps) {
  const [year, setYear] = useState("all");
  const publicResults = useMemo(
    () => raceResults.filter((result) => result.verified),
    [],
  );
  const years = ["all", ...Array.from(new Set(publicResults.map((result) => result.year)))];

  const results = useMemo(() => {
    return publicResults
      .filter((result) => (year === "all" ? true : result.year === year));
  }, [publicResults, year]);

  return (
    <div>
      <div className="mb-8 flex snap-x gap-2 overflow-x-auto pb-2">
        {years.map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => setYear(item)}
            aria-pressed={year === item}
            className={cn(
              "min-h-11 shrink-0 snap-start rounded border px-4 text-sm font-semibold",
              year === item
                ? "border-brand bg-brand text-[var(--color-brand-ink)]"
                : "border-white/10 bg-white/5 text-muted hover:text-foreground",
            )}
          >
            {item === "all" ? dictionary.common.all : item}
          </button>
        ))}
      </div>
      {results.length ? (
        <div className="grid gap-5 md:grid-cols-3">
          {results.map((result) => (
            <ResultCard key={result.id} result={result} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="rounded border border-white/10 bg-surface p-8 text-muted">
          {dictionary.common.verifiedResultsPending}
        </div>
      )}
    </div>
  );
}
