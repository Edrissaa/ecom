"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Demo handler: connect to your email provider to collect real subscriptions. */
export function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <form
      className="space-y-space-xs pt-space-xs"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor="newsletter" className="font-label text-label-sm font-semibold text-on-surface">
        Stay updated with Neural Digest
      </label>
      {done ? (
        <p role="status" className="flex items-center gap-2 text-body-sm text-on-surface-variant animate-fade-in">
          <Check aria-hidden className="size-4 text-secondary" /> You&apos;re on the list.
        </p>
      ) : (
        <div className="flex max-w-sm gap-space-xs">
          <Input id="newsletter" type="email" required placeholder="Enter your work email" autoComplete="email" className="flex-1 bg-surface-container-low py-2 text-body-sm shadow-none" />
          <Button type="submit" className="h-auto px-space-md py-2 text-label-sm">
            Subscribe
          </Button>
        </div>
      )}
    </form>
  );
}
