"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScanLine, Github, Menu, Stethoscope, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/early-detection", label: "Early Detection" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/how-to-use", label: "How to Use" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[hsl(var(--graphite))] text-white shadow-[0_8px_24px_-16px_hsl(var(--primary)/0.5)]">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-md border border-[hsl(var(--aqua)/0.22)] bg-white/10 shadow-[0_0_34px_-18px_hsl(var(--aqua))]">
            <ScanLine className="h-5 w-5 text-[hsl(var(--aqua))] transition-all group-hover:scale-110" />
            <div className="absolute inset-0 rounded-md bg-[hsl(var(--aqua))]/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
          </div>
          <div className="leading-none">
            <span className="text-lg font-bold">
              Lung<span className="text-[hsl(var(--aqua))]">AI</span>
            </span>
            <span className="mt-1 hidden text-[10px] font-mono uppercase text-[hsl(var(--aqua))]/60 sm:block">
              CT Analysis Demo
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-[hsl(var(--aqua)/0.1)] text-[hsl(var(--aqua))]"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://github.com/syedarman1/LungAI"
            target="_blank"
            rel="noreferrer"
            className="rounded-md p-2 text-white/60 hover:bg-white/10 hover:text-white"
            aria-label="Open GitHub repository"
          >
            <Github className="h-4 w-4" />
          </a>
          <Button asChild size="sm" className="bg-[hsl(var(--aqua))] text-primary hover:bg-[hsl(var(--background))]">
            <Link href="/test">
              <Stethoscope className="h-4 w-4" />
              Analyze
            </Link>
          </Button>
        </div>

        <button
          className="rounded-md p-2 text-white hover:bg-white/10 md:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[hsl(var(--graphite)_/_0.96)] backdrop-blur-2xl md:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-4 py-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-[hsl(var(--aqua)/0.1)] text-[hsl(var(--aqua))]"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button asChild className="mt-2 bg-[hsl(var(--aqua))] text-primary hover:bg-[hsl(var(--background))]">
              <Link href="/test" onClick={() => setOpen(false)}>
                Analyze Scan
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
