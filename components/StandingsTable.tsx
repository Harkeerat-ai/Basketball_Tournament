"use client";

import { useCallback } from "react";
import { phaseNotice, groupStandingsData as staticStandings, standingsLegend } from "@/data/standings";
import { subscribeStandings } from "@/lib/db";
import { useFirebaseData } from "@/hooks/useFirebaseData";
import type { GroupStandings } from "@/lib/types";

export default function StandingsTable() {
  const sub = useCallback((cb: (d: GroupStandings[] | null) => void) => subscribeStandings(cb), []);
  const { data: groupStandingsData, loading } = useFirebaseData<GroupStandings[]>(sub, staticStandings);

  return (
    <section id="table" className="scroll-mt-[80px]">
      <div className="max-w-[1000px] mx-auto px-[18px] md:px-[44px] py-[60px_90px]">
        <p className="section-eyebrow">Group Standings</p>
        <h2 className="section-heading mb-[14px]">
          POINTS<br />TABLE
        </h2>

        <div className="mb-[30px] p-[18px_24px] bg-surf rounded-[10px] border-l-4 border-gold text-[15px] text-gl">
          <strong className="text-gold">📋 {phaseNotice}</strong>
        </div>
        {loading && <p className="text-gr/60 text-[13px] mb-4">Loading standings…</p>}

        {groupStandingsData.map((group) => (
          <div key={group.group} className="mb-[36px]">
            <div className="flex gap-[6px] mb-[22px] p-[5px] bg-surf rounded-[11px] w-fit">
              <span className="px-[24px] py-[10px] bg-or text-white font-bold text-[14px] tracking-[1.2px] uppercase rounded-[8px]">
                {group.group}
              </span>
            </div>

            <div className="overflow-x-auto rounded-[13px] border border-bdr">
              <table className="w-full border-collapse min-w-[560px]">
                <thead>
                  <tr className="bg-surf2 border-b-2 border-bdOr">
                    {["#", "Team", "P", "W", "L", "+/-", "Pts"].map(
                      (header, i) => (
                        <th
                          key={header}
                          className={`px-[20px] py-[13px] text-[10.5px] font-bold tracking-[2.5px] uppercase text-or2 ${
                            i === 0 || i > 1 ? "text-center" : "text-left"
                          }`}
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((row) => (
                    <tr
                      key={row.rank}
                      className="border-b border-bdr last:border-b-0 hover:bg-white/[0.02]"
                    >
                      <td
                        className={`font-russo text-[16px] text-center px-[20px] py-[16px] ${
                          row.isTop ? "text-gold" : "text-gd"
                        }`}
                      >
                        {row.rank}
                      </td>
                      <td className="px-[20px] py-[16px]">
                        <div className="flex items-center gap-[13px]">
                          <div className="w-[36px] h-[36px] rounded-[8px] bg-surf2 border border-bdr flex items-center justify-center text-[18px]">
                            &mdash;
                          </div>
                          <span
                            className={`text-[16px] font-bold ${
                              row.isTbd ? "text-gd italic" : "text-white"
                            }`}
                          >
                            {row.team}
                          </span>
                        </div>
                      </td>
                      <td className="text-center px-[20px] py-[16px] text-[15px] text-gl">
                        {row.played}
                      </td>
                      <td className="text-center px-[20px] py-[16px] text-[15px] text-gl">
                        {row.won}
                      </td>
                      <td className="text-center px-[20px] py-[16px] text-[15px] text-gl">
                        {row.lost}
                      </td>
                      <td className="text-center px-[20px] py-[16px] text-[15px] text-gl">
                        {row.diff}
                      </td>
                      <td className="font-russo text-[18px] text-white text-center px-[20px] py-[16px]">
                        {row.pts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
        <p className="mt-[16px] text-[13px] text-gr">{standingsLegend}</p>
      </div>
    </section>
  );
}
