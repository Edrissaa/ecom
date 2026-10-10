import { ArrowRight, Quote as QuoteIcon } from "lucide-react";
import { Avatar, CoverImage } from "@/components/ui/media";
import { LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/content";

export function Quote() {
  return (
    <section id="case-studies" aria-label="Customer story" className="container-x py-8">
      <Reveal>
        <figure className="relative isolate flex min-h-[380px] flex-col justify-between gap-6 overflow-hidden rounded-xl p-8 shadow-xl md:min-h-[420px] md:p-14">
          <CoverImage src={images.quote} scrim />
          <QuoteIcon aria-hidden className="size-9 text-surface-container-lowest opacity-80" />
          <blockquote className="max-w-2xl text-pretty text-headline-md font-medium leading-snug text-surface-container-lowest drop-shadow-md md:text-headline-lg">
            “Synapse has made us completely available to our enterprise accounts. Now we have the cognitive scale to offer 24/7 intelligent workflows across all thirty global markets.”
          </blockquote>
          <figcaption className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <Avatar src={images.executive} size={48} className="shadow-md" />
              <div>
                <p className="font-label text-label-md font-semibold text-surface-container-lowest drop-shadow">Wayne Grimshawe</p>
                <p className="font-label text-caption font-medium text-surface-container-lowest drop-shadow">Group Director of Intelligent Automation @ Netzoeche</p>
              </div>
            </div>
            <LinkButton href="#" variant="glass" className="group self-start sm:self-auto">
              View case study
              <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </LinkButton>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
