import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n";

type BreadcrumbsProps = {
  locale: Locale;
  items: Array<{ label: string; href?: string }>;
};

export function Breadcrumbs({ locale, items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href={localizedPath(locale)} className="hover:text-brand">
            RaceTrack Competition
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {item.href ? (
              <Link href={localizedPath(locale, item.href)} className="hover:text-brand">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
