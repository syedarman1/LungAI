"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Upload,
  Cpu,
  FileText,
  ShieldCheck,
  Zap,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  { value: "80%", label: "Stage 1 5-yr survival" },
  { value: "<5%", label: "Stage 4 5-yr survival" },
  { value: "70%", label: "Cases caught too late" },
  { value: "1 in 5", label: "Cancer deaths globally" },
];

const steps = [
  {
    icon: Upload,
    title: "Upload",
    body: "Drop in a CT slice (JPG or PNG). Files never leave memory.",
  },
  {
    icon: Cpu,
    title: "Analyze",
    body: "A CNN runs inference on the slice in under a second.",
  },
  {
    icon: FileText,
    title: "Review",
    body: "See a binary classification with a confidence score and raw model output.",
  },
];

const features = [
  {
    icon: Zap,
    title: "Sub-second inference",
    body: "TensorFlow + FastAPI on the backend. No queues, no waiting.",
  },
  {
    icon: ShieldCheck,
    title: "Zero retention",
    body: "Uploads are processed in memory and discarded. Nothing is logged or stored.",
  },
  {
    icon: Activity,
    title: "Open source",
    body: "Frontend, backend, and training pipeline are all on GitHub. Audit everything.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute inset-0 bg-radial-fade pointer-events-none" />

        <div className="container relative pt-24 pb-32 md:pt-32 md:pb-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="default" className="mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Educational Research Demo
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                Early detection,
                <br />
                <span className="text-primary text-glow">measured in seconds.</span>
              </h1>

              <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
                LungAI is an open-source CNN that screens lung CT slices for
                signs of cancer. Upload a scan and get a confidence score in
                under a second.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/test">
                    Analyze a scan
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/how-it-works">How it works</Link>
                </Button>
              </div>

              <p className="mt-8 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                NOT A MEDICAL DEVICE · CONSULT A LICENSED CLINICIAN
              </p>
            </motion.div>

            {/* Scan visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="scan-frame aspect-square max-w-md mx-auto glow-cyan p-6">
                <div className="absolute top-3 left-4 data-label">CT-SLICE-001</div>
                <div className="absolute top-3 right-4 data-label">224×224</div>

                {/* Mock CT visual */}
                <div className="absolute inset-12 rounded-full border border-primary/20" style={{ background: "radial-gradient(circle at 40% 40%, hsl(var(--muted)), hsl(var(--secondary)) 60%, hsl(var(--primary) / 0.25) 100%)" }}>
                  <div className="absolute inset-6 rounded-full border border-primary/15" />
                  <div className="absolute inset-12 rounded-full border border-primary/10" />
                  <div
                    className="absolute h-3 w-3 rounded-full bg-primary/80 blur-[2px] animate-pulse-ring"
                    style={{ top: "38%", left: "42%" }}
                  />
                  <div
                    className="absolute h-2 w-2 rounded-full bg-primary/60 animate-pulse-ring"
                    style={{ top: "55%", left: "58%", animationDelay: "1s" }}
                  />
                </div>

                <div className="absolute bottom-3 left-4 data-label">
                  CONFIDENCE <span className="text-primary">94.2%</span>
                </div>
                <div className="absolute bottom-3 right-4 data-label">
                  <span className="text-success">● ANALYZED</span>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 hidden lg:block">
                <Badge variant="success">MODEL ACTIVE</Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border/60 bg-card/30">
        <div className="container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center md:text-left"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary text-glow">
                  {s.value}
                </div>
                <div className="data-label mt-2">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container py-24">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">PIPELINE</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Three steps. One result.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Upload, analyze, review. The whole loop runs locally against your
            backend instance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-11 w-11 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="data-label">STEP {String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.body}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="container py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.title}>
                <CardContent className="pt-6">
                  <Icon className="h-6 w-6 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.body}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card/40 p-12 md:p-16">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute inset-0 bg-radial-fade" />
          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Try it on a scan now.
            </h2>
            <p className="text-muted-foreground mb-8">
              Run the model against any lung CT slice. No signup, no tracking,
              no retention.
            </p>
            <Button asChild size="lg">
              <Link href="/test">
                Open analyzer
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
