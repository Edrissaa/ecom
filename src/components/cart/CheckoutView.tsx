"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { CircleCheck, Info } from "lucide-react";
import { OrderSummary, shippingFor } from "@/components/cart/OrderSummary";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useCart } from "@/components/providers/ShopProvider";
import { formatPrice } from "@/lib/format";

const field =
  "mt-1.5 h-12 w-full rounded-md border border-line bg-white/70 px-4 text-sm text-espresso transition-colors duration-200 placeholder:text-muted/60 focus-visible:border-walnut focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-walnut/25";
const label = "text-[13px] font-semibold";

const COUNTRIES = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France"];

interface Confirmation {
  reference: string;
  email: string;
  total: number;
}

/**
 * Demonstration checkout. It collects delivery details and confirms an order locally —
 * it deliberately takes no payment details. Replace `handleSubmit` with a call to your
 * payment provider's hosted checkout to go live.
 */
export function CheckoutView() {
  const { lines, subtotal, clear } = useCart();
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const confirmationHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (confirmation) confirmationHeading.current?.focus();
  }, [confirmation]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "");
    setConfirmation({
      reference: `SOL-${Date.now().toString(36).toUpperCase()}`,
      email,
      total: subtotal + shippingFor(subtotal),
    });
    clear();
  }

  if (confirmation) {
    return (
      <div className="mx-auto mt-14 max-w-md text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-sand">
          <CircleCheck aria-hidden className="size-7 text-walnut" />
        </span>
        <h2 ref={confirmationHeading} tabIndex={-1} className="mt-6 font-serif text-3xl font-bold tracking-tight outline-none">
          Thank you — order confirmed
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Order <strong className="font-semibold text-espresso">{confirmation.reference}</strong> for{" "}
          <span className="tabular-nums">{formatPrice(confirmation.total)}</span>. A confirmation would be sent to{" "}
          <span className="font-semibold text-espresso">{confirmation.email}</span>.
        </p>
        <p className="mt-2 text-xs text-muted">This is a demo storefront — no payment was taken and no order was placed.</p>
        <ButtonLink href="/shop/all" className="mt-8" arrow>
          Keep Shopping
        </ButtonLink>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto mt-14 max-w-sm text-center">
        <p className="font-serif text-2xl font-bold">Nothing to check out yet</p>
        <p className="mt-2 text-sm text-muted">Add a pair to your bag and come back.</p>
        <ButtonLink href="/shop/all" className="mt-7" arrow>
          Browse Sneakers
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
      <form onSubmit={handleSubmit} aria-labelledby="delivery-heading" className="space-y-10">
        <fieldset>
          <legend className="font-serif text-2xl font-bold tracking-tight">Contact</legend>
          <label htmlFor="email" className={`${label} mt-5 block`}>
            Email address
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" inputMode="email" placeholder="you@example.com" className={field} />
        </fieldset>

        <fieldset>
          <legend id="delivery-heading" className="font-serif text-2xl font-bold tracking-tight">
            Delivery
          </legend>
          <div className="mt-5 grid gap-x-4 gap-y-5 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className={label}>
                First name
              </label>
              <input id="first-name" name="firstName" required autoComplete="given-name" className={field} />
            </div>
            <div>
              <label htmlFor="last-name" className={label}>
                Last name
              </label>
              <input id="last-name" name="lastName" required autoComplete="family-name" className={field} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="address" className={label}>
                Address
              </label>
              <input id="address" name="address" required autoComplete="street-address" className={field} />
            </div>
            <div>
              <label htmlFor="city" className={label}>
                City
              </label>
              <input id="city" name="city" required autoComplete="address-level2" className={field} />
            </div>
            <div>
              <label htmlFor="postal-code" className={label}>
                Postal code
              </label>
              <input id="postal-code" name="postalCode" required autoComplete="postal-code" className={field} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="country" className={label}>
                Country
              </label>
              <select id="country" name="country" required autoComplete="country-name" defaultValue="United States" className={field}>
                {COUNTRIES.map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <div className="flex gap-3 rounded-lg border border-line bg-sand/60 p-4 text-[13px] leading-relaxed text-muted">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-walnut" />
          <p>
            <strong className="font-semibold text-espresso">Demo checkout.</strong> No payment details are collected here. Connect your
            payment provider to take real orders.
          </p>
        </div>

        <Button type="submit" size="lg" className="w-full sm:w-auto sm:min-w-56" arrow>
          Place Order
        </Button>
      </form>

      <aside aria-labelledby="checkout-summary" className="h-fit rounded-xl border border-line bg-sand/50 p-6 lg:sticky lg:top-28">
        <h2 id="checkout-summary" className="font-serif text-2xl font-bold tracking-tight">
          Order summary
        </h2>
        <ul role="list" className="mt-5 divide-y divide-line">
          {lines.map(({ product, quantity, lineTotal }) => (
            <li key={product.id} className="flex items-center gap-4 py-4 first:pt-0">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-sand">
                <Image src={product.image} alt="" fill sizes="64px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{product.name}</p>
                <p className="text-xs text-muted">
                  {product.colors[0].name} · Qty {quantity}
                </p>
              </div>
              <p className="text-sm font-semibold tabular-nums">{formatPrice(lineTotal)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-5 border-t border-line pt-5">
          <OrderSummary subtotal={subtotal} />
        </div>
      </aside>
    </div>
  );
}
