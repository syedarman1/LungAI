"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Upload,
  Cpu,
  FileText,
  Layers,
  Network,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    icon: Upload,
    n: "01",
    title: "Upload",
    body: "A CT slice is sent to the FastAPI backend as multipart form data.",
  },
  {
    icon: Layers,
    n: "02",
    title: "Preprocess",
    body: "Image is converted to grayscale, resized to 224×224, and normalized to [0, 1].",
  },
  {
    icon: Network,
    n: "03",
    title: "Convolution",
    body: "A small CNN runs two Conv2D + MaxPool blocks followed by a dense head.",
  },
  {
    icon: Gauge,
    n: "04",
    title: "Sigmoid",
    body: "The final layer outputs a probability between 0 and 1.",
  },
  {
    icon: FileText,
    n: "05",
    title: "Threshold",
    body: "Scores above 0.5 are flagged. The raw score is returned for transparency.",
  },
  {
    icon: Cpu,
    n: "06",
    title: "Response",
    body: "JSON is returned with label, confidence, raw score, and threshold.",
  },
];

const compare = [
  {
    title: "Traditional radiology",
    bullets: [
      "Days to weeks for scans to be reviewed",
      "Subject to human fatigue and oversight",
      "Limited specialist access in many regions",
    ],
    tone: "muted",
  },
  {
    title: "AI-assisted screening",
    bullets: [
      "Sub-second inference per slice",
      "Consistent baseline across millions of scans",
      "Available anywhere there's a browser",
    ],
    tone: "primary",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div className="absolute inset-0 bg-radial-fade pointer-events-none" />
        <div className="container relative pt-24 pb-20 text-center">
          <Badge variant="default" className="mb-4">PIPELINE</Badge>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            How LungAI
            <br />
            <span className="text-primary text-glow">processes a scan.</span>
          </motion.h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            A trained CNN runs convolutional inference over a 224×224 grayscale
            CT slice and returns a binary classification with a confidence score.
          </p>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-11 w-11 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="data-label">{step.n}</span>
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

      <section className="container py-20">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-3">COMPARISON</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Why AI-assisted screening matters
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {compare.map((c) => (
            <Card
              key={c.title}
              className={
                c.tone === "primary"
                  ? "border-primary/40 bg-primary/5"
                  : ""
              }
            >
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">{c.title}</h3>
                <ul className="space-y-3">
                  {c.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <div
                        className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${
                          c.tone === "primary" ? "bg-primary" : "bg-border"
                        }`}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card/40 p-12 text-center">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute inset-0 bg-radial-fade" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              See it in action.
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Run the model against a CT slice and watch it return a confidence
              score in real time.
            </p>
            <Button asChild size="lg">
              <Link href="/test">
                Open analyzer <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
