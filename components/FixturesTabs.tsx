"use client";

import { useState } from "react";
import { knockoutMatches, leagueNotice } from "@/data/fixtures";

export default function FixturesTabs() {
  const [phase, setPhase] = useState<"ko" | "lg">("ko");

  return (
    <section id="fixtures" className="scroll-mt-[80px]">
      <div className="max-w-[1200px] mx-auto px-[18px] md:px-[44px] py-[60px_90px]">
        <p className="section-eyebrow">Tournament Bracket</p>
        <h2 className="section-heading mb-[14px]">FIXTURES</h2>
        <p className="text-gr mb-9 text-[16px]">
          Match fixtures will be announced once all 16 teams are registered.
          Check back for updates.
        </p>

        <div className="flex gap-[6px] mb-9 p-[5px] bg-surf rounded-[11px] w-fit">
          <button
            onClick={() => setPhase("ko")}
            className={`px-[24px] py-[10px] font-bold text-[14px] tracking-[1.2px] uppercase rounded-[8px] transition-colors duration-200 cursor-pointer border-none ${
              phase === "ko"
                ? "bg-or text-white"
                : "text-gr bg-transparent hover:text-gl"
            }`}
          >
            Phase 1 — Knockout
          </button>
          <button
            onClick={() => setPhase("lg")}
            className={`px-[24px] py-[10px] font-bold text-[14px] tracking-[1.2px] uppercase rounded-[8px] transition-colors duration-200 cursor-pointer border-none ${
              phase === "lg"
                ? "bg-or text-white"
                : "text-gr bg-transparent hover:text-gl"
            }`}
          >
            Phase 2 — League
          </button>
        </div>

        {phase === "ko" && (
          <div>
            <p className="text-[13px] font-bold tracking-[2px] uppercase text-gr mb-4">
              Round of 16 &rarr; Top 8 advance to League Phase
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-[14px]">
              {knockoutMatches.map((match) => (
                <div
                  key={match.id}
                  className="bg-surf border border-bdr rounded-[10px] overflow-hidden transition-all duration-250 hover:border-bdOr"
                >
                  <div className="px-[14px] py-[8px] bg-surf2 text-[10.5px] font-bold tracking-[2px] uppercase text-or2">
                    {match.label}
                  </div>
                  <div className="px-[16px] py-[12px] flex justify-between items-center text-[15px] font-semibold text-gl border-b border-bdr last:border-b-0">
                    <span className="text-gd italic text-[13px]">
                      {match.team1}
                    </span>
                    <span className="font-russo text-[16px] text-or2">
                      {match.score1}
                    </span>
                  </div>
                  <div className="px-[16px] py-[12px] flex justify-between items-center text-[15px] font-semibold text-gl border-b border-bdr last:border-b-0">
                    <span className="text-gd italic text-[13px]">
                      {match.team2}
                    </span>
                    <span className="font-russo text-[16px] text-or2">
                      {match.score2}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {phase === "lg" && (
          <div className="p-[36px] bg-surf border border-dashed border-bdr rounded-[14px] text-center">
            <p className="text-[16px] text-gl mb-2">{leagueNotice.title}</p>
            <p className="text-[13.5px] text-gr">{leagueNotice.subtitle}</p>
          </div>
        )}
      </div>
    </section>
  );
}
