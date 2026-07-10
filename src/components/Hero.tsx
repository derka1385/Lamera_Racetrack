import { ChevronDown } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { heroMedia } from "@/data/site";
import { localizedPath, type Locale } from "@/lib/i18n";
import { CTAButton } from "@/components/CTAButton";
import { Reveal } from "@/components/Reveal";
import { VideoBackground } from "@/components/VideoBackground";

type HeroProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Hero({ locale, dictionary }: HeroProps) {
  return (
    <section className="relative min-h-[calc(100dvh-5rem)] overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        <VideoBackground
          poster={heroMedia.poster}
          video={heroMedia.video}
          alt="Abstract motorsport hero placeholder for RaceTrack Competition"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,8,0.92),rgba(7,9,8,0.68)_45%,rgba(7,9,8,0.18))]" />
        <div className="absolute inset-0 technical-grid opacity-55" />
      </div>

      <div className="page-shell relative z-10 flex min-h-[calc(100dvh-5rem)] items-center py-24">
        <Reveal className="max-w-4xl">
          <p className="mb-5 text-sm font-semibold uppercase text-brand">
            {dictionary.home.heroEyebrow}
          </p>
          <h1 className="display-type max-w-4xl text-6xl uppercase md:text-8xl lg:text-9xl">
            {dictionary.home.heroTitle}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[color:var(--color-foreground)]/90 md:text-xl">
            {dictionary.home.heroText}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CTAButton href={localizedPath(locale, "/contact")}>
              {dictionary.common.requestPrivateTest}
            </CTAButton>
            <CTAButton href={localizedPath(locale, "/team")} variant="secondary">
              {dictionary.common.exploreTeam}
            </CTAButton>
          </div>
          <p className="mt-7 text-sm text-muted">{dictionary.common.based}</p>
        </Reveal>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-muted md:block">
        <ChevronDown aria-hidden="true" size={26} />
      </div>
    </section>
  );
}
