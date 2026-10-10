import { Reveal } from "@/components/ui/reveal";

export function BigStat() {
  return (
    <section aria-label="Impact" className="container-x py-20 text-center">
      <Reveal>
        <p className="mb-3 font-label text-label-sm uppercase tracking-widest text-on-surface-variant">Don&apos;t take our word for it</p>
        <p className="mb-4 font-label text-caption uppercase tracking-wider text-outline">26,900,789+ visitor &amp; workflow engagements</p>
        <p className="my-6 select-none text-display-hero-mobile font-bold leading-none tracking-tight text-on-surface tabular-nums md:text-[6rem] lg:text-[7.5rem]">
          148,500,000<span className="text-secondary">+</span>
        </p>
        <p className="mx-auto max-w-xl text-body-lg text-on-surface-variant">Autonomous decisions, multi-modal inferences, and complex reasoning traces executed with enterprise-grade precision.</p>
      </Reveal>
    </section>
  );
}
