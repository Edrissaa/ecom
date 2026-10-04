import type { StaticImageData } from "next/image";

export type ProductBadge = "New Arrival" | "Best Seller" | "Limited" | "Trending";
export type ProductGender = "men" | "women" | "unisex";
export type ProductCollection = "new-drops" | "summer";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Current price in USD. */
  price: number;
  /** Original price — present only when the product is on sale. */
  compareAtPrice?: number;
  description: string;
  image: StaticImageData;
  imageAlt: string;
  category: string;
  gender: ProductGender;
  badge?: ProductBadge;
  colors: ProductColor[];
  featured: boolean;
  newArrival: boolean;
  collection: ProductCollection;
}

/** What we persist: just ids and quantities, so the catalogue stays the source of truth. */
export interface StoredLine {
  id: string;
  quantity: number;
}

export interface CartLine {
  product: Product;
  quantity: number;
  lineTotal: number;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Photo {
  src: StaticImageData;
  alt: string;
}
