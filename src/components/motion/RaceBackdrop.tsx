import { cn } from "@/lib/utils";
import { AnimatedRacingLine } from "@/components/motion/AnimatedRacingLine";
import { NoiseOverlay } from "@/components/motion/NoiseOverlay";
import { SpeedStreaks } from "@/components/motion/SpeedStreaks";
import { TelemetryGrid } from "@/components/motion/TelemetryGrid";

type RaceBackdropProps = {
  variant: "speed" | "track" | "telemetry" | "night" | "garage" | "minimal";
  intensity?: "subtle" | "medium" | "hero";
  greenSide?: "left" | "right" | "both";
  showGrid?: boolean;
  showRacingLine?: boolean;
  showStreaks?: boolean;
  showNoise?: boolean;
  showGhostText?: boolean;
  ghostText?: string;
  sectionIndex?: string;
  interactive?: boolean;
  className?: string;
};

const variantBackgrounds = {
  speed:
    "bg-[radial-gradient(circle_at_75%_20%,rgb(64_207_69/0.20),transparent_30%),linear-gradient(135deg,var(--rtc-black),var(--rtc-graphite)_58%,var(--rtc-black))]",
  track:
    "bg-[radial-gradient(circle_at_18%_78%,rgb(114_224_0/0.16),transparent_32%),linear-gradient(160deg,var(--rtc-black-soft),var(--rtc-panel)_48%,var(--rtc-black))]",
  telemetry:
    "bg-[radial-gradient(circle_at_76%_38%,rgb(64_207_69/0.11),transparent_28%),linear-gradient(180deg,var(--rtc-graphite),var(--rtc-black))]",
  night:
    "bg-[radial-gradient(circle_at_50%_10%,rgb(255_255_255/0.09),transparent_28%),linear-gradient(180deg,#060706,var(--rtc-black))]",
  garage:
    "bg-[linear-gradient(110deg,var(--rtc-black)_0%,var(--rtc-panel)_46%,var(--rtc-black-soft)_100%)]",
  minimal:
    "bg-[linear-gradient(180deg,var(--rtc-black-soft),var(--rtc-graphite))]",
};

export function RaceBackdrop({
  variant,
  intensity = "medium",
  greenSide = "right",
  showGrid = true,
  showRacingLine,
  showStreaks,
  showNoise = true,
  showGhostText,
  ghostText,
  sectionIndex,
  interactive,
  className,
}: RaceBackdropProps) {
  const isHero = intensity === "hero";
  const isSubtle = intensity === "subtle";
  const racingLine = showRacingLine ?? (variant === "speed" || variant === "track");
  const streaks = showStreaks ?? (variant === "speed" || isHero);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        variantBackgrounds[variant],
        interactive && "motion-safe:[--rtc-pointer-x:50%]",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-y-[-12%] w-[44%] -skew-x-12 bg-[linear-gradient(90deg,transparent,rgb(64_207_69/0.16),transparent)] blur-[1px]",
          greenSide === "left" && "left-[-14%]",
          greenSide === "right" && "right-[-14%]",
          greenSide === "both" && "left-[-10%] right-[-10%] w-auto",
          isSubtle && "opacity-35",
          isHero && "opacity-100",
        )}
      />
      {showGrid ? <TelemetryGrid density={isHero ? "dense" : isSubtle ? "light" : "standard"} className={isSubtle ? "opacity-30" : undefined} /> : null}
      {streaks ? <SpeedStreaks side={greenSide} className={isSubtle ? "opacity-25" : undefined} /> : null}
      {racingLine ? <AnimatedRacingLine className={cn(isHero ? "right-[-12%] top-[4%] opacity-70" : "right-[-22%] top-[12%] opacity-40", "hidden md:block")} /> : null}
      {showGhostText && ghostText ? (
        <div className="race-display-xl absolute -right-8 top-[6%] max-w-[70%] select-none text-right text-[var(--rtc-white)] opacity-[0.055] md:-right-16">
          {ghostText}
        </div>
      ) : null}
      {sectionIndex ? (
        <div className="race-index absolute -left-4 bottom-[-0.16em] select-none text-[var(--rtc-white)] opacity-[0.035] md:-left-10">
          {sectionIndex}
        </div>
      ) : null}
      {showNoise ? <NoiseOverlay /> : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgb(0_0_0/0.44)_100%)]" />
    </div>
  );
}
