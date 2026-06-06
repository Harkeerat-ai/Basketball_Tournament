import { StandingRow } from "@/lib/types";

export const phaseNotice =
  "Pre-Tournament — Standings will be updated live once the league phase begins after 14th June 2026.";

export const standingsHeader = ["#", "Team", "P", "W", "L", "+/-", "Pts"] as const;

export const standingsData: StandingRow[] = Array.from({ length: 8 }, (_, i) => ({
  rank: i + 1,
  team: "TBD",
  played: "—",
  won: "—",
  lost: "—",
  diff: "—",
  pts: "—",
  isTop: i < 3,
  isTbd: true,
}));

export const standingsLegend =
  "P = Played · W = Won · L = Lost · +/- = Point Differential · Pts = League Points";
