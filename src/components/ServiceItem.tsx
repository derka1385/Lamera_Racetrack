import {
  Activity,
  Flag,
  Headphones,
  Settings,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ServiceItem as ServiceItemType } from "@/types/content";
import { t, type Locale } from "@/lib/i18n";

const icons = {
  Activity,
  Flag,
  Headphones,
  Settings,
  Truck,
  Wrench,
} satisfies Record<string, LucideIcon>;

type ServiceItemProps = {
  item: ServiceItemType;
  locale: Locale;
};

export function ServiceItem({ item, locale }: ServiceItemProps) {
  const Icon = icons[item.icon as keyof typeof icons] ?? Wrench;

  return (
    <article className="rounded border border-white/10 bg-white/[0.035] p-5">
      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded border border-brand/30 text-brand">
        <Icon aria-hidden="true" size={20} />
      </div>
      <h3 className="font-display text-2xl font-semibold uppercase">{t(item.title, locale)}</h3>
      <p className="mt-3 leading-7 text-muted">{t(item.copy, locale)}</p>
    </article>
  );
}
