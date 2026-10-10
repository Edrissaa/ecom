import { BigStat } from "@/components/sections/BigStat";
import { Capabilities } from "@/components/sections/Capabilities";
import { Consultation } from "@/components/sections/Consultation";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Logos } from "@/components/sections/Logos";
import { Metrics } from "@/components/sections/Metrics";
import { Quote } from "@/components/sections/Quote";
import { Statement } from "@/components/sections/Statement";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="w-full pt-20">
        <Hero />
        <Logos />
        <Metrics />
        <Quote />
        <Statement />
        <Capabilities />
        <BigStat />
        <Testimonials />
        <Consultation />
      </main>
      <Footer />
    </>
  );
}
