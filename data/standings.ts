import { GroupStandings } from "@/lib/types";

export const phaseNotice =
  "Pre-Tournament — Standings will be updated live once the group stage begins.";

export const standingsHeader = ["#", "Team", "P", "W", "L", "+/-", "Pts"] as const;

const groupNames = ["A", "B", "C"] as const;

export const groupStandingsData: GroupStandings[] = groupNames.map((group) => ({
  group: `Group ${group}`,
  rows: Array.from({ length: 3 }, (_, i) => ({
    rank: i + 1,
    team: "TBD",
    played: "—",
    won: "—",
    lost: "—",
    diff: "—",
    pts: "—",
    isTop: i < 2,
    isTbd: true,
  })),
}));

export const standingsLegend =
  "P = Played · W = Won · L = Lost · +/- = Point Differential · Pts = League Points";
