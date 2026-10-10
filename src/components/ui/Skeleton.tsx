import { cn } from "@/lib/cn";

/** Loading placeholder. Size it with className. */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("animate-pulse rounded-md bg-sand", className)} />;
}
