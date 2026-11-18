import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expert AI — Turn ordinary workers into experts",
  description: "AI copilot for complex paperwork: immigration, benefits, taxes, insurance, medical billing. Inspired by YC RFS: The $15-an-Hour Expert.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900">{children}</body>
    </html>
  );
}
