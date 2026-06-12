import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RouteScroller from "@/components/RouteScroller";
import FAQ from "@/components/FAQ";
import {
  Concept,
  EventFormat,
  FinalCTA,
  Footer,
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
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
