import type { ProgrammeCardData } from "@/types/content";
import { localizedPath, t, type Locale } from "@/lib/i18n";
import { CTAButton } from "@/components/CTAButton";
import { MediaFrame } from "@/components/MediaFrame";

type ProgrammeCardProps = {
  programme: ProgrammeCardData;
  locale: Locale;
};

export function ProgrammeCard({ programme, locale }: ProgrammeCardProps) {
  return (
    <article className="group grid overflow-hidden border border-white/10 bg-surface transition hover:-translate-y-1 hover:border-brand/50 md:grid-rows-[auto_1fr] cut-corner">
      <MediaFrame
        image={programme.image}
        locale={locale}
        ratio="aspect-[4/3]"
        variant="race"
        overlay="speed"
        className="rounded-none border-0 shadow-none transition duration-300 group-hover:scale-[1.01]"
      />
      <div className="flex flex-col p-6">
        <h3 className="font-display text-3xl font-semibold uppercase">
          {t(programme.title, locale)}
        </h3>
        <p className="mt-4 flex-1 leading-7 text-muted">{t(programme.copy, locale)}</p>
        <CTAButton
          href={localizedPath(locale, programme.href)}
          variant="ghost"
          className="mt-6 justify-start px-0"
        >
          {t(programme.cta, locale)}
        </CTAButton>
      </div>
    </article>
  );
}
