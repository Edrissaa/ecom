import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { promoCards, type PromoCard } from "@/data/home";
import { cn } from "@/lib/cn";

function PromoCardView({ card }: { card: PromoCard }) {
  const centered = card.layout === "center";

  return (
    <article className="group relative isolate aspect-[4/5] overflow-hidden rounded-xl bg-espresso" data-surface="dark">
      <Image
        src={card.photo.src}
        alt={card.photo.alt}
        fill
        sizes="(min-width: 1440px) 432px, (min-width: 1024px) 31vw, (min-width: 768px) 44vw, (min-width: 640px) 56vw, 82vw"
        placeholder="blur"
        className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 transition-colors duration-500",
          centered
            ? "bg-gradient-to-b from-espresso/10 via-espresso/30 to-espresso/55 group-hover:via-espresso/40"
            : "bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent group-hover:from-espresso/90",
        )}
      />

      <div
        className={cn(
          "absolute inset-x-0 flex flex-col p-5 text-ivory md:p-6",
          centered ? "inset-y-0 items-center justify-center text-center" : "bottom-0 items-start",
        )}
      >
        {centered ? (
          <h3 className="font-serif text-[34px] font-semibold uppercase leading-none tracking-[0.04em] sm:text-4xl">{card.title}</h3>
        ) : (
          <>
            <h3 className="max-w-[17ch] text-balance font-serif text-[26px] font-bold leading-[1.1] tracking-[-0.01em] md:text-[28px]">
              {card.title}
            </h3>
            {card.subtitle && <p className="mt-2 max-w-[28ch] text-[13px] leading-snug text-ivory/80">{card.subtitle}</p>}
          </>
        )}
        {/* Stretched link: the whole card is clickable through one tab stop. */}
        <Link
          href={card.cta.href}
          className={cn(
            buttonStyles({ variant: "light", size: "sm" }),
            "mt-5 after:absolute after:inset-0 after:content-['']",
          )}
        >
          {card.cta.label}
          <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export function EditorialCards() {
  return (
    <section aria-labelledby="edits-heading" className="container-page pt-5 md:pt-6">
      <h2 id="edits-heading" className="sr-only">
        Featured edits
      </h2>
      {/* Below lg: swipeable row with snap. lg and up: three equal columns. */}
      <ul
        role="list"
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0"
      >
        {promoCards.map((card) => (
          <li key={card.id} className="w-[82%] shrink-0 snap-center sm:w-[56%] md:w-[44%] lg:w-auto">
            <PromoCardView card={card} />
          </li>
        ))}
      </ul>
    </section>
  );
}
