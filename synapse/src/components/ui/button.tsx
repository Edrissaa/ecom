import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-label text-label-md " +
    "transition-[background-color,color,box-shadow,transform] duration-200 ease-smooth " +
    "hover:-translate-y-px active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary shadow-[0_4px_16px_rgba(0,0,0,0.18)] hover:bg-primary-container hover:shadow-[0_8px_24px_rgba(0,0,0,0.22)]",
        secondary: "bg-surface-container text-on-surface hover:bg-surface-container-high",
        glass: "bg-surface-container-lowest/90 text-on-surface shadow-md backdrop-blur-md hover:bg-surface-container-lowest",
        ghost: "text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface",
      },
      size: {
        sm: "h-8 px-4 text-label-sm",
        md: "h-10 px-space-lg",
        lg: "h-12 px-space-xl",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function LinkButton({ className, variant, size, ...props }: ComponentProps<"a"> & VariantProps<typeof buttonVariants>) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
