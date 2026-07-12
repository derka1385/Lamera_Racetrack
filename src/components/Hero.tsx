import { ChevronDown } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { heroMedia } from "@/data/site";
import { contactHref, localizedPath, type Locale } from "@/lib/i18n";
import { CTAButton } from "@/components/CTAButton";
import { Reveal } from "@/components/Reveal";
import { VideoBackground } from "@/components/VideoBackground";

type HeroProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Hero({ locale, dictionary }: HeroProps) {
  return (
    <section className="relative min-h-[min(760px,calc(100svh-72px))] overflow-hidden border-b border-white/10 md:min-h-[calc(100dvh-72px)]">
      <div className="absolute inset-0">
        <VideoBackground
          poster={heroMedia.poster}
          video={heroMedia.video}
          alt="Abstract motorsport hero placeholder for RaceTrack Competition"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,8,0.94),rgba(7,9,8,0.78)_48%,rgba(7,9,8,0.42))] md:bg-[linear-gradient(90deg,rgba(7,9,8,0.92),rgba(7,9,8,0.68)_45%,rgba(7,9,8,0.18))]" />
        <div className="absolute inset-0 technical-grid opacity-55" />
      </div>

      <div className="page-shell relative z-10 flex min-h-[min(760px,calc(100svh-72px))] items-center py-14 sm:py-16 md:min-h-[calc(100dvh-72px)] md:py-20 lg:py-24">
        <Reveal className="max-w-4xl">
          <p className="mb-5 text-sm font-semibold uppercase text-brand">
            {dictionary.home.heroEyebrow}
          </p>
          <h1 className="display-type max-w-4xl text-[clamp(2.65rem,10vw,8rem)] uppercase text-balance">
            {dictionary.home.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[color:var(--color-foreground)]/90 sm:text-lg md:text-xl md:leading-8">
            {dictionary.home.heroText}
          </p>
          <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row">
            <CTAButton href={contactHref(locale, { objective: "private-test" })} className="w-full min-[420px]:w-auto">
              {dictionary.common.requestPrivateTest}
            </CTAButton>
            <CTAButton href={localizedPath(locale, "/team")} variant="secondary" className="w-full min-[420px]:w-auto">
              {dictionary.common.exploreTeam}
            </CTAButton>
          </div>
          <p className="mt-6 text-sm text-muted">{dictionary.home.finalCtaSmall}</p>
        </Reveal>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-muted md:block">
        <ChevronDown aria-hidden="true" size={26} />
      </div>
    </section>
  );
}
