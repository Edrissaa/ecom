"use client";

import type { ComponentProps } from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";

export function RadioGroup({ className, ...props }: ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root className={cn("flex flex-wrap gap-2", className)} {...props} />;
}

/** Pill-shaped choice (sizes, delivery speed…). Selected state inverts to espresso. */
export function RadioPill({ className, children, ...props }: ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "inline-flex h-11 min-w-12 items-center justify-center rounded-full border border-line bg-white/60 px-4 text-[13px] font-semibold tabular-nums",
        "transition-[background-color,border-color,color] duration-200 ease-premium hover:border-espresso/50",
        "data-[state=checked]:border-espresso data-[state=checked]:bg-espresso data-[state=checked]:text-ivory",
        "disabled:cursor-not-allowed disabled:text-muted/50 disabled:line-through disabled:hover:border-line",
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
}

/** Round colour swatch. Pass the colour as `swatch`; `aria-label` names it. */
export function RadioSwatch({ swatch, className, ...props }: ComponentProps<typeof RadioGroupPrimitive.Item> & { swatch: string }) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "grid size-11 place-items-center rounded-full border border-transparent transition-colors duration-200",
        "hover:border-espresso/30 data-[state=checked]:border-espresso",
        className,
      )}
      {...props}
    >
      <span aria-hidden style={{ backgroundColor: swatch }} className="size-7 rounded-full ring-1 ring-inset ring-espresso/15" />
    </RadioGroupPrimitive.Item>
  );
}
