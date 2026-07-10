import type { ImageAsset } from "@/types/content";
import { t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/ImageWithFallback";

type MediaFrameProps = {
  image: ImageAsset;
  locale: Locale;
  priority?: boolean;
  ratio?: string;
  className?: string;
  sizes?: string;
};

export function MediaFrame({
  image,
  locale,
  priority = false,
  ratio = "aspect-[16/10]",
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded border border-white/10 bg-surface shadow-[var(--shadow-elevated)]",
        ratio,
        className,
      )}
    >
      <ImageWithFallback
        src={image.src}
        alt={t(image.alt, locale)}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
    </div>
  );
}
