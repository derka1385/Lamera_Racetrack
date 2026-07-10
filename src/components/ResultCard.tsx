import type { RaceResult } from "@/types/content";
import { type Locale } from "@/lib/i18n";
import { MediaFrame } from "@/components/MediaFrame";

type ResultCardProps = {
  result: RaceResult;
  locale: Locale;
};

export function ResultCard({ result, locale }: ResultCardProps) {
  return (
    <article className="overflow-hidden rounded border border-white/10 bg-surface">
      <MediaFrame image={result.image} locale={locale} ratio="aspect-[16/10]" className="rounded-none border-0 shadow-none" />
      <div className="p-5">
        <p className="text-sm font-semibold uppercase text-brand">{result.year}</p>
        <h3 className="mt-2 font-display text-3xl font-semibold uppercase">{result.event}</h3>
        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm text-muted">
          <div>
            <dt className="text-foreground">Circuit</dt>
            <dd>{result.circuit}</dd>
          </div>
          <div>
            <dt className="text-foreground">Category</dt>
            <dd>{result.category}</dd>
          </div>
          <div>
            <dt className="text-foreground">Class</dt>
            <dd>{result.classPosition}</dd>
          </div>
          <div>
            <dt className="text-foreground">Verified</dt>
            <dd>{result.verified ? "Yes" : "Pending"}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
