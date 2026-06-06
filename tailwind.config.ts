import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#060606",
        surf: "#111111",
        surf2: "#1a1a1a",
        surf3: "#242424",
        or: "#e84500",
        or2: "#ff6030",
        gold: "#ffb800",
        goldL: "#ffd700",
        ow: "#eeece6",
        gl: "#b4b4b4",
        gr: "#6e6e6e",
        gd: "#2c2c2c",
        bdr: "rgba(255,255,255,0.06)",
        bdOr: "rgba(232,69,0,0.36)",
        bdGo: "rgba(255,184,0,0.28)",
      },
      fontFamily: {
        russo: ["'Russo One'", "sans-serif"],
        barlow: ["'Barlow Condensed'", "sans-serif"],
        barlow2: ["Barlow", "sans-serif"],
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        pfade: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        smb: {
          "0%,100%": { transform: "translateX(-50%) translateY(0)", opacity: "1" },
          "75%": { transform: "translateX(-50%) translateY(13px)", opacity: ".2" },
        },
      },
      animation: {
        pfade: "pfade 0.35s ease both",
        smb: "smb 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
