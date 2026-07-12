import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { getDictionary } from "@/content/dictionaries";
import { calendarEvents } from "@/data/site";
import { isLocale, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalendarFilters } from "@/components/CalendarFilters";
import { RaceBackdrop } from "@/components/motion/RaceBackdrop";
import { RaceSectionHeading } from "@/components/race/RaceSectionHeading";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createMetadata(isLocale(locale) ? locale : "en", "calendar");
}

export default async function CalendarPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const dictionary = getDictionary(locale);
  const page = dictionary.pages.calendar;
  const hasConfirmedEvents = calendarEvents.some((event) => !event.isDemo);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-black py-16 md:py-24">
        <RaceBackdrop variant="track" intensity="hero" ghostText="CALENDAR" sectionIndex="01" showGhostText />
        <div className="page-shell relative z-10">
          <Breadcrumbs locale={locale} items={[{ label: page.eyebrow }]} />
          <RaceSectionHeading className="mt-10" eyebrow={page.eyebrow} title={page.title} text={page.intro} index="01" showSpeedLines />
          {hasConfirmedEvents ? (
            <a href="/calendar.ics" className="mt-8 inline-flex min-h-11 items-center gap-2 border border-white/10 bg-white/5 px-4 text-sm font-semibold hover:border-brand cut-corner">
              <CalendarDays aria-hidden="true" size={18} />
              {page.export}
            </a>
          ) : null}
        </div>
      </section>
      <section className="py-20">
        <div className="page-shell">
          <CalendarFilters locale={locale} dictionary={dictionary} />
        </div>
      </section>
    </>
  );
}
