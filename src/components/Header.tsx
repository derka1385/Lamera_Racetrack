"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/content/dictionaries";
import { navItems } from "@/data/site";
import { contactHref, localizedPath, stripLocale, t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/CTAButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { MobileNavigation } from "@/components/MobileNavigation";

type HeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Header({ locale, dictionary }: HeaderProps) {
  const pathname = usePathname();
  const activePath = stripLocale(pathname);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/90 backdrop-blur-md">
      <div className="page-shell flex min-h-[72px] min-w-0 items-center justify-between gap-3 py-2">
        <div className="flex min-w-0 shrink-0 items-center gap-3">
          <div className="hidden sm:block">
            <Logo locale={locale} variant="full" />
          </div>
          <div className="sm:hidden">
            <Logo locale={locale} variant="compact" />
          </div>
        </div>

        <nav className="hidden min-w-0 items-center gap-1 xl:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={localizedPath(locale, item.href)}
              className={cn(
                "min-h-11 whitespace-nowrap rounded px-3 py-3 text-sm font-medium text-muted hover:bg-white/5 hover:text-foreground",
                activePath === item.href && "bg-white/8 text-foreground",
              )}
            >
              {t(item.label, locale)}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <LanguageSwitcher locale={locale} label={dictionary.common.language} />
          <CTAButton href={contactHref(locale, { objective: "private-test" })} className="min-h-11 px-4 py-2">
            {dictionary.common.requestDrive}
          </CTAButton>
        </div>

        <div className="flex shrink-0 items-center gap-2 xl:hidden">
          <CTAButton
            href={contactHref(locale, { objective: "private-test" })}
            className="hidden min-h-11 px-3 py-2 text-xs sm:inline-flex"
            icon={false}
          >
            {dictionary.common.requestDrive}
          </CTAButton>
          <MobileNavigation locale={locale} dictionary={dictionary} />
        </div>
      </div>
    </header>
  );
}
