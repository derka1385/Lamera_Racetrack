import { cn } from "@/lib/utils";

type RaceIndexProps = {
  value: string;
  className?: string;
};

export function RaceIndex({ value, className }: RaceIndexProps) {
  return (
    <span aria-hidden="true" className={cn("race-index select-none text-[var(--rtc-green)]/90", className)}>
      {value}
    </span>
  );
}
