"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { useCart } from "@/components/providers/ShopProvider";
import { formatPrice } from "@/lib/format";
import type { CartLine } from "@/types";

export function CartLineItem({ line }: { line: CartLine }) {
  const { setQuantity, removeItem } = useCart();
  const { product, quantity, lineTotal } = line;

  return (
    <li className="flex gap-4 border-b border-line py-5 last:border-b-0">
      <div className="relative size-[88px] shrink-0 overflow-hidden rounded-lg bg-sand sm:size-24">
        {/* Decorative: the product name is right beside it. */}
        <Image src={product.image} alt="" fill sizes="96px" className="object-cover" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold leading-snug">{product.name}</h3>
            <p className="mt-0.5 text-[13px] text-muted">
              {product.colors[0].name} · {product.category}
            </p>
            <p className="mt-0.5 text-[13px] tabular-nums text-muted">{formatPrice(product.price)} each</p>
          </div>
          <p className="text-[15px] font-bold tabular-nums">{formatPrice(lineTotal)}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantityStepper value={quantity} onChange={(next) => setQuantity(product.id, next)} label={product.name} />
          <button
            type="button"
            onClick={() => removeItem(product.id)}
            aria-label={`Remove ${product.name} from bag`}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-[13px] text-muted transition-colors hover:text-espresso"
          >
            <Trash2 aria-hidden className="size-4" />
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
