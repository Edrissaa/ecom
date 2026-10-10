import { Logo } from "@/components/Logo";
import { Newsletter } from "@/components/sections/Newsletter";
import { footerColumns } from "@/lib/content";

const legal = ["Privacy Policy", "Terms of Service", "Security Protocols"];

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_12px_rgba(0,0,0,0.02)]">
      <div className="container-x pb-space-lg pt-space-xl">
        <div className="mb-space-xl grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-6">
          <div className="space-y-space-md lg:col-span-2">
            <Logo size="sm" />
            <p className="max-w-sm text-body-sm text-on-surface-variant">
              Engineering high-leverage cognitive systems, autonomous agent fleets, and neuro-symbolic enterprise architectures for tomorrow&apos;s pioneers.
            </p>
            <Newsletter />
          </div>
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="space-y-space-sm">
              <h3 className="font-label text-label-sm font-semibold uppercase tracking-wider text-on-surface">{col.title}</h3>
              <ul role="list" className="space-y-space-sm">
                {col.links.map((label) => (
                  <li key={label}>
                    <a href="#" className="text-body-sm text-on-surface-variant transition-colors duration-200 hover:text-on-surface">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-space-md pt-space-lg md:flex-row">
          <div className="flex items-center gap-space-md font-label text-caption text-on-surface-variant">
            <p>© 2025 Synapse AI Inc. All rights reserved.</p>
            <span aria-hidden className="size-1.5 rounded-full bg-tertiary-fixed-dim" />
            <p>Operational Grade 99.98%</p>
          </div>
          <ul role="list" className="flex items-center gap-space-lg font-label text-caption text-on-surface-variant">
            {legal.map((l) => (
              <li key={l}>
                <a href="#" className="transition-colors hover:text-on-surface">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
