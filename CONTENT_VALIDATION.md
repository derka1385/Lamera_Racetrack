# Content Validation

Important claims are centralized in `src/data/site.ts` and `src/content/dictionaries.ts`. Validate the following before production deployment:

- Company founding date
- Exact number of years of experience
- Exact legal company details
- Gilles Bruckner's official current role
- Tommy Rollinger's official role
- Current team members
- FIA ETCC title wording
- 2013 vice-champion result
- 2022 Abu Dhabi result
- 2023 Portimão result
- Current number of cars
- Current car numbers
- Exact Lamera generation
- Engine displacement
- Torque
- Power
- Weight
- Current racing calendar
- Private test circuits
- Available race seats
- Programme pricing
- Insurance conditions
- Licence requirements
- Included equipment
- Response time
- Testimonials
- Permission to use championship and partner logos

## Claims Not Public Until Verified

The following claims remain in internal validation notes or non-public data until official wording and sources are supplied:

- FIA ETCC Champion 2014
- FIA ETCC Vice-Champion 2013
- 26H Portimão Pro-Am Winner 2023
- Abu Dhabi class podium 2022
- Exact number of years of motorsport experience
- Exact public role labels for team members

## Lamera Technical Claims

The following are provisional and may vary according to vehicle generation and configuration:

- 330 hp
- 1,020 kg
- Rear-wheel drive
- Six-speed sequential gearbox with paddles
- Tubular two-seat chassis
- Double wishbone suspension
- 330 mm ventilated discs

Do not add unverified safety certification claims.

## Demo Data

The calendar, race seats, testimonials and result stories include demo/provisional records for structure only. Public components must hide:

- `isDemo: true`
- `isVerified: false`
- `verified: false`

Confirm and update the status fields before publishing dates, seats, testimonials or results.

## Enquiry Configuration

Production lead capture requires:

- `NEXT_PUBLIC_ENQUIRY_ENDPOINT`
- optional `NEXT_PUBLIC_DIRECT_EMAIL`
- optional `NEXT_PUBLIC_WHATSAPP_URL`

Do not publish a form success state unless the endpoint returns HTTP 2xx.
