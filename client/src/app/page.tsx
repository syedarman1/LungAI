"use client";

import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Gauge,
  Microscope,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  { value: "224", label: "Pixel input" },
  { value: "0.35", label: "Model threshold" },
  { value: "10 MB", label: "Upload limit" },
  { value: "JPG / PNG", label: "Accepted files" },
];

const workflow = [
  {
    icon: Upload,
    title: "Upload a CT slice",
    body: "Drop in a JPG or PNG, or use a built-in sample scan to run the demo instantly.",
  },
  {
    icon: BrainCircuit,
    title: "Run inference",
    body: "FastAPI routes the image through TensorFlow and returns a transparent raw score.",
  },
  {
    icon: Gauge,
    title: "Interpret carefully",
    body: "The interface separates confidence, threshold, label, and medical disclaimer.",
  },
];

const features = [
  {
    icon: Microscope,
    title: "Model transparency",
    body: "The analyzer exposes threshold and raw score so the demo feels inspectable.",
  },
  {
    icon: ShieldCheck,
    title: "Educational guardrails",
    body: "Medical limitations stay visible without turning the app into a warning page.",
  },
  {
    icon: Gauge,
    title: "Clear result hierarchy",
    body: "Confidence, label, and metadata are organized for quick review.",
  },
];

export default function Home() {
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="container grid gap-10 py-14 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-14 md:py-20">
          <div>
            <Badge variant="secondary" className="mb-5">
              Educational imaging demo
            </Badge>

            <h1 className="max-w-lg text-[2rem] font-medium leading-snug text-foreground md:text-[2.65rem] md:leading-tight">
              Lung CT review, presented with clinical clarity.
            </h1>

            <p className="mt-5 max-w-md text-[15px] leading-7 text-muted-foreground">
              Upload a slice, run inference, and review confidence, threshold,
              and raw score in a layout modeled after a simple imaging readout.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/test">
                  Analyze scan
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/how-it-works">View pipeline</Link>
              </Button>
            </div>

            <div className="disclaimer-banner mt-8 max-w-md">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
              <p>
                Educational use only. LungAI is not a medical device and must
                not be used for diagnosis or treatment decisions.
              </p>
            </div>
          </div>

          <div className="readout-panel">
            <div className="border-b border-border/70 px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium text-foreground">Sample readout</p>
                <Badge variant="secondary" className="text-[11px]">
                  Example only
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Demo patient · axial slice · not a live result
              </p>
            </div>

            <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
              <div className="border-b border-border/70 p-4 md:border-b-0 md:border-r">
                <div className="scan-viewer aspect-square">
                  <div className="absolute left-3 top-3 z-10 data-label text-white/55">
                    Sample CT
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/samples/sample1.png"
                    alt="Sample CT scan"
                    className="absolute inset-0 h-full w-full object-contain p-5"
                  />
                </div>
              </div>

              <div className="p-1">
                <div className="readout-row">
                  <span className="data-label">Status</span>
                  <span className="text-sm font-medium text-success">Complete</span>
                </div>
                <div className="readout-row">
                  <span className="data-label">Confidence</span>
                  <span className="font-mono text-lg font-medium text-foreground">91%</span>
                </div>
                <div className="readout-row">
                  <span className="data-label">Raw score</span>
                  <span className="font-mono text-sm text-foreground">0.9187</span>
                </div>
                <div className="readout-row">
                  <span className="data-label">Threshold</span>
                  <span className="font-mono text-sm text-foreground">0.35</span>
                </div>
                <div className="px-4 py-3">
                  <p className="text-xs leading-5 text-warning-foreground">
                    Flagged results should always be reviewed by a clinician.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="clinical-card px-4 py-4 text-center"
            >
              <div className="font-mono text-lg font-medium text-primary">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="clinical-band">
        <div className="container py-14 md:py-16">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="section-label mb-1.5">Workflow</p>
              <h2 className="text-xl font-medium text-foreground md:text-2xl">
                Three steps to run the demo
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/how-to-use">
                How to use it
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {workflow.map((step, i) => {
              const Icon = step.icon;
              return (
                <Card key={step.title}>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary/50 text-primary">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        Step {i + 1}
                      </span>
                    </div>
                    <h3 className="font-medium text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {step.body}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container py-14 md:py-16">
        <p className="section-label mb-1.5">Why LungAI</p>
        <h2 className="mb-8 max-w-lg text-xl font-medium text-foreground md:text-2xl">
          A simple backend, presented like a calm imaging review screen.
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title}>
                <CardContent className="p-6">
                  <Icon className="mb-3 h-[18px] w-[18px] text-primary" strokeWidth={1.75} />
                  <h3 className="font-medium text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {feature.body}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="container pb-20">
        <div className="clinical-card-accent flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="section-label mb-1.5">Ready to try</p>
            <h2 className="text-xl font-medium text-foreground md:text-2xl">
              Open the analyzer and run a sample scan.
            </h2>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link href="/test">
              Analyze scan
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
