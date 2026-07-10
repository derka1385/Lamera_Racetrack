import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase text-brand">{eyebrow}</p>
      ) : null}
      <h2 className="display-type text-4xl uppercase text-foreground md:text-6xl">
        {title}
      </h2>
      {text ? <p className="mt-5 text-lg leading-8 text-muted">{text}</p> : null}
    </div>
  );
}
