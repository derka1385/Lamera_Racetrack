import { cn } from "@/lib/utils";

type SlantedPanelProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

export function SlantedPanel({ children, className, innerClassName }: SlantedPanelProps) {
  return (
    <div className={cn("race-panel cut-corner overflow-hidden", className)}>
      <div className={cn("relative z-10", innerClassName)}>{children}</div>
    </div>
  );
}
