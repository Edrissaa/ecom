import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";

/** Shipping rule shared by the cart and checkout pages. */
export function shippingFor(subtotal: number): number {
  return subtotal === 0 || subtotal >= site.freeShippingThreshold ? 0 : site.standardShipping;
}

export function OrderSummary({ subtotal }: { subtotal: number }) {
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  return (
    <dl className="space-y-3 text-sm">
      <div className="flex justify-between">
        <dt className="text-muted">Subtotal</dt>
        <dd className="font-semibold tabular-nums">{formatPrice(subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-muted">Shipping</dt>
        <dd className="font-semibold tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
      </div>
      <div className="flex items-baseline justify-between border-t border-line pt-4">
        <dt className="font-semibold">Total</dt>
        <dd className="text-xl font-bold tabular-nums">{formatPrice(total)}</dd>
      </div>
    </dl>
  );
}
