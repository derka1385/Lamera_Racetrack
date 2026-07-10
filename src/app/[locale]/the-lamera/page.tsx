import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import { carImages, carSpecifications } from "@/data/site";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CarSpecification } from "@/components/CarSpecification";
import { MediaFrame } from "@/components/MediaFrame";
import { SectionHeading } from "@/components/SectionHeading";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createMetadata(isLocale(locale) ? locale : "en", "lamera");
}

export default async function LameraPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const dictionary = getDictionary(locale);
  const page = dictionary.pages.lamera;

  return (
    <>
      <section className="bg-black py-16 md:py-24">
        <div className="page-shell">
          <Breadcrumbs locale={locale} items={[{ label: page.eyebrow }]} />
          <SectionHeading className="mt-10" eyebrow={page.eyebrow} title={page.title} text={page.intro} />
        </div>
      </section>

      <section className="py-20">
        <div className="page-shell grid gap-5 md:grid-cols-2">
          {carImages.map((src, index) => (
            <MediaFrame
              key={src}
              image={{
                src,
                alt: {
                  en: `Abstract Lamera media placeholder ${index + 1}`,
                  fr: `Visuel abstrait Lamera ${index + 1}`,
                  de: `Abstraktes Lamera-Platzhalterbild ${index + 1}`,
                },
                isPlaceholder: true,
              }}
              locale={locale}
              ratio={index === 0 ? "aspect-[16/9] md:col-span-2" : "aspect-[4/3]"}
            />
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="page-shell">
          <SectionHeading title="Specifications" text={page.disclaimer} />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {carSpecifications.map((spec) => (
              <CarSpecification
                key={`${t(spec.label, locale)}-${t(spec.value, locale)}`}
                spec={spec}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="page-shell grid gap-8 lg:grid-cols-3">
          {["Cockpit details", "Engineering details", "Endurance suitability"].map((title) => (
            <article key={title} className="rounded border border-white/10 bg-surface p-6">
              <h2 className="font-display text-3xl font-semibold uppercase">{title}</h2>
              <p className="mt-4 leading-7 text-muted">
                Content structure prepared for verified technical notes, safety information, learning context and race-format explanation.
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
