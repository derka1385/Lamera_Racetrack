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
import { SectionHeading } from "@/components/SectionHeading";

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

  return (
    <>
      <Script id="private-testing-breadcrumbs" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(locale, [{ name: page.eyebrow, path: "/private-testing" }])) }} />
      <section className="bg-black py-16 md:py-24">
        <div className="page-shell">
          <Breadcrumbs locale={locale} items={[{ label: page.eyebrow }]} />
          <SectionHeading className="mt-10" eyebrow={page.eyebrow} title={page.title} text={page.intro} />
          <CTAButton href={contactHref(locale, { objective: "private-test" })} className="mt-8">{dictionary.common.requestPrivateTest}</CTAButton>
        </div>
      </section>

      <section className="py-20">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHeading title={page.forTitle} text="Premium sports car owners, track-day drivers and committed beginners can start with a format matched to their confidence and objective." />
          <div className="grid gap-3 sm:grid-cols-2">
            {audienceProfiles.map((profile) => (
              <div key={t(profile, locale)} className="rounded border border-white/10 bg-surface p-5 text-muted">
                {t(profile, locale)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="page-shell">
          <SectionHeading title={dictionary.common.exploreProgrammes} />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {privateTestFormats.map((format) => (
              <article key={format.id} className="rounded border border-white/10 bg-black/25 p-6">
                <h2 className="font-display text-4xl font-semibold uppercase">{t(format.title, locale)}</h2>
                <p className="mt-4 leading-7 text-muted">{t(format.description, locale)}</p>
                <dl className="mt-6 grid gap-4 text-sm text-muted sm:grid-cols-2">
                  <div><dt className="text-foreground">Ideal profile</dt><dd>{t(format.idealDriver, locale)}</dd></div>
                  <div><dt className="text-foreground">Duration</dt><dd>{t(format.duration, locale)}</dd></div>
                  <div><dt className="text-foreground">Track time</dt><dd>{t(format.trackTime, locale)}</dd></div>
                  <div><dt className="text-foreground">Coaching</dt><dd>{t(format.coaching, locale)}</dd></div>
                  <div><dt className="text-foreground">Data review</dt><dd>{t(format.dataReview, locale)}</dd></div>
                  <div><dt className="text-foreground">Equipment</dt><dd>{t(format.equipment, locale)}</dd></div>
                </dl>
                <p className="mt-6 font-semibold text-brand">
                  {priceLabel(format.price, { onRequest: dictionary.common.priceOnRequest, from: dictionary.common.priceFrom })}
                </p>
                <CTAButton href={contactHref(locale, { objective: "private-test", programme: format.id })} variant="secondary" className="mt-5">{t(format.cta, locale)}</CTAButton>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="page-shell">
          <SectionHeading title={page.includedTitle} text={page.includedNote} />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {includedItems.map((item) => (
              <div key={t(item, locale)} className="rounded border border-white/10 bg-white/[0.035] p-4 text-muted">
                {t(item, locale)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-20">
        <div className="page-shell">
          <SectionHeading title="FAQ" />
          <div className="mt-10">
            <FAQAccordion items={privateTestingFaqs} locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
