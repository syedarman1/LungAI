"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Activity,
  BrainCircuit,
  Gauge,
  Microscope,
  Radar,
  ShieldCheck,
  Upload,
  Zap,
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
    icon: Radar,
    title: "Radiology-style command surface",
    body: "Designed around fast scanning, immediate status, and a clear result hierarchy.",
  },
  {
    icon: ShieldCheck,
    title: "Educational guardrails",
    body: "The UI keeps medical limitations visible without turning the app into a warning page.",
  },
  {
    icon: Microscope,
    title: "Model transparency",
    body: "The analyzer exposes threshold and raw score so the demo feels inspectable.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <Image
          src="/visuals/lungai-hero.png"
          alt="AI-assisted lung CT analysis interface"
          fill
          priority
          className="absolute inset-0 -z-20 object-cover"
        />
        <div className="hero-vignette absolute inset-0 -z-10" />
        <div className="grid-bg absolute inset-0 -z-10 opacity-30" />

        <div className="container relative pt-24 pb-12 md:pt-32 md:pb-16">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <Badge className="mb-6 border-[hsl(var(--aqua)/0.3)] bg-[hsl(var(--aqua)/0.1)] text-[hsl(var(--aqua))]">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--aqua))]" />
                Open-source medical AI demo
              </Badge>

              <h1 className="max-w-3xl text-5xl font-bold leading-[1.03] md:text-7xl">
                Lung CT analysis that feels clinical, fast, and clear.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                LungAI turns a simple model endpoint into a polished diagnostic
                console: upload a CT slice, run inference, and review the result
                with confidence, threshold, and raw score in one focused view.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="bg-[hsl(var(--aqua))] text-primary hover:bg-[hsl(var(--background))]">
                  <Link href="/test">
                    Analyze a scan
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                  <Link href="/how-it-works">View pipeline</Link>
                </Button>
              </div>

              <div className="mt-8 flex max-w-2xl items-start gap-3 rounded-lg border border-[hsl(var(--amber)/0.3)] bg-[hsl(var(--amber)/0.12)] p-4 text-sm text-[hsl(var(--amber))]">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--amber))]" />
                <p>
                  Educational use only. LungAI is not a medical device and must
                  not be used for diagnosis or treatment decisions.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="mt-12 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="metric-pill rounded-lg px-4 py-3">
                <div className="font-mono text-2xl font-semibold text-[hsl(var(--aqua))]">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs uppercase text-white/50">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="soft-band border-b border-border/70">
        <div className="container grid gap-10 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="section-kicker mb-3">Designed for trust</p>
            <h2 className="max-w-xl text-3xl font-bold leading-tight md:text-5xl">
              A simple backend, wrapped in a serious clinical experience.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              The frontend does the heavy lifting: clear patient-safe language,
              obvious upload states, visible model metadata, and a result panel
              that feels more like an imaging workstation than a class project.
            </p>
          </div>

          <div className="diagnostic-panel p-5 text-white">
            <div className="relative z-10 grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
              <div className="scan-frame aspect-square">
                <div className="absolute left-4 top-3 z-10 data-label text-[hsl(var(--aqua))]/70">
                  Sample CT
                </div>
                <div className="absolute right-4 top-3 z-10 data-label text-[hsl(var(--aqua))]/70">
                  224 x 224
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/samples/sample1.png"
                  alt="Sample CT scan"
                  className="absolute inset-0 h-full w-full object-contain p-8 opacity-90"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_38%,hsl(var(--graphite)_/_0.35)_70%)]" />
              </div>

              <div className="space-y-3">
                <div className="rounded-lg border border-[hsl(var(--aqua)/0.22)] bg-white/10 p-4">
                  <div className="flex items-center justify-between text-xs text-[hsl(var(--aqua))]/70">
                    <span className="font-mono uppercase">Inference</span>
                    <span className="text-[hsl(var(--aqua))]">Complete</span>
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <div className="text-3xl font-bold text-[hsl(var(--aqua))]">91%</div>
                      <div className="mt-1 text-sm text-white/60">Confidence</div>
                    </div>
                    <Activity className="h-10 w-10 text-[hsl(var(--aqua))]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-white/10 bg-white/10 p-3">
                    <p className="data-label text-white/50">Raw score</p>
                    <p className="mt-1 font-mono text-lg text-white">0.9187</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/10 p-3">
                    <p className="data-label text-white/50">Threshold</p>
                    <p className="mt-1 font-mono text-lg text-white">0.35</p>
                  </div>
                </div>

                <div className="rounded-lg border border-[hsl(var(--amber)/0.3)] bg-[hsl(var(--amber)/0.12)] p-3 text-sm text-[hsl(var(--amber))]">
                  Flagged results should always be reviewed by a clinician.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="section-kicker mb-3">Workflow</p>
            <h2 className="text-3xl font-bold md:text-5xl">Three steps, no friction.</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/how-to-use">
              How to use it
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {workflow.map((step, i) => {
            const Icon = step.icon;
            return (
              <Card key={step.title} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {step.body}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="container pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-primary/20 bg-white/75">
                <CardContent className="p-6">
                  <Icon className="mb-5 h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {feature.body}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="container pb-24">
        <div className="dark-glass relative overflow-hidden rounded-lg p-8 text-white md:p-12">
          <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="font-mono text-xs uppercase text-[hsl(var(--aqua))]">Ready console</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-5xl">
                Open the analyzer and make the frontend do the talking.
              </h2>
            </div>
            <Button asChild size="lg" className="bg-[hsl(var(--aqua))] text-primary hover:bg-[hsl(var(--background))]">
              <Link href="/test">
                Launch analyzer
                <Zap className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
