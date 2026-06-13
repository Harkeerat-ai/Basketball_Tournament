"use client";

import { useState, useCallback } from "react";
import {
  knockoutMatches as staticKnockout,
  groupMatches as staticGroup,
  quarterfinalMatches as staticQF,
  semifinalMatches as staticSF,
  finalMatch as staticFinal,
  groupStageNotice,
  knockoutStageNotice,
} from "@/data/fixtures";
import { KnockoutMatch, GroupMatch } from "@/lib/types";
import { subscribeFixtures } from "@/lib/db";
import { useFirebaseData } from "@/hooks/useFirebaseData";

type Phase = "ko" | "grp" | "qf" | "sf" | "final";

const phases: { key: Phase; label: string }[] = [
  { key: "ko", label: "Knockout" },
  { key: "grp", label: "Groups" },
  { key: "qf", label: "Quarterfinals" },
  { key: "sf", label: "Semifinals" },
  { key: "final", label: "Final" },
];

function MatchCard({ match }: { match: KnockoutMatch }) {
  return (
    <div className="bg-surf border border-bdr rounded-[10px] overflow-hidden transition-all duration-250 hover:border-bdOr">
      <div className="px-[14px] py-[8px] bg-surf2 text-[10.5px] font-bold tracking-[2px] uppercase text-or2">
        {match.label}
      </div>
      <div className="px-[16px] py-[12px] flex justify-between items-center text-[15px] font-semibold text-gl border-b border-bdr last:border-b-0">
        <span className="text-gd italic text-[13px]">{match.team1}</span>
        <span className="font-russo text-[16px] text-or2">{match.score1}</span>
      </div>
      <div className="px-[16px] py-[12px] flex justify-between items-center text-[15px] font-semibold text-gl border-b border-bdr last:border-b-0">
        <span className="text-gd italic text-[13px]">{match.team2}</span>
        <span className="font-russo text-[16px] text-or2">{match.score2}</span>
      </div>
    </div>
  );
}

function NoticeBox({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="p-[36px] bg-surf border border-dashed border-bdr rounded-[14px] text-center">
      <p className="text-[16px] text-gl mb-2">{title}</p>
      <p className="text-[13.5px] text-gr">{subtitle}</p>
    </div>
  );
}

export default function FixturesTabs() {
  const [phase, setPhase] = useState<Phase>("ko");

  const subKO = useCallback((cb: (d: KnockoutMatch[] | null) => void) => subscribeFixtures("knockout", cb), []);
  const subGrp = useCallback((cb: (d: GroupMatch[] | null) => void) => subscribeFixtures("group", cb), []);
  const subQF = useCallback((cb: (d: KnockoutMatch[] | null) => void) => subscribeFixtures("quarterfinals", cb), []);
  const subSF = useCallback((cb: (d: KnockoutMatch[] | null) => void) => subscribeFixtures("semifinals", cb), []);
  const subFinal = useCallback((cb: (d: KnockoutMatch[] | null) => void) => subscribeFixtures("final", cb), []);

  const { data: knockoutMatches, loading: koLoading } = useFirebaseData<KnockoutMatch[]>(subKO, staticKnockout);
  const { data: groupMatches, loading: grpLoading } = useFirebaseData<GroupMatch[]>(subGrp, staticGroup);
  const { data: quarterfinalMatches, loading: qfLoading } = useFirebaseData<KnockoutMatch[]>(subQF, staticQF);
  const { data: semifinalMatches, loading: sfLoading } = useFirebaseData<KnockoutMatch[]>(subSF, staticSF);
  const { data: finalMatch, loading: fnLoading } = useFirebaseData<KnockoutMatch[]>(subFinal, staticFinal);

  const groupNames = ["A", "B", "C"] as const;
  const isLoading = koLoading || grpLoading || qfLoading || sfLoading || fnLoading;

  return (
    <section id="fixtures" className="scroll-mt-[80px]">
      <div className="max-w-[1200px] mx-auto px-[18px] md:px-[44px] py-[60px_90px]">
        <p className="section-eyebrow">Tournament Bracket</p>
        <h2 className="section-heading mb-[14px]">FIXTURES</h2>
        <p className="text-gr mb-9 text-[16px]">
          Match fixtures will be announced once all 18 teams are registered.
          Check back for updates.
        </p>
        {isLoading && <p className="text-gr/60 text-[13px] mb-4">Loading fixtures…</p>}

        <div className="flex gap-[6px] mb-9 p-[5px] bg-surf rounded-[11px] w-fit flex-wrap">
          {phases.map((p) => (
            <button
              key={p.key}
              onClick={() => setPhase(p.key)}
              className={`px-[24px] py-[10px] font-bold text-[14px] tracking-[1.2px] uppercase rounded-[8px] transition-colors duration-200 cursor-pointer border-none ${
                phase === p.key
                  ? "bg-or text-white"
                  : "text-gr bg-transparent hover:text-gl"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {phase === "ko" && (
          <div>
            <p className="text-[13px] font-bold tracking-[2px] uppercase text-gr mb-4">
              Round 1 &rarr; 9 winners advance to Group Stage
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-[14px]">
              {knockoutMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        )}

        {phase === "grp" && (
          <div>
            <p className="text-[13px] font-bold tracking-[2px] uppercase text-gr mb-4">
              3 Groups &times; 3 Teams &mdash; Round Robin
            </p>
            {groupNames.map((g) => {
              const matches = groupMatches.filter((m) => m.group === g);
              return (
                <div key={g} className="mb-8">
                  <p className="text-[12px] font-bold tracking-[2.5px] uppercase text-or2 mb-3">
                    Group {g}
                  </p>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-[14px]">
                    {matches.map((match) => (
                      <MatchCard key={`grp-${match.id}`} match={match} />
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="mt-4">
              <NoticeBox
                title={groupStageNotice.title}
                subtitle={groupStageNotice.subtitle}
              />
            </div>
          </div>
        )}

        {phase === "qf" && (
          <div>
            <p className="text-[13px] font-bold tracking-[2px] uppercase text-gr mb-4">
              Top 2 per group + 2 best third-place &rarr; 8 teams
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-[14px]">
              {quarterfinalMatches.map((match) => (
                <MatchCard key={`qf-${match.id}`} match={match} />
              ))}
            </div>
            <div className="mt-6">
              <NoticeBox
                title={knockoutStageNotice.title}
                subtitle={knockoutStageNotice.subtitle}
              />
            </div>
          </div>
        )}

        {phase === "sf" && (
          <div>
            <p className="text-[13px] font-bold tracking-[2px] uppercase text-gr mb-4">
              Quarterfinal winners compete
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-[14px]">
              {semifinalMatches.map((match) => (
                <MatchCard key={`sf-${match.id}`} match={match} />
              ))}
            </div>
            <div className="mt-6">
              <NoticeBox
                title={knockoutStageNotice.title}
                subtitle={knockoutStageNotice.subtitle}
              />
            </div>
          </div>
        )}

        {phase === "final" && (
          <div>
            <p className="text-[13px] font-bold tracking-[2px] uppercase text-gr mb-4">
              The Championship Match
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-[14px]">
              {finalMatch.map((match) => (
                <MatchCard key={`final-${match.id}`} match={match} />
              ))}
            </div>
            <div className="mt-6">
              <NoticeBox
                title={knockoutStageNotice.title}
                subtitle={knockoutStageNotice.subtitle}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
