import { cn } from "@/lib/utils";

type NoiseOverlayProps = {
  className?: string;
};

export function NoiseOverlay({ className }: NoiseOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-[url('/textures/noise.webp')] bg-repeat opacity-[0.035] mix-blend-screen",
        className,
      )}
    />
  );
}
