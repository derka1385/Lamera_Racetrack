import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import { legalPlaceholders } from "@/data/site";
import { isLocale, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { RaceBackdrop } from "@/components/motion/RaceBackdrop";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createMetadata(isLocale(locale) ? locale : "en", "legal");
}

export default async function LegalPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const dictionary = getDictionary(locale);

  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24">
      <RaceBackdrop variant="minimal" intensity="subtle" showGrid={false} showStreaks={false} showRacingLine={false} showNoise />
      <div className="page-shell relative z-10 max-w-4xl">
        <Breadcrumbs locale={locale} items={[{ label: dictionary.meta.legal.title }]} />
        <SectionHeading className="mt-10" title={dictionary.meta.legal.title} text={dictionary.pages.legalTemplate} />
        <div className="mt-10 grid gap-4 border border-white/10 bg-surface p-6 text-muted cut-corner">
          {legalPlaceholders.map((item) => <p key={item}>{item}: To be supplied</p>)}
        </div>
      </div>
    </section>
  );
}
