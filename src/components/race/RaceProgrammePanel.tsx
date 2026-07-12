import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LightSweep } from "@/components/motion/LightSweep";

export type ProgrammeInfoCell = {
  label: string;
  value: string;
};

type RaceProgrammePanelProps = {
  index: string;
  title: string;
  description: string;
  info: ProgrammeInfoCell[];
  price: string;
  cta: string;
  href: string;
  className?: string;
};

export function RaceProgrammePanel({
  index,
  title,
  description,
  info,
  price,
  cta,
  href,
  className,
}: RaceProgrammePanelProps) {
  return (
    <article className={cn("group race-panel cut-corner relative overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--rtc-green)]/60 md:p-7", className)}>
      <LightSweep />
      <div className="relative z-10 grid gap-6 lg:grid-cols-[0.36fr_1fr]">
        <div>
          <span className="race-index block text-[var(--rtc-green)] transition duration-300 group-hover:translate-x-1">{index}</span>
          <p className="race-meta mt-2 text-[var(--rtc-silver)]">{price}</p>
        </div>
        <div>
          <div className="relative inline-block bg-[var(--rtc-white)] px-4 py-2 text-[var(--rtc-black)] cut-corner">
            <h3 className="font-display text-3xl font-extrabold uppercase leading-none md:text-5xl">{title}</h3>
          </div>
          <p className="race-body mt-5 max-w-2xl">{description}</p>
          <div className="mt-6 h-1 w-24 bg-[var(--rtc-green)] transition-all duration-300 group-hover:w-44 motion-reduce:transition-none" />
          <div className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {info.map((cell) => (
              <div key={cell.label} className="border border-white/10 bg-black/24 p-3">
                <dt className="race-label">{cell.label}</dt>
                <dd className="mt-2 text-sm leading-6 text-[var(--rtc-white)]">{cell.value}</dd>
              </div>
            ))}
          </div>
          <Link
            href={href}
            className="mt-6 inline-flex min-h-11 items-center gap-2 border-b-2 border-[var(--rtc-green)] pb-2 font-display text-xl font-bold uppercase text-[var(--rtc-white)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[var(--rtc-green)]"
          >
            {cta}
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
