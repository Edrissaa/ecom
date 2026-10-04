import { cn } from "@/lib/cn";

export function Badge({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border border-line bg-sand px-2.5 py-1 text-[10px] font-semibold uppercase leading-none tracking-[0.08em] text-espresso/75",
        className,
      )}
    >
      {children}
    </span>
  );
}
