"use client";

import type { ComponentProps } from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

/** Pill track; the active trigger inverts to black. */
export function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List className={cn("flex max-w-full flex-wrap gap-2 rounded-full bg-surface-container-low p-1.5", className)} {...props} />;
}

export function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "rounded-full px-space-md py-2 font-label text-label-md text-on-surface-variant transition-[background-color,color,box-shadow] duration-200 ease-smooth",
        "hover:text-on-surface data-[state=active]:bg-primary data-[state=active]:text-on-primary data-[state=active]:shadow-md",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn("outline-none", className)} {...props} />;
}
