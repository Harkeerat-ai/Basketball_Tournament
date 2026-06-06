"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/navigation";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks
        .filter((l) => !l.isExternal)
        .map((l) => l.section);

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActive(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (section: string) => {
    setMenuOpen(false);
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-[66px] z-[1000] flex items-center justify-between px-[18px] md:px-[44px] bg-[rgba(6,6,6,0.97)] backdrop-blur-[24px] border-b border-bdOr">
      <button
        onClick={() => handleNav("home")}
        className="flex items-center gap-[11px] cursor-pointer bg-transparent border-none"
        aria-label="Go to home"
      >
        <div className="w-[38px] h-[38px] rounded-full bg-or flex items-center justify-center relative overflow-hidden flex-shrink-0">
          <span className="relative z-10 text-[20px]">🏀</span>
        </div>
        <div className="leading-[1.18] text-left">
          <span className="font-russo text-[20px] text-gold block">MPBL</span>
          <span className="text-[10.5px] font-bold tracking-[1.8px] text-gr uppercase block">
            Mumbai Premier
          </span>
        </div>
      </button>

      <button
        className="md:hidden bg-transparent border-none text-ow cursor-pointer p-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <ul
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row absolute md:relative top-[66px] md:top-0 left-0 right-0 bg-[rgba(6,6,6,0.98)] md:bg-transparent backdrop-blur-[24px] md:backdrop-blur-none p-4 md:p-0 gap-1 md:gap-[3px] items-stretch md:items-center list-none border-b border-bdOr md:border-none`}
        style={{ zIndex: 999 }}
      >
        {navLinks.map((link) => (
          <li key={link.section}>
            {link.isExternal ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`block px-[15px] py-[9px] md:py-[7px] font-bold text-[13.5px] tracking-[1.4px] uppercase rounded-[7px] transition-colors duration-200 ${
                  link.isRegister
                    ? "bg-or text-white hover:bg-or2 hover:-translate-y-[1px] hover:shadow-[0_6px_22px_rgba(232,69,0,0.4)]"
                    : "text-gl hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            ) : (
              <button
                onClick={() => handleNav(link.section)}
                className={`block w-full text-left px-[15px] py-[9px] md:py-[7px] font-bold text-[13.5px] tracking-[1.4px] uppercase rounded-[5px] transition-colors duration-200 bg-transparent border-none cursor-pointer ${
                  active === link.section
                    ? "text-or2 bg-[rgba(232,69,0,0.13)]"
                    : "text-gl hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
