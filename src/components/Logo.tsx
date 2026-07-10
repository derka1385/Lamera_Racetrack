import Image from "next/image";
import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LogoProps = {
  locale: Locale;
  variant?: "full" | "compact" | "light" | "dark" | "monochrome" | "footer";
  className?: string;
};

export function Logo({ locale, variant = "full", className }: LogoProps) {
  const compact = variant === "compact" || variant === "monochrome";

  return (
    <Link
      href={localizedPath(locale)}
      aria-label="RaceTrack Competition home"
      className={cn("inline-flex items-center gap-3", className)}
    >
      {compact ? (
        <span
          className={cn(
            "grid h-11 w-11 place-items-center rounded border border-brand/40 bg-black text-sm font-bold text-foreground",
            variant === "monochrome" && "border-white/20 text-white",
          )}
        >
          RTC
        </span>
      ) : (
        <span
          className={cn(
            "relative flex h-12 w-36 items-center justify-center overflow-hidden rounded border border-white/10 bg-[#f7f7f3] p-1.5",
            variant === "footer" && "h-14 w-44",
            variant === "dark" && "bg-black",
          )}
        >
          <Image
            src="/brand/racetrack-competition-logo-source.png"
            alt="RaceTrack Competition"
            width={320}
            height={180}
            className="h-full w-full object-contain"
            priority
          />
        </span>
      )}
    </Link>
  );
}
