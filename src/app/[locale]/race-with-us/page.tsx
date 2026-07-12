import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import { fullServiceItems, racePath, raceSeats } from "@/data/site";
import { contactHref, isLocale, t, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import { priceLabel } from "@/lib/utils";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTAButton } from "@/components/CTAButton";
import { ProcessStep } from "@/components/ProcessStep";
import { SectionHeading } from "@/components/SectionHeading";
import { RaceBackdrop } from "@/components/motion/RaceBackdrop";
import { RaceSectionHeading } from "@/components/race/RaceSectionHeading";
import { SlantedPanel } from "@/components/race/SlantedPanel";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createMetadata(isLocale(locale) ? locale : "en", "raceWithUs");
}

export default async function RaceWithUsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const dictionary = getDictionary(locale);
  const page = dictionary.pages.raceWithUs;
  const publicRaceSeats = raceSeats.filter((seat) => !seat.isDemo);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-black py-16 md:py-24">
        <RaceBackdrop variant="speed" intensity="medium" ghostText="GRID" sectionIndex="01" showGhostText />
        <div className="page-shell relative z-10">
          <Breadcrumbs locale={locale} items={[{ label: page.eyebrow }]} />
          <RaceSectionHeading className="mt-10" eyebrow={page.eyebrow} title={page.title} text={page.intro} index="01" showSpeedLines />
          <CTAButton href={contactHref(locale, { objective: "race-weekend" })} className="mt-8">{dictionary.common.requestDrive}</CTAButton>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-20">
        <RaceBackdrop variant="garage" intensity="subtle" ghostText="SERVICE" showGhostText />
        <div className="page-shell">
          <RaceSectionHeading title={page.fullServiceTitle} index="02" variant="editorial" showSpeedLines />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {fullServiceItems.map((item) => (
              <SlantedPanel key={t(item, locale)} innerClassName="p-5 text-muted">
                {t(item, locale)}
              </SlantedPanel>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="page-shell">
          <SectionHeading title={dictionary.common.viewSeats} text={dictionary.common.seatsOnRequest} />
          {publicRaceSeats.length ? (
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {publicRaceSeats.map((seat) => (
              <article key={seat.id} className="rounded border border-white/10 bg-black/25 p-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <AvailabilityBadge availability={seat.availability} dictionary={dictionary} />
                  <span className="text-sm text-muted">{seat.dates}</span>
                </div>
                <h2 className="font-display text-4xl font-semibold uppercase">{seat.event}</h2>
                <p className="mt-2 text-muted">{seat.circuit} / {t(seat.country, locale)}</p>
                <dl className="mt-6 grid gap-4 text-sm text-muted sm:grid-cols-2">
                  <div><dt className="text-foreground">Format</dt><dd>{seat.raceFormat}</dd></div>
                  <div><dt className="text-foreground">Category</dt><dd>{seat.category}</dd></div>
                  <div><dt className="text-foreground">Car number</dt><dd>{seat.carNumber}</dd></div>
                  <div><dt className="text-foreground">Drivers</dt><dd>{seat.drivers}</dd></div>
                  <div><dt className="text-foreground">Driving time</dt><dd>{t(seat.estimatedDrivingTime, locale)}</dd></div>
                  <div><dt className="text-foreground">Experience</dt><dd>{t(seat.requiredExperience, locale)}</dd></div>
                </dl>
                <p className="mt-5 text-sm text-muted">{t(seat.licenceRequirements, locale)}</p>
                <p className="mt-5 font-semibold text-brand">{priceLabel(seat.price, { onRequest: dictionary.common.priceOnRequest, from: dictionary.common.priceFrom })}</p>
                <CTAButton href={contactHref(locale, { objective: "race-weekend", event: seat.id, circuit: seat.circuit })} className="mt-5">{dictionary.common.requestRaceSeat}</CTAButton>
              </article>
            ))}
            </div>
          ) : (
            <div className="mt-10 border border-white/10 bg-black/25 p-6 md:p-8 cut-corner">
              <p className="max-w-2xl text-muted">{dictionary.common.seatsOnRequest}</p>
              <CTAButton href={contactHref(locale, { objective: "race-weekend" })} className="mt-6">
                {dictionary.common.joinWaitingList}
              </CTAButton>
            </div>
          )}
        </div>
      </section>

      <section className="py-20">
        <div className="page-shell">
          <SectionHeading title={page.pathTitle} />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {racePath.map((step) => (
              <ProcessStep key={step.step} step={step} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
