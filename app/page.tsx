import Image from "next/image";
import { Navbar } from "./components/Navbar";
import { HeroContent } from "./components/HeroContent";
import { TopicCard } from "./components/TopicCard";
import { CertaintyBadge } from "./components/CertaintyBadge";
import { Marquee } from "./components/Marquee";
import { HowItWorks } from "./components/HowItWorks";
import { PracticeLoop } from "./components/PracticeLoop";
import { FounderStory } from "./components/FounderStory";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <div
        id="top"
        className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background text-cream"
      >
        <Image
          src="/herobg.png"
          alt=""
          fill
          priority
          className="pointer-events-none object-cover object-center"
        />

        <div className="relative z-10 flex min-h-screen w-full flex-col">
          <Navbar />

          <main className="relative flex flex-1 items-center overflow-y-auto px-4 py-6 sm:px-6 lg:overflow-visible lg:px-[6.32%] lg:py-0">
            <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
              <HeroContent />
              <TopicCard />
            </div>

            <CertaintyBadge />
          </main>

          <Marquee />
        </div>
      </div>

      <HowItWorks />
      <PracticeLoop />
      <FounderStory />
      <FinalCTA />
      <Footer />
    </>
  );
}
