import type { Product } from "@/types";
import { productImages } from "@/data/images";

type ProductSeed = Omit<Product, "image" | "imageAlt"> & { slug: keyof typeof productImages };

const seeds: ProductSeed[] = [
  // ── Newly dropped ─────────────────────────────────────────────
  {
    id: "shoe-01",
    slug: "aero-max-runner",
    name: "Aero Max Runner",
    price: 229.95,
    description: "Lightweight everyday runners engineered for comfort and movement.",
    category: "Running",
    gender: "unisex",
    badge: "New Arrival",
    colors: [
      { name: "Cloud Grey", hex: "#D6D8DA" },
      { name: "Lime", hex: "#9BE22E" },
    ],
    featured: true,
    newArrival: true,
    collection: "new-drops",
  },
  {
    id: "shoe-02",
    slug: "terrain-low",
    name: "Terrain Low",
    price: 329.95,
    description: "Soft oat suede on a low profile, with a gum sole that ages beautifully.",
    category: "Lifestyle",
    gender: "men",
    badge: "Best Seller",
    colors: [
      { name: "Oat", hex: "#E4D3B6" },
      { name: "Caramel", hex: "#8B5A33" },
    ],
    featured: true,
    newArrival: true,
    collection: "new-drops",
  },
  {
    id: "shoe-03",
    slug: "motion-wave",
    name: "Motion Wave",
    price: 169.99,
    description: "Cushioned lavender runners with a springy, wave-tuned midsole.",
    category: "Running",
    gender: "women",
    badge: "Limited",
    colors: [
      { name: "Lavender", hex: "#9C90DD" },
      { name: "Lime", hex: "#A9F03E" },
    ],
    featured: true,
    newArrival: true,
    collection: "new-drops",
  },
  {
    id: "shoe-04",
    slug: "retro-court",
    name: "Retro Court",
    price: 219.95,
    description: "Court-inspired leather with warm brick overlays and a gum outsole.",
    category: "Court",
    gender: "unisex",
    badge: "Trending",
    colors: [
      { name: "Cream", hex: "#F2ECE0" },
      { name: "Brick", hex: "#B5412E" },
    ],
    featured: true,
    newArrival: false,
    collection: "new-drops",
  },
  {
    id: "shoe-05",
    slug: "shadow-runner",
    name: "Shadow Runner",
    price: 249.95,
    description: "Stealth black mesh with gold accents, built for early starts and late nights.",
    category: "Running",
    gender: "men",
    badge: "Best Seller",
    colors: [
      { name: "Onyx", hex: "#2C2926" },
      { name: "Gold", hex: "#D6A63B" },
    ],
    featured: true,
    newArrival: false,
    collection: "new-drops",
  },
  {
    id: "shoe-06",
    slug: "urban-glide",
    name: "Urban Glide",
    price: 189.99,
    description: "Charcoal canvas low-tops with a clean cream sole for everyday wear.",
    category: "Lifestyle",
    gender: "unisex",
    badge: "New Arrival",
    colors: [
      { name: "Charcoal", hex: "#4A4641" },
      { name: "Mustard", hex: "#D6A63B" },
    ],
    featured: false,
    newArrival: true,
    collection: "new-drops",
  },

  // ── Summer ────────────────────────────────────────────────────
  {
    id: "shoe-07",
    slug: "sol-breeze-runner",
    name: "Sol Breeze Runner",
    price: 199.99,
    description: "Breathable sand mesh with coral overlays for long, sun-soaked days.",
    category: "Running",
    gender: "women",
    badge: "New Arrival",
    colors: [
      { name: "Sand", hex: "#EBD9C0" },
      { name: "Coral", hex: "#E4572E" },
    ],
    featured: true,
    newArrival: true,
    collection: "summer",
  },
  {
    id: "shoe-08",
    slug: "coastline-low",
    name: "Coastline Low",
    price: 149.99,
    compareAtPrice: 179.99,
    description: "Washed sky canvas on a vulcanised sole — light, easy, built for summer.",
    category: "Lifestyle",
    gender: "women",
    badge: "Trending",
    colors: [
      { name: "Sky", hex: "#BFD8E8" },
      { name: "Harbour", hex: "#2F5D86" },
    ],
    featured: false,
    newArrival: false,
    collection: "summer",
  },
  {
    id: "shoe-09",
    slug: "dune-trainer",
    name: "Dune Trainer",
    price: 174.95,
    description: "Sand leather and terracotta panels, ready for city heat and weekend miles.",
    category: "Training",
    gender: "men",
    colors: [
      { name: "Dune", hex: "#E9D0B0" },
      { name: "Terracotta", hex: "#C77B4F" },
    ],
    featured: false,
    newArrival: true,
    collection: "summer",
  },
  {
    id: "shoe-10",
    slug: "palm-court",
    name: "Palm Court",
    price: 209.99,
    description: "Soft sage panels on creamy leather — a calm, everyday court classic.",
    category: "Court",
    gender: "unisex",
    badge: "Best Seller",
    colors: [
      { name: "Cream", hex: "#F0EBDD" },
      { name: "Sage", hex: "#8FA58A" },
    ],
    featured: true,
    newArrival: false,
    collection: "summer",
  },
  {
    id: "shoe-11",
    slug: "citrus-glide",
    name: "Citrus Glide",
    price: 159.99,
    compareAtPrice: 189.99,
    description: "Butter-yellow runners with a forest-green pop and cloud-soft foam.",
    category: "Running",
    gender: "women",
    badge: "Limited",
    colors: [
      { name: "Butter", hex: "#F4E7A0" },
      { name: "Forest", hex: "#3F7D5A" },
    ],
    featured: false,
    newArrival: false,
    collection: "summer",
  },
  {
    id: "shoe-12",
    slug: "marina-canvas",
    name: "Marina Canvas",
    price: 139.99,
    description: "Deep navy canvas with a gold stripe — a coastal classic done right.",
    category: "Lifestyle",
    gender: "men",
    colors: [
      { name: "Navy", hex: "#2B405C" },
      { name: "Gold", hex: "#D9A441" },
    ],
    featured: false,
    newArrival: false,
    collection: "summer",
  },
];

export const products: readonly Product[] = seeds.map(({ slug, ...rest }) => ({
  ...rest,
  slug,
  image: productImages[slug].src,
  imageAlt: productImages[slug].alt,
}));

export const newDrops = products.filter((p) => p.collection === "new-drops");
export const summerCollection = products.filter((p) => p.collection === "summer");

const byId = new Map(products.map((p) => [p.id, p]));
export const getProductById = (id: string): Product | undefined => byId.get(id);

/** Case-insensitive match against name, category, colour names and description. */
export function searchProducts(query: string, limit = 8): Product[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return products
    .filter((p) => {
      const haystack = [p.name, p.category, p.gender, p.description, ...p.colors.map((c) => c.name)]
        .join(" ")
        .toLowerCase();
      return terms.every((t) => haystack.includes(t));
    })
    .slice(0, limit);
}
