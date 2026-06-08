"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
  { value: "JPG/PNG", label: "Accepted files" },
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
        <div className="container grid gap-12 py-16 md:grid-cols-2 md:items-center md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Badge variant="secondary" className="mb-5">
              Open-source medical AI demo
            </Badge>

            <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl md:leading-tight">
              Lung CT analysis that is clear, fast, and honest.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
              Upload a CT slice, run inference, and review the result with
              confidence, threshold, and raw score in one focused view.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/test">
                  Analyze a scan
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/how-it-works">View pipeline</Link>
              </Button>
            </div>

            <div className="disclaimer-banner mt-8 max-w-lg">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Educational use only. LungAI is not a medical device and must
                not be used for diagnosis or treatment decisions.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-xl border border-border bg-background p-5 shadow-sm"
          >
            <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
              <div className="scan-viewer aspect-square">
                <div className="absolute left-3 top-3 z-10 data-label text-white/60">
                  Sample CT
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/samples/sample1.png"
                  alt="Sample CT scan"
                  className="absolute inset-0 h-full w-full object-contain p-6"
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <span className="data-label">Inference</span>
                    <span className="text-xs font-medium text-success">Complete</span>
                  </div>
                  <div className="mt-3">
                    <div className="text-3xl font-semibold text-foreground">91%</div>
                    <div className="text-sm text-muted-foreground">Confidence</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border bg-card p-3">
                    <p className="data-label">Raw score</p>
                    <p className="mt-1 font-mono text-sm font-medium">0.9187</p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-3">
                    <p className="data-label">Threshold</p>
                    <p className="mt-1 font-mono text-sm font-medium">0.35</p>
                  </div>
                </div>

                <div className="rounded-lg border border-warning/30 bg-warning/10 px-3 py-2.5 text-xs text-warning-foreground">
                  Flagged results should always be reviewed by a clinician.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card px-4 py-4 text-center"
            >
              <div className="font-mono text-xl font-semibold text-primary">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="container py-16 md:py-20">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="section-label mb-2">Workflow</p>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Three steps, no friction.
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/how-to-use">
                How to use it
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {workflow.map((step, i) => {
              const Icon = step.icon;
              return (
                <Card key={step.title}>
                  <CardContent className="p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-sm text-muted-foreground">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
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

      <section className="container py-16 md:py-20">
        <p className="section-label mb-2">Why LungAI</p>
        <h2 className="mb-8 max-w-xl text-2xl font-semibold tracking-tight md:text-3xl">
          A simple backend, wrapped in a clear clinical experience.
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title}>
                <CardContent className="p-6">
                  <Icon className="mb-4 h-5 w-5 text-primary" />
                  <h3 className="text-base font-semibold">{feature.title}</h3>
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
        <div className="rounded-xl border border-border bg-card p-8 md:flex md:items-center md:justify-between md:p-10">
          <div>
            <p className="section-label mb-2">Ready to try</p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Open the analyzer and run a sample scan.
            </h2>
          </div>
          <Button asChild size="lg" className="mt-6 shrink-0 md:mt-0">
            <Link href="/test">
              Launch analyzer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
