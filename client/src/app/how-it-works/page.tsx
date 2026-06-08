"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Cpu,
  FileJson,
  Gauge,
  Image as ImageIcon,
  Layers,
  Upload,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/site/page-header";
import { CtaBanner } from "@/components/site/cta-banner";

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
    body: "Pillow converts the image to grayscale, repeats it to RGB, and resizes it to 224 × 224.",
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
    body: "Scores above 0.35 are flagged as a potential finding; lower scores are reported as no finding detected.",
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
      <PageHeader
        badge={<Cpu className="h-3 w-3" />}
        badgeLabel="Inference pipeline"
        align="center"
        title="From CT slice to transparent model readout."
        description="LungAI keeps the pipeline intentionally visible: upload, validate, preprocess, infer, threshold, and return a structured result."
      />

      <section className="container py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-sm text-muted-foreground">
                        {step.n}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {step.body}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="container grid gap-4 py-12 md:grid-cols-2 md:py-16">
          {compare.map((item) => (
            <Card key={item.title}>
              <CardContent className="p-6">
                <h2 className="text-xl font-medium">{item.title}</h2>
                <p className="mt-2 leading-7 text-muted-foreground">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Run the pipeline against a sample scan."
      />
    </>
  );
}
