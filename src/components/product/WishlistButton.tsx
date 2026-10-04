"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/components/providers/ShopProvider";
import { cn } from "@/lib/cn";

export function WishlistButton({ productId, name }: { productId: string; name: string }) {
  const { has, toggle } = useWishlist();
  const saved = has(productId);

  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={saved}
      aria-label={`Save to wishlist: ${name}`}
      className="absolute right-2.5 top-2.5 z-10 inline-flex size-11 items-center justify-center rounded-full text-espresso transition-colors duration-200 hover:bg-ivory/70"
    >
      <span className="flex size-8 items-center justify-center rounded-full bg-ivory/80 backdrop-blur-sm">
        <Heart
          aria-hidden
          className={cn("size-[15px] transition-colors duration-200", saved ? "fill-walnut stroke-walnut" : "stroke-espresso")}
        />
      </span>
    </button>
  );
}
