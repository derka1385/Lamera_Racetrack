import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import { teamMembers } from "@/data/site";
import { isLocale, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { TeamMemberCard } from "@/components/TeamMemberCard";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createMetadata(isLocale(locale) ? locale : "en", "team");
}

export default async function TeamPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const dictionary = getDictionary(locale);
  const page = dictionary.pages.team;

  return (
    <>
      <section className="bg-black py-16 md:py-24">
        <div className="page-shell">
          <Breadcrumbs locale={locale} items={[{ label: page.eyebrow }]} />
          <SectionHeading className="mt-10" eyebrow={page.eyebrow} title={page.title} text={page.intro} />
        </div>
      </section>

      <section className="py-20">
        <div className="page-shell grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} locale={locale} />
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="page-shell">
          <SectionHeading title={page.identityTitle} text="Luxembourg, Germany and France sit naturally in the team's operating context, with programmes designed for European circuits and international drivers." />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Luxembourg", "Germany", "France", "European racing programme"].map((item) => (
              <div key={item} className="rounded border border-white/10 bg-black/25 p-5 text-muted">{item}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
