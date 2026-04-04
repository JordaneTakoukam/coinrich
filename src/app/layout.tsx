import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coin Rich — AI-Powered Crypto Trading",
  description:
    "Trade smarter with AI. Analyze markets, predict trends, and trade with Tuffy AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
