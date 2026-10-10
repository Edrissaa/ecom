"use client";

import type { ComponentProps, ReactNode } from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";

export const TooltipProvider = TooltipPrimitive.Provider;

/** Wrap a focusable trigger. Tooltips are supplementary — never the only home of essential info. */
export function Tooltip({ content, children, className, ...props }: { content: ReactNode } & ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Root delayDuration={200}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          sideOffset={8}
          className={cn(
            "z-[95] max-w-60 rounded-md bg-espresso px-3 py-2 text-xs font-medium leading-snug text-ivory shadow-lg data-[state=delayed-open]:animate-fade-up",
            className,
          )}
          {...props}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-espresso" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
