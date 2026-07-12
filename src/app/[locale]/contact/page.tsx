import type { Metadata } from "next";
import { Suspense } from "react";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";
import { SectionHeading } from "@/components/SectionHeading";
import { RaceBackdrop } from "@/components/motion/RaceBackdrop";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createMetadata(isLocale(locale) ? locale : "en", "contact");
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const dictionary = getDictionary(locale);
  const page = dictionary.pages.contact;
  const directEmail = process.env.NEXT_PUBLIC_DIRECT_EMAIL?.trim();
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim();

  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24">
      <RaceBackdrop variant="minimal" intensity="subtle" greenSide="left" showRacingLine showStreaks={false} ghostText="CONTACT" showGhostText />
      <div className="page-shell relative z-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Breadcrumbs locale={locale} items={[{ label: page.eyebrow }]} />
          <SectionHeading className="mt-10" eyebrow={page.eyebrow} title={page.title} text={page.intro} />
          <aside className="mt-8 border border-white/10 bg-surface p-5 cut-corner">
            <h2 className="font-display text-2xl font-semibold uppercase">{dictionary.common.contactDetails}</h2>
            <div className="mt-4 grid gap-3 text-sm text-muted">
              {directEmail ? (
                <a href={`mailto:${directEmail}`} className="hover:text-brand">
                  {dictionary.common.directEmail}: {directEmail}
                </a>
              ) : null}
              {whatsappUrl ? (
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-brand">
                  {dictionary.common.whatsapp}
                </a>
              ) : null}
              <p>{dictionary.common.languagesSpoken}: FR / DE / EN</p>
              {!directEmail && !whatsappUrl ? (
                <p>{dictionary.common.contactDetailsMissing}</p>
              ) : null}
            </div>
          </aside>
        </div>
        <Suspense fallback={<div className="border border-white/10 bg-surface p-8 text-muted cut-corner" />}>
          <LeadForm dictionary={dictionary} locale={locale} />
        </Suspense>
      </div>
    </section>
  );
}
