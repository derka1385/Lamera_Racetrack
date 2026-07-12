import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  icon?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  className,
  icon = true,
  onClick,
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden px-5 py-3 text-center font-display text-lg font-bold uppercase",
        "cut-corner",
        "focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand",
        variant === "primary" &&
          "bg-[var(--rtc-green)] text-[var(--rtc-black)] shadow-[0_10px_26px_rgb(64_207_69/0.20)] hover:bg-[var(--rtc-green-acid)] hover:-translate-y-0.5",
        variant === "secondary" &&
          "border border-white/20 bg-[var(--rtc-white)] text-[var(--rtc-black)] shadow-[0_10px_0_rgb(0_0_0/0.26)] hover:border-[var(--rtc-green)] hover:-translate-y-0.5",
        variant === "ghost" &&
          "border-b-2 border-[var(--rtc-green)] bg-transparent px-1 text-foreground hover:text-[var(--rtc-green)]",
        className,
      )}
    >
      {variant !== "ghost" ? <span aria-hidden="true" className="absolute inset-y-0 left-0 w-2 bg-black/22 transition-all duration-300 group-hover:w-4" /> : null}
      <span className="relative z-10">{children}</span>
      {icon ? <ArrowRight aria-hidden="true" className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" size={18} strokeWidth={2} /> : null}
    </Link>
  );
}
