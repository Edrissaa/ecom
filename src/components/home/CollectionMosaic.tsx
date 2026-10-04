import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonStyles } from "@/components/ui/Button";
import { mosaicTiles, type MosaicTileData } from "@/data/home";
import { cn } from "@/lib/cn";

interface TileProps {
  tile: MosaicTileData;
  className?: string;
  sizes: string;
  large?: boolean;
}

function MosaicTile({ tile, className, sizes, large = false }: TileProps) {
  const top = tile.align === "top";

  return (
    <article className={cn("group relative isolate overflow-hidden rounded-xl bg-espresso", className)} data-surface="dark">
      <Image
        src={tile.photo.src}
        alt={tile.photo.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        style={
          {
            "--pos-m": tile.mobilePosition ?? tile.position ?? "50% 50%",
            "--pos-d": tile.position ?? "50% 50%",
          } as CSSProperties
        }
        className="object-cover [object-position:var(--pos-m)] transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.05] sm:[object-position:var(--pos-d)]"
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0",
          top ? "bg-gradient-to-b from-espresso/50 via-espresso/5 to-transparent" : "bg-gradient-to-t from-espresso/65 via-espresso/5 to-transparent",
        )}
      />
      <div
        className={cn(
          "absolute inset-x-0 flex flex-col items-start p-5 text-ivory sm:p-6 lg:p-8",
          top ? "top-0" : "bottom-0",
        )}
      >
        <h3
          className={cn(
            "font-serif font-semibold leading-none tracking-[-0.01em] text-ivory/95",
            large ? "text-3xl sm:text-5xl" : "text-3xl sm:text-4xl",
          )}
        >
          {tile.title}
        </h3>
        <Link
          href={tile.href}
          aria-label={tile.ariaLabel}
          className={cn(buttonStyles({ variant: "light", size: "sm" }), "mt-4 after:absolute after:inset-0 after:content-['']")}
        >
          {tile.cta}
          <ArrowUpRight
            aria-hidden
            className="size-3.5 transition-transform duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}

/** Editorial mosaic: one tall tile + two landscape tiles, then a full-width banner tile. */
export function CollectionMosaic() {
  return (
    <section id="collections" aria-labelledby="collections-heading" className="container-page py-14 md:py-20">
      <Reveal>
        <SectionHeading
          id="collections-heading"
          title="Most Recommended Collections For You"
          subtitle="Everyday icons and fresh silhouettes, curated around how you move."
        />
      </Reveal>

      <Reveal className="mt-10 md:mt-14">
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          <MosaicTile
            tile={mosaicTiles.tall}
            sizes="(min-width: 1440px) 660px, (min-width: 768px) 48vw, 100vw"
            large
            className="aspect-[4/5] md:row-span-2 md:aspect-auto"
          />
          <MosaicTile tile={mosaicTiles.top} sizes="(min-width: 1440px) 660px, (min-width: 768px) 48vw, 100vw" className="aspect-[3/2]" />
          <MosaicTile tile={mosaicTiles.bottom} sizes="(min-width: 1440px) 660px, (min-width: 768px) 48vw, 100vw" className="aspect-[3/2]" />
        </div>
        <MosaicTile
          tile={mosaicTiles.wide}
          sizes="(min-width: 1440px) 1344px, 100vw"
          large
          className="mt-4 aspect-[4/3] sm:aspect-[2/1] md:mt-5 lg:aspect-[21/8]"
        />
      </Reveal>
    </section>
  );
}
