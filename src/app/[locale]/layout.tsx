import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { locales, isLocale, type Locale } from "@/lib/i18n";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LangSetter } from "@/components/LangSetter";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dictionary = getDictionary(locale);

  return (
    <>
      <LangSetter locale={locale} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-brand focus:px-4 focus:py-3 focus:text-[var(--color-brand-ink)]"
      >
        {dictionary.common.skip}
      </a>
      <Header locale={locale} dictionary={dictionary} />
      <main id="main">
        {children}
      </main>
      <Footer locale={locale} dictionary={dictionary} />
      <MobileStickyCTA locale={locale} dictionary={dictionary} />
    </>
  );
}
