import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const cardVariants = cva("rounded-xl border", {
  variants: {
    tone: {
      sand: "border-line bg-sand/50",
      ivory: "border-line bg-white/60",
      dark: "border-ivory/10 bg-footer text-ivory",
    },
    padding: { none: "", md: "p-6", lg: "p-8" },
    interactive: {
      true: "transition-[transform,box-shadow,border-color] duration-300 ease-premium hover:-translate-y-0.5 hover:border-beige hover:shadow-[0_18px_40px_-20px_rgba(33,23,15,0.25)]",
      false: "",
    },
  },
  defaultVariants: { tone: "sand", padding: "md", interactive: false },
});

type CardProps = ComponentProps<"div"> & VariantProps<typeof cardVariants>;

export function Card({ tone, padding, interactive, className, ...props }: CardProps) {
  return <div className={cn(cardVariants({ tone, padding, interactive }), className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return <h3 className={cn("font-serif text-2xl font-bold tracking-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("mt-1.5 text-sm leading-relaxed text-muted", className)} {...props} />;
}
