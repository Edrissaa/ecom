"use client";

import type { ComponentProps } from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { controlStyles } from "@/components/ui/Input";

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;

export function SelectTrigger({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(controlStyles, "flex h-12 items-center justify-between gap-3 px-4 text-left data-[placeholder]:text-muted/60", className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown aria-hidden className="size-4 shrink-0 text-muted" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position="popper"
        sideOffset={6}
        className={cn(
          "z-[90] max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-line bg-ivory p-1 text-espresso shadow-[0_18px_50px_-12px_rgba(33,23,15,0.25)]",
          "data-[state=open]:animate-fade-up",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex h-10 cursor-pointer select-none items-center rounded-md pl-3 pr-9 text-sm outline-none transition-colors",
        "data-[highlighted]:bg-sand data-[state=checked]:font-semibold data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-3">
        <Check aria-hidden className="size-4 text-walnut" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}
