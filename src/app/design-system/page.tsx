import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { Showcase } from "@/components/design-system/Showcase";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  return (
    <main id="main" className="container-page pb-20 pt-28 md:pb-28 md:pt-36">
      <PageIntro eyebrow="Soleva UI" title="Design System" description="Tokens and reusable components, built on Radix primitives and themed to the Soleva palette." />
      <div className="mt-14">
        <Showcase />
      </div>
    </main>
  );
}
