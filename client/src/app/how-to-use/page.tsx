"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Upload, Play, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    n: "01",
    icon: Upload,
    title: "Upload a slice",
    body: "Drag a JPG or PNG of a lung CT slice into the analyzer, or click to browse.",
  },
  {
    n: "02",
    icon: Play,
    title: "Run analysis",
    body: "Hit the Analyze button. The file is sent to the FastAPI backend and inference runs in under a second.",
  },
  {
    n: "03",
    icon: FileText,
    title: "Read the result",
    body: "You'll see a binary classification, a confidence percentage, and the raw model score.",
  },
];

const faqs = [
  {
    q: "What file formats are supported?",
    a: "JPG and PNG. DICOM support is on the roadmap once the backend ships pydicom handling.",
  },
  {
    q: "How long does inference take?",
    a: "Sub-second on most machines. The model is small and runs on CPU.",
  },
  {
    q: "Is my data stored?",
    a: "No. Files are processed in memory and discarded as soon as the response is sent.",
  },
  {
    q: "Can I use this for diagnosis?",
    a: "No. LungAI is an educational research demo, not a medical device. Always consult a licensed clinician.",
  },
];

export default function HowToUsePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div className="absolute inset-0 bg-radial-fade pointer-events-none" />
        <div className="container relative pt-24 pb-20 text-center">
          <Badge variant="default" className="mb-4">GUIDE</Badge>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            How to use
            <br />
            <span className="text-primary text-glow">LungAI.</span>
          </motion.h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Three steps. No signup. No tracking. Just upload a CT slice and read
            the score.
          </p>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.n}
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
                      <span className="data-label">STEP {s.n}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {s.body}
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
          <Badge variant="outline" className="mb-3">FAQ</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Questions, answered
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {faqs.map((f) => (
            <Card key={f.q}>
              <CardContent className="pt-6">
                <h3 className="text-base font-semibold mb-2">{f.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.a}
                </p>
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
              Ready to try it?
            </h2>
            <Button asChild size="lg" className="mt-4">
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
