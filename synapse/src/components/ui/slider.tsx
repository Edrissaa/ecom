"use client";

import type { ComponentProps } from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export function Slider({ className, ...props }: ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root className={cn("relative flex h-6 w-full touch-none select-none items-center", className)} {...props}>
      <SliderPrimitive.Track className="relative h-1.5 grow rounded-full bg-surface-container-high">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block size-5 rounded-full bg-primary shadow-md ring-4 ring-surface-container-lowest transition-transform duration-150 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-secondary/50" />
    </SliderPrimitive.Root>
  );
}
