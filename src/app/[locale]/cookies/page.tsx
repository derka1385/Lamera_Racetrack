import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ConsentPlaceholder } from "@/components/ConsentPlaceholder";
import { SectionHeading } from "@/components/SectionHeading";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createMetadata(isLocale(locale) ? locale : "en", "cookies");
}

export default async function CookiesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const dictionary = getDictionary(locale);

  return (
    <section className="py-16 md:py-24">
      <div className="page-shell max-w-4xl">
        <Breadcrumbs locale={locale} items={[{ label: dictionary.meta.cookies.title }]} />
        <SectionHeading className="mt-10" title={dictionary.meta.cookies.title} text={dictionary.pages.legalTemplate} />
        <div className="mt-10">
          <ConsentPlaceholder />
        </div>
      </div>
    </section>
  );
}
