import type { Dictionary } from "@/content/dictionaries";
import type { Availability } from "@/types/content";
import { cn } from "@/lib/utils";

type AvailabilityBadgeProps = {
  availability: Availability;
  dictionary: Dictionary;
};

export function AvailabilityBadge({ availability, dictionary }: AvailabilityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center rounded border px-3 text-xs font-semibold uppercase",
        availability === "available" && "border-brand/40 bg-brand/15 text-brand",
        availability === "limited" && "border-[var(--color-warning)]/50 bg-[var(--color-warning)]/12 text-[var(--color-warning)]",
        availability === "on-request" && "border-white/20 bg-white/8 text-foreground",
        availability === "fully-booked" && "border-white/12 bg-white/5 text-muted",
      )}
    >
      {dictionary.common.availability[availability]}
    </span>
  );
}
