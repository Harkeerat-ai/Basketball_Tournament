import dynamic from "next/dynamic";
import InfoCards from "./InfoCards";
import PrizePool from "./PrizePool";

const BasketballScene = dynamic(
  () => import("@/components/BasketballScene"),
  { ssr: false }
);

export default function HeroSection() {
  return (
    <section id="home" className="scroll-mt-[66px]">
      <BasketballScene />
      <div className="home-info px-[18px] md:px-[44px] py-[80px] max-w-[1300px] mx-auto">
        <p className="section-eyebrow">Mumbai Premier Basketball League</p>
        <h2 className="section-heading">
          THE COURT
          <br />
          AWAITS.
        </h2>
        <p className="section-sub">
          5-on-5 open category tournament in the heart of Mumbai. 16 teams. One
          champion. ₹45,000 in prizes.
        </p>

        <InfoCards />

        <div className="h-[1px] bg-bdr my-[60px]" />

        <p className="section-eyebrow">Prize Pool</p>
        <PrizePool />
      </div>
    </section>
  );
}
