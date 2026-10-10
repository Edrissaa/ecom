"use client";

import { useEffect, useState } from "react";
import { Dialog } from "radix-ui";
import { Menu, User, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button, LinkButton } from "@/components/ui/button";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const [active, setActive] = useState<string>(nav[0].href);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll-spy: highlight the nav item whose section is under the header.
  useEffect(() => {
    const targets = nav.map((n) => document.querySelector<HTMLElement>(n.href)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-surface/80 backdrop-blur-xl transition-shadow duration-300",
        scrolled ? "shadow-[0_1px_12px_rgba(0,0,0,0.07)]" : "shadow-[0_1px_8px_rgba(0,0,0,0.03)]",
      )}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <a href="#top" aria-label="Synapse.ai home" className="rounded-full">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-space-xs rounded-full bg-surface-container-low/70 px-space-sm py-1.5 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "location" : undefined}
              className={cn(
                "rounded-full px-space-md py-1.5 font-label text-label-md transition-[background-color,color] duration-200",
                active === item.href
                  ? "bg-surface-container-high font-semibold text-on-surface"
                  : "text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-space-md">
          <a href="#" className="hidden font-label text-label-md text-on-surface-variant transition-colors hover:text-on-surface sm:inline-block">
            Sign in
          </a>
          <LinkButton href="#consultation" className="hidden sm:inline-flex">
            Schedule Demo
          </LinkButton>
          <span aria-hidden className="hidden size-8 items-center justify-center rounded-full bg-primary text-on-primary sm:flex">
            <User className="size-[18px]" />
          </span>

          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger asChild>
              <Button variant="secondary" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu aria-hidden className="size-5" />
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[60] bg-inverse-surface/30 backdrop-blur-sm animate-fade-in" />
              <Dialog.Content className="fixed inset-x-3 top-3 z-[61] rounded-lg bg-surface p-space-lg shadow-2xl outline-none animate-fade-up">
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
                <div className="flex items-center justify-between">
                  <Logo />
                  <Dialog.Close asChild>
                    <Button variant="secondary" size="icon" aria-label="Close menu">
                      <X aria-hidden className="size-5" />
                    </Button>
                  </Dialog.Close>
                </div>
                <nav aria-label="Mobile" className="mt-space-lg flex flex-col gap-1">
                  {nav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-full px-space-md py-3 text-headline-sm text-on-surface transition-colors hover:bg-surface-container-low"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <LinkButton href="#consultation" size="lg" className="mt-space-lg w-full" onClick={() => setMenuOpen(false)}>
                  Schedule Demo
                </LinkButton>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
