"use client";

import Link from "next/link";
import { ArrowUpRight, Heart, Search, Truck, X } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Logo } from "@/components/ui/Logo";
import { useOverlay } from "@/components/providers/ShopProvider";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

const secondary =
  "flex min-h-11 items-center gap-3 rounded-md px-1 text-[15px] text-espresso/85 transition-colors hover:text-espresso";

export function MobileMenu() {
  const { active, open, close } = useOverlay();
  const isOpen = active === "menu";

  return (
    <Drawer open={isOpen} onClose={close} label="Menu" side="right">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-6">
        <Logo />
        <button
          type="button"
          onClick={close}
          aria-label="Close menu"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-espresso/5"
        >
          <X aria-hidden className="size-5" />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-8">
        <ul>
          {mainNav.map((item, i) => (
            <li
              key={item.label}
              style={{ transitionDelay: isOpen ? `${120 + i * 55}ms` : "0ms" }}
              className={cn(
                "border-b border-line/70 transition-[opacity,transform] duration-500 ease-premium",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
            >
              <Link href={item.href} onClick={close} className="group flex min-h-16 items-center justify-between font-serif text-[30px] font-bold tracking-tight">
                {item.label}
                <ArrowUpRight aria-hidden className="size-5 opacity-40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>

        <ul className="mt-8 space-y-1">
          <li>
            <button type="button" onClick={() => open("search")} className={cn(secondary, "w-full text-left")}>
              <Search aria-hidden className="size-[18px]" /> Search
            </button>
          </li>
          <li>
            <Link href="/wishlist" onClick={close} className={secondary}>
              <Heart aria-hidden className="size-[18px]" /> Wishlist
            </Link>
          </li>
          <li>
            <Link href="/help/track-order" onClick={close} className={secondary}>
              <Truck aria-hidden className="size-[18px]" /> Track order
            </Link>
          </li>
        </ul>
      </nav>

      <p className="shrink-0 border-t border-line px-6 py-5 text-xs text-muted">
        Free shipping on orders over ${site.freeShippingThreshold}. 30-day returns.
      </p>
    </Drawer>
  );
}
