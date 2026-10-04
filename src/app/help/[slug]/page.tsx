import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/layout/PageIntro";
import { getHelpPage, helpPages } from "@/data/help";

export const dynamicParams = false;

export function generateStaticParams() {
  return helpPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/help/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getHelpPage(slug);
  if (!page) return {};
  return { title: page.title, description: page.intro, alternates: { canonical: `/help/${page.slug}` } };
}

export default async function HelpPage({ params }: PageProps<"/help/[slug]">) {
  const { slug } = await params;
  const page = getHelpPage(slug);
  if (!page) notFound();

  const related = helpPages.filter((p) => p.slug !== page.slug);

  return (
    <main id="main" className="container-page pb-20 pt-28 md:pb-28 md:pt-36">
      <PageIntro eyebrow="Help" title={page.title} description={page.intro} />

      <div className="mx-auto mt-14 max-w-2xl">
        {page.sections.map((section) => (
          <section key={section.heading} className="border-t border-line py-8 first:border-t-0 first:pt-0">
            <h2 className="font-serif text-2xl font-bold tracking-tight">{section.heading}</h2>
            <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-espresso/80">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}

        {page.table && (
          <div className="mt-4 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[480px] text-left text-sm">
              <caption className="sr-only">{page.table.caption}</caption>
              <thead className="bg-sand text-xs uppercase tracking-[0.08em] text-muted">
                <tr>
                  {page.table.headers.map((header) => (
                    <th key={header} scope="col" className="px-4 py-3 font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {page.table.rows.map((row) => (
                  <tr key={row[0]} className="border-t border-line">
                    {row.map((cell, i) => (
                      <td key={`${row[0]}-${i}`} className="px-4 py-3">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <nav aria-label="More help topics" className="mt-16 border-t border-line pt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">More help</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/help/${p.slug}`}
                  className="inline-flex h-11 items-center rounded-full border border-line bg-sand px-5 text-[13px] font-semibold transition-colors hover:border-beige hover:bg-beige/60"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
