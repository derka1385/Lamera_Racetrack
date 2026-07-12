import type { Dictionary } from "@/content/dictionaries";
import type { CalendarEvent } from "@/types/content";
import { formatDate, localizedPath, t, type Locale } from "@/lib/i18n";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { CTAButton } from "@/components/CTAButton";
import { MediaFrame } from "@/components/MediaFrame";

type EventCardProps = {
  event: CalendarEvent;
  locale: Locale;
  dictionary: Dictionary;
};

export function EventCard({ event, locale, dictionary }: EventCardProps) {
  return (
    <article className="grid gap-5 rounded border border-white/10 bg-surface p-4 md:grid-cols-[14rem_1fr_auto] md:items-center">
      <MediaFrame image={event.image} locale={locale} ratio="aspect-[16/10]" className="rounded shadow-none" sizes="14rem" />
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <AvailabilityBadge availability={event.availability} dictionary={dictionary} />
          <span className="text-sm text-muted">{dictionary.common.eventTypes[event.type]}</span>
        </div>
        <h3 className="font-display text-3xl font-semibold uppercase">{event.circuit}</h3>
        <p className="mt-2 text-sm text-muted">{formatDate(event.date, locale)} / {t(event.country, locale)}</p>
      </div>
      <CTAButton href={localizedPath(locale, event.href)} variant="secondary">
        {t(event.cta, locale)}
      </CTAButton>
    </article>
  );
}
