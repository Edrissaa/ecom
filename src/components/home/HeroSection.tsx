"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { heroSlides } from "@/data/home";
import { cn } from "@/lib/cn";

const AUTOPLAY_MS = 7000;
const count = heroSlides.length;

const controlButton =
  "inline-flex size-11 items-center justify-center rounded-full text-ivory transition-colors duration-200 hover:bg-ivory/20";

export function HeroSection() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const hovering = useRef(false);

  // Autoplay: paused by the toggle, by hover/focus, in background tabs, and for reduced-motion users.
  // `active` is a dependency so a manual change restarts the timer instead of cutting it short.
  useEffect(() => {
    if (!playing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!hovering.current && !document.hidden) setActive((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [playing, active]);

  const go = (index: number) => setActive((index + count) % count);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      data-surface="dark"
      className="relative isolate h-[660px] overflow-hidden rounded-b-[20px] bg-espresso text-ivory md:h-[680px] lg:h-[680px] lg:rounded-b-[28px] xl:h-[700px]"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
      onFocus={() => (hovering.current = true)}
      onBlur={() => (hovering.current = false)}
    >
      <div aria-live={playing ? "off" : "polite"}>
        {heroSlides.map((slide, i) => {
          const isActive = i === active;
          const Heading = i === 0 ? "h1" : "h2";
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!isActive}
              inert={!isActive}
              className={cn(
                "absolute inset-0 flex flex-col transition-opacity duration-[900ms] ease-premium lg:block",
                isActive ? "opacity-100" : "opacity-0",
              )}
            >
              {/* Below lg the photo and the copy are stacked, so text never sits on the picture.
                  From lg up the photo fills the hero and the copy overlays its calm left side. */}
              <div className="relative h-[360px] shrink-0 sm:h-[400px] md:h-[420px] lg:absolute lg:inset-0 lg:h-auto">
                <Image
                  src={slide.photo.src}
                  alt={slide.photo.alt}
                  fill
                  sizes="(min-width: 1440px) 1440px, 100vw"
                  quality={85}
                  placeholder="blur"
                  preload={i === 0}
                  fetchPriority={i === 0 ? "high" : "low"}
                  style={{ "--pos-m": slide.position.mobile, "--pos-d": slide.position.desktop } as CSSProperties}
                  className="object-cover [object-position:var(--pos-m)] lg:[object-position:var(--pos-d)]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-espresso/70 via-espresso/25 to-transparent max-lg:hidden" />
                {/* Stacked: darken under the header icons, and melt the photo into the copy block below. */}
                <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-espresso/55 to-transparent lg:hidden" />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-espresso to-transparent lg:hidden" />
              </div>

              <div className="container-page relative -mt-6 flex flex-1 flex-col justify-start pb-24 lg:absolute lg:inset-0 lg:mt-0 lg:justify-center lg:pb-8">
                <Heading className="max-w-[640px] font-serif text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-ivory sm:text-5xl md:max-w-none md:text-[56px] lg:max-w-[640px] lg:text-[58px] lg:leading-[1.02] xl:text-[76px]">
                  {slide.lines.map((line) => (
                    <span key={line} className="lg:block">
                      {line}{" "}
                    </span>
                  ))}
                </Heading>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/80 lg:mt-5">{slide.copy}</p>
                <div className="mt-5 lg:mt-8">
                  <ButtonLink href={slide.cta.href} variant="light" size="md" arrow className="px-6">
                    {slide.cta.label}
                  </ButtonLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="container-page pointer-events-none absolute inset-x-0 bottom-5 flex justify-end lg:bottom-8">
        <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-espresso/45 p-1 backdrop-blur-md">
          <div className="flex items-center pl-2" role="group" aria-label="Choose slide">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === active}
                className="group/dot flex h-11 min-w-7 items-center justify-center"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full bg-ivory transition-all duration-300 ease-premium",
                    i === active ? "w-6" : "w-1.5 opacity-50 group-hover/dot:opacity-80",
                  )}
                />
              </button>
            ))}
          </div>
          <button type="button" className={controlButton} onClick={() => go(active - 1)} aria-label="Previous slide">
            <ChevronLeft aria-hidden className="size-5" />
          </button>
          <button type="button" className={controlButton} onClick={() => go(active + 1)} aria-label="Next slide">
            <ChevronRight aria-hidden className="size-5" />
          </button>
          <button
            type="button"
            className={controlButton}
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
          >
            {playing ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}
