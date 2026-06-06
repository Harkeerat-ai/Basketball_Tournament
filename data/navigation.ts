import { NavLink } from "@/lib/types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home", section: "home" },
  { label: "Tournament", href: "#tournament", section: "tournament" },
  { label: "Teams", href: "#teams", section: "teams" },
  { label: "Fixtures", href: "#fixtures", section: "fixtures" },
  { label: "Table", href: "#table", section: "table" },
  {
    label: "Register ↗",
    href: "https://forms.gle/XQwvJnboX8TaanCeA",
    section: "register",
    isExternal: true,
    isRegister: true,
  },
];
