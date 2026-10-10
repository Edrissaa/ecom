import Image from "next/image";
import { cn } from "@/lib/utils";

/** Round avatar. Falls back to a soft gradient underneath if the image can't load. */
export function Avatar({ src, alt = "", size = 40, className }: { src: string; alt?: string; size?: number; className?: string }) {
  return (
    <span
      className={cn("relative inline-block shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-secondary-fixed to-surface-container shadow-sm", className)}
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} width={size * 2} height={size * 2} sizes={`${size}px`} className="size-full object-cover" />
    </span>
  );
}

/** Cover image behind content, over a gradient so the section still reads if the image is slow or blocked. */
export function CoverImage({ src, priority, scrim, className }: { src: string; priority?: boolean; /** Darkens the lower part so light text stays readable. */ scrim?: boolean; className?: string }) {
  return (
    <div aria-hidden className={cn("absolute inset-0 -z-10 bg-gradient-to-br from-secondary-fixed via-surface-container to-tertiary-fixed/60", className)}>
      <Image src={src} alt="" fill priority={priority} sizes="(min-width: 1240px) 1240px, 100vw" className="object-cover" />
      {scrim && <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/35 to-primary/10" />}
    </div>
  );
}
