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
        "inline-flex min-h-12 items-center justify-center gap-2 rounded px-5 py-3 text-sm font-semibold uppercase text-center",
        "focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand",
        variant === "primary" &&
          "bg-brand text-[var(--color-brand-ink)] hover:bg-[var(--color-brand-hover)]",
        variant === "secondary" &&
          "border border-white/20 bg-white/8 text-foreground hover:border-brand hover:bg-brand/10",
        variant === "ghost" &&
          "text-foreground underline decoration-brand decoration-2 underline-offset-8 hover:text-brand",
        className,
      )}
    >
      <span>{children}</span>
      {icon ? <ArrowRight aria-hidden="true" size={18} strokeWidth={2} /> : null}
    </Link>
  );
}
