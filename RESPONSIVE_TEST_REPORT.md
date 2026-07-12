# Responsive Test Report

## Automated Suite

- Tool: Playwright
- Command: `pnpm test:responsive`
- Static server: `pnpm serve:pages`
- Static URL tested: `http://127.0.0.1:4173/Lamera_Racetrack/`
- Screenshot folder: `test-results/responsive/`

## Viewports Covered

- 320 x 568
- 360 x 640
- 375 x 667
- 390 x 844
- 430 x 932
- 667 x 375
- 844 x 390
- 932 x 430
- 768 x 1024
- 820 x 1180
- 912 x 1368
- 1024 x 768
- 1280 x 800
- 1440 x 900
- 1920 x 1080

## Routes Covered

- `/`
- `/en/`, `/fr/`, `/de/`
- `/[locale]/private-testing/`
- `/[locale]/race-with-us/`
- `/[locale]/the-lamera/`
- `/[locale]/team/`
- `/[locale]/calendar/`
- `/[locale]/results/`
- `/[locale]/contact/`

## Assertions

- `document.documentElement.scrollWidth <= window.innerWidth`
- mobile/tablet menu opens as `role="dialog"`
- menu has `aria-modal="true"`
- Escape closes the menu
- focus returns to the hamburger trigger
- language switching preserves path, query parameters and hash
- contact form preselects objective and circuit from query parameters
- missing endpoint does not simulate success and preserves typed data
- reduced-motion rendering keeps layout contained

## Initial Bugs Found

- Header breakpoint gap across tablet widths.
- Mobile menu lacked modal semantics and focus handling.
- Fixed CTA could overlap contact/footer contexts.
- Calendar and Results filters wrapped awkwardly on small screens and kept English labels.
- Form success could be shown without a confirmed endpoint.

## Corrections

- Desktop navigation moved to `xl`, mobile/tablet navigation kept available below that width.
- Accessible modal navigation implemented.
- Intelligent mobile CTA implemented.
- Scrollable snap filter rows and localized labels implemented.
- Static form submission moved to configurable POST endpoint.
- Demo events, seats, testimonials and unverified results hidden from public production UI.

## Final Run

Browser execution skipped on request. The Playwright suite remains committed for later local verification and will write screenshots to `test-results/responsive/` when run.

Non-browser validation completed with:

- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`
- `pnpm build:pages`

Open item: final visual screenshot review on real Chrome/Safari devices still needs to be performed by the team.
