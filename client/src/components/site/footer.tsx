import Link from "next/link";
import { Github, ScanLine, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border clinical-band">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-primary">
                <ScanLine className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </div>
              <div>
                <span className="text-[15px] font-medium text-foreground">
                  LungAI
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
            <div className="disclaimer-banner mt-5 max-w-md">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
              <p>Educational use only. Not a medical device.</p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-foreground">Pages</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/early-detection", label: "Early Detection" },
                { href: "/how-it-works", label: "How It Works" },
                { href: "/how-to-use", label: "How to Use" },
                { href: "/test", label: "Analyze scan" },
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
            <p className="mb-3 text-sm font-medium text-foreground">Resources</p>
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
                  <Github className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Source
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border/70 pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} LungAI · MIT Licensed</p>
          <p>Not for diagnosis or clinical use</p>
        </div>
      </div>
    </footer>
  );
}
