import Link from "next/link";
import { ScanLine, Github, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[hsl(var(--graphite))] text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[hsl(var(--aqua)/0.22)] bg-white/10">
                <ScanLine className="h-5 w-5 text-[hsl(var(--aqua))]" />
              </div>
              <div>
                <span className="text-base font-bold">
                  Lung<span className="text-[hsl(var(--aqua))]">AI</span>
                </span>
                <p className="text-xs font-mono uppercase text-white/50">
                  Open-source imaging demo
                </p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/60">
              A polished educational interface for AI-assisted analysis of lung
              CT scans. The model is experimental; the clinical disclaimer is
              not decorative.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-[hsl(var(--amber)/0.4)] bg-[hsl(var(--amber)/0.12)] px-3 py-2 text-xs text-[hsl(var(--amber))]">
              <ShieldCheck className="h-4 w-4" />
              Educational use only. Not a medical device.
            </div>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs uppercase text-[hsl(var(--aqua))]">Pages</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/early-detection"
                  className="text-white/60 hover:text-[hsl(var(--aqua))]"
                >
                  Early Detection
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-white/60 hover:text-[hsl(var(--aqua))]"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-use"
                  className="text-white/60 hover:text-[hsl(var(--aqua))]"
                >
                  How to Use
                </Link>
              </li>
              <li>
                <Link href="/test" className="text-white/60 hover:text-[hsl(var(--aqua))]">
                  Analyze Scan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs uppercase text-[hsl(var(--aqua))]">Resources</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.cdc.gov/cancer/lung/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 hover:text-[hsl(var(--aqua))]"
                >
                  CDC Lung Cancer
                </a>
              </li>
              <li>
                <a
                  href="https://www.cancer.org/research/cancer-facts-statistics.html"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 hover:text-[hsl(var(--aqua))]"
                >
                  ACS Stats
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/syedarman1/LungAI"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-white/60 hover:text-[hsl(var(--aqua))]"
                >
                  <Github className="h-3.5 w-3.5" />
                  Source
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} LungAI · MIT Licensed</p>
          <p className="font-mono uppercase">No diagnosis · no clinical use</p>
        </div>
      </div>
    </footer>
  );
}
