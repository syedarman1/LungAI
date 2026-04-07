import Link from "next/link";
import { Activity, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/40 mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-5 w-5 text-primary" />
              <span className="text-base font-bold tracking-tight">
                Lung<span className="text-primary">AI</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              An educational research demo for AI-assisted analysis of lung CT
              scans. Not a medical device. Always consult a licensed clinician
              for diagnosis.
            </p>
          </div>

          <div>
            <p className="data-label mb-3">Pages</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/early-detection"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Early Detection
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-use"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  How to Use
                </Link>
              </li>
              <li>
                <Link
                  href="/test"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Analyze Scan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="data-label mb-3">Resources</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.cdc.gov/cancer/lung/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  CDC Lung Cancer
                </a>
              </li>
              <li>
                <a
                  href="https://www.cancer.org/research/cancer-facts-statistics.html"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  ACS Stats
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/syedarman1/LungAI"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                >
                  <Github className="h-3.5 w-3.5" />
                  Source
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} LungAI · MIT Licensed</p>
          <p className="font-mono">FOR EDUCATIONAL USE ONLY · NOT A MEDICAL DEVICE</p>
        </div>
      </div>
    </footer>
  );
}
