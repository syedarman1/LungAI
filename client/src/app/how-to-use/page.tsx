"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, Play, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    n: "01",
    icon: Upload,
    title: "Choose a scan",
    body: "Upload a JPG or PNG CT slice, or select one of the six built-in demo patients.",
  },
  {
    n: "02",
    icon: Play,
    title: "Run analysis",
    body: "The frontend sends the file to the FastAPI backend and shows the current endpoint state.",
  },
  {
    n: "03",
    icon: FileText,
    title: "Read the result",
    body: "Review the label, confidence, raw score, threshold, and safety disclaimer together.",
  },
];

const faqs = [
  {
    q: "What file formats are supported?",
    a: "JPG, JPEG, and PNG. DICOM is a roadmap item and is not currently accepted by the backend.",
  },
  {
    q: "Is my data stored?",
    a: "The backend processes uploads in memory and does not intentionally persist uploaded scans.",
  },
  {
    q: "What does confidence mean?",
    a: "It is the model score relative to the returned label, not a medical certainty.",
  },
  {
    q: "Can I use it clinically?",
    a: "No. LungAI is a research and portfolio demo, not a diagnostic system.",
  },
];

export default function HowToUsePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[hsl(var(--graphite))] text-white">
        <div className="grid-bg absolute inset-0 opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_20%,hsl(var(--aqua)_/_0.22),transparent_34%),radial-gradient(circle_at_86%_30%,hsl(var(--amber)_/_0.14),transparent_28%)]" />
        <div className="container relative pt-24 pb-16 text-center">
          <Badge className="mb-5 border-[hsl(var(--aqua)/0.3)] bg-[hsl(var(--aqua)/0.1)] text-[hsl(var(--aqua))]">
            Guide
          </Badge>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight md:text-6xl"
          >
            A cleaner way to test the demo model.
          </motion.h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70">
            No account. No dashboard maze. Pick a scan, run the analyzer, and
            read the model output in one place.
          </p>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <Card className="h-full">
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
        <div className="container py-16">
          <div className="mb-8 text-center">
            <p className="section-kicker mb-3">FAQ</p>
            <h2 className="text-3xl font-bold md:text-5xl">Before you upload.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {faqs.map((item) => (
              <Card key={item.q} className="bg-white/75">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold">{item.q}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="dark-glass rounded-lg p-8 text-center text-white md:p-12">
          <h2 className="text-3xl font-bold md:text-5xl">Ready when you are.</h2>
          <Button asChild size="lg" className="mt-6 bg-[hsl(var(--aqua))] text-primary hover:bg-[hsl(var(--background))]">
            <Link href="/test">
              Open analyzer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
