import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { locales, isLocale, localizedPath, type Locale } from "@/lib/i18n";
import { CTAButton } from "@/components/CTAButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LangSetter } from "@/components/LangSetter";

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
      <main id="main" className="safe-bottom">
        {children}
      </main>
      <Footer locale={locale} dictionary={dictionary} />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-background/94 p-3 backdrop-blur md:hidden">
        <CTAButton
          href={localizedPath(locale, "/contact")}
          className="w-full"
          icon={false}
        >
          {dictionary.common.requestDrive}
        </CTAButton>
      </div>
    </>
  );
}
