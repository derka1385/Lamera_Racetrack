import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-background px-4 text-center text-foreground">
      <div>
        <p className="text-sm font-semibold uppercase text-brand">404</p>
        <h1 className="display-type mt-4 text-6xl uppercase">Page not found</h1>
        <p className="mt-5 text-muted">The requested page is not part of the RaceTrack Competition site.</p>
        <Link className="mt-8 inline-flex min-h-12 items-center rounded bg-brand px-5 text-sm font-semibold uppercase text-[var(--color-brand-ink)]" href="/en">
          Return home
        </Link>
      </div>
    </main>
  );
}
