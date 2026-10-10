"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowUp, Check, Hourglass, Plus, Sparkles, Star, AudioLines } from "lucide-react";
import { Avatar, CoverImage } from "@/components/ui/media";
import { Badge } from "@/components/ui/badge";
import { Button, LinkButton } from "@/components/ui/button";
import { images, promptChips } from "@/lib/content";
import { cn } from "@/lib/utils";

const DEFAULT_PROMPT = "Generate an autonomous customer intelligence pipeline for enterprise SaaS...";

export function Hero() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [status, setStatus] = useState<"idle" | "busy" | "done">("idle");
  const [listening, setListening] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  function submit() {
    if (status === "busy") return;
    setStatus("busy");
    timers.current.push(
      window.setTimeout(() => {
        setStatus("done");
        timers.current.push(window.setTimeout(() => setStatus("idle"), 1500));
      }, 700),
    );
  }

  return (
    <section id="top" className="container-x relative flex flex-col items-center pb-16 pt-12 text-center md:pb-24 md:pt-16">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[360px] w-[720px] max-w-full -translate-x-1/2 rounded-full bg-secondary-fixed-dim/20 blur-[120px]" />

      <Badge className="mb-6 transition-transform duration-300 hover:scale-[1.02]">
        <Star aria-hidden className="size-4 fill-amber-500 text-amber-500" />
        4.9 Enterprise Trust Score across 140+ AI Deployments
      </Badge>

      <h1 className="mb-6 max-w-4xl text-balance text-display-hero-mobile text-on-surface md:text-display-hero">Plan &amp; Scale More with Synapse AI</h1>
      <p className="mb-8 max-w-2xl text-pretty text-body-lg text-on-surface-variant">
        Projects remember. Agents think. Automations execute. Bespoke intelligent agent fleets and neural enterprise architectures engineered for market pioneers.
      </p>

      <div className="mb-14 flex flex-wrap items-center justify-center gap-space-sm">
        <LinkButton href="#consultation" size="lg" className="py-3.5">
          Schedule Consultation
        </LinkButton>
        <LinkButton href="#capabilities" variant="secondary" size="lg">
          Explore Workflows
        </LinkButton>
      </div>

      <div className="relative isolate w-full overflow-hidden rounded-lg bg-surface-container-lowest shadow-xl md:rounded-xl">
        <CoverImage src={images.hero} priority />
        <div className="relative flex min-h-[440px] flex-col justify-between gap-6 p-6 md:min-h-[520px] md:p-10">
          <div className="flex w-full items-center justify-between">
            <Badge variant="glass" className="py-1.5">
              <Sparkles aria-hidden className="size-[18px] text-secondary" />
              AI Agents &amp; Multi-Modal Engine
            </Badge>
            <Badge variant="glass" className="hidden font-normal text-on-surface-variant sm:inline-flex">
              <span aria-hidden className="size-2 animate-pulse rounded-full bg-emerald-500" />
              Telemetry Active • 14ms latency
            </Badge>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-2xl">
            <div className="rounded-lg bg-surface/90 p-5 text-left shadow-2xl backdrop-blur-xl transition-shadow duration-300 focus-within:shadow-[0_30px_80px_-20px_rgba(125,45,206,0.35)]">
              <div className="mb-4 flex items-center gap-3">
                <Sparkles aria-hidden className="size-[22px] shrink-0 text-secondary" />
                <input
                  ref={input}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  aria-label="Describe the workflow you want to build"
                  placeholder={listening ? "Listening for voice command..." : "Ask Synapse to architect a workflow..."}
                  className="w-full bg-transparent text-body-md text-on-surface placeholder:text-outline focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" className="gap-1.5 font-label">
                    <Plus aria-hidden className="size-4" /> Add Attachments
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon-sm"
                    aria-label="Toggle voice input"
                    aria-pressed={listening}
                    onClick={() => setListening((v) => !v)}
                    className={cn(listening && "bg-secondary text-on-secondary hover:bg-secondary")}
                  >
                    <AudioLines aria-hidden className="size-[18px]" />
                  </Button>
                </div>
                <Button size="icon" aria-label="Submit prompt" onClick={submit} className="hover:scale-105">
                  {status === "busy" ? <Hourglass aria-hidden className="size-5 animate-spin" /> : status === "done" ? <Check aria-hidden className="size-5" /> : <ArrowUp aria-hidden className="size-5" />}
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full bg-primary/40 px-3 py-1 font-label text-caption font-medium text-surface-container-lowest backdrop-blur-md">Fast deploy templates:</span>
              {promptChips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => {
                    setPrompt(chip.text);
                    input.current?.focus();
                  }}
                  className="rounded-full bg-surface/80 px-3 py-1 font-label text-label-sm text-on-surface shadow-sm backdrop-blur-md transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-surface active:scale-95"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          <p className="mx-auto rounded-full border border-surface-container-lowest/20 bg-primary/40 px-4 py-1.5 text-center text-body-sm text-surface-container-lowest shadow-sm backdrop-blur-md">
            Don&apos;t want to wait? Try the early{" "}
            <a href="#consultation" className="font-semibold underline decoration-2 underline-offset-4 transition-opacity hover:opacity-80">
              AI Beta Access
            </a>{" "}
            today.
          </p>
        </div>
      </div>

      <div className="mt-8 flex w-full max-w-xl items-center justify-between gap-4 rounded-full bg-surface-container px-5 py-2.5 shadow-md transition-shadow duration-300 hover:shadow-lg md:gap-8">
        <div className="flex items-center gap-3 text-left">
          <div className="flex -space-x-2">
            {images.avatars.map((src) => (
              <Avatar key={src} src={src} size={32} className="ring-2 ring-surface-container" />
            ))}
          </div>
          <div>
            <p className="font-label text-label-sm font-semibold text-on-surface">Custom AI Agent Squad</p>
            <p className="font-label text-caption text-on-surface-variant">Production-ready deployment in under 14 days</p>
          </div>
        </div>
        <LinkButton href="#consultation" size="sm" className="group shrink-0 gap-1">
          Get Your Agent
          <ArrowUpRight aria-hidden className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </LinkButton>
      </div>
    </section>
  );
}
