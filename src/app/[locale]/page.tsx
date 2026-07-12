import type { Metadata } from "next";
import Script from "next/script";
import { getDictionary } from "@/content/dictionaries";
import { carImages, carSpecifications, processSteps, proofStats } from "@/data/site";
import { contactHref, isLocale, localizedPath, t, type Locale } from "@/lib/i18n";
import { createMetadata, organizationJsonLd } from "@/lib/seo";
import { CTAButton } from "@/components/CTAButton";
import { Hero } from "@/components/Hero";
import { MediaFrame } from "@/components/MediaFrame";
import { ProofStat } from "@/components/ProofStat";
import { RaceBackdrop } from "@/components/motion/RaceBackdrop";
import { RaceDivider } from "@/components/race/RaceDivider";
import { RaceMetaBar } from "@/components/race/RaceMetaBar";
import { RaceSectionHeading } from "@/components/race/RaceSectionHeading";
import { SlantedPanel } from "@/components/race/SlantedPanel";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createMetadata(isLocale(locale) ? locale : "en", "home");
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const dictionary = getDictionary(locale);
  const primarySpecs = carSpecifications.slice(0, 3);
  const methodSteps = processSteps.slice(0, 4);

  return (
    <>
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(locale)) }}
      />
      <Hero locale={locale} dictionary={dictionary} />
      <RaceDivider variant="double-stripe" />

      <section className="relative isolate overflow-hidden bg-[var(--rtc-black)] py-6">
        <RaceBackdrop variant="minimal" intensity="subtle" showGrid={false} showStreaks={false} showRacingLine={false} showNoise />
        <div className="page-shell relative z-10 grid divide-y divide-white/10 border-y border-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">
          {proofStats.map((stat) => (
            <ProofStat key={t(stat.label, locale)} stat={stat} locale={locale} />
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-20 md:py-28">
        <RaceBackdrop variant="garage" intensity="subtle" ghostText="START" sectionIndex="02" showGhostText />
        <div className="page-shell relative z-10">
          <RaceSectionHeading
            title={dictionary.home.gatewayTitle}
            text={dictionary.home.gatewayText}
            index="02"
            variant="editorial"
            showSpeedLines
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <SlantedPanel className="min-h-[22rem]" innerClassName="flex h-full flex-col p-6 md:p-8">
              <p className="race-meta text-[var(--rtc-green)]">01 / PRIVATE</p>
              <h2 className="mt-5 font-display text-5xl font-extrabold uppercase italic leading-none md:text-7xl">
                {dictionary.home.privatePathTitle}
              </h2>
              <p className="race-body mt-6 max-w-xl">{dictionary.home.privatePathText}</p>
              <div className="mt-auto pt-8">
                <CTAButton href={localizedPath(locale, "/private-testing")}>
                  {dictionary.common.requestPrivateTest}
                </CTAButton>
              </div>
            </SlantedPanel>

            <SlantedPanel className="min-h-[22rem] bg-[var(--rtc-white)] text-[var(--rtc-black)]" innerClassName="flex h-full flex-col p-6 md:p-8">
              <p className="race-meta text-[var(--rtc-green-dark)]">02 / ENDURANCE</p>
              <h2 className="mt-5 font-display text-5xl font-extrabold uppercase italic leading-none text-[var(--rtc-black)] md:text-7xl">
                {dictionary.home.racePathTitle}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-black/68">{dictionary.home.racePathText}</p>
              <div className="mt-auto pt-8">
                <CTAButton href={localizedPath(locale, "/race-with-us")} variant="secondary">
                  {dictionary.common.requestRaceSeat}
                </CTAButton>
              </div>
            </SlantedPanel>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-surface py-24">
        <RaceBackdrop variant="telemetry" intensity="subtle" ghostText="330 1020 6" showGhostText />
        <div className="page-shell relative z-10 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <RaceSectionHeading
              eyebrow={dictionary.home.lameraTitle}
              title={dictionary.home.focusTitle}
              text={dictionary.home.focusText}
              index="03"
              variant="editorial"
              showSpeedLines
            />
            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {primarySpecs.map((spec) => (
                <div key={`${t(spec.label, locale)}-${t(spec.value, locale)}`} className="border border-white/10 bg-black/24 p-4">
                  <p className="race-label">{t(spec.label, locale)}</p>
                  <p className="mt-3 font-display text-3xl font-bold uppercase text-[var(--rtc-white)]">
                    {t(spec.value, locale)}
                  </p>
                </div>
              ))}
            </div>
            <CTAButton href={localizedPath(locale, "/the-lamera")} className="mt-8">
              {dictionary.common.discoverLamera}
            </CTAButton>
          </div>
          <MediaFrame
            image={{
              src: carImages[0],
              alt: {
                en: "Abstract Lamera media placeholder",
                fr: "Visuel abstrait Lamera",
                de: "Abstraktes Lamera-Platzhalterbild",
              },
              isPlaceholder: true,
            }}
            locale={locale}
            priority
            ratio="aspect-[4/3]"
            variant="race"
            overlay="speed"
          />
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-20 md:py-28">
        <RaceBackdrop variant="track" intensity="medium" ghostText="PROCESS" sectionIndex="04" showGhostText />
        <div className="page-shell relative z-10">
          <div className="grid gap-10 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
            <RaceSectionHeading
              title={dictionary.home.methodTitle}
              text={dictionary.home.methodText}
              index="04"
              variant="editorial"
              showSpeedLines
            />
            <div className="grid gap-0 border-y border-white/10">
              {methodSteps.map((step) => (
                <div key={step.step} className="grid gap-4 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[5rem_1fr]">
                  <p className="font-display text-5xl font-extrabold italic leading-none text-[var(--rtc-green)]">{step.step}</p>
                  <div>
                    <h3 className="font-display text-3xl font-bold uppercase">{t(step.title, locale)}</h3>
                    <p className="mt-2 leading-7 text-muted">{t(step.copy, locale)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <RaceMetaBar
            className="mt-12"
            items={[dictionary.common.based, dictionary.common.privateDatesOnRequest, dictionary.common.seatsOnRequest]}
          />
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-28">
        <div className="absolute inset-0">
          <MediaFrame
            image={{
              src: "/images/cta/night-cockpit.webp",
              alt: {
                en: "Abstract night racing CTA placeholder",
                fr: "Visuel abstrait CTA course de nuit",
                de: "Abstraktes Nacht-Rennsport-CTA-Bild",
              },
              isPlaceholder: true,
            }}
            locale={locale}
            ratio="h-full"
            variant="fullBleed"
            overlay="strong"
            className="h-full rounded-none border-0 shadow-none"
          />
          <div className="absolute inset-0 bg-black/72" />
        </div>
        <RaceBackdrop variant="night" intensity="medium" greenSide="both" showGhostText ghostText="DRIVE" className="z-0 bg-transparent" />
        <div className="page-shell relative z-10">
          <div className="max-w-3xl">
            <h2 className="race-display text-[var(--rtc-white)]">{dictionary.home.finalCtaTitle}</h2>
            <p className="race-body mt-6">{dictionary.home.finalCtaText}</p>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <CTAButton href={contactHref(locale, { objective: "private-test" })}>
                {dictionary.common.requestPrivateTest}
              </CTAButton>
              <CTAButton href={contactHref(locale, { objective: "race-weekend" })} variant="secondary">
                {dictionary.common.requestDrive}
              </CTAButton>
            </div>
            <p className="mt-5 text-sm text-muted">{dictionary.home.finalCtaSmall}</p>
          </div>
        </div>
      </section>
    </>
  );
}
