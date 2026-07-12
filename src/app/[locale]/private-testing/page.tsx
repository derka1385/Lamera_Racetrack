import type { Metadata } from "next";
import Script from "next/script";
import { getDictionary } from "@/content/dictionaries";
import { audienceProfiles, includedItems, privateTestFormats, privateTestingFaqs } from "@/data/site";
import { contactHref, isLocale, t, type Locale } from "@/lib/i18n";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { priceLabel } from "@/lib/utils";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTAButton } from "@/components/CTAButton";
import { FAQAccordion } from "@/components/FAQAccordion";
import { AnimatedRacingLine } from "@/components/motion/AnimatedRacingLine";
import { RaceBackdrop } from "@/components/motion/RaceBackdrop";
import { SectionWipe } from "@/components/motion/SectionWipe";
import { RaceDivider } from "@/components/race/RaceDivider";
import { RaceMetaBar } from "@/components/race/RaceMetaBar";
import { RaceProgrammePanel } from "@/components/race/RaceProgrammePanel";
import { RaceSection } from "@/components/race/RaceSection";
import { RaceSectionHeading } from "@/components/race/RaceSectionHeading";
import { SlantedPanel } from "@/components/race/SlantedPanel";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createMetadata(isLocale(locale) ? locale : "en", "privateTesting");
}

