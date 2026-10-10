import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ size = "md", className }: { size?: "sm" | "md"; className?: string }) {
  return (
    <span className={cn("group inline-flex items-center gap-space-sm", className)}>
      <span
        className={cn(
          "flex items-center justify-center rounded-full bg-primary text-on-primary shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-smooth group-hover:scale-105",
          size === "md" ? "size-9" : "size-8",
        )}
      >
        <Sparkles aria-hidden className={size === "md" ? "size-5" : "size-[18px]"} />
      </span>
      <span className="text-headline-sm tracking-tight text-on-surface">
        Synapse<span className="text-secondary">.ai</span>
      </span>
    </span>
  );
}
