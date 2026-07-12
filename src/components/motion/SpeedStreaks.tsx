import { cn } from "@/lib/utils";

type SpeedStreaksProps = {
  className?: string;
  side?: "left" | "right" | "both";
};

export function SpeedStreaks({ className, side = "right" }: SpeedStreaksProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-y-0 hidden w-[54%] overflow-hidden opacity-70 md:block",
        side === "left" && "left-0",
        side === "right" && "right-0",
        side === "both" && "inset-x-0 w-full",
        className,
      )}
    >
      <div className="absolute inset-0 [animation:rtc-streak-drift_18s_linear_infinite] motion-reduce:animate-none">
        <div className="absolute right-[-10%] top-[18%] h-px w-[78%] bg-gradient-to-r from-transparent via-white/45 to-transparent" />
        <div className="absolute right-[4%] top-[32%] h-px w-[54%] bg-gradient-to-r from-transparent via-[var(--rtc-green)] to-transparent" />
        <div className="absolute right-[-6%] top-[48%] h-px w-[90%] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute right-[12%] top-[67%] h-px w-[46%] bg-gradient-to-r from-transparent via-[var(--rtc-silver)] to-transparent" />
        <div className="absolute right-[-18%] top-[76%] h-[2px] w-[68%] bg-gradient-to-r from-transparent via-[var(--rtc-green-acid)] to-transparent blur-[1px]" />
      </div>
    </div>
  );
}
