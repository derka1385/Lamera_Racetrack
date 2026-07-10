import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import { navItems } from "@/data/site";
import { localizedPath, t, type Locale } from "@/lib/i18n";
import { Logo } from "@/components/Logo";

type FooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Footer({ locale, dictionary }: FooterProps) {
  const legal = [
    { href: "/privacy", label: dictionary.meta.privacy.title },
    { href: "/legal", label: dictionary.meta.legal.title },
    { href: "/cookies", label: dictionary.meta.cookies.title },
  ];

  return (
    <footer className="border-t border-white/10 bg-black py-14">
      <div className="page-shell grid gap-10 md:grid-cols-[1.2fr_2fr]">
        <div className="space-y-5">
          <Logo locale={locale} variant="footer" />
          <p className="max-w-sm text-sm leading-6 text-muted">
            {dictionary.meta.home.description}
          </p>
          <p className="text-sm text-muted">{dictionary.common.based}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="font-display text-xl font-semibold uppercase">Programmes</h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted">
              {navItems.slice(0, 3).map((item) => (
                <li key={item.href}>
                  <Link href={localizedPath(locale, item.href)} className="hover:text-brand">
                    {t(item.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold uppercase">Team</h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted">
              {navItems.slice(3).map((item) => (
                <li key={item.href}>
                  <Link href={localizedPath(locale, item.href)} className="hover:text-brand">
                    {t(item.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold uppercase">Legal</h2>
            <ul className="mt-4 grid gap-3 text-sm text-muted">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={localizedPath(locale, item.href)} className="hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
