import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import { legalPlaceholders } from "@/data/site";
import { isLocale, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ConsentPlaceholder } from "@/components/ConsentPlaceholder";
import { SectionHeading } from "@/components/SectionHeading";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createMetadata(isLocale(locale) ? locale : "en", "privacy");
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const dictionary = getDictionary(locale);

  return (
    <section className="py-16 md:py-24">
      <div className="page-shell max-w-4xl">
        <Breadcrumbs locale={locale} items={[{ label: dictionary.meta.privacy.title }]} />
        <SectionHeading className="mt-10" title={dictionary.meta.privacy.title} text={dictionary.pages.legalTemplate} />
        <div className="mt-10 grid gap-4 text-muted">
          <p>This page is a template for final legal review. It should describe enquiry handling, retention, security, processor details and contact rights once official information is supplied.</p>
          <ConsentPlaceholder />
          <ul className="grid gap-2">
            {legalPlaceholders.map((item) => <li key={item}>Missing: {item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
