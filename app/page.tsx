import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RouteScroller from "@/components/RouteScroller";
import FAQ from "@/components/FAQ";
import {
  Concept,
  EventFormat,
  FinalCTA,
  Footer,
  Marquee,
  MediaStoryboard,
  PartnerStrip,
  Prizes,
  Rules,
  Schedule,
  Stats,
  Tracks,
  WhoShouldApply,
  WhyThisMatters,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <PartnerStrip />
        <Concept />
        <Stats />
        <RouteScroller />
        <Schedule />
        <EventFormat />
        <Tracks />
        <Rules />
        <WhyThisMatters />
        <Prizes />
        <WhoShouldApply />
        <MediaStoryboard />
        <Marquee />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
