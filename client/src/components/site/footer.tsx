import Link from "next/link";
import { Github, ScanLine, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ScanLine className="h-[18px] w-[18px]" />
              </div>
              <div>
                <span className="text-base font-semibold text-foreground">
                  Lung<span className="text-primary">AI</span>
                </span>
                <p className="text-xs text-muted-foreground">
                  Open-source imaging demo
                </p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              An educational interface for AI-assisted analysis of lung CT
              scans. The model is experimental; the clinical disclaimer is not
              decorative.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-xs text-warning-foreground">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
              Educational use only. Not a medical device.
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Pages
            </p>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/early-detection", label: "Early Detection" },
                { href: "/how-it-works", label: "How It Works" },
                { href: "/how-to-use", label: "How to Use" },
                { href: "/test", label: "Analyze Scan" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Resources
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.cdc.gov/cancer/lung/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  CDC Lung Cancer
                </a>
              </li>
              <li>
                <a
                  href="https://www.cancer.org/research/cancer-facts-statistics.html"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  ACS Stats
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/syedarman1/LungAI"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Github className="h-3.5 w-3.5" />
                  Source
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} LungAI · MIT Licensed</p>
          <p>No diagnosis · no clinical use</p>
        </div>
      </div>
    </footer>
  );
}
