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
  title: "LungAI · Lung CT Analysis Demo",
  description:
    "An open-source educational demo for lung CT slice analysis. Upload a scan, review model output, and read confidence, threshold, and raw score in a clear clinical layout.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 pt-[4.25rem]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
