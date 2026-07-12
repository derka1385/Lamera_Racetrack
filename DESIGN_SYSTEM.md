# RaceTrack Competition Design System

## Direction

The visual system translates the supplied motorsport poster direction into reusable web components: black and graphite surfaces, precise electric-green accents, condensed italic typography, diagonal cuts, technical lines, cropped numbers and controlled depth.

The system uses two intensity levels:

- Race Impact: heroes, major section titles, programme panels, calendar moments and final CTAs.
- Premium Control: long copy, FAQ, forms, legal content and support information.

## Tokens

Core tokens live in `src/app/globals.css`:

- Black: `--rtc-black`, `--rtc-black-soft`, `--rtc-graphite`
- Panels: `--rtc-panel`, `--rtc-panel-light`
- Text and metal: `--rtc-white`, `--rtc-silver`, `--rtc-metal`, `--rtc-muted`
- Accent: `--rtc-green`, `--rtc-green-acid`, `--rtc-green-dark`, `--rtc-green-glow`
- Lines: `--rtc-line`, `--rtc-line-strong`
- Motion and geometry: `--rtc-skew`, `--rtc-section-angle`, `--rtc-motion-fast`, `--rtc-motion-normal`, `--rtc-motion-slow`

Green is used as a signal: CTA, active lines, numbers, progress bars and trajectory. It is not used for long paragraphs.

## Typography

Barlow Condensed is loaded at 500, 600, 700 and 800, with italic enabled. Inter remains the body font.

Reusable classes:

- `.race-display-xl`: hero-scale condensed italic display.
- `.race-display`: section-scale display title.
- `.race-eyebrow`: short uppercase section label.
- `.race-index`: oversized decorative numbers.
- `.race-meta`: small technical metadata.
- `.race-label`: table-style labels.
- `.race-body`: readable premium body copy.

Large headings use `clamp()` and `text-wrap: balance`; paragraphs are never skewed.

## Components

Race components:

- `RaceSection`
- `RaceSectionHeading`
- `RaceProgrammePanel`
- `RaceDivider`
- `RaceMetaBar`
- `RaceIndex`
- `SlantedPanel`

Motion components:

- `RaceBackdrop`
- `AnimatedRacingLine`
- `SpeedStreaks`
- `TelemetryGrid`
- `LightSweep`
- `NoiseOverlay`
- `SectionWipe`
- `ScrollParallax`

Existing components upgraded:

- `CTAButton`: primary race, secondary metal and ghost variants.
- `MediaFrame`: standard, race, fullBleed and cutCorner variants.
- `FAQAccordion`: optional race variant with numbered rows.

## Panels

Use sharp panels, cut corners, partial borders, technical dividers and asymmetrical layouts. Avoid generic rounded SaaS cards except in calm, repeated content where a radius up to 8px is acceptable.

## Mobile Rules

On mobile, heavy layers are reduced, sticky layouts collapse, programme panels become single-column, and decorative numbers remain inside overflow-hidden parents. Do not rely on hover to understand an action.

## Avoid

- Full-page green domination.
- The same animated background everywhere.
- Skewing readable paragraphs.
- Decorative text read by screen readers.
- Fake events, fake testimonials or fake performance data.
