import { cn } from "@/lib/utils";

type RaceMetaBarProps = {
  items: string[];
  className?: string;
};

export function RaceMetaBar({ items, className }: RaceMetaBarProps) {
  return (
    <div className={cn("race-meta flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-white/10 bg-black/28 px-4 py-3", className)}>
      {items.map((item) => (
        <span key={item} className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 bg-[var(--rtc-green)]" />
          {item}
        </span>
      ))}
    </div>
  );
}
