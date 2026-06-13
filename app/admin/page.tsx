"use client";

import { useState, useCallback, useEffect } from "react";
import { useFirebaseData } from "@/hooks/useFirebaseData";
import {
  subscribeFixtures,
  updateFixture,
  subscribeStandings,
  updateStanding,
  subscribeTournamentPhase,
  setTournamentPhase,
  seedDatabase,
} from "@/lib/db";
import type { KnockoutMatch, GroupStandings } from "@/lib/types";
import {
  knockoutMatches as staticKnockout,
  groupMatches as staticGroup,
  quarterfinalMatches as staticQF,
  semifinalMatches as staticSF,
  finalMatch as staticFinal,
} from "@/data/fixtures";
import { groupStandingsData as staticStandings } from "@/data/standings";
import { teams as teamList } from "@/data/teams";

const PHASES = ["knockout", "group", "quarterfinals", "semifinals", "final"] as const;
type FixturePhase = (typeof PHASES)[number];
const STATUSES = ["scheduled", "live", "completed"] as const;
const TOURNAMENT_PHASES = ["knockout", "group", "quarterfinals", "semifinals", "finals"] as const;

const getFallbackMatches = (phase: FixturePhase): KnockoutMatch[] => {
  switch (phase) {
    case "knockout": return staticKnockout;
    case "group": return staticGroup;
    case "quarterfinals": return staticQF;
    case "semifinals": return staticSF;
    case "final": return staticFinal;
    default: return [];
  }
};

const teamOptions = [
  { value: "TBD", label: "TBD" },
  ...teamList.map((t) => ({ value: t, label: t })),
];

// ---------- password gate ----------
function useAuth() {
  const [ok, setOk] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const check = () => {
    if (pw === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setOk(true);
      setErr("");
    } else setErr("Wrong password");
  };
  return { ok, pw, setPw, err, check };
}

// ---------- inline toast ----------
function Toast({ msg, isError }: { msg: string; isError?: boolean }) {
  if (!msg) return null;
  return (
    <p className={`mt-2 text-[13px] font-semibold ${isError ? "text-red-400" : "text-green-400"}`}>
      {msg}
    </p>
  );
}

// ---------- main page ----------
export default function AdminPage() {
  const auth = useAuth();
  if (!auth.ok) return <LoginGate auth={auth} />;
  return (
    <div className="min-h-screen bg-bg text-gl p-4 pb-24 max-w-lg mx-auto font-barlow2">
      <h1 className="font-russo text-[22px] text-or2 mb-6 text-center tracking-wider">MPBL ADMIN</h1>
      <SeedSection />
      <ScoreSection />
      <StatusSection />
      <StandingSection />
      <PhaseSection />
    </div>
  );
}

// ---------- login ----------
function LoginGate({ auth }: { auth: ReturnType<typeof useAuth> }) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="w-full max-w-xs bg-surf rounded-2xl p-6 border border-bdr">
        <h1 className="font-russo text-or2 text-[20px] text-center mb-4">ADMIN LOGIN</h1>
        <input
          type="password"
          value={auth.pw}
          onChange={(e) => auth.setPw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && auth.check()}
          placeholder="Password"
          className="w-full bg-surf2 border border-bdr rounded-lg px-4 py-3 text-gl text-[16px] mb-3 outline-none focus:border-or"
        />
        <button onClick={auth.check} className="w-full bg-or text-white font-bold py-3 rounded-lg text-[15px] min-h-[48px]">
          Enter
        </button>
        {auth.err && <p className="text-red-400 text-[13px] mt-2 text-center">{auth.err}</p>}
      </div>
    </div>
  );
}

