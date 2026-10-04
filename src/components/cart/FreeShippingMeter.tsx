import { Truck } from "lucide-react";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";

/** Progress toward free shipping — a small, honest nudge on the bag. */
export function FreeShippingMeter({ subtotal }: { subtotal: number }) {
  const threshold = site.freeShippingThreshold;
  const remaining = Math.max(0, threshold - subtotal);
  const progress = Math.min(100, (subtotal / threshold) * 100);

  return (
    <div className="rounded-lg bg-sand px-4 py-3.5">
      <p className="flex items-center gap-2 text-[13px] font-medium">
        <Truck aria-hidden className="size-4 shrink-0 text-walnut" />
        {remaining === 0 ? "You've unlocked free shipping." : `You're ${formatPrice(remaining)} away from free shipping.`}
      </p>
      <div
        role="progressbar"
        aria-label="Progress to free shipping"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className="mt-2.5 h-1 overflow-hidden rounded-full bg-beige/70"
      >
        <div className="h-full rounded-full bg-walnut transition-[width] duration-500 ease-premium" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
