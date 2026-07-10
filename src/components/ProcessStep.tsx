import type { ProcessStep as ProcessStepType } from "@/types/content";
import { t, type Locale } from "@/lib/i18n";

type ProcessStepProps = {
  step: ProcessStepType;
  locale: Locale;
};

export function ProcessStep({ step, locale }: ProcessStepProps) {
  return (
    <article className="relative rounded border border-white/10 bg-surface p-6">
      <p className="font-display text-5xl font-semibold text-brand">{step.step}</p>
      <h3 className="mt-6 font-display text-3xl font-semibold uppercase">
        {t(step.title, locale)}
      </h3>
      <p className="mt-3 leading-7 text-muted">{t(step.copy, locale)}</p>
    </article>
  );
}
