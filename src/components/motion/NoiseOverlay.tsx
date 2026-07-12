import { cn } from "@/lib/utils";

type NoiseOverlayProps = {
  className?: string;
};

export function NoiseOverlay({ className }: NoiseOverlayProps) {
  const assetPrefix = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true" ? "/Lamera_Racetrack" : "";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-repeat opacity-[0.035] mix-blend-screen",
        className,
      )}
      style={{ backgroundImage: `url('${assetPrefix}/textures/noise.webp')` }}
    />
  );
}
