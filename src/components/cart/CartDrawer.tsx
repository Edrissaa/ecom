"use client";

import { ShoppingBag, X } from "lucide-react";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { FreeShippingMeter } from "@/components/cart/FreeShippingMeter";
import { ButtonLink } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { useCart, useOverlay } from "@/components/providers/ShopProvider";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { lines, count, subtotal } = useCart();
  const { active, close } = useOverlay();
  const isOpen = active === "cart";

  return (
    <Drawer open={isOpen} onClose={close} label="Shopping bag" side="right">
      <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-line px-6">
        <h2 className="font-serif text-2xl font-bold tracking-tight">
          Your Bag <span className="font-sans text-sm font-medium text-muted">({count})</span>
        </h2>
        <button
          type="button"
          onClick={close}
          aria-label="Close bag"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-espresso/5"
        >
          <X aria-hidden className="size-5" />
        </button>
      </div>

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-sand">
            <ShoppingBag aria-hidden className="size-6 text-walnut" />
          </span>
          <p className="mt-6 font-serif text-2xl font-bold">Your bag is empty</p>
          <p className="mt-2 max-w-[22ch] text-sm text-muted">Find your next pair and it will wait for you here.</p>
          <ButtonLink href="/shop/all" onClick={close} className="mt-7" arrow>
            Continue Shopping
          </ButtonLink>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-6 pt-5">
            <FreeShippingMeter subtotal={subtotal} />
            <ul role="list" className="mt-2">
              {lines.map((line) => (
                <CartLineItem key={line.product.id} line={line} />
              ))}
            </ul>
          </div>

          <div className="shrink-0 border-t border-line bg-ivory px-6 pb-6 pt-5">
            <p className="flex items-baseline justify-between">
              <span className="text-sm font-medium">Subtotal</span>
              <span className="text-xl font-bold tabular-nums">{formatPrice(subtotal)}</span>
            </p>
            <p className="mt-1 text-xs text-muted">Shipping and taxes are calculated at checkout.</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <ButtonLink href="/cart" variant="outline" size="lg" onClick={close}>
                View Cart
              </ButtonLink>
              <ButtonLink href="/checkout" size="lg" onClick={close}>
                Checkout
              </ButtonLink>
            </div>
          </div>
        </>
      )}
    </Drawer>
  );
}
