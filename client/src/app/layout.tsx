import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LungAI · AI-Assisted Lung CT Analysis",
  description:
    "An open-source educational demo for AI-assisted analysis of lung CT scans. Upload a slice and see a preliminary risk assessment.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
