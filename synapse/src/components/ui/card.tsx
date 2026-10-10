import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-lg", {
  variants: {
    tone: {
      low: "bg-surface-container-low shadow-sm",
      lowest: "bg-surface-container-lowest shadow-sm",
      panel: "rounded-xl bg-surface-container-lowest shadow-xl",
    },
    /** Gentle lift on hover for cards that read as a set. */
    lift: {
      true: "transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-lg",
      false: "",
    },
  },
  defaultVariants: { tone: "low", lift: false },
});

export function Card({ className, tone, lift, ...props }: ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return <div className={cn(cardVariants({ tone, lift }), className)} {...props} />;
}
