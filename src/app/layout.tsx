import type { Metadata } from "next";
import { Spline_Sans } from "next/font/google";
import "./globals.css";

const splineSans = Spline_Sans({
  variable: "--font-spline-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Colorado AI Lab",
  description: "AI at the University of Colorado Boulder",
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${splineSans.variable} antialiased bg-background-light dark:bg-background-dark text-text-main dark:text-text-light font-display flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
