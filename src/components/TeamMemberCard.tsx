import type { TeamMember } from "@/types/content";
import { t, type Locale } from "@/lib/i18n";
import { MediaFrame } from "@/components/MediaFrame";

type TeamMemberCardProps = {
  member: TeamMember;
  locale: Locale;
};

export function TeamMemberCard({ member, locale }: TeamMemberCardProps) {
  return (
    <article className="overflow-hidden rounded border border-white/10 bg-surface">
      <MediaFrame image={member.image} locale={locale} ratio="aspect-[4/5]" className="rounded-none border-0 shadow-none" />
      <div className="p-5">
        <p className="text-sm uppercase text-brand">{t(member.publicRole, locale)}</p>
        <h3 className="mt-2 font-display text-3xl font-semibold uppercase">{member.name}</h3>
        <p className="mt-4 leading-7 text-muted">{t(member.biography, locale)}</p>
        {member.languages.length ? (
          <p className="mt-4 text-sm text-muted">Languages: {member.languages.join(" / ")}</p>
        ) : null}
      </div>
    </article>
  );
}
