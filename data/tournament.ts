import {
  InfoCard,
  PrizeTier,
  EntryFee,
  EventDetail,
  FormatStep,
  Rule,
  RegistrationRequirement,
  ProcessStep,
} from "@/lib/types";

export const infoCards: InfoCard[] = [
  {
    icon: "📅",
    label: "Date",
    value: "14th June 2026",
    note: "Tentative — subject to confirmation",
  },
  {
    icon: "📍",
    label: "Venue",
    value: "Dominic Savio",
    note: "Shere Punjab, Andheri East, Mumbai 400093",
  },
  {
    icon: "🏀",
    label: "Format",
    value: "5 on 5",
    note: "Open category · Knockout → League",
  },
  {
    icon: "⚡",
    label: "Spots",
    value: "16 Teams Only",
    note: "First come, first served",
  },
];

export const prizeTiers: PrizeTier[] = [
  { icon: "🥇", position: "Winner", amount: "₹30,000", description: "Trophy & Awards" },
  { icon: "🥈", position: "Runner-Up", amount: "₹15,000", description: "Trophy & Awards" },
];

export const entryFee: EntryFee = {
  amount: 3000,
  label: "Per Team",
  deadline: "12th June 2026",
  note: "Team registration is confirmed only after full payment is received.",
};

export const eventDetails: EventDetail[] = [
  { key: "Date", value: "14th June 2026 (Tentative)" },
  { key: "Venue", value: "Dominic Savio, Shere Punjab, Andheri East, Mumbai 400093" },
  { key: "Category", value: "Open Category" },
  { key: "Format", value: "5 on 5 Tournament" },
  { key: "Teams", value: "16 Teams Only — first come, first serve" },
  { key: "Rules", value: "FIBA rules throughout" },
];

export const formatSteps: FormatStep[] = [
  { number: 1, title: "First Round — Knockout", description: "All 16 teams compete. Losers are eliminated immediately." },
  { number: 2, title: "Top 8 Teams Qualify", description: "The 8 winners advance to the League Phase." },
  { number: 3, title: "League Matches", description: "Top 8 teams compete in a league format to determine final standings." },
  { number: 4, title: "Championship & Awards", description: "Winner takes ₹30,000 + Trophy. Runner-Up takes ₹15,000 + Trophy." },
];

export const rules: Rule[] = [
  { icon: "⏱️", text: "All teams must report on time. Late arrivals may be disqualified without refund." },
  { icon: "👨‍⚖️", text: "Referee's decision is final. No disputes or arguments will be entertained on court." },
  { icon: "📋", text: "Organizers reserve the right to modify the schedule if necessary at any point." },
  { icon: "🤝", text: "Fair play and sportsmanship are expected from all players, coaches, and supporters." },
  { icon: "🚫", text: "Unsportsmanlike behavior will not be tolerated and may result in immediate disqualification." },
  { icon: "🏀", text: "FIBA rules will be followed throughout the tournament for all match decisions." },
];

export const registrationRequirements: RegistrationRequirement[] = [
  { icon: "👥", title: "Team Size", description: "Minimum 5 players per team. Substitutes allowed. 5-on-5 format per FIBA rules." },
  { icon: "🏀", title: "Category", description: "Open category — all skill levels welcome. No age or club restrictions apply." },
  { icon: "💳", title: "Entry Fee", description: "₹3,000 per team. Full payment required before 12th June 2026 to confirm your slot." },
  { icon: "⚡", title: "Availability", description: "Be available for the full day on 14th June 2026 at Dominic Savio, Andheri East." },
  { icon: "👕", title: "Kit", description: "Teams are encouraged to wear matching jerseys or kit. Jersey numbers preferred." },
  { icon: "📜", title: "Conduct", description: "Sportsmanlike conduct required throughout. FIBA rules apply at all times." },
];

export const processSteps: ProcessStep[] = [
  { number: "01", icon: "📝", title: "Fill the Form", description: "Click the registration link and complete the Google Form with your team details and player list." },
  { number: "02", icon: "💰", title: "Pay the Fee", description: "Pay ₹3,000 via the method specified in the form. Payment must be completed before 12th June 2026." },
  { number: "03", icon: "✅", title: "Get Confirmed", description: "You'll receive registration confirmation once payment clears. Slot is reserved only after full payment." },
  { number: "04", icon: "🏟️", title: "Show Up & Play", description: "Report on time at Dominic Savio, Andheri East on 14th June. Come ready to compete!" },
];
