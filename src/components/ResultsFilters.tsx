"use client";

import { useMemo, useState } from "react";
import { raceResults } from "@/data/site";
import type { RaceResult } from "@/types/content";
import { type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ResultCard } from "@/components/ResultCard";

type ResultsFiltersProps = {
  locale: Locale;
};

export function ResultsFilters({ locale }: ResultsFiltersProps) {
  const [year, setYear] = useState("all");
  const years = ["all", ...Array.from(new Set(raceResults.map((result) => result.year)))];
  const showDemo = process.env.NODE_ENV !== "production";

  const results = useMemo(() => {
    return raceResults
      .filter((result: RaceResult) => result.verified || showDemo)
      .filter((result) => (year === "all" ? true : result.year === year));
  }, [showDemo, year]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {years.map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => setYear(item)}
            className={cn(
              "min-h-11 rounded border px-4 text-sm font-semibold",
              year === item
                ? "border-brand bg-brand text-[var(--color-brand-ink)]"
                : "border-white/10 bg-white/5 text-muted hover:text-foreground",
            )}
          >
            {item === "all" ? "All" : item}
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
          Verified public results will appear here once official sources and permissions are confirmed.
        </div>
      )}
    </div>
  );
}
