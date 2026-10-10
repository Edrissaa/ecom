import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Shared surface for text-like controls (Input, Textarea, Select trigger). */
export const controlStyles =
  "w-full rounded-md border border-line bg-white/70 text-sm text-espresso transition-[border-color,box-shadow] duration-200 ease-premium " +
  "placeholder:text-muted/60 hover:border-beige focus-visible:border-walnut focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-walnut/25 " +
  "aria-[invalid=true]:border-danger aria-[invalid=true]:focus-visible:ring-danger/20 disabled:cursor-not-allowed disabled:opacity-60";

export function Input({ className, type = "text", ...props }: ComponentProps<"input">) {
  return <input type={type} className={cn(controlStyles, "h-12 px-4", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(controlStyles, "min-h-28 resize-y px-4 py-3 leading-relaxed", className)} {...props} />;
}
