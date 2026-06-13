import { ref, onValue, update, set, Unsubscribe } from "firebase/database";
import { db } from "./firebase";
import type { KnockoutMatch, GroupMatch, GroupStandings, StandingRow } from "./types";
import {
  knockoutMatches as staticKnockout,
  groupMatches as staticGroup,
  quarterfinalMatches as staticQF,
  semifinalMatches as staticSF,
  finalMatch as staticFinal,
} from "../data/fixtures";
import { groupStandingsData as staticStandings } from "../data/standings";

// --------------- Fixtures ---------------

type FixturePhase = "knockout" | "group" | "quarterfinals" | "semifinals" | "final";

export function subscribeFixtures(
  phase: "group",
  cb: (data: GroupMatch[] | null) => void
): Unsubscribe;
export function subscribeFixtures(
  phase: Exclude<FixturePhase, "group">,
  cb: (data: KnockoutMatch[] | null) => void
): Unsubscribe;
export function subscribeFixtures(
  phase: FixturePhase,
  cb: (data: any[] | null) => void
): Unsubscribe {
  const dbRef = ref(db, `fixtures/${phase}`);

  return onValue(dbRef, (snap) => cb(snap.val()), () => cb(null));
}

export async function updateFixture(
  phase: FixturePhase,
  index: number,
  data: Partial<KnockoutMatch>
): Promise<void> {
  const dbRef = ref(db, `fixtures/${phase}/${index}`);
  await update(dbRef, data);
}

// --------------- Standings ---------------

export function subscribeStandings(
  cb: (data: GroupStandings[] | null) => void
): Unsubscribe {
  const dbRef = ref(db, "standings");
  return onValue(dbRef, (snap) => cb(snap.val()), () => cb(null));
}

export async function updateStanding(
  groupIndex: number,
  rowIndex: number,
  data: Partial<StandingRow>
): Promise<void> {
  const dbRef = ref(db, `standings/${groupIndex}/rows/${rowIndex}`);
  await update(dbRef, data);
}

// --------------- Tournament Phase ---------------

export function subscribeTournamentPhase(
  cb: (phase: string | null) => void
): Unsubscribe {
  const dbRef = ref(db, "tournamentPhase");
  return onValue(dbRef, (snap) => cb(snap.val()), () => cb(null));
}

export async function setTournamentPhase(phase: string): Promise<void> {
  const dbRef = ref(db, "tournamentPhase");
  await set(dbRef, phase);
}

// --------------- Database Seeding ---------------

export async function seedDatabase(): Promise<void> {
  // Set fixtures
  await set(ref(db, "fixtures/knockout"), staticKnockout);
  await set(ref(db, "fixtures/group"), staticGroup);
  await set(ref(db, "fixtures/quarterfinals"), staticQF);
  await set(ref(db, "fixtures/semifinals"), staticSF);
  await set(ref(db, "fixtures/final"), staticFinal);
  
  // Set standings
  await set(ref(db, "standings"), staticStandings);

  // Set initial phase
  await set(ref(db, "tournamentPhase"), "knockout");
}

