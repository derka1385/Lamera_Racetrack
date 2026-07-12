# Audit and Fixes

## Contact form

- Problem observed: the static export used `mailto` and could show success without confirmed delivery.
- User impact: prospects could believe a request was sent when no backend received it.
- Files concerned: `src/components/LeadForm.tsx`, `src/app/api/enquiry/route.ts`, `.env.example`, `README.md`.
- Correction applied: removed mailto submission, added `NEXT_PUBLIC_ENQUIRY_ENDPOINT` POST flow, preserved data on error, added localized loading/error/success states and technical request metadata.
- Status: fixed. Real delivery still requires a production HTTPS endpoint.
- Test method: TypeScript check, Playwright form prefill/configuration test, static build.

## Contextual enquiry paths

- Problem observed: offer CTAs linked to generic pages or generic contact paths.
- User impact: users lost context and the team received less qualified enquiries.
- Files concerned: `src/data/site.ts`, `src/app/[locale]/page.tsx`, `src/app/[locale]/private-testing/page.tsx`, `src/app/[locale]/race-with-us/page.tsx`, `src/components/Header.tsx`, `src/components/Hero.tsx`.
- Correction applied: added query-parameter based contact paths for objective, programme, circuit and event context.
- Status: fixed.
- Test method: Playwright form prefill test.

## Header and mobile navigation

- Problem observed: desktop navigation appeared too early while key actions appeared later, leaving a weak tablet range.
- User impact: 768-1023 px layouts could show compressed navigation with no coherent CTA/menu.
- Files concerned: `src/components/Header.tsx`, `src/components/MobileNavigation.tsx`, `src/components/LanguageSwitcher.tsx`.
- Correction applied: moved desktop nav/actions to `xl`, kept tablet/mobile CTA plus hamburger, added accessible modal behavior, Escape close, focus return, scroll lock and active states.
- Status: fixed.
- Test method: Playwright landscape menu tests and responsive screenshots.

## Mobile fixed CTA

- Problem observed: the fixed CTA was always present on mobile.
- User impact: it could cover the contact form, footer or menu.
- Files concerned: `src/app/[locale]/layout.tsx`, `src/components/MobileStickyCTA.tsx`, `src/app/globals.css`.
- Correction applied: replaced static markup with an intelligent CTA that hides on contact, menu open, likely keyboard open, form visibility and footer proximity.
- Status: fixed.
- Test method: responsive screenshots and contact page checks.

## Demo public content

- Problem observed: public UI referenced demo data, unverified results, demo calendar and placeholder validation copy.
- User impact: the site could feel unfinished or misleading.
- Files concerned: `src/data/site.ts`, `src/content/dictionaries.ts`, `src/app/[locale]/page.tsx`, `src/app/[locale]/calendar/page.tsx`, `src/app/[locale]/race-with-us/page.tsx`, `src/components/CalendarFilters.tsx`, `src/components/ResultsFilters.tsx`, `src/app/sitemap.ts`.
- Correction applied: hid demo events/seats/testimonials/results, removed Results from primary navigation while no verified result exists, excluded Results from sitemap, removed public demo `.ics`, and replaced empty states with on-request commercial paths.
- Status: fixed.
- Test method: content grep, static build and responsive captures.

## Language, breadcrumbs and dates

- Problem observed: language changes did not preserve query/hash, filters had English `All`, breadcrumbs were visually clumsy and dates could render as ISO.
- User impact: multilingual navigation felt less polished and could lose enquiry context.
- Files concerned: `src/components/LanguageSwitcher.tsx`, `src/components/Breadcrumbs.tsx`, `src/lib/i18n.ts`, `src/components/CalendarFilters.tsx`, `src/components/EventCard.tsx`, `src/components/CircuitCard.tsx`.
- Correction applied: preserved path/query/hash with `router.replace`, localized filters, added clean breadcrumb labels and `Intl.DateTimeFormat` date rendering.
- Status: fixed.
- Test method: Playwright language preservation test and route captures.

## GitHub Pages root and SEO

- Problem observed: the root showed a language selection interstitial and fallback SEO URLs used an example domain.
- User impact: extra friction on first visit and possible incorrect canonical URLs.
- Files concerned: `src/app/page.tsx`, `src/components/LangSetter.tsx`, `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`.
- Correction applied: root redirects to saved/preferred locale with accessible fallback links, default SEO URL now matches GitHub Pages.
- Status: fixed.
- Test method: static route check and build.
