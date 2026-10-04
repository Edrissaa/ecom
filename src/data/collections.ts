import type { Product } from "@/types";

export interface ShopCollection {
  slug: string;
  /** Short name for filter pills. */
  label: string;
  title: string;
  eyebrow: string;
  description: string;
  filter: (product: Product) => boolean;
}

/** Destinations for /shop/[slug]. */
export const shopCollections: ShopCollection[] = [
  {
    slug: "all",
    label: "All",
    title: "All Sneakers",
    eyebrow: "The full rotation",
    description: "Every silhouette, every colourway — made for your rotation.",
    filter: () => true,
  },
  {
    slug: "men",
    label: "Men",
    title: "Men's Sneakers",
    eyebrow: "Men",
    description: "Street-ready essentials with a considered, easy fit.",
    filter: (p) => p.gender === "men" || p.gender === "unisex",
  },
  {
    slug: "women",
    label: "Women",
    title: "Women's Sneakers",
    eyebrow: "Women",
    description: "Fresh silhouettes in soft, confident colour.",
    filter: (p) => p.gender === "women" || p.gender === "unisex",
  },
  {
    slug: "new-arrivals",
    label: "New Arrivals",
    title: "New Arrivals",
    eyebrow: "Just landed",
    description: "New season. New movement. The latest drops, first.",
    filter: (p) => p.newArrival,
  },
  {
    slug: "summer",
    label: "Summer",
    title: "Summer Collection",
    eyebrow: "Season edit",
    description: "Light canvas, breathable mesh and sun-washed colour.",
    filter: (p) => p.collection === "summer",
  },
  {
    slug: "sale",
    label: "Sale",
    title: "Sale",
    eyebrow: "Last chance",
    description: "Selected styles, for less — while sizes last.",
    filter: (p) => p.compareAtPrice !== undefined,
  },
];

export const getShopCollection = (slug: string) => shopCollections.find((c) => c.slug === slug);
