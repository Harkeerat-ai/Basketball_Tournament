import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MPBL 2026 — Mumbai Premier Basketball League",
  icons: { icon: "/favicon.svg" },
  description:
    "5-on-5 open category basketball tournament in Mumbai. 16 teams compete for ₹45,000 in prizes at Dominic Savio, Andheri East.",
  keywords: [
    "MPBL",
    "Mumbai Premier Basketball League",
    "basketball tournament",
    "Mumbai basketball",
    "Savio basketball",
    "Andheri basketball",
  ],
  openGraph: {
    title: "Mumbai Premier Basketball League 2026",
    description:
      "5-on-5 open category basketball tournament. 16 teams. ₹45,000 in prizes.",
    type: "website",
    siteName: "MPBL 2026",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "MPBL 2026 — Mumbai Premier Basketball League",
    description:
      "5-on-5 open category basketball tournament. 16 teams. ₹45,000 in prizes.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Russo+One&family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,700;0,900;1,700&family=Barlow:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
