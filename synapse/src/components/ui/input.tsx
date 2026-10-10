import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const fieldStyles =
  "w-full rounded-full bg-surface-container-lowest px-4 py-3 text-body-md text-on-surface shadow-sm transition-shadow duration-200 " +
  "placeholder:text-outline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 disabled:opacity-60";

export function Input({ className, type = "text", ...props }: ComponentProps<"input">) {
  return <input type={type} className={cn(fieldStyles, className)} {...props} />;
}
