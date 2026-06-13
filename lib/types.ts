export interface NavLink {
  label: string;
  href: string;
  section: string;
  isExternal?: boolean;
  isRegister?: boolean;
}

export interface InfoCard {
  icon: string;
  label: string;
  value: string;
  note: string;
}

export interface PrizeTier {
  icon: string;
  position: string;
  amount: string;
  description: string;
}

export interface EntryFee {
  amount: number;
  label: string;
  deadline: string;
  note: string;
}

export interface EventDetail {
  key: string;
  value: string;
}

export interface FormatStep {
  number: number;
  title: string;
  description: string;
}

export interface Rule {
  icon: string;
  text: string;
}

export interface RegistrationRequirement {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  icon: string;
  title: string;
  description: string;
}

export interface Contact {
  phone: string;
  label: string;
}

export interface KnockoutMatch {
  id: number;
  label: string;
  team1: string;
  team2: string;
  score1: string;
  score2: string;
  status?: "scheduled" | "live" | "completed";
}

export interface StandingRow {
  rank: number;
  team: string;
  played: string;
  won: string;
  lost: string;
  diff: string;
  pts: string;
  isTop?: boolean;
  isTbd?: boolean;
}

export interface GroupMatch extends KnockoutMatch {
  group: string;
}

export interface GroupStandings {
  group: string;
  rows: StandingRow[];
}
