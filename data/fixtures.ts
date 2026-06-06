import { KnockoutMatch } from "@/lib/types";

export const knockoutMatches: KnockoutMatch[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  label: `Match ${i + 1}`,
  team1: "TBD",
  team2: "TBD",
  score1: "—",
  score2: "—",
}));

export const leagueNotice = {
  title: "League fixtures will be published after the knockout phase concludes.",
  subtitle:
    "The top 8 teams from Phase 1 will compete in a round-robin league. Full fixture schedule posted here after 14th June 2026.",
};
