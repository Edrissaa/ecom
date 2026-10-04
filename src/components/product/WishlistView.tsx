"use client";

import { Heart } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { useWishlist } from "@/components/providers/ShopProvider";
import { getProductById } from "@/data/products";

export function WishlistView() {
  const { ids } = useWishlist();
  const items = ids.flatMap((id) => {
    const product = getProductById(id);
    return product ? [product] : [];
  });

  if (items.length === 0) {
    return (
      <div className="mx-auto mt-16 flex max-w-sm flex-col items-center text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-sand">
          <Heart aria-hidden className="size-6 text-walnut" />
        </span>
        <p className="mt-6 font-serif text-2xl font-bold">Nothing saved yet</p>
        <p className="mt-2 text-sm text-muted">Tap the heart on any pair to keep it here for later.</p>
        <ButtonLink href="/shop/all" className="mt-7" arrow>
          Browse Sneakers
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <ProductGrid products={items} />
    </div>
  );
}
