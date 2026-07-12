import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import { carImages, carSpecifications } from "@/data/site";
import { isLocale, t, type Locale } from "@/lib/i18n";
import { createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CarSpecification } from "@/components/CarSpecification";
import { MediaFrame } from "@/components/MediaFrame";
import { SectionHeading } from "@/components/SectionHeading";
import { RaceBackdrop } from "@/components/motion/RaceBackdrop";
import { RaceSectionHeading } from "@/components/race/RaceSectionHeading";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return createMetadata(isLocale(locale) ? locale : "en", "lamera");
}

export default async function LameraPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const dictionary = getDictionary(locale);
  const page = dictionary.pages.lamera;
  const detailBlocks = [
    {
      title: { en: "Cockpit details", fr: "Détails cockpit", de: "Cockpit-Details" },
      copy: {
        en: "The cockpit is presented as part of the driver briefing, fitting and safety process before any track session.",
        fr: "Le cockpit est présenté lors du briefing, de l'installation pilote et du processus sécurité avant toute session.",
        de: "Das Cockpit wird im Rahmen von Briefing, Sitzprobe und Sicherheitsablauf vor jeder Session erklärt.",
      },
    },
    {
      title: { en: "Engineering details", fr: "Détails ingénierie", de: "Engineering-Details" },
      copy: {
        en: "Technical specifications are confirmed during the proposal stage according to the car configuration available for the programme.",
        fr: "Les spécifications techniques sont confirmées lors de la proposition selon la configuration disponible pour le programme.",
        de: "Technische Daten werden im Angebot je nach verfügbarer Fahrzeugkonfiguration bestätigt.",
      },
    },
    {
      title: { en: "Endurance suitability", fr: "Adaptée à l'endurance", de: "Für Langstrecke geeignet" },
      copy: {
        en: "The Lamera platform supports progressive learning, shared-driver formats and long-session preparation.",
        fr: "La plateforme Lamera accompagne la progression, les formats à plusieurs pilotes et la préparation des longs relais.",
        de: "Die Lamera-Plattform unterstützt progressive Entwicklung, Mehrfahrer-Formate und lange Stints.",
      },
    },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-black py-16 md:py-24">
        <RaceBackdrop variant="telemetry" intensity="medium" ghostText="330 1020 6" sectionIndex="01" showGhostText />
        <div className="page-shell relative z-10">
          <Breadcrumbs locale={locale} items={[{ label: page.eyebrow }]} />
          <RaceSectionHeading className="mt-10" eyebrow={page.eyebrow} title={page.title} text={page.intro} index="01" showSpeedLines />
        </div>
      </section>

      <section className="py-20">
        <div className="page-shell grid gap-5 md:grid-cols-2">
          {carImages.map((src, index) => (
            <MediaFrame
              key={src}
              image={{
                src,
                alt: {
                  en: `Abstract Lamera media placeholder ${index + 1}`,
                  fr: `Visuel abstrait Lamera ${index + 1}`,
                  de: `Abstraktes Lamera-Platzhalterbild ${index + 1}`,
                },
                isPlaceholder: true,
              }}
              locale={locale}
              ratio={index === 0 ? "aspect-[16/9] md:col-span-2" : "aspect-[4/3]"}
              variant={index === 0 ? "race" : "cutCorner"}
              overlay="speed"
            />
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="page-shell">
          <SectionHeading title="Specifications" text={page.disclaimer} />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {carSpecifications.map((spec) => (
              <CarSpecification
                key={`${t(spec.label, locale)}-${t(spec.value, locale)}`}
                spec={spec}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="page-shell grid gap-8 lg:grid-cols-3">
          {detailBlocks.map((item) => (
            <article key={t(item.title, locale)} className="border border-white/10 bg-surface p-6 cut-corner">
              <h2 className="font-display text-3xl font-semibold uppercase">{t(item.title, locale)}</h2>
              <p className="mt-4 leading-7 text-muted">
                {t(item.copy, locale)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
