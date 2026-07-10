import type { CarSpecification as CarSpecificationType } from "@/types/content";
import { t, type Locale } from "@/lib/i18n";

type CarSpecificationProps = {
  spec: CarSpecificationType;
  locale: Locale;
};

export function CarSpecification({ spec, locale }: CarSpecificationProps) {
  return (
    <div className="rounded border border-white/10 bg-white/5 p-5">
      <p className="text-sm uppercase text-muted">{t(spec.label, locale)}</p>
      <p className="mt-2 font-display text-3xl font-semibold uppercase text-foreground">
        {t(spec.value, locale)}
      </p>
    </div>
  );
}
