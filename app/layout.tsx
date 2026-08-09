import type { Metadata } from "next";
import { satoshi } from "./fonts/satoshi";
import "./globals.css";

export const metadata: Metadata = {
  title: "the round — Clinical speaking practice for student midwives",
  description:
    "Get a clinical topic you didn't choose and answer it against the clock. Replay what you said, notice what needs work, and go again — until the words come easier.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${satoshi.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
