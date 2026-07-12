"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/content/dictionaries";
import { contactHref, stripLocale, type Locale } from "@/lib/i18n";
import { CTAButton } from "@/components/CTAButton";

type MobileStickyCTAProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function MobileStickyCTA({ locale, dictionary }: MobileStickyCTAProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [keyboardLikelyOpen, setKeyboardLikelyOpen] = useState(false);
  const [leadFormVisible, setLeadFormVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const activePath = stripLocale(pathname);
  const isContactPage = activePath === "/contact";

  useEffect(() => {
    function onMenu(event: Event) {
      const detail = (event as CustomEvent<{ open: boolean }>).detail;
      setMenuOpen(Boolean(detail?.open));
    }

    window.addEventListener("rtc-mobile-menu", onMenu);
    return () => window.removeEventListener("rtc-mobile-menu", onMenu);
  }, []);

  useEffect(() => {
    const visualViewport = window.visualViewport;
    if (!visualViewport) return;

    function onResize() {
      setKeyboardLikelyOpen((window.visualViewport?.height ?? window.innerHeight) < window.innerHeight * 0.72);
    }

    onResize();
    visualViewport.addEventListener("resize", onResize);
    return () => visualViewport.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const form = document.querySelector("[data-lead-form]");
    const footer = document.querySelector("footer");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === form) setLeadFormVisible(entry.isIntersecting);
          if (entry.target === footer) setFooterVisible(entry.isIntersecting);
        });
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.08 },
    );

    if (form) observer.observe(form);
    if (footer) observer.observe(footer);

    return () => observer.disconnect();
  }, [pathname]);

  if (isContactPage || menuOpen || keyboardLikelyOpen || leadFormVisible || footerVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-background/94 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur xl:hidden">
      <CTAButton
        href={contactHref(locale, { objective: "private-test" })}
        className="w-full"
        icon={false}
      >
        {dictionary.common.requestDrive}
      </CTAButton>
    </div>
  );
}
