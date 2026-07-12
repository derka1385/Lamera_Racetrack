# RaceTrack Competition Motion System

## Principles

Motion should suggest speed, precision and engineering control without making the site feel like a game. Animations use transform, opacity and SVG stroke properties.

## Components

- `RaceBackdrop`: combines base gradients, telemetry grid, speed streaks, optional racing line, noise and ghost typography.
- `TelemetryGrid`: slow transform drift, masked so it does not become a generic full-page grid.
- `SpeedStreaks`: thin diagonal speed lines, concentrated on one side.
- `AnimatedRacingLine`: SVG trajectory using `stroke-dasharray` and `stroke-dashoffset`.
- `LightSweep`: rare hover sweep for panels.
- `SectionWipe`: short diagonal transition between major sections.
- `ScrollParallax`: local, capped parallax for small decorative movement.

## Timing

- Fast UI movement: `--rtc-motion-fast` / 280ms.
- Normal panel or CTA motion: `--rtc-motion-normal` / 650ms.
- Slow atmospheric movement: 18s and longer.
- Telemetry grid drift: 34s.

## Reduced Motion

The global `prefers-reduced-motion: reduce` block disables continuous animation, transitions and smooth scrolling. SVG racing lines become visible immediately. Decorative content remains present as static composition.

## Performance Limits

- No GSAP.
- No WebGL or canvas particles.
- No scroll hijacking.
- No cursor replacement.
- No large animated blur on mobile.
- Decorative layers are `aria-hidden` and `pointer-events: none`.
- Background layers are contained by `overflow: hidden` to avoid horizontal scroll.

## Mobile Behavior

Mobile compositions reduce moving layers, remove desktop-only streak clusters where appropriate, and collapse sticky programme layouts. The CTA and content hierarchy remain visible before decorative effects.
