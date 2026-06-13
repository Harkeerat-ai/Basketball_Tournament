import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RegisteredTeams from "@/components/RegisteredTeams";
import FixturesTabs from "@/components/FixturesTabs";
import StandingsTable from "@/components/StandingsTable";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-[66px]">
        <HeroSection />
        <RegisteredTeams />
        <FixturesTabs />
        <StandingsTable />
      </main>
      <Footer />
    </>
  );
}

