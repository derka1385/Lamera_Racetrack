import type { Dictionary } from "@/content/dictionaries";
import type { CircuitAvailability } from "@/types/content";
import { localizedPath, t, type Locale } from "@/lib/i18n";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { CTAButton } from "@/components/CTAButton";
import { MediaFrame } from "@/components/MediaFrame";

type CircuitCardProps = {
  circuit: CircuitAvailability;
  locale: Locale;
  dictionary: Dictionary;
};

export function CircuitCard({ circuit, locale, dictionary }: CircuitCardProps) {
  return (
    <article className="overflow-hidden rounded border border-white/10 bg-surface">
      <MediaFrame image={circuit.image} locale={locale} ratio="aspect-[16/10]" className="rounded-none border-0 shadow-none" />
      <div className="p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <AvailabilityBadge availability={circuit.availability} dictionary={dictionary} />
          <span className="text-sm text-muted">{circuit.date}</span>
        </div>
        <h3 className="font-display text-3xl font-semibold uppercase">{circuit.circuit}</h3>
        <p className="mt-2 text-sm text-muted">{t(circuit.country, locale)} / {t(circuit.programme, locale)}</p>
        <p className="mt-4 text-sm text-muted">Seats: {circuit.seats}</p>
        <CTAButton href={localizedPath(locale, circuit.href)} variant="ghost" className="mt-5 justify-start px-0">
          {dictionary.common.viewCalendar}
        </CTAButton>
      </div>
    </article>
  );
}
