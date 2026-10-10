import { Star } from "lucide-react";
import { Avatar } from "@/components/ui/media";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section aria-labelledby="proof-heading" className="w-full bg-surface-container-low py-20">
      <div className="container-x">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <h2 id="proof-heading" className="mb-3 text-balance text-headline-lg text-on-surface">
            Endorsed by Visionary Engineering Leaders
          </h2>
          <p className="text-body-md text-on-surface-variant">How top tier organizations achieve unprecedented throughput with Synapse AI systems.</p>
        </Reveal>
        <ul role="list" className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={t.name}>
              <Reveal delay={i * 80} className="h-full">
                <Card tone="lowest" lift className="flex h-full flex-col justify-between rounded-xl p-8">
                  <figure className="flex h-full flex-col justify-between">
                    <div>
                      <div role="img" aria-label="5 out of 5 stars" className="mb-4 flex gap-0.5">
                        {Array.from({ length: 5 }, (_, n) => (
                          <Star key={n} aria-hidden className="size-[18px] fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <blockquote className="mb-6 text-body-md leading-relaxed text-on-surface">“{t.quote}”</blockquote>
                    </div>
                    <figcaption className="flex items-center gap-3 border-t border-surface-container pt-4">
                      <Avatar src={t.image} size={40} />
                      <div>
                        <p className="font-label text-label-md font-semibold text-on-surface">{t.name}</p>
                        <p className="font-label text-caption text-on-surface-variant">{t.role}</p>
                      </div>
                    </figcaption>
                  </figure>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
