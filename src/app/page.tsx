import Link from "next/link";

export default function RootPage() {
  return (
    <main className="grid min-h-dvh place-items-center px-4 text-center">
      <div className="max-w-xl">
        <p className="text-sm font-semibold uppercase text-brand">
          RaceTrack Competition
        </p>
        <h1 className="display-type mt-4 text-6xl uppercase">
          Private Testing. Endurance Racing.
        </h1>
        <p className="mt-5 text-muted">
          Choose a language to enter the showcase website.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/en"
            className="rounded bg-brand px-5 py-3 text-sm font-semibold uppercase text-[var(--color-brand-ink)]"
          >
            English
          </Link>
          <Link
            href="/fr"
            className="rounded border border-white/15 px-5 py-3 text-sm font-semibold uppercase"
          >
            Français
          </Link>
          <Link
            href="/de"
            className="rounded border border-white/15 px-5 py-3 text-sm font-semibold uppercase"
          >
            Deutsch
          </Link>
        </div>
      </div>
    </main>
  );
}
