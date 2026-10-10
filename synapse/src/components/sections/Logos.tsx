import { logos } from "@/lib/content";

export function Logos() {
  return (
    <section id="solutions" aria-label="Customers" className="w-full bg-surface-container-lowest py-12 shadow-sm">
      <div className="container-x">
        <p className="mb-8 text-center font-label text-caption uppercase tracking-wider text-outline">Powering autonomous intelligence for frontier scale teams</p>
        <ul role="list" className="grid grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-3 md:grid-cols-6">
          {logos.map((name) => (
            <li key={name} className="text-headline-sm font-bold tracking-tighter text-on-surface opacity-60 transition-opacity duration-300 hover:opacity-100">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
