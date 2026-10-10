"use client";

import type { ComponentProps, ReactNode } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

interface DialogContentProps extends ComponentProps<typeof DialogPrimitive.Content> {
  title: string;
  description?: string;
  children: ReactNode;
}

/** Centred modal on the same scrim + motion as <Drawer>. Radix handles focus trap, Escape and scroll lock. */
export function DialogContent({ title, description, className, children, ...props }: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-espresso/45 data-[state=open]:animate-[fade-in_300ms_var(--ease-premium)]" />
      <DialogPrimitive.Content
        {...(description ? {} : { "aria-describedby": undefined })}
        className={cn(
          "fixed left-1/2 top-1/2 z-[81] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-line bg-ivory p-7 shadow-[0_30px_80px_-20px_rgba(33,23,15,0.35)] outline-none",
          "data-[state=open]:animate-fade-up",
          className,
        )}
        {...props}
      >
        <DialogPrimitive.Title className="pr-8 font-serif text-2xl font-bold tracking-tight">{title}</DialogPrimitive.Title>
        {description ? (
          <DialogPrimitive.Description className="mt-2 text-sm leading-relaxed text-muted">{description}</DialogPrimitive.Description>
        ) : null}
        <div className="mt-6">{children}</div>
        <DialogPrimitive.Close
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-full text-espresso/70 transition-colors hover:bg-sand hover:text-espresso"
        >
          <X aria-hidden className="size-5" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
