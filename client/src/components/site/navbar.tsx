"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Menu, ScanLine, X } from "lucide-react";
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
    <header className="fixed top-0 left-0 z-50 w-full border-b border-border/80 bg-card/90 backdrop-blur-md">
      <div className="container flex h-[4.25rem] items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary/80 text-primary">
            <ScanLine className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </div>
          <div className="leading-tight">
            <span className="text-[15px] font-medium text-foreground">
              LungAI
            </span>
            <span className="block text-[11px] text-muted-foreground">
              CT analysis demo
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm transition-colors",
                  active
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="https://github.com/syedarman1/LungAI"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
            aria-label="Open GitHub repository"
          >
            <Github className="h-4 w-4" strokeWidth={1.75} />
          </a>
          <Button asChild size="sm">
            <Link href="/test">Analyze scan</Link>
          </Button>
        </div>

        <button
          className="rounded-lg p-2 text-foreground hover:bg-secondary/70 md:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-card md:hidden">
          <nav className="container flex flex-col gap-0.5 py-3">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm",
                    active
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-secondary/70"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button asChild className="mt-2">
              <Link href="/test" onClick={() => setOpen(false)}>
                Analyze scan
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
