import { cn } from "@/lib/utils";

type RaceSectionHeadingProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  index?: string;
  variant?: "impact" | "editorial" | "minimal";
  accentWord?: string;
  align?: "left" | "center" | "right";
  showSpeedLines?: boolean;
  className?: string;
};

function renderTitle(title: string, accentWord?: string) {
  if (!accentWord || !title.includes(accentWord)) return title;
  const [before, after] = title.split(accentWord);
  return (
    <>
      {before}
      <span className="text-[var(--rtc-green)]">{accentWord}</span>
      {after}
    </>
  );
}

export function RaceSectionHeading({
  eyebrow,
  title,
  text,
  index,
  variant = "impact",
  accentWord,
  align = "left",
  showSpeedLines,
  className,
}: RaceSectionHeadingProps) {
  return (
    <div
      className={cn(
        "relative",
        align === "center" && "mx-auto text-center",
        align === "right" && "ml-auto text-right",
        variant === "minimal" ? "max-w-3xl" : "max-w-5xl",
        className,
      )}
    >
      {index ? (
        <span aria-hidden="true" className="race-index absolute -left-4 top-[-0.45em] -z-10 text-white opacity-[0.045]">
          {index}
        </span>
      ) : null}
      {eyebrow ? <p className="race-eyebrow mb-4">{eyebrow}</p> : null}
      <h2 className={cn(variant === "impact" ? "race-display" : "font-display text-4xl font-bold uppercase leading-none text-balance md:text-6xl")}>
        {renderTitle(title, accentWord)}
      </h2>
      {showSpeedLines ? (
        <div aria-hidden="true" className={cn("mt-5 h-2 max-w-sm bg-[linear-gradient(90deg,var(--rtc-green),transparent)]", align === "center" && "mx-auto", align === "right" && "ml-auto")} />
      ) : null}
      {text ? <p className="race-body mt-6 max-w-3xl">{text}</p> : null}
    </div>
  );
}
