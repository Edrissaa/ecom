"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Plus, Search, X } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { useCart, useOverlay } from "@/components/providers/ShopProvider";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { searchProducts } from "@/data/products";
import { formatPrice } from "@/lib/format";

const SUGGESTIONS = ["Running", "Court", "Lifestyle", "Canvas", "Summer", "Black"];

export function SearchOverlay() {
  const { active, open, close } = useOverlay();
  const { addItem } = useCart();
  const isOpen = active === "search";

  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const debounced = useDebouncedValue(query, 180);
  const term = debounced.trim();
  const results = useMemo(() => searchProducts(term, 6), [term]);

  const status = !term
    ? ""
    : results.length === 0
      ? `No results for “${term}”`
      : `${results.length} ${results.length === 1 ? "result" : "results"} for “${term}”`;

  return (
    <Drawer open={isOpen} onClose={close} label="Search" side="top" initialFocusRef={inputRef} className="rounded-b-2xl">
      <div className="container-page w-full py-5 md:py-8">
        <form
          role="search"
          onSubmit={(event) => event.preventDefault()}
          className="flex items-center gap-3 border-b border-espresso/20 pb-3 focus-within:border-espresso"
        >
          <Search aria-hidden className="size-5 shrink-0 text-muted" />
          <label htmlFor="site-search" className="sr-only">
            Search sneakers
          </label>
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            name="q"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search sneakers, colours, styles…"
            className="h-11 min-w-0 flex-1 bg-transparent font-serif text-xl text-espresso outline-none placeholder:text-muted/70 md:text-2xl [&::-webkit-search-cancel-button]:hidden"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close search"
            className="-mr-2 inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-espresso/5"
          >
            <X aria-hidden className="size-5" />
          </button>
        </form>

        <div className="mt-5 min-h-[190px] overflow-y-auto md:mt-7">
          <p role="status" className="mb-3 min-h-5 text-xs font-medium uppercase tracking-[0.1em] text-muted">
            {status}
          </p>

          {!term && (
            <div>
              <p className="text-sm text-muted">Popular right now</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <li key={suggestion}>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery(suggestion);
                        inputRef.current?.focus();
                      }}
                      className="inline-flex h-11 items-center rounded-full border border-line bg-sand px-5 text-sm font-medium transition-colors hover:border-beige hover:bg-beige/60"
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {term && results.length === 0 && (
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Nothing matched. Try a style like “running” or “court”, or a colour like “sage” or “navy”.
            </p>
          )}

          {results.length > 0 && (
            <ul role="list" className="grid gap-x-10 md:grid-cols-2">
              {results.map((product) => (
                <li key={product.id} className="flex items-center gap-4 border-b border-line py-3.5">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-sand">
                    {/* Decorative: the product name is right beside it. */}
                    <Image src={product.image} alt="" fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold">{product.name}</p>
                    <p className="truncate text-[13px] text-muted">
                      {product.category} · {product.colors[0].name}
                    </p>
                  </div>
                  <p className="text-sm font-bold tabular-nums">{formatPrice(product.price)}</p>
                  <button
                    type="button"
                    onClick={() => {
                      addItem(product.id);
                      open("cart");
                    }}
                    aria-label={`Add to Cart: ${product.name}`}
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-sand transition-colors hover:border-walnut hover:bg-walnut hover:text-ivory"
                  >
                    <Plus aria-hidden className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Drawer>
  );
}
