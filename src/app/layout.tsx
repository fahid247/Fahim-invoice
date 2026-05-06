import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOZUMDER PHONE CENTER Billing | Modern Invoice System",
  description: "Generate professional invoices automatically.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
