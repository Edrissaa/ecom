import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "light" | "ghost-light";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold tracking-[0.01em] " +
  "transition-[background-color,color,border-color,transform] duration-300 ease-premium active:translate-y-px " +
  "disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-walnut text-ivory hover:bg-walnut-dark",
  secondary: "border border-line bg-sand text-espresso hover:border-beige hover:bg-beige/60",
  outline: "border border-espresso/25 bg-transparent text-espresso hover:border-espresso hover:bg-espresso hover:text-ivory",
  light: "bg-ivory text-espresso hover:bg-white",
  "ghost-light": "border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory hover:text-espresso",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-5 text-[13px]",
  lg: "h-12 px-7 text-sm",
};

interface StyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function buttonStyles({ variant = "primary", size = "md", className }: StyleOptions = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ArrowKind = boolean | "up-right";

/** Small trailing arrow that nudges forward on hover. */
function Arrow({ kind }: { kind: ArrowKind }) {
  if (!kind) return null;
  const Icon = kind === "up-right" ? ArrowUpRight : ArrowRight;
  const nudge = kind === "up-right" ? "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" : "group-hover/btn:translate-x-1";
  return <Icon aria-hidden className={cn("size-4 shrink-0 transition-transform duration-300 ease-premium", nudge)} />;
}

type ButtonProps = ComponentProps<"button"> & StyleOptions & { arrow?: ArrowKind };

export function Button({ variant, size, className, arrow = false, type = "button", children, ...props }: ButtonProps) {
  return (
    <button type={type} className={buttonStyles({ variant, size, className })} {...props}>
      {children}
      <Arrow kind={arrow} />
    </button>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & StyleOptions & { arrow?: ArrowKind; children: ReactNode };

export function ButtonLink({ variant, size, className, arrow = false, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props}>
      {children}
      <Arrow kind={arrow} />
    </Link>
  );
}