export default async function PrivateTestingPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const dictionary = getDictionary(locale);
  const page = dictionary.pages.privateTesting;
  const formatLabels = page.formatLabels;
  const inclusionGroups = [
    {
      index: "01",
      title: page.inclusionGroups.car,
      items: [includedItems[0], includedItems[1], includedItems[2], includedItems[11]],
    },
    {
      index: "02",
      title: page.inclusionGroups.performance,
      items: [includedItems[3], includedItems[4], includedItems[5], includedItems[6], includedItems[7], includedItems[8]],
    },
    {
      index: "03",
      title: page.inclusionGroups.experience,
      items: [includedItems[9], includedItems[10], includedItems[12], includedItems[14]],
    },
  ];

  return (
    <>
      <Script id="private-testing-breadcrumbs" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(locale, [{ name: page.eyebrow, path: "/private-testing" }])) }} />
      <section className="relative isolate flex h-auto min-h-[680px] overflow-hidden py-14 md:h-[min(88dvh,980px)] md:items-center md:py-20">
        <RaceBackdrop
          variant="speed"
          intensity="hero"
          greenSide="right"
          showGhostText
          ghostText="PRIVATE TESTING"
          sectionIndex="01"
        />
        <div aria-hidden="true" className="absolute right-[-16%] top-0 hidden h-full w-[52%] -skew-x-12 bg-[linear-gradient(180deg,rgb(64_207_69/0.18),rgb(255_255_255/0.06),transparent)] md:block" />
        <div className="page-shell relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Breadcrumbs locale={locale} items={[{ label: page.eyebrow }]} />
            <p className="race-eyebrow mt-10">{page.eyebrow}</p>
            <h1 className="race-display-xl relative mt-4 max-w-4xl text-[var(--rtc-white)]">
              <span aria-hidden="true" className="absolute left-[-0.12em] top-[0.18em] -z-10 h-[0.34em] w-[74%] -skew-x-12 bg-[var(--rtc-green)]/65" />
              {page.title}
            </h1>
            <p className="race-body mt-7 max-w-2xl text-[var(--rtc-white)]/88">{page.intro}</p>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <CTAButton href={contactHref(locale, { objective: "private-test" })} className="w-full min-[420px]:w-auto">
                {dictionary.common.requestPrivateTest}
              </CTAButton>
              <CTAButton href={contactHref(locale, { objective: "private-test", programme: "bespoke-private-day" })} variant="secondary" className="w-full min-[420px]:w-auto">
                {dictionary.common.confidentialCall}
              </CTAButton>
            </div>
            <RaceMetaBar className="mt-8 max-w-2xl" items={[page.metaLine, "Lamera Cup", "Driver Development"]} />
          </div>
          <div className="relative hidden min-h-[520px] lg:block">
            <div aria-hidden="true" className="race-index absolute -right-16 top-10 text-[var(--rtc-white)] opacity-[0.08]">01</div>
            <AnimatedRacingLine className="inset-0 opacity-90" />
            <div className="absolute bottom-10 right-8 w-[72%] border-y border-white/14 bg-black/36 p-4">
              <p className="race-meta">SETUP / BRIEFING / TRACK TIME / DATA REVIEW</p>
              <div className="mt-3 h-1 bg-[linear-gradient(90deg,var(--rtc-green),transparent)]" />
            </div>
          </div>
        </div>
      </section>
      <SectionWipe />

      <RaceSection variant="garage" intensity="subtle" ghostText="START" sectionIndex="02">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <RaceSectionHeading
            title={page.startingTitle}
            text={page.startingIntro}
            index="02"
            variant="editorial"
            showSpeedLines
          />
          <div className="grid gap-0 border-y border-white/10">
            {audienceProfiles.map((profile, index) => (
              <div key={t(profile, locale)} className="group grid min-h-20 grid-cols-[4.25rem_1fr] items-center gap-4 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[5.5rem_1fr_auto]">
                <span className="font-display text-5xl font-extrabold italic leading-none text-[var(--rtc-green)]/85">{String(index + 1).padStart(2, "0")}</span>
                <p className="text-lg font-semibold text-[var(--rtc-white)]">{t(profile, locale)}</p>
                <span aria-hidden="true" className="hidden h-px w-32 bg-gradient-to-r from-[var(--rtc-green)] to-transparent transition-all duration-300 group-hover:w-44 sm:block motion-reduce:transition-none" />
              </div>
            ))}
          </div>
        </div>
      </RaceSection>

      <RaceDivider variant="racing-line" />

      <RaceSection variant="track" intensity="hero" ghostText="PIT LANE" sectionIndex="03" className="py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.42fr_0.58fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <RaceSectionHeading
              eyebrow={dictionary.common.exploreProgrammes}
              title={page.programmesImpactTitle}
              text={page.programmesImpactIntro}
              index="03"
              showSpeedLines
            />
            <div className="mt-10 hidden border-l border-white/10 pl-5 lg:block">
              {privateTestFormats.map((format, index) => (
                <p key={format.id} className="race-meta py-3">
                  <span className="mr-4 text-[var(--rtc-green)]">{String(index + 1).padStart(2, "0")}</span>
                  {t(format.title, locale)}
                </p>
              ))}
            </div>
          </div>
          <div className="grid gap-6">
            {privateTestFormats.map((format, index) => (
              <RaceProgrammePanel
                key={format.id}
                index={String(index + 1).padStart(2, "0")}
                title={t(format.title, locale)}
                description={t(format.description, locale)}
                info={[
                  { label: formatLabels.idealProfile, value: t(format.idealDriver, locale) },
                  { label: formatLabels.duration, value: t(format.duration, locale) },
                  { label: formatLabels.trackTime, value: t(format.trackTime, locale) },
                  { label: formatLabels.coaching, value: t(format.coaching, locale) },
                  { label: formatLabels.dataReview, value: t(format.dataReview, locale) },
                  { label: formatLabels.equipment, value: t(format.equipment, locale) },
                ]}
                price={priceLabel(format.price, { onRequest: dictionary.common.priceOnRequest, from: dictionary.common.priceFrom })}
                cta={t(format.cta, locale)}
                href={contactHref(locale, { objective: "private-test", programme: format.id })}
              />
            ))}
          </div>
        </div>
      </RaceSection>

      <RaceSection variant="telemetry" intensity="subtle" ghostText="SUPPORT" sectionIndex="04">
        <RaceSectionHeading
          title={page.includedImpactTitle}
          text={page.includedNote}
          index="04"
          variant="editorial"
          showSpeedLines
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {inclusionGroups.map((group) => (
            <SlantedPanel key={group.title} className="min-h-full" innerClassName="p-6">
              <span className="race-meta text-[var(--rtc-green)]">{group.index}</span>
              <h3 className="mt-4 font-display text-5xl font-extrabold uppercase italic leading-none text-white/90">{group.title}</h3>
              <div className="mt-6 h-px bg-gradient-to-r from-[var(--rtc-green)] to-transparent" />
              <ul className="mt-6 grid gap-3">
                {group.items.map((item) => (
                  <li key={t(item, locale)} className="flex items-center gap-3 text-[var(--rtc-muted)]">
                    <span aria-hidden="true" className="h-1.5 w-1.5 bg-[var(--rtc-green)]" />
                    {t(item, locale)}
                  </li>
                ))}
              </ul>
            </SlantedPanel>
          ))}
        </div>
      </RaceSection>

      <RaceDivider variant="double-stripe" />

      <RaceSection variant="minimal" intensity="subtle" ghostText="FAQ" sectionIndex="05">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr]">
          <RaceSectionHeading title="FAQ" index="05" variant="minimal" showSpeedLines />
          <FAQAccordion items={privateTestingFaqs} locale={locale} variant="race" />
        </div>
      </RaceSection>

      <section className="relative isolate overflow-hidden py-24 md:py-32">
        <RaceBackdrop
          variant="night"
          intensity="hero"
          greenSide="both"
          showGhostText
          ghostText="DRIVE"
          showRacingLine
          showStreaks
        />
        <div className="page-shell relative z-10">
          <div className="max-w-4xl">
            <p className="race-eyebrow">{page.eyebrow}</p>
            <h2 className="race-display mt-4 text-[var(--rtc-white)]">{page.finalCtaTitle}</h2>
            <p className="race-body mt-6 max-w-2xl">{page.finalCtaText}</p>
            <CTAButton href={contactHref(locale, { objective: "private-test" })} className="mt-8">
              {page.finalCta}
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
