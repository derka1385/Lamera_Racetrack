"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/content/dictionaries";
import { cn } from "@/lib/utils";
import { contactHref, localizedPath, stripLocale, t, type Locale } from "@/lib/i18n";
import { navItems } from "@/data/site";
import { CTAButton } from "@/components/CTAButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";

type MobileNavigationProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function MobileNavigation({ locale, dictionary }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const activePath = stripLocale(pathname);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousOpen = useRef(false);
  const dialogId = "mobile-navigation-dialog";

  useEffect(() => {
    if (!open) {
      if (previousOpen.current) {
        triggerRef.current?.focus();
      }
      previousOpen.current = false;
      return;
    }

    previousOpen.current = true;
    closeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("rtc-mobile-menu", { detail: { open: true } }));

    return () => {
      document.body.style.overflow = previousOverflow;
      window.dispatchEvent(new CustomEvent("rtc-mobile-menu", { detail: { open: false } }));
    };
  }, [open]);

  useEffect(() => {
    queueMicrotask(() => setOpen(false));
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), select:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("aria-hidden"));

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? dictionary.common.close : dictionary.common.menu}
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/10 bg-white/5 text-foreground"
      >
        {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
      </button>

      {open ? (
        <div
          ref={dialogRef}
          id={dialogId}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-navigation-title"
          className="fixed inset-0 z-50 min-h-dvh overflow-y-auto overscroll-contain bg-background/96 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-[calc(1rem+env(safe-area-inset-top))] backdrop-blur-md"
        >
          <div className="flex items-center justify-between">
            <Logo locale={locale} variant="compact" />
            <button
              ref={closeRef}
              type="button"
              aria-label={dictionary.common.close}
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/10 bg-white/5 text-foreground"
            >
              <X aria-hidden="true" size={20} />
            </button>
          </div>
          <h2 id="mobile-navigation-title" className="sr-only">
            {dictionary.common.menu}
          </h2>

          <nav className="mt-8 flex flex-col gap-2" aria-label={dictionary.common.menu}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localizedPath(locale, item.href)}
                onClick={() => setOpen(false)}
                aria-current={activePath === item.href ? "page" : undefined}
                className={cn(
                  "min-h-14 rounded border border-white/10 bg-white/5 px-4 py-4 font-display text-[clamp(1.45rem,7vw,2.25rem)] font-semibold uppercase leading-none",
                  activePath === item.href && "border-brand bg-brand/10 text-brand",
                )}
              >
                {t(item.label, locale)}
              </Link>
            ))}
          </nav>

          <div className="mt-8 grid gap-4 pb-4">
            <LanguageSwitcher locale={locale} label={dictionary.common.language} onLocaleChange={() => setOpen(false)} />
            <CTAButton href={contactHref(locale, { objective: "private-test" })} className="w-full" onClick={() => setOpen(false)}>
              {dictionary.common.requestDrive}
            </CTAButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}
