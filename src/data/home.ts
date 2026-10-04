import { heroImages, mosaicImages, promoImages } from "@/data/images";
import type { Photo } from "@/types";

export interface HeroSlide {
  id: string;
  photo: Photo;
  /** Headline broken into deliberate lines. */
  lines: string[];
  copy: string;
  cta: { label: string; href: string };
  /** object-position per breakpoint so the subject survives each crop. */
  position: { mobile: string; desktop: string };
}

export const heroSlides: HeroSlide[] = [
  {
    id: "everyday",
    photo: heroImages.everyday,
    lines: ["Sneakers That", "Define Your", "Everyday Look"],
    copy: "Move differently. Designed for every step.",
    cta: { label: "Shop Now", href: "/shop/all" },
    position: { mobile: "84% 50%", desktop: "72% 50%" },
  },
  {
    id: "season",
    photo: heroImages.season,
    lines: ["New Season.", "New Movement."],
    copy: "Fresh silhouettes, built for movement.",
    cta: { label: "Shop Now", href: "/shop/new-arrivals" },
    position: { mobile: "84% 50%", desktop: "72% 50%" },
  },
  {
    id: "street",
    photo: heroImages.street,
    lines: ["Street-Ready", "Essentials."],
    copy: "Made for your rotation.",
    cta: { label: "Shop Now", href: "/shop/men" },
    position: { mobile: "84% 50%", desktop: "72% 50%" },
  },
];

export interface PromoCard {
  id: string;
  photo: Photo;
  title: string;
  subtitle?: string;
  cta: { label: string; href: string };
  /** "bottom": copy anchored to the bottom-left. "center": centred wordmark-style card. */
  layout: "bottom" | "center";
}

export const promoCards: PromoCard[] = [
  {
    id: "move",
    photo: promoImages.move,
    title: "Sneakers That Move With You",
    subtitle: "Comfortable, durable, and always in style.",
    cta: { label: "Find Your Fit", href: "/help/size-guide" },
    layout: "bottom",
  },
  {
    id: "drops",
    photo: promoImages.drops,
    title: "Fresh Drops. Iconic Silhouettes.",
    subtitle: "Sneakers that speak before you do.",
    cta: { label: "Get Yours Now", href: "/shop/new-arrivals" },
    layout: "bottom",
  },
  {
    id: "street",
    photo: promoImages.street,
    title: "STYLE-STACK",
    cta: { label: "Shop Street", href: "/shop/all" },
    layout: "center",
  },
];

export interface MosaicTileData {
  id: string;
  photo: Photo;
  title: string;
  cta: string;
  href: string;
  /** Accessible name; always begins with the visible CTA text. */
  ariaLabel: string;
  align: "bottom" | "top";
  /** object-position from `sm` up (and on phones too unless `mobilePosition` is set). */
  position?: string;
  /** Phone-only crop, so the headline lands on calm background. */
  mobilePosition?: string;
}

export const mosaicTiles: Record<"tall" | "top" | "bottom" | "wide", MosaicTileData> = {
  tall: {
    id: "tall",
    photo: mosaicImages.tall,
    title: "Sneakers",
    cta: "View all sneakers",
    href: "/shop/all",
    ariaLabel: "View all sneakers: the full collection",
    align: "bottom",
    position: "50% 60%",
  },
  top: {
    id: "top",
    photo: mosaicImages.top,
    title: "Sneakers",
    cta: "View all sneakers",
    href: "/shop/men",
    ariaLabel: "View all sneakers: men's",
    align: "top",
  },
  bottom: {
    id: "bottom",
    photo: mosaicImages.bottom,
    title: "Sneakers",
    cta: "View all sneakers",
    href: "/shop/women",
    ariaLabel: "View all sneakers: women's",
    align: "top",
  },
  wide: {
    id: "wide",
    photo: mosaicImages.wide,
    title: "Trending Now",
    cta: "Explore Shop",
    href: "/shop/all",
    ariaLabel: "Explore Shop: trending now",
    align: "bottom",
    position: "70% 50%",
    mobilePosition: "0% 50%",
  },
};
