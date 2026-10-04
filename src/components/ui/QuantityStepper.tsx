import { Minus, Plus } from "lucide-react";
import { MAX_QUANTITY } from "@/lib/cart-store";
import { cn } from "@/lib/cn";

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  /** Used in the accessible names, e.g. "Aero Max Runner". */
  label: string;
  className?: string;
}

const stepButton =
  "inline-flex size-9 items-center justify-center text-espresso transition-colors duration-200 hover:bg-sand disabled:opacity-40 disabled:hover:bg-transparent";

export function QuantityStepper({ value, onChange, label, className }: QuantityStepperProps) {
  return (
    <div role="group" aria-label={`Quantity for ${label}`} className={cn("inline-flex items-center rounded-md border border-line bg-white/60", className)}>
      <button type="button" className={cn(stepButton, "rounded-l-md")} onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label={`Decrease quantity of ${label}`}>
        <Minus aria-hidden className="size-3.5" />
      </button>
      <span className="min-w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" className={cn(stepButton, "rounded-r-md")} onClick={() => onChange(value + 1)} disabled={value >= MAX_QUANTITY} aria-label={`Increase quantity of ${label}`}>
        <Plus aria-hidden className="size-3.5" />
      </button>
    </div>
  );
}
