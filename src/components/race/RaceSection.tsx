import { cn } from "@/lib/utils";
import { RaceBackdrop } from "@/components/motion/RaceBackdrop";

type RaceSectionProps = {
  children: React.ReactNode;
  variant?: "speed" | "track" | "telemetry" | "night" | "garage" | "minimal";
  intensity?: "subtle" | "medium" | "hero";
  ghostText?: string;
  sectionIndex?: string;
  className?: string;
  contentClassName?: string;
};

export function RaceSection({
  children,
  variant = "minimal",
  intensity = "medium",
  ghostText,
  sectionIndex,
  className,
  contentClassName,
}: RaceSectionProps) {
  return (
    <section className={cn("relative isolate overflow-hidden py-20 md:py-28", className)}>
      <RaceBackdrop
        variant={variant}
        intensity={intensity}
        showGhostText={Boolean(ghostText)}
        ghostText={ghostText}
        sectionIndex={sectionIndex}
      />
      <div className={cn("page-shell relative z-10", contentClassName)}>{children}</div>
    </section>
  );
}
