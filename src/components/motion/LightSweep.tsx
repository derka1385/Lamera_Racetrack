import { cn } from "@/lib/utils";

type LightSweepProps = {
  className?: string;
};

export function LightSweep({ className }: LightSweepProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/14 to-transparent opacity-0 group-hover:opacity-100 group-hover:[animation:rtc-light-sweep_900ms_ease-out_1] motion-reduce:hidden",
        className,
      )}
    />
  );
}
