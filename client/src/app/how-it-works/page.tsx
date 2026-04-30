"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Cpu,
  FileJson,
  Gauge,
  Image as ImageIcon,
  Layers,
  Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: Upload,
    n: "01",
    title: "Upload",
    body: "The browser sends a JPG or PNG to the FastAPI backend as multipart form data.",
  },
  {
    icon: ImageIcon,
    n: "02",
    title: "Validate",
    body: "The API checks file extension, reads the image into memory, and rejects files above 10 MB.",
  },
  {
    icon: Layers,
    n: "03",
    title: "Preprocess",
    body: "Pillow converts the image to grayscale, repeats it to RGB, and resizes it to 224 x 224.",
  },
  {
    icon: BrainCircuit,
    n: "04",
    title: "Infer",
    body: "TensorFlow runs the Keras model and returns a raw score between 0 and 1.",
  },
  {
    icon: Gauge,
    n: "05",
    title: "Threshold",
    body: "Scores above 0.35 are labeled cancer; lower scores are labeled no_cancer.",
  },
  {
    icon: FileJson,
    n: "06",
    title: "Respond",
    body: "The API returns label, message, confidence, raw_score, and threshold as JSON.",
  },
];

const compare = [
  {
    title: "What the model gives you",
    body: "A binary educational classification, confidence value, raw score, and threshold.",
  },
  {
    title: "What it does not give you",
    body: "A diagnosis, medical recommendation, stage assessment, or clinician-grade report.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[hsl(var(--graphite))] text-white">
        <div className="grid-bg absolute inset-0 opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,hsl(var(--aqua)_/_0.22),transparent_32%),radial-gradient(circle_at_86%_42%,hsl(var(--amber)_/_0.16),transparent_28%)]" />
        <div className="container relative pt-24 pb-16 text-center">
          <Badge className="mb-5 border-[hsl(var(--aqua)/0.3)] bg-[hsl(var(--aqua)/0.1)] text-[hsl(var(--aqua))]">
            <Cpu className="h-3.5 w-3.5" />
            Inference pipeline
          </Badge>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight md:text-6xl"
          >
            From CT slice to transparent model readout.
          </motion.h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70">
            LungAI keeps the pipeline intentionally visible: upload, validate,
            preprocess, infer, threshold, and return a structured result.
          </p>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card className="h-full overflow-hidden">
                  <CardContent className="p-6">
                    <div className="mb-7 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-sm text-muted-foreground">
                        {step.n}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {step.body}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="soft-band border-y border-border/70">
        <div className="container grid gap-5 py-16 md:grid-cols-2">
          {compare.map((item) => (
            <Card key={item.title} className="bg-white/75">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-20">
        <div className="dark-glass rounded-lg p-8 text-white md:p-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="font-mono text-xs uppercase text-[hsl(var(--aqua))]">Try the loop</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-5xl">
                Run the pipeline against a real sample scan.
              </h2>
            </div>
            <Button asChild size="lg" className="bg-[hsl(var(--aqua))] text-primary hover:bg-[hsl(var(--background))]">
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
