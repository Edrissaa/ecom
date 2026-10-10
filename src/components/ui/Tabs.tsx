"use client";

import type { ComponentProps } from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List className={cn("flex gap-7 overflow-x-auto border-b border-line scrollbar-none", className)} {...props} />;
}

export function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "relative h-11 shrink-0 text-[13px] font-semibold tracking-[0.01em] text-muted transition-colors duration-200 hover:text-espresso",
        "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-walnut after:transition-transform after:duration-300 after:ease-premium",
        "data-[state=active]:text-espresso data-[state=active]:after:scale-x-100",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn("pt-6 outline-none data-[state=active]:animate-fade-up", className)} {...props} />;
}
