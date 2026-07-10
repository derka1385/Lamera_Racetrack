import type { ProofStat as ProofStatType } from "@/types/content";
import { t, type Locale } from "@/lib/i18n";

type ProofStatProps = {
  stat: ProofStatType;
  locale: Locale;
};

export function ProofStat({ stat, locale }: ProofStatProps) {
  return (
    <div className="border-l border-white/10 px-5 py-4 first:border-l-0">
      <p className="font-display text-3xl font-semibold uppercase text-foreground">
        {t(stat.value, locale)}
      </p>
      <p className="mt-1 text-sm text-muted">{t(stat.label, locale)}</p>
    </div>
  );
}
