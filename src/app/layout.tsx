import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Snowflake Expansion Engine",
  description: "Persona → Demo Recipe → Outreach"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}

