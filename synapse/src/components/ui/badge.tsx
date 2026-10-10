import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center gap-2 rounded-full font-label text-label-sm", {
  variants: {
    variant: {
      soft: "bg-surface-container-low text-on-surface",
      muted: "bg-surface-container text-on-surface-variant",
      accent: "bg-secondary-fixed text-on-secondary-fixed",
      glass: "bg-surface/90 text-on-surface backdrop-blur-md shadow-sm",
    },
    size: { md: "px-space-md py-1.5", sm: "px-space-sm py-1" },
  },
  defaultVariants: { variant: "soft", size: "md" },
});

export function Badge({ className, variant, size, ...props }: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
