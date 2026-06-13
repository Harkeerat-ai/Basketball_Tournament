import { NavLink } from "@/lib/types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home", section: "home" },
  { label: "Teams", href: "#registered-teams", section: "registered-teams" },
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

