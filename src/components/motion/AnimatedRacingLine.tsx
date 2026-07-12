import { cn } from "@/lib/utils";

type AnimatedRacingLineProps = {
  className?: string;
  compact?: boolean;
};

export function AnimatedRacingLine({ className, compact = false }: AnimatedRacingLineProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute h-full w-full overflow-visible", className)}
      viewBox="0 0 900 520"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="rtc-racing-line" x1="90" y1="430" x2="820" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#153d18" />
          <stop offset="0.45" stopColor="#40cf45" />
          <stop offset="1" stopColor="#72e000" />
        </linearGradient>
        <filter id="rtc-line-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={compact ? "M55 360 C210 230 330 420 500 260 C620 148 724 168 846 82" : "M42 440 C178 264 286 482 444 310 C578 164 650 196 810 62"}
        stroke="rgb(255 255 255 / 0.16)"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d={compact ? "M55 360 C210 230 330 420 500 260 C620 148 724 168 846 82" : "M42 440 C178 264 286 482 444 310 C578 164 650 196 810 62"}
        stroke="url(#rtc-racing-line)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="820"
        strokeDashoffset="820"
        filter="url(#rtc-line-glow)"
        className="[animation:rtc-line-draw_2.8s_cubic-bezier(.2,.8,.2,1)_forwards] motion-reduce:animate-none motion-reduce:[stroke-dashoffset:0]"
      />
    </svg>
  );
}
