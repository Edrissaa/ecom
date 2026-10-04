"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { Logo } from "@/components/ui/Logo";
import { useCart, useOverlay, useWishlist } from "@/components/providers/ShopProvider";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/cn";

const iconButton =
  "relative inline-flex size-11 items-center justify-center rounded-full transition-colors duration-200 hover:bg-current/10";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const getScrolled = () => window.scrollY > 24;
const getServerScrolled = () => false;

function CountBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    // Re-keyed on every change so the bump animation replays.
    <span
      key={count}
      aria-hidden
      className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] animate-bump items-center justify-center rounded-full bg-walnut px-1 text-[10px] font-bold leading-none text-ivory ring-2 ring-ivory/90"
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);
  const { count } = useCart();
  const { ids: wishlistIds } = useWishlist();
  const { open } = useOverlay();

  // Over the hero the header is transparent with light text; everywhere else it is solid.
  const overHero = pathname === "/" && !scrolled;

  return (
    <>
      <header
        data-surface={overHero ? "dark" : undefined}
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,color] duration-300 ease-premium",
          overHero ? "border-transparent bg-transparent text-ivory" : "border-line bg-ivory/90 text-espresso backdrop-blur-md",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[72px]">
          <Link href="/" aria-label="Soleva — home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {mainNav.map((item) => {
                const current = item.href === pathname;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={cn(
                        "relative inline-block py-2 text-[13px] font-medium tracking-[0.01em] transition-opacity duration-200",
                        "after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300 after:ease-premium",
                        current ? "after:scale-x-100" : "opacity-85 after:scale-x-0 hover:opacity-100 hover:after:scale-x-100",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="-mr-2 flex items-center sm:gap-0.5">
            <button type="button" className={iconButton} onClick={() => open("search")} aria-label="Search">
              <Search aria-hidden className="size-5" />
            </button>
            <Link href="/help/track-order" className={cn(iconButton, "hidden md:inline-flex")} aria-label="Account and order tracking">
              <User aria-hidden className="size-5" />
            </Link>
            <Link href="/wishlist" className={cn(iconButton, "hidden sm:inline-flex")} aria-label={`Wishlist, ${wishlistIds.length} saved`}>
              <Heart aria-hidden className="size-5" />
              <CountBadge count={wishlistIds.length} />
            </Link>
            <button type="button" className={iconButton} onClick={() => open("cart")} aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}>
              <ShoppingBag aria-hidden className="size-5" />
              <CountBadge count={count} />
            </button>
            <button type="button" className={cn(iconButton, "lg:hidden")} onClick={() => open("menu")} aria-label="Open menu">
              <Menu aria-hidden className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />
    </>
  );
}
