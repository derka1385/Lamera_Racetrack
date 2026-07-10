# RaceTrack Competition Website

Premium multilingual showcase and lead-generation website for RaceTrack Competition, a Luxembourg-based motorsport team offering private Lamera testing, arrive-and-drive race weekends, driver development and endurance racing programmes.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React
- Framer Motion
- Lucide icons
- next/image
- next/font with Inter and Barlow Condensed
- Zod
- React Hook Form
- pnpm

## Run Locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000/en`.

## Quality Checks

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Main Routes

- `/en`, `/fr`, `/de`
- `/[locale]/private-testing`
- `/[locale]/race-with-us`
- `/[locale]/the-lamera`
- `/[locale]/team`
- `/[locale]/calendar`
- `/[locale]/results`
- `/[locale]/contact`
- `/[locale]/privacy`
- `/[locale]/legal`
- `/[locale]/cookies`

## Content Editing

Editable structured content lives in:

- `src/content/dictionaries.ts` for language copy, navigation, metadata and form text
- `src/data/site.ts` for claims, programmes, Lamera specs, calendar, race seats, team members and results
- `src/lib/lead-schema.ts` for enquiry form options and validation

Demo content is marked with `isDemo`, `isPlaceholder`, `needsValidation`, `provisional` or `verified: false` fields.

## Replacing Images

The supplied logo is stored at:

- `public/brand/racetrack-competition-logo-source.png`

Current visual placeholders are abstract generated media, not fake team photographs. Replace them by keeping the same paths:

- `public/images/hero/hero-poster.webp`
- `public/images/cars/*`
- `public/images/circuits/*`
- `public/images/drivers/*`
- `public/images/team/*`
- `public/images/results/*`
- `public/images/cta/night-cockpit.webp`

The Facebook screenshot is stored privately at `private/reference/facebook-page-reference.png` and is not exposed through `public/`.

## Replacing Hero Video

Add the final video to:

```text
public/videos/hero-racetrack.mp4
```

Then update `heroMedia.video` in `src/data/site.ts` from an empty string to `/videos/hero-racetrack.mp4`.

## Updating Calendar, Seats and Results

- Calendar entries: `calendarEvents` and `circuits` in `src/data/site.ts`
- Race seats: `raceSeats` in `src/data/site.ts`
- Results: `raceResults` in `src/data/site.ts`

Unverified results are hidden in production by `ResultsFilters` unless they are marked `verified: true`.

## Environment Variables

Copy `.env.example` to `.env.local` when services are ready. The site works without email, analytics or anti-spam services configured.

## Deployment

The project is deployable on Vercel. Set `NEXT_PUBLIC_SITE_URL` to the production domain before deployment so canonical URLs, Open Graph URLs, sitemap and robots point to the real site.

## Legal Information

The legal, privacy and cookie pages are templates. Fill in the items listed in `LEGAL_INFORMATION_REQUIRED.md` before production.
