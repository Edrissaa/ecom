import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { metrics } from "@/lib/content";

export function Metrics() {
  return (
    <section aria-labelledby="metrics-heading" className="container-x py-16">
      <Reveal className="mx-auto mb-12 max-w-2xl text-center">
        <h2 id="metrics-heading" className="mb-3 text-balance text-headline-lg text-on-surface">
          Bring Existing Customers to Hyper-Focus
        </h2>
        <p className="text-body-md text-on-surface-variant">Designed to capture every customer moment—day or night—without needing someone constantly online.</p>
      </Reveal>
      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <Reveal key={m.value} delay={i * 70} className="h-full">
            <Card lift className="h-full p-8">
              <p className="mb-2 font-label text-label-sm text-on-surface-variant">{m.prefix}</p>
              <p className="mb-2 text-headline-xl text-on-surface">{m.value}</p>
              <p className="text-body-sm text-on-surface-variant">{m.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
