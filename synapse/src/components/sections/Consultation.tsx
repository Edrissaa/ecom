"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, LoaderCircle, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/ui/reveal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { consultationPoints, focusAreas, orgSizes } from "@/lib/content";

type Status = "idle" | "submitting" | "done";

export function Consultation() {
  const [status, setStatus] = useState<Status>("idle");
  const confirmation = useRef<HTMLParagraphElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    if (status === "done") confirmation.current?.focus();
  }, [status]);

  /** Demo handler: wire this to your CRM / booking endpoint to take real requests. */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    timer.current = window.setTimeout(() => setStatus("done"), 800);
  }

  return (
    <section id="consultation" aria-labelledby="consultation-heading" className="container-x py-20">
      <Reveal>
        <Card tone="panel" className="p-8 md:p-14">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-6">
              <Badge variant="accent" className="px-space-md py-1">
                <Zap aria-hidden className="size-4" /> Priority Strategy Intake
              </Badge>
              <h2 id="consultation-heading" className="text-balance text-headline-xl-mobile text-on-surface md:text-headline-xl">
                Accelerate your AI roadmaps with senior AI architects.
              </h2>
              <p className="text-body-lg text-on-surface-variant">
                Skip months of exploratory trial-and-error. Reserve a 45-minute technical discovery session to evaluate your data readiness, agent architectures, and ROI models.
              </p>
              <ul role="list" className="space-y-4 pt-2">
                {consultationPoints.map((p) => (
                  <li key={p.title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-container">
                      <Check aria-hidden className="size-4 text-secondary" />
                    </span>
                    <div>
                      <p className="font-label text-label-md font-semibold text-on-surface">{p.title}</p>
                      <p className="text-body-sm text-on-surface-variant">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <Card tone="low" className="rounded-xl p-8 shadow-md lg:col-span-6">
              {status === "done" ? (
                <div className="py-10 text-center animate-fade-up">
                  <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-tertiary-fixed text-on-tertiary-fixed">
                    <Check aria-hidden className="size-7" />
                  </span>
                  <p ref={confirmation} tabIndex={-1} className="text-headline-sm text-on-surface outline-none">
                    Strategy slot reserved!
                  </p>
                  <p className="mt-2 text-body-sm text-on-surface-variant">A Principal Engineer will contact you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="mb-2 text-headline-sm text-on-surface">Claim Your AI Strategy Session</h3>
                  <p className="mb-4 text-body-sm text-on-surface-variant">Direct access with a Principal AI Systems Engineer. No sales scripts.</p>

                  <div className="space-y-1.5">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" name="name" required autoComplete="name" placeholder="e.g. Julian Ross" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Work Email</Label>
                    <Input id="email" name="email" type="email" required autoComplete="email" placeholder="julian@company.com" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label id="size-label">Organization Scale</Label>
                      <Select name="size" defaultValue={orgSizes[1]}>
                        <SelectTrigger aria-labelledby="size-label">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {orgSizes.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label id="focus-label">Primary Focus</Label>
                      <Select name="focus" defaultValue={focusAreas[0]}>
                        <SelectTrigger aria-labelledby="focus-label">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {focusAreas.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" size="lg" disabled={status === "submitting"} className="mt-2 w-full gap-2 py-4 font-semibold">
                    {status === "submitting" ? (
                      <>
                        <LoaderCircle aria-hidden className="size-[18px] animate-spin" /> Securing Slot...
                      </>
                    ) : (
                      <>
                        Confirm Strategy Session <ArrowRight aria-hidden className="size-[18px]" />
                      </>
                    )}
                  </Button>
                  <p className="text-center font-label text-caption text-outline">SOC2 Type II certified. We sign strict Non-Disclosure Agreements prior to every consultation.</p>
                </form>
              )}
            </Card>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}
