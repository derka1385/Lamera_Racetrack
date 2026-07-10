import type { Metadata } from "next";
import Script from "next/script";
import { getDictionary } from "@/content/dictionaries";
import {
  carImages,
  carSpecifications,
  circuits,
  homeProgrammes,
  processSteps,
  proofStats,
  services,
  teamMembers,
  testimonials,
  timeline,
} from "@/data/site";
import { isLocale, localizedPath, t, type Locale } from "@/lib/i18n";
import { createMetadata, organizationJsonLd } from "@/lib/seo";
import { CarSpecification } from "@/components/CarSpecification";
import { CircuitCard } from "@/components/CircuitCard";
import { CTAButton } from "@/components/CTAButton";
import { Hero } from "@/components/Hero";
import { MediaFrame } from "@/components/MediaFrame";
import { ProcessStep } from "@/components/ProcessStep";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { ProofStat } from "@/components/ProofStat";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceItem } from "@/components/ServiceItem";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { TestimonialCard } from "@/components/TestimonialCard";

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

  return (
    <>
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(locale)) }}
      />
      <Hero locale={locale} dictionary={dictionary} />

      <section className="border-b border-white/10 bg-black">
        <div className="page-shell grid divide-y divide-white/10 py-4 md:grid-cols-4 md:divide-x md:divide-y-0">
          {proofStats.map((stat) => (
            <ProofStat key={t(stat.label, locale)} stat={stat} locale={locale} />
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="page-shell">
          <Reveal>
            <SectionHeading title={dictionary.home.programmesTitle} text={dictionary.home.programmesText} />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {homeProgrammes.map((programme) => (
              <ProgrammeCard key={programme.id} programme={programme} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="page-shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow={dictionary.home.lameraTitle}
              title="330 HP / 1,020 KG"
              text={dictionary.home.lameraText}
            />
            <div className="mt-8 grid grid-cols-2 gap-3">
              {carSpecifications.slice(0, 4).map((spec) => (
                <CarSpecification
                  key={`${t(spec.label, locale)}-${t(spec.value, locale)}`}
                  spec={spec}
                  locale={locale}
                />
              ))}
            </div>
            <CTAButton href={localizedPath(locale, "/the-lamera")} className="mt-8">
              {dictionary.common.discoverLamera}
            </CTAButton>
          </Reveal>
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
          />
        </div>
      </section>

      <section className="py-24">
        <div className="page-shell">
          <SectionHeading title={dictionary.home.supportTitle} text={dictionary.home.supportText} />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => (
              <ServiceItem key={`${item.icon}-${t(item.title, locale)}`} item={item} locale={locale} />
            ))}
          </div>
          <CTAButton href={localizedPath(locale, "/contact")} className="mt-10">
            {dictionary.common.buildProgramme}
          </CTAButton>
        </div>
      </section>

      <section className="bg-black py-24">
        <div className="page-shell">
          <SectionHeading title={dictionary.home.processTitle} text={dictionary.home.processText} />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <ProcessStep key={step.step} step={step} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="page-shell">
          <SectionHeading title={dictionary.home.circuitsTitle} text={dictionary.home.circuitsText} />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {circuits.slice(0, 6).map((circuit) => (
              <CircuitCard key={circuit.id} circuit={circuit} locale={locale} dictionary={dictionary} />
            ))}
          </div>
          <CTAButton href={localizedPath(locale, "/calendar")} className="mt-10">
            {dictionary.common.viewCalendar}
          </CTAButton>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="page-shell">
          <SectionHeading title={dictionary.home.heritageTitle} text={dictionary.home.heritageText} />
          <div className="mt-12 grid gap-4">
            {timeline.map((item, index) => (
              <article key={`${item.year ?? "today"}-${t(item.title, locale)}`} className="grid gap-4 rounded border border-white/10 bg-black/25 p-5 md:grid-cols-[8rem_1fr]">
                <p className="font-display text-4xl font-semibold text-brand">{item.year ?? String(index + 1).padStart(2, "0")}</p>
                <div>
                  <h3 className="font-display text-3xl font-semibold uppercase">{t(item.title, locale)}</h3>
                  <p className="mt-2 text-muted">{t(item.copy, locale)}</p>
                </div>
              </article>
            ))}
          </div>
          <CTAButton href={localizedPath(locale, "/results")} className="mt-10">
            {dictionary.common.readMore}
          </CTAButton>
        </div>
      </section>

      <section className="py-24">
        <div className="page-shell">
          <SectionHeading title={dictionary.home.teamTitle} text={dictionary.home.teamText} />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.slice(0, 3).map((member) => (
              <TeamMemberCard key={member.id} member={member} locale={locale} />
            ))}
          </div>
          <CTAButton href={localizedPath(locale, "/team")} className="mt-10">
            {dictionary.common.meetTeam}
          </CTAButton>
        </div>
      </section>

      <section className="bg-black py-24">
        <div className="page-shell">
          <SectionHeading
            title="Testimonials"
            text="Demo testimonials are separated from verified production reviews."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.initials}
                testimonial={testimonial}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-28">
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
            className="h-full rounded-none border-0 shadow-none"
          />
          <div className="absolute inset-0 bg-black/72" />
        </div>
        <div className="page-shell relative z-10 max-w-3xl">
          <h2 className="display-type text-5xl uppercase md:text-7xl">{dictionary.home.finalCtaTitle}</h2>
          <p className="mt-5 text-xl leading-8 text-muted">{dictionary.home.finalCtaText}</p>
          <CTAButton href={localizedPath(locale, "/contact")} className="mt-8">
            {dictionary.common.confidentialCall}
          </CTAButton>
          <p className="mt-5 text-sm text-muted">{dictionary.home.finalCtaSmall}</p>
        </div>
      </section>
    </>
  );
}
