"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger in ms. */
  delay?: number;
}

/**
 * Subtle fade-and-rise as a block scrolls into view.
 *
 * Progressive enhancement: the content is fully visible in the server HTML. Only after
 * hydration, and only for blocks that start below the fold, do we flip it to hidden and
 * back — so no-JS visitors, reduced-motion users and above-the-fold content never flash.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
