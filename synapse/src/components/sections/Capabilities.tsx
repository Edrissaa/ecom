"use client";

import { useState } from "react";
import { Bell, BatteryFull, CircleCheck, SlidersHorizontal, Signal, Wifi } from "lucide-react";
import { Avatar } from "@/components/ui/media";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { capabilities, images } from "@/lib/content";

export function Capabilities() {
  const [velocity, setVelocity] = useState(840);

  return (
    <section id="capabilities" aria-labelledby="capabilities-heading" className="container-x py-16">
      <Reveal className="mb-12 flex flex-col justify-between md:flex-row md:items-end">
        <div>
          <p className="mb-2 font-label text-label-sm font-semibold uppercase tracking-wider text-secondary">Core Architecture</p>
          <h2 id="capabilities-heading" className="max-w-xl text-balance text-headline-lg text-on-surface">
            We help people create and build using AI
          </h2>
        </div>
        <p className="mt-4 max-w-md text-body-md text-on-surface-variant md:mt-0">Shift from brittle rule-based automations to autonomous goal-seeking agent networks.</p>
      </Reveal>

      <Reveal>
        <Tabs defaultValue={capabilities[0].key}>
          <TabsList aria-label="Capabilities" className="mb-8">
            {capabilities.map((c) => (
              <TabsTrigger key={c.key} value={c.key}>
                {c.tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="grid grid-cols-1 items-stretch gap-gutter lg:grid-cols-12">
            <Card tone="panel" className="flex flex-col p-8 shadow-md lg:col-span-5">
              {capabilities.map((c) => (
                <TabsContent key={c.key} value={c.key} className="flex flex-1 flex-col animate-fade-up">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="font-label text-label-sm font-semibold uppercase tracking-wider text-secondary">{c.sub}</span>
                    <SlidersHorizontal aria-hidden className="size-5 text-outline" />
                  </div>
                  <h3 className="mb-3 text-headline-md text-on-surface">{c.title}</h3>
                  <p className="mb-6 text-body-md text-on-surface-variant">{c.desc}</p>

                  <div className="mb-6 rounded-lg bg-surface-container-low p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <label id="velocity-label" className="font-label text-label-sm font-medium text-on-surface">
                        Inference Velocity Limit
                      </label>
                      <output className="font-label text-label-sm font-bold tabular-nums text-secondary" aria-live="polite">
                        {velocity.toLocaleString("en-US")} req/min
                      </output>
                    </div>
                    <Slider min={100} max={2000} step={10} value={[velocity]} onValueChange={([v]) => setVelocity(v)} aria-labelledby="velocity-label" />
                    <div className="mt-2 flex justify-between font-label text-caption text-outline">
                      <span>Standard (100)</span>
                      <span>Ultra-Concurrency (2,000)</span>
                    </div>
                  </div>

                  <ul role="list" className="mb-8 space-y-3">
                    {c.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-body-sm text-on-surface">
                        <CircleCheck aria-hidden className="size-[18px] shrink-0 text-secondary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <LinkButton href="#consultation" size="lg" className="mt-auto w-full">
                    Get Started — Test Agent Swarm
                  </LinkButton>
                </TabsContent>
              ))}
            </Card>

            <Card tone="low" className="relative flex items-center justify-center overflow-hidden rounded-xl p-6 shadow-none md:p-8 lg:col-span-7">
              <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 size-80 rounded-full bg-secondary-fixed/40 blur-3xl" />
              <DashboardMockup />
            </Card>
          </div>
        </Tabs>
      </Reveal>
    </section>
  );
}

/** Decorative product mockup. Hidden from assistive tech — it is illustration, not content. */
function DashboardMockup() {
  return (
    <div aria-hidden className="relative w-full max-w-md rounded-xl bg-surface-container-lowest p-6 shadow-xl transition-transform duration-500 ease-smooth hover:-translate-y-1">
      <div className="mb-4 flex items-center justify-between border-b border-surface-container pb-4">
        <span className="font-label text-label-sm font-semibold text-on-surface">9:41</span>
        <div className="flex items-center gap-2 text-on-surface-variant">
          <Signal className="size-4" />
          <Wifi className="size-4" />
          <BatteryFull className="size-4" />
        </div>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar src={images.monitorAvatar} size={40} />
          <div>
            <p className="font-label text-label-sm text-on-surface-variant">Insights Monitor</p>
            <p className="text-headline-sm font-semibold text-on-surface">Zia AI Agent</p>
          </div>
        </div>
        <span className="flex size-8 items-center justify-center rounded-full bg-surface-container text-on-surface-variant">
          <Bell className="size-[18px]" />
        </span>
      </div>
      <div className="mb-4 rounded-lg bg-surface-container-low p-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="font-label text-caption uppercase tracking-wider text-on-surface-variant">Net Operations Budget</span>
          <Badge size="sm" className="bg-emerald-100 text-xs text-emerald-800">Optimal</Badge>
        </div>
        <p className="text-headline-lg font-bold text-on-surface">
          $20,300<span className="text-sm font-normal text-on-surface-variant">.00</span>
        </p>
        <p className="font-label text-caption text-outline">80% left of $25,400 Target Allocation</p>
      </div>
      <div className="mb-4 rounded-lg bg-surface-container-low p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-label text-label-sm font-semibold text-on-surface">Autonomous Throughput</span>
          <span className="font-label text-caption font-medium text-secondary">+34.8% vs human triage</span>
        </div>
        <svg className="h-24 w-full overflow-visible" fill="none" viewBox="0 0 300 80" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#7d2dce" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#7d2dce" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 0 65 Q 40 50, 70 55 T 140 30 T 210 38 T 300 12 L 300 80 L 0 80 Z" fill="url(#chartGradient)" />
          <path d="M 0 65 Q 40 50, 70 55 T 140 30 T 210 38 T 300 12" stroke="#7d2dce" strokeLinecap="round" strokeWidth="3" vectorEffect="non-scaling-stroke" />
          <circle cx="300" cy="12" r="4" fill="#7d2dce" />
        </svg>
      </div>
      <div className="space-y-2">
        {[
          ["bg-emerald-500", "Outbound Sales Prospector", "98.2% accuracy"],
          ["bg-blue-500", "Compliance Document Parser", "420 doc/hr"],
        ].map(([dot, name, stat]) => (
          <div key={name} className="flex items-center justify-between rounded-base bg-surface-container-lowest p-2.5 shadow-sm">
            <span className="flex items-center gap-2 font-label text-label-sm font-medium text-on-surface">
              <span className={`size-2 rounded-full ${dot}`} />
              {name}
            </span>
            <span className="font-label text-caption text-on-surface-variant">{stat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
