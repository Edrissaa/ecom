"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import { useDialog } from "@/hooks/use-dialog";
import { cn } from "@/lib/cn";

type Side = "right" | "left" | "top";

const panels: Record<Side, { base: string; closed: string }> = {
  right: { base: "right-0 top-0 h-dvh w-full max-w-[440px]", closed: "translate-x-full" },
  left: { base: "left-0 top-0 h-dvh w-full max-w-[420px]", closed: "-translate-x-full" },
  top: { base: "left-0 top-0 max-h-[90dvh] w-full", closed: "-translate-y-8 opacity-0" },
};

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  side?: Side;
  className?: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
  children: ReactNode;
}

/**
 * Modal panel that stays mounted so it can animate out. When closed it is `inert`
 * and `visibility: hidden` (see .overlay in globals.css), so it is invisible to
 * keyboards and screen readers.
 */
export function Drawer({ open, onClose, label, side = "right", className, initialFocusRef, children }: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialog({ open, onClose, containerRef: panelRef, initialFocusRef });
  const position = panels[side];

  return (
    <div className="overlay fixed inset-0 z-[70]" data-open={open} inert={!open} aria-hidden={!open}>
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-espresso/45 transition-opacity duration-300 ease-premium",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={cn(
          "absolute flex flex-col bg-ivory text-espresso shadow-[0_0_60px_rgba(33,23,15,0.16)] outline-none",
          "transition-[transform,opacity] duration-[350ms] ease-premium",
          position.base,
          open ? "translate-x-0 translate-y-0 opacity-100" : position.closed,
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
