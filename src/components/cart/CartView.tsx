"use client";

import { ShoppingBag } from "lucide-react";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { FreeShippingMeter } from "@/components/cart/FreeShippingMeter";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { ButtonLink } from "@/components/ui/Button";
import { useCart } from "@/components/providers/ShopProvider";

export function CartView() {
  const { lines, subtotal } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto mt-16 flex max-w-sm flex-col items-center text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-sand">
          <ShoppingBag aria-hidden className="size-6 text-walnut" />
        </span>
        <p className="mt-6 font-serif text-2xl font-bold">Your bag is empty</p>
        <p className="mt-2 text-sm text-muted">Find your next pair and it will wait for you here.</p>
        <ButtonLink href="/shop/all" className="mt-7" arrow>
          Continue Shopping
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
      <section aria-labelledby="bag-items">
        <h2 id="bag-items" className="sr-only">
          Items in your bag
        </h2>
        <ul role="list" className="border-t border-line">
          {lines.map((line) => (
            <CartLineItem key={line.product.id} line={line} />
          ))}
        </ul>
      </section>

      <aside aria-labelledby="summary-heading" className="h-fit rounded-xl border border-line bg-sand/50 p-6 lg:sticky lg:top-28">
        <h2 id="summary-heading" className="font-serif text-2xl font-bold tracking-tight">
          Order summary
        </h2>
        <div className="mt-5">
          <FreeShippingMeter subtotal={subtotal} />
        </div>
        <div className="mt-6">
          <OrderSummary subtotal={subtotal} />
        </div>
        <ButtonLink href="/checkout" size="lg" className="mt-6 w-full" arrow>
          Checkout
        </ButtonLink>
        <ButtonLink href="/shop/all" variant="outline" size="lg" className="mt-3 w-full">
          Continue Shopping
        </ButtonLink>
      </aside>
    </div>
  );
}
