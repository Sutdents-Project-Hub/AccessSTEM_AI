import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/bricolage-grotesque/wght.css";
import "@fontsource-variable/work-sans/wght.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "AccessSTEM AI | Function Graph Learning Workspace",
  description: "Explore high-school function graphs through text descriptions, coordinates, and step-by-step AI questions.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
