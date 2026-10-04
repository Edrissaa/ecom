"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface Options {
  open: boolean;
  onClose: () => void;
  containerRef: RefObject<HTMLElement | null>;
  /** Element to focus on open. Defaults to the first focusable element. */
  initialFocusRef?: RefObject<HTMLElement | null>;
}

/**
 * Modal behaviour for drawers/overlays:
 * Escape closes, Tab is trapped inside, the page behind can't scroll,
 * and focus returns to whatever opened the dialog.
 */
export function useDialog({ open, onClose, containerRef, initialFocusRef }: Options) {
  // Keep the latest onClose without re-running the effect (which would reset focus).
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // html has scrollbar-gutter: stable, so nothing shifts

    const focusables = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null || el === document.activeElement);

    const frame = requestAnimationFrame(() => {
      (initialFocusRef?.current ?? focusables()[0] ?? container).focus({ preventScroll: true });
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const outside = !container.contains(active);

      if (event.shiftKey && (active === first || outside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || outside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [open, containerRef, initialFocusRef]);
}
