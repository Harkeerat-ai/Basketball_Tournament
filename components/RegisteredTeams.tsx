import { teams } from "@/data/teams";

export default function RegisteredTeams() {
  return (
    <section id="registered-teams" className="scroll-mt-[80px]">
      <div className="max-w-[1200px] mx-auto px-[18px] md:px-[44px] py-[60px_90px]">
        <p className="section-eyebrow">MPBL 2026</p>
        <h2 className="section-heading mb-10">
          REGISTERED<br />TEAMS
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-[16px]">
          {teams.map((team, idx) => (
            <div
              key={team}
              className="bg-surf border border-bdr rounded-[12px] p-[16px_20px] flex items-center gap-[14px] transition-all duration-200 hover:border-bdOr hover:bg-white/[0.01]"
            >
              <div className="w-[32px] h-[32px] bg-or/10 border border-bdOr rounded-[8px] flex items-center justify-center font-russo text-[14px] text-or2 font-bold">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <span className="text-[15.5px] font-bold text-white tracking-[0.5px]">
                {team}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
