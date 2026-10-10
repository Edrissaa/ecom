"use client";

import type { ComponentProps } from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn("border-b border-line first:border-t", className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn("group flex min-h-14 flex-1 items-center justify-between gap-6 py-4 text-left font-serif text-lg font-bold tracking-tight", className)}
        {...props}
      >
        {children}
        <Plus
          aria-hidden
          className="size-4 shrink-0 text-walnut transition-transform duration-300 ease-premium group-data-[state=open]:rotate-45"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-[accordion-up_300ms_var(--ease-premium)] data-[state=open]:animate-[accordion-down_300ms_var(--ease-premium)]"
      {...props}
    >
      <div className={cn("space-y-3 pb-6 text-[15px] leading-relaxed text-espresso/80", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
