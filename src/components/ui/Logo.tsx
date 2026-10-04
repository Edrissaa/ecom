import { cn } from "@/lib/cn";

/** Soleva wordmark with a small eclipse mark. Inherits colour via `currentColor`. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-serif text-[22px] font-bold leading-none tracking-tight", className)}>
      <svg aria-hidden viewBox="0 0 24 24" className="size-6" fill="none">
        <circle cx="12" cy="12" r="10.25" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="14.4" cy="12" r="4.6" fill="currentColor" />
      </svg>
      Soleva
    </span>
  );
}
