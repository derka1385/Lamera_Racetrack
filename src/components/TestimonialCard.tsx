import type { Testimonial } from "@/types/content";
import { t, type Locale } from "@/lib/i18n";

type TestimonialCardProps = {
  testimonial: Testimonial;
  locale: Locale;
};

export function TestimonialCard({ testimonial, locale }: TestimonialCardProps) {
  return (
    <article className="rounded border border-white/10 bg-white/[0.035] p-6">
      <div className="mb-5 flex items-center gap-4">
        <div className="grid h-12 w-12 place-items-center rounded border border-brand/30 text-sm font-bold text-brand">
          {testimonial.initials}
        </div>
        <div>
          <h3 className="font-semibold">{testimonial.name}</h3>
          <p className="text-sm text-muted">{t(testimonial.country, locale)}</p>
        </div>
      </div>
      <p className="leading-7 text-muted">
        &ldquo;{t(testimonial.quote, locale)}&rdquo;
      </p>
      <p className="mt-4 text-sm text-muted">{t(testimonial.programme, locale)}</p>
    </article>
  );
}
