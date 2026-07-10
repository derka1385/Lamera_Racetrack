"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { localizedPath, t, type Locale } from "@/lib/i18n";
import { navItems } from "@/data/site";
import { CTAButton } from "@/components/CTAButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";

type MobileNavigationProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function MobileNavigation({ locale, dictionary }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? dictionary.common.close : dictionary.common.menu}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/10 bg-white/5 text-foreground"
      >
        {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-background/96 px-4 py-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <Logo locale={locale} variant="compact" />
            <button
              type="button"
              aria-label={dictionary.common.close}
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/10 bg-white/5 text-foreground"
            >
              <X aria-hidden="true" size={20} />
            </button>
          </div>

          <nav className="mt-10 flex flex-col gap-2" aria-label={dictionary.common.menu}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localizedPath(locale, item.href)}
                onClick={() => setOpen(false)}
                className="rounded border border-white/10 bg-white/5 px-4 py-4 font-display text-3xl font-semibold uppercase"
              >
                {t(item.label, locale)}
              </Link>
            ))}
          </nav>

          <div className="mt-8 grid gap-4">
            <LanguageSwitcher locale={locale} label={dictionary.common.language} />
            <CTAButton href={localizedPath(locale, "/contact")}>
              {dictionary.common.requestDrive}
            </CTAButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}
