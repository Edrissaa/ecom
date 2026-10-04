import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  id?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

/** Centred editorial heading: serif title, quiet two-line subtitle. */
export function SectionHeading({ id, title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <h2
        id={id}
        className="text-balance font-serif text-[32px] font-bold leading-[1.1] tracking-[-0.015em] text-espresso sm:text-4xl lg:text-[44px]"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3.5 max-w-[26rem] text-balance text-[13px] leading-relaxed text-muted sm:text-sm">{subtitle}</p>
      )}
    </div>
  );
}
