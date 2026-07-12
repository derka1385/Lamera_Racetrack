import { cn } from "@/lib/utils";

type RaceDividerProps = {
  variant?: "slash" | "racing-line" | "double-stripe" | "cut" | "minimal";
  className?: string;
};

export function RaceDivider({ variant = "minimal", className }: RaceDividerProps) {
  return (
    <div aria-hidden="true" className={cn("relative overflow-hidden bg-[var(--rtc-black)]", className)}>
      {variant === "slash" ? <div className="h-12 -skew-y-2 bg-[var(--rtc-graphite)]" /> : null}
      {variant === "racing-line" ? (
        <div className="h-10">
          <div className="absolute left-[12%] top-5 h-px w-[72%] bg-gradient-to-r from-transparent via-[var(--rtc-green)] to-transparent" />
          <div className="absolute left-[22%] top-3 h-px w-[38%] bg-white/25" />
        </div>
      ) : null}
      {variant === "double-stripe" ? (
        <div className="h-8">
          <div className="absolute inset-x-0 top-2 h-px bg-white/18" />
          <div className="absolute inset-x-0 top-4 h-[2px] bg-[var(--rtc-green)]/80" />
        </div>
      ) : null}
      {variant === "cut" ? <div className="h-14 bg-[linear-gradient(168deg,transparent_0_42%,var(--rtc-panel)_42%_100%)]" /> : null}
      {variant === "minimal" ? <div className="h-px bg-white/10" /> : null}
    </div>
  );
}
