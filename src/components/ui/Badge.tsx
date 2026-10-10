import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase leading-none tracking-[0.08em]",
  {
    variants: {
      variant: {
        neutral: "border-line bg-sand text-espresso/75",
        solid: "border-walnut bg-walnut text-ivory",
        outline: "border-espresso/25 bg-transparent text-espresso/75",
        success: "border-success/25 bg-success/10 text-success",
        danger: "border-danger/25 bg-danger/10 text-danger",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, variant, className }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)}>{children}</span>;
}
