import { KnockoutMatch, GroupMatch } from "@/lib/types";

// Phase 1 — Knockout Round: 9 matches, 18 teams, 9 eliminated
export const knockoutMatches: KnockoutMatch[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  label: `Match ${i + 1}`,
  team1: "TBD",
  team2: "TBD",
  score1: "—",
  score2: "—",
}));

// Phase 2 — Group Stage: 3 groups × 3 teams × 3 matches each
const groupNames = ["A", "B", "C"] as const;

export const groupMatches: GroupMatch[] = groupNames.flatMap((group, gi) =>
  Array.from({ length: 3 }, (_, mi) => ({
    id: gi * 3 + mi + 1,
    label: `Group ${group} — Match ${mi + 1}`,
    group,
    team1: "TBD",
    team2: "TBD",
    score1: "—",
    score2: "—",
  }))
);

// Phase 3 — Quarterfinals: 4 matches
export const quarterfinalMatches: KnockoutMatch[] = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  label: `QF ${i + 1}`,
  team1: "TBD",
  team2: "TBD",
  score1: "—",
  score2: "—",
}));

// Phase 4 — Semifinals: 2 matches
export const semifinalMatches: KnockoutMatch[] = Array.from({ length: 2 }, (_, i) => ({
  id: i + 1,
  label: `SF ${i + 1}`,
  team1: "TBD",
  team2: "TBD",
  score1: "—",
  score2: "—",
}));

// Phase 5 — Final: 1 match
export const finalMatch: KnockoutMatch[] = [
  {
    id: 1,
    label: "Final",
    team1: "TBD",
    team2: "TBD",
    score1: "—",
    score2: "—",
  },
];

export const groupStageNotice = {
  title: "Group stage fixtures will be published after the knockout phase concludes.",
  subtitle:
    "The 9 winners from the knockout round will be placed into 3 groups of 3. Full fixture schedule posted here after results are confirmed.",
};

export const knockoutStageNotice = {
  title: "Knockout stage fixtures will be published after the group phase concludes.",
  subtitle:
    "Top 2 from each group + 2 best third-place finishers advance to the quarterfinals.",
};