// ---------- 0. seed database ----------
function SeedSection() {
  const [msg, setMsg] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    if (!window.confirm("Are you sure you want to overwrite all live fixtures and standings with the default template?")) {
      return;
    }
    setLoading(true);
    try {
      await seedDatabase();
      setMsg("Database seeded successfully ✓");
      setIsErr(false);
    } catch (e) {
      setMsg((e as Error).message);
      setIsErr(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Database Actions">
      <p className="text-[12px] text-gr mb-3">
        Initialize or reset the Realtime Database with the default 18-team tournament structure.
      </p>
      <button
        onClick={handleSeed}
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800/50 text-white font-bold py-3 rounded-lg text-[15px] min-h-[48px] transition-colors"
      >
        {loading ? "Seeding..." : "Reset & Seed Database"}
      </button>
      <Toast msg={msg} isError={isErr} />
    </Card>
  );
}

// ---------- 1. update match score ----------
function ScoreSection() {
  const [phase, setPhase] = useState<FixturePhase>("knockout");
  const sub = useCallback((cb: (d: KnockoutMatch[] | null) => void) => subscribeFixtures(phase as any, cb), [phase]);
  const { data: matches } = useFirebaseData<KnockoutMatch[]>(sub, getFallbackMatches(phase), `admin_fixtures_${phase}`);
  const [idx, setIdx] = useState(0);
  const [t1, setT1] = useState("");
  const [t2, setT2] = useState("");
  const [s1, setS1] = useState("");
  const [s2, setS2] = useState("");
  const [msg, setMsg] = useState("");
  const [isErr, setIsErr] = useState(false);

  // Auto-populate when selected match changes
  useEffect(() => {
    if (matches?.[idx]) {
      setT1(matches[idx].team1 || "TBD");
      setT2(matches[idx].team2 || "TBD");
      setS1(matches[idx].score1 || "—");
      setS2(matches[idx].score2 || "—");
    }
  }, [idx, matches]);

  const save = async () => {
    try {
      const data: Partial<KnockoutMatch> = {};
      data.team1 = t1;
      data.team2 = t2;
      data.score1 = s1;
      data.score2 = s2;
      await updateFixture(phase, idx, data);
      setMsg("Score saved ✓");
      setIsErr(false);
    } catch (e) {
      setMsg((e as Error).message);
      setIsErr(true);
    }
  };

  return (
    <Card title="Update Match Score">
      <Label text="Phase" />
      <Select value={phase} onChange={(v) => { setPhase(v as FixturePhase); setIdx(0); }} options={PHASES.map((p) => ({ value: p, label: p }))} />
      <Label text="Match" />
      <Select value={String(idx)} onChange={(v) => setIdx(Number(v))} options={(matches ?? []).map((m, i) => ({ value: String(i), label: m.label }))} />
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div>
          <p className="text-[11px] text-gr mb-1">Home Team</p>
          <Select value={t1} onChange={setT1} options={teamOptions} />
        </div>
        <div>
          <p className="text-[11px] text-gr mb-1">Away Team</p>
          <Select value={t2} onChange={setT2} options={teamOptions} />
        </div>
        <Input label="Home Score" value={s1} onChange={setS1} placeholder={matches?.[idx]?.score1 ?? ""} />
        <Input label="Away Score" value={s2} onChange={setS2} placeholder={matches?.[idx]?.score2 ?? ""} />
      </div>
      <Btn onClick={save}>Save Score</Btn>
      <Toast msg={msg} isError={isErr} />
    </Card>
  );
}

// ---------- 2. match status ----------
function StatusSection() {
  const [phase, setPhase] = useState<FixturePhase>("knockout");
  const sub = useCallback((cb: (d: KnockoutMatch[] | null) => void) => subscribeFixtures(phase as any, cb), [phase]);
  const { data: matches } = useFirebaseData<KnockoutMatch[]>(sub, getFallbackMatches(phase), `admin_fixtures_${phase}`);
  const [idx, setIdx] = useState(0);
  const [status, setStatus] = useState<string>("scheduled");
  const [msg, setMsg] = useState("");
  const [isErr, setIsErr] = useState(false);

  // Auto-populate when selected match changes
  useEffect(() => {
    if (matches?.[idx]) {
      setStatus(matches[idx].status || "scheduled");
    }
  }, [idx, matches]);

  const save = async () => {
    try {
      await updateFixture(phase, idx, { status: status as KnockoutMatch["status"] });
      setMsg("Status updated ✓");
      setIsErr(false);
    } catch (e) {
      setMsg((e as Error).message);
      setIsErr(true);
    }
  };

  return (
    <Card title="Match Status">
      <Label text="Phase" />
      <Select value={phase} onChange={(v) => { setPhase(v as FixturePhase); setIdx(0); }} options={PHASES.map((p) => ({ value: p, label: p }))} />
      <Label text="Match" />
      <Select value={String(idx)} onChange={(v) => setIdx(Number(v))} options={(matches ?? []).map((m, i) => ({ value: String(i), label: m.label }))} />
      <Label text="Status" />
      <Select value={status} onChange={setStatus} options={STATUSES.map((s) => ({ value: s, label: s }))} />
      <Btn onClick={save}>Set Status</Btn>
      <Toast msg={msg} isError={isErr} />
    </Card>
  );
}

// ---------- 3. update standing ----------
function StandingSection() {
  const sub = useCallback((cb: (d: GroupStandings[] | null) => void) => subscribeStandings(cb), []);
  const { data: standings } = useFirebaseData<GroupStandings[]>(sub, staticStandings, "admin_standings");
  const [gi, setGi] = useState(0);
  const [ri, setRi] = useState(0);
  const [team, setTeam] = useState("");
  const [won, setWon] = useState("");
  const [lost, setLost] = useState("");
  const [pts, setPts] = useState("");
  const [played, setPlayed] = useState("");
  const [diff, setDiff] = useState("");
  const [msg, setMsg] = useState("");
  const [isErr, setIsErr] = useState(false);

  const rows = standings?.[gi]?.rows ?? [];

  // Auto-populate when selected standing changes
  useEffect(() => {
    if (rows[ri]) {
      setTeam(rows[ri].team || "TBD");
      setPlayed(rows[ri].played || "—");
      setWon(rows[ri].won || "—");
      setLost(rows[ri].lost || "—");
      setPts(rows[ri].pts || "—");
      setDiff(rows[ri].diff || "—");
    }
  }, [ri, gi, standings]); // eslint-disable-line react-hooks/exhaustive-deps

  const save = async () => {
    try {
      const data: Record<string, any> = {};
      data.team = team;
      data.isTbd = team === "TBD";
      data.won = won;
      data.lost = lost;
      data.pts = pts;
      data.played = played;
      data.diff = diff;
      await updateStanding(gi, ri, data);
      setMsg("Standing updated ✓");
      setIsErr(false);
    } catch (e) {
      setMsg((e as Error).message);
      setIsErr(true);
    }
  };

  return (
    <Card title="Update Standing">
      <Label text="Group" />
      <Select value={String(gi)} onChange={(v) => { setGi(Number(v)); setRi(0); }} options={(standings ?? []).map((g, i) => ({ value: String(i), label: g.group }))} />
      <Label text="Team Row" />
      <Select value={String(ri)} onChange={(v) => setRi(Number(v))} options={rows.map((r, i) => ({ value: String(i), label: `#${r.rank} ${r.team}` }))} />
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="col-span-2">
          <p className="text-[11px] text-gr mb-1">Team Name</p>
          <Select value={team} onChange={setTeam} options={teamOptions} />
        </div>
        <Input label="Played" value={played} onChange={setPlayed} placeholder={rows[ri]?.played ?? ""} />
        <Input label="Won" value={won} onChange={setWon} placeholder={rows[ri]?.won ?? ""} />
        <Input label="Lost" value={lost} onChange={setLost} placeholder={rows[ri]?.lost ?? ""} />
        <Input label="Pts" value={pts} onChange={setPts} placeholder={rows[ri]?.pts ?? ""} />
        <Input label="+/-" value={diff} onChange={setDiff} placeholder={rows[ri]?.diff ?? ""} />
      </div>
      <Btn onClick={save}>Save Standing</Btn>
      <Toast msg={msg} isError={isErr} />
    </Card>
  );
}

// ---------- 4. tournament phase ----------
function PhaseSection() {
  const sub = useCallback((cb: (d: string | null) => void) => subscribeTournamentPhase(cb), []);
  const { data: current } = useFirebaseData<string>(sub, "knockout", "admin_tournament_phase");
  const [selected, setSelected] = useState("");
  const [msg, setMsg] = useState("");
  const [isErr, setIsErr] = useState(false);

  const save = async () => {
    try {
      await setTournamentPhase(selected || current || "knockout");
      setMsg("Phase updated ✓");
      setIsErr(false);
    } catch (e) {
      setMsg((e as Error).message);
      setIsErr(true);
    }
  };

  return (
    <Card title="Tournament Phase">
      <p className="text-[13px] text-gr mb-2">Current: <span className="text-gold font-bold">{current}</span></p>
      <Select value={selected || current || ""} onChange={setSelected} options={TOURNAMENT_PHASES.map((p) => ({ value: p, label: p }))} />
      <Btn onClick={save}>Set Phase</Btn>
      <Toast msg={msg} isError={isErr} />
    </Card>
  );
}

// ============ shared primitives ============

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surf border border-bdr rounded-xl p-5 mb-4">
      <h2 className="font-russo text-[15px] text-or2 tracking-widest uppercase mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Label({ text }: { text: string }) {
  return <p className="text-[12px] text-gr font-bold tracking-widest uppercase mb-1 mt-3">{text}</p>;
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-surf2 border border-bdr rounded-lg px-4 py-3 text-gl text-[15px] outline-none focus:border-or min-h-[48px]"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

function Input({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <p className="text-[11px] text-gr mb-1">{label}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-surf2 border border-bdr rounded-lg px-3 py-3 text-gl text-[15px] outline-none focus:border-or min-h-[48px]"
      />
    </div>
  );
}

function Btn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-or hover:bg-or2 text-white font-bold py-3 rounded-lg text-[15px] mt-4 min-h-[48px] transition-colors"
    >
      {children}
    </button>
  );
}


