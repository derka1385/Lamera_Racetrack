import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import { raceResults } from "@/data/site";
import { isLocale, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ResultsFilters } from "@/components/ResultsFilters";
import { SectionHeading } from "@/components/SectionHeading";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const metadata = createMetadata(isLocale(locale) ? locale : "en", "results");
  const hasVerifiedResults = raceResults.some((result) => result.verified);

  return hasVerifiedResults
    ? metadata
    : {
        ...metadata,
        robots: {
          index: false,
          follow: true,
        },
      };
}

export default async function ResultsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const dictionary = getDictionary(locale);
  const page = dictionary.pages.results;

  return (
    <>
      <section className="bg-black py-16 md:py-24">
        <div className="page-shell">
          <Breadcrumbs locale={locale} items={[{ label: page.eyebrow }]} />
          <SectionHeading className="mt-10" eyebrow={page.eyebrow} title={page.title} text={page.intro} />
        </div>
      </section>
      <section className="py-20">
        <div className="page-shell">
          <ResultsFilters locale={locale} dictionary={dictionary} />
        </div>
      </section>
    </>
  );
}
