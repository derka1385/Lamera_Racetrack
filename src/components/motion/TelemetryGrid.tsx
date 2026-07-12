import { cn } from "@/lib/utils";

type TelemetryGridProps = {
  className?: string;
  density?: "light" | "standard" | "dense";
};

export function TelemetryGrid({ className, density = "standard" }: TelemetryGridProps) {
  const size = density === "dense" ? "32px" : density === "light" ? "72px" : "48px";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-[-3rem] opacity-60 [animation:rtc-grid-drift_34s_linear_infinite] motion-reduce:animate-none",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(rgb(255 255 255 / 0.045) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(rgb(64 207 69 / 0.08) 1px, transparent 1px)",
        backgroundSize: `${size} ${size}, ${size} ${size}, calc(${size} * 4) calc(${size} * 4)`,
        maskImage:
          "radial-gradient(circle at 78% 30%, black 0 34%, transparent 68%), linear-gradient(90deg, transparent, black 16%, black 84%, transparent)",
      }}
    />
  );
}
