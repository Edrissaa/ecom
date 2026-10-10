import { cn } from "@/lib/cn";

/** Hairline divider; with `label` it becomes the editorial "— or —" rule. */
export function Separator({ label, className }: { label?: string; className?: string }) {
  if (!label) return <hr className={cn("border-0 border-t border-line", className)} />;
  return (
    <div role="separator" className={cn("flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted", className)}>
      <span aria-hidden className="h-px flex-1 bg-line" />
      {label}
      <span aria-hidden className="h-px flex-1 bg-line" />
    </div>
  );
}
