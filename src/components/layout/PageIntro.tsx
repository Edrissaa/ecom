interface PageIntroProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

/** Centred title block shared by the secondary pages. Renders the page's only <h1>. */
export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <header className="mx-auto max-w-2xl text-center">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.18em] text-walnut">{eyebrow}</p>}
      <h1 className="mt-3 text-balance font-serif text-4xl font-bold leading-[1.08] tracking-[-0.015em] md:text-5xl">{title}</h1>
      {description && <p className="mx-auto mt-4 max-w-md text-balance text-sm leading-relaxed text-muted">{description}</p>}
    </header>
  );
}
