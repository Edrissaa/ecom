"use client";

import type { ComponentProps, ReactNode } from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function Checkbox({ className, ...props }: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "grid size-5 shrink-0 place-items-center rounded-[5px] border border-espresso/30 bg-white/70 text-ivory transition-colors duration-200",
        "hover:border-walnut data-[state=checked]:border-walnut data-[state=checked]:bg-walnut disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <Check aria-hidden strokeWidth={3} className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

/** Checkbox with a clickable label (and optional description) — the 44px-friendly pairing. */
export function CheckboxField({ id, label, description, ...props }: ComponentProps<typeof Checkbox> & { id: string; label: ReactNode; description?: string }) {
  return (
    <div className="flex items-start gap-3">
      <Checkbox id={id} className="mt-0.5" aria-describedby={description ? `${id}-desc` : undefined} {...props} />
      <div>
        <label htmlFor={id} className="cursor-pointer text-sm font-semibold">
          {label}
        </label>
        {description && (
          <p id={`${id}-desc`} className="mt-0.5 text-xs leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
