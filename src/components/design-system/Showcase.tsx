"use client";

import { useState, type ReactNode } from "react";
import { Heart, Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { CheckboxField } from "@/components/ui/Checkbox";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { Field } from "@/components/ui/Field";
import { Input, Textarea } from "@/components/ui/Input";
import { RadioGroup, RadioPill, RadioSwatch } from "@/components/ui/RadioGroup";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Tooltip, TooltipProvider } from "@/components/ui/Tooltip";

const TOKENS = [
  ["ivory", "bg-ivory"],
  ["sand", "bg-sand"],
  ["beige", "bg-beige"],
  ["caramel", "bg-caramel"],
  ["walnut", "bg-walnut"],
  ["espresso", "bg-espresso"],
  ["footer", "bg-footer"],
  ["danger", "bg-danger"],
  ["success", "bg-success"],
] as const;

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-12">
      <h2 id={id} className="font-serif text-3xl font-bold tracking-tight">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function Showcase() {
  const [size, setSize] = useState("9");
  return (
    <TooltipProvider>
      <Section id="ds-colour" title="Colour">
        <ul role="list" className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
          {TOKENS.map(([name, cls]) => (
            <li key={name}>
              <div className={`${cls} h-20 rounded-lg border border-line`} />
              <p className="mt-2 text-xs font-semibold capitalize">{name}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="ds-type" title="Typography">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-walnut">Eyebrow · Manrope</p>
          <p className="font-serif text-5xl font-bold leading-[1.08] tracking-[-0.015em]">Playfair display heading</p>
          <p className="font-serif text-2xl font-bold tracking-tight">Card title in serif</p>
          <p className="max-w-md text-sm leading-relaxed text-muted">Body copy in Manrope, muted for secondary information, with relaxed leading.</p>
        </div>
      </Section>

      <Section id="ds-buttons" title="Buttons & badges">
        <div className="flex flex-wrap items-center gap-3">
          <Button arrow>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Remove</Button>
          <Button disabled>Disabled</Button>
          <Tooltip content="Save to wishlist">
            <Button variant="secondary" size="icon" aria-label="Save to wishlist">
              <Heart aria-hidden className="size-4" />
            </Button>
          </Tooltip>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge>New</Badge>
          <Badge variant="solid">Bestseller</Badge>
          <Badge variant="outline">Limited</Badge>
          <Badge variant="success">In stock</Badge>
          <Badge variant="danger">Sold out</Badge>
        </div>
      </Section>

      <Section id="ds-forms" title="Form controls">
        <div className="grid gap-x-6 gap-y-6 md:grid-cols-2">
          <Field label="Email address" hint="We only use this for order updates.">
            <Input type="email" placeholder="you@example.com" />
          </Field>
          <Field label="Postal code" error="Enter a valid postal code.">
            <Input defaultValue="12" />
          </Field>
          <Field label="Country">
            <Select defaultValue="ca">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Gift note" optional>
            <Textarea placeholder="Add a short message" />
          </Field>
          <div className="space-y-4">
            <CheckboxField id="ds-news" label="Email me new drops" description="One email a month, never more." defaultChecked />
            <CheckboxField id="ds-gift" label="This is a gift" />
          </div>
          <div className="space-y-5">
            <div>
              <p id="ds-size" className="mb-2 text-[13px] font-semibold">
                Size (US) · <span className="tabular-nums text-muted">{size}</span>
              </p>
              <RadioGroup value={size} onValueChange={setSize} aria-labelledby="ds-size">
                {["7", "8", "9", "10", "11"].map((s) => (
                  <RadioPill key={s} value={s} disabled={s === "11"}>
                    {s}
                  </RadioPill>
                ))}
              </RadioGroup>
            </div>
            <div>
              <p id="ds-colour-label" className="mb-1 text-[13px] font-semibold">
                Colour
              </p>
              <RadioGroup defaultValue="walnut" aria-labelledby="ds-colour-label" className="gap-1">
                <RadioSwatch value="walnut" swatch="#765234" aria-label="Walnut" />
                <RadioSwatch value="beige" swatch="#d9cdbf" aria-label="Beige" />
                <RadioSwatch value="espresso" swatch="#21170f" aria-label="Espresso" />
              </RadioGroup>
            </div>
          </div>
        </div>
      </Section>

      <Section id="ds-disclosure" title="Tabs & accordion">
        <div className="grid gap-12 lg:grid-cols-2">
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="care">Care</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="text-sm leading-relaxed text-muted">
              Full-grain suede upper, recycled foam midsole and a natural gum outsole.
            </TabsContent>
            <TabsContent value="care" className="text-sm leading-relaxed text-muted">
              Brush gently, spot clean with a damp cloth, air dry away from heat.
            </TabsContent>
            <TabsContent value="shipping" className="text-sm leading-relaxed text-muted">
              Free standard delivery over the threshold. Tracked on dispatch.
            </TabsContent>
          </Tabs>
          <Accordion type="single" collapsible defaultValue="a">
            <AccordionItem value="a">
              <AccordionTrigger>How do the sizes run?</AccordionTrigger>
              <AccordionContent>
                <p>True to size. Between sizes? Go up half a size for a relaxed fit.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>Can I return worn pairs?</AccordionTrigger>
              <AccordionContent>
                <p>Try them indoors within 30 days and we will take them back.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      <Section id="ds-surfaces" title="Cards, dialog & loading">
        <div className="grid gap-6 md:grid-cols-3">
          <Card interactive>
            <CardTitle>Sand card</CardTitle>
            <CardDescription>Default surface. Lifts gently when interactive.</CardDescription>
          </Card>
          <Card tone="ivory">
            <CardTitle>Ivory card</CardTitle>
            <CardDescription>Quieter, for nested content.</CardDescription>
          </Card>
          <Card tone="dark">
            <CardTitle>Dark card</CardTitle>
            <p className="mt-1.5 text-sm leading-relaxed text-ivory/70">For campaign and footer blocks.</p>
          </Card>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Info aria-hidden className="size-4" /> Size guide
              </Button>
            </DialogTrigger>
            <DialogContent title="Size guide" description="Measure your foot heel to toe in the evening.">
              <p className="text-sm text-muted">US 9 · 27.0 cm · EU 42.5</p>
              <DialogClose asChild>
                <Button className="mt-6 w-full">Got it</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
          <div className="flex min-w-60 flex-1 items-center gap-4">
            <Skeleton className="size-16 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        </div>
        <Separator label="or" className="mt-10" />
      </Section>
    </TooltipProvider>
  );
}
