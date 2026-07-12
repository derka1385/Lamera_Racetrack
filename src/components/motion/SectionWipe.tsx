import { cn } from "@/lib/utils";

type SectionWipeProps = {
  className?: string;
};

export function SectionWipe({ className }: SectionWipeProps) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none relative h-8 overflow-hidden bg-[var(--rtc-black)]", className)}>
      <div className="absolute inset-x-[-2rem] top-0 h-full origin-left -skew-x-12 bg-[var(--rtc-green)]/80 [animation:rtc-section-wipe_650ms_ease-out_both] motion-reduce:animate-none" />
      <div className="absolute inset-x-[-2rem] top-3 h-px bg-white/25" />
    </div>
  );
}
