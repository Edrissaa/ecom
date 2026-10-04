"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart, useOverlay } from "@/components/providers/ShopProvider";
import type { Product } from "@/types";

export function ProductActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { open } = useOverlay();
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleAdd = () => {
    addItem(product.id);
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1800);
  };

  // "Buy Now" skips browsing: add the pair and go straight to the bag with checkout in reach.
  const handleBuy = () => {
    addItem(product.id);
    open("cart");
  };

  return (
    <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
      <Button
        variant="secondary"
        className="w-full px-3"
        onClick={handleAdd}
        aria-label={added ? `Added to cart: ${product.name}` : `Add to Cart: ${product.name}`}
      >
        {added ? (
          <>
            <Check aria-hidden className="size-4" /> Added
          </>
        ) : (
          "Add to Cart"
        )}
      </Button>
      <Button className="w-full px-3" onClick={handleBuy} aria-label={`Buy Now: ${product.name}`}>
        Buy Now
      </Button>
    </div>
  );
}
