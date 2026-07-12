# Visual Motion Overhaul Report

## Project

Path: `/Users/petrinolann/Coding/racetrack-competition`

Branch: `visual-motion-overhaul`

## Reference Assets

The brief named `story calendar.png` and `calendar post.png`, but those image files were not available in the attachment folder. The implementation continues from the written direction: poster-like diagonals, graphite/black palette, electric-green signals, condensed italic typography, cut panels, speed lines, ghost numbers and telemetry/grid language.

The private reference folder was prepared at:

`private/reference/design/`

## Created

- `src/components/motion/RaceBackdrop.tsx`
- `src/components/motion/AnimatedRacingLine.tsx`
- `src/components/motion/SpeedStreaks.tsx`
- `src/components/motion/TelemetryGrid.tsx`
- `src/components/motion/LightSweep.tsx`
- `src/components/motion/NoiseOverlay.tsx`
- `src/components/motion/SectionWipe.tsx`
- `src/components/motion/ScrollParallax.tsx`
- `src/components/race/RaceSection.tsx`
- `src/components/race/RaceSectionHeading.tsx`
- `src/components/race/RaceProgrammePanel.tsx`
- `src/components/race/RaceDivider.tsx`
- `src/components/race/RaceMetaBar.tsx`
- `src/components/race/RaceIndex.tsx`
- `src/components/race/SlantedPanel.tsx`
- `public/textures/noise.webp`
- `DESIGN_SYSTEM.md`
- `MOTION_SYSTEM.md`
- `VISUAL_OVERHAUL_REPORT.md`

## Modified

- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/content/dictionaries.ts`
- `src/components/CTAButton.tsx`
- `src/components/MediaFrame.tsx`
- `src/components/FAQAccordion.tsx`
- `src/components/Hero.tsx`
- `src/components/ProgrammeCard.tsx`
- `src/app/[locale]/private-testing/page.tsx`
- `src/app/[locale]/page.tsx`
- `src/app/[locale]/race-with-us/page.tsx`
- `src/app/[locale]/the-lamera/page.tsx`
- `src/app/[locale]/calendar/page.tsx`
- `src/app/[locale]/contact/page.tsx`
- `src/app/[locale]/team/page.tsx`
- `src/app/[locale]/legal/page.tsx`

## Private Testing

The page was recomposed into six sections:

1. Full-width Race Impact hero with ghost typography, green trajectory, large `01`, metadata band and CTA.
2. Starting-line section using numbered horizontal lanes.
3. Pit-lane programme section with sticky desktop index and `RaceProgrammePanel`.
4. Technical inclusion panel grouped into car, performance and experience.
5. Calmer numbered FAQ using the accessible `details/summary` pattern.
6. Final CTA with `DRIVE` ghost typography and racing-line background.

Hardcoded English labels were moved into dictionaries for English, French and German.

## Other Pages

- Homepage: stronger Race Impact hero, programme panels, Lamera telemetry treatment and final CTA backdrop.
- Race With Us: grid/start-line hero and slanted service panels.
- The Lamera: telemetry-focused hero, race/cut media frames and sharper technical panels.
- Calendar: poster-inspired hero with diagonal/racing-line backdrop.
- Contact: calm exclusive background with no animation under form inputs.
- Team: calmer editorial treatment.
- Legal: nearly static minimal background for readability.

## Motion

Animations use CSS transforms, opacity and SVG dash drawing. Reduced-motion mode disables continuous movement and preserves the static design.

## Validation

Passed:

- `./node_modules/.bin/tsc --noEmit`
- `./node_modules/.bin/eslint`
- `./node_modules/.bin/next build`
- `GITHUB_PAGES=true NEXT_PUBLIC_STATIC_EXPORT=true NEXT_PUBLIC_SITE_URL=https://derka1385.github.io/Lamera_Racetrack ./node_modules/.bin/next build`

Chrome/Playwright screenshot capture was not run in this pass because the previous instruction was to skip Chrome testing and check manually later. Capture folder prepared:

`test-results/visual-overhaul/`
