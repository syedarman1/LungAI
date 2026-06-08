"use client";

import { motion } from "framer-motion";
import { FileText, Play, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/site/page-header";
import { CtaBanner } from "@/components/site/cta-banner";

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
      <PageHeader
        badgeLabel="Guide"
        align="center"
        title="A cleaner way to test the demo model."
        description="No account. No dashboard maze. Pick a scan, run the analyzer, and read the model output in one place."
      />

      <section className="container py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
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
                    <h3 className="text-lg font-semibold">{step.title}</h3>
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
        <div className="container py-12 md:py-16">
          <div className="mb-8 text-center">
            <p className="section-label mb-2">FAQ</p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Before you upload.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((item) => (
              <Card key={item.q}>
                <CardContent className="p-6">
                  <h3 className="text-base font-semibold">{item.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title="Ready when you are." label="Open analyzer" />
    </>
  );
}
