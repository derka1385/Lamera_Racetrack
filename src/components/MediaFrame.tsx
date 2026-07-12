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
  variant?: "standard" | "race" | "fullBleed" | "cutCorner";
  focalPoint?: string;
  overlay?: "none" | "soft" | "strong" | "speed";
  showAccent?: boolean;
};

export function MediaFrame({
  image,
  locale,
  priority = false,
  ratio = "aspect-[16/10]",
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  variant = "standard",
  focalPoint = "50% 50%",
  overlay = "soft",
  showAccent = variant === "race" || variant === "cutCorner",
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-white/10 bg-surface shadow-[var(--shadow-elevated)]",
        variant === "standard" && "rounded",
        variant === "race" && "cut-corner rounded-none border-[var(--rtc-line-strong)]",
        variant === "fullBleed" && "rounded-none border-0",
        variant === "cutCorner" && "cut-corner rounded-none",
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
        style={{ objectPosition: focalPoint }}
      />
      {overlay === "soft" ? <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" /> : null}
      {overlay === "strong" ? <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/30 to-black/18" /> : null}
      {overlay === "speed" ? (
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgb(0_0_0/0.72),rgb(0_0_0/0.22)),repeating-linear-gradient(100deg,transparent_0_22px,rgb(255_255_255/0.08)_22px_23px,transparent_23px_42px)]" />
      ) : null}
      {showAccent ? (
        <>
          <div aria-hidden="true" className="absolute left-0 top-0 h-1 w-1/2 bg-[var(--rtc-green)]" />
          <div aria-hidden="true" className="absolute bottom-5 right-[-8%] h-px w-2/3 -skew-x-12 bg-gradient-to-r from-transparent via-[var(--rtc-green)] to-transparent" />
        </>
      ) : null}
    </div>
  );
}
