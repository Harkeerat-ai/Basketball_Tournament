import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TournamentDetails from "@/components/TournamentDetails";
import RegistrationSection from "@/components/RegistrationSection";
import FixturesTabs from "@/components/FixturesTabs";
import StandingsTable from "@/components/StandingsTable";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-[66px]">
        <HeroSection />
        <TournamentDetails />
        <RegistrationSection />
        <FixturesTabs />
        <StandingsTable />
      </main>
      <Footer />
    </>
  );
}
