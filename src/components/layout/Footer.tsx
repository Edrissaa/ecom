import Link from "next/link";
import { Newsletter } from "@/components/layout/Newsletter";
import { Logo } from "@/components/ui/Logo";
import { footerColumns, paymentMethods, socialLinks } from "@/data/navigation";
import { site } from "@/data/site";

const linkClass = "inline-block py-0.5 text-beige/80 transition-colors duration-200 hover:text-ivory";

export function Footer() {
  return (
    <footer data-surface="dark" className="relative isolate overflow-hidden bg-footer text-beige">
      {/* Decorative arcs, bottom-right. */}
      <div aria-hidden className="pointer-events-none absolute -bottom-52 -right-40 -z-10 size-[520px] rounded-full bg-white/[0.035]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-72 -right-72 -z-10 size-[760px] rounded-full border border-white/[0.06]" />

      <div className="container-page py-16 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))] lg:gap-10">
          <div>
            <Link href="/" aria-label="Soleva — home" className="inline-block text-ivory">
              <Logo />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-beige/75">
              Premium sneakers, thoughtfully made — from fresh drops to everyday icons. Designed for every step.
            </p>
            <Newsletter />
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:contents">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ivory">{column.title}</h2>
                <ul className="mt-5 space-y-2.5 text-sm">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-8 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[13px] text-beige/65">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <ul className="flex flex-wrap items-center gap-2" aria-label="Payment methods">
              {paymentMethods.map((method) => (
                <li key={method} className="rounded border border-white/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-beige/70">
                  {method}
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-2" aria-label="Social media">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center rounded-full border border-white/20 px-4 text-xs font-medium text-ivory transition-colors duration-200 hover:border-ivory hover:bg-ivory hover:text-espresso"
                  >
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
