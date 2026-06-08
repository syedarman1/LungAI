"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  Eye,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/site/page-header";
import { CtaBanner } from "@/components/site/cta-banner";

const focusCards = [
  {
    icon: Clock,
    title: "Timing matters",
    body: "Earlier review can expand the window for clinical follow-up, second opinions, and diagnostic confirmation.",
  },
  {
    icon: Eye,
    title: "Screening needs clarity",
    body: "A useful interface should help people understand what was analyzed, what the model returned, and what remains uncertain.",
  },
  {
    icon: ShieldCheck,
    title: "Clinical review stays central",
    body: "AI output should support education and exploration here, not replace radiologists or medical professionals.",
  },
];

const progression = [
  {
    n: "01",
    title: "Image captured",
    body: "A CT slice is available for review and can be routed through the demo analyzer.",
  },
  {
    n: "02",
    title: "Model flags risk",
    body: "The backend returns a score, label, threshold, and confidence for educational inspection.",
  },
  {
    n: "03",
    title: "Human context matters",
    body: "Symptoms, history, imaging quality, and clinician judgment determine what happens next.",
  },
];

export default function EarlyDetectionPage() {
  return (
    <>
      <PageHeader
        badge={<AlertTriangle className="h-3 w-3" />}
        badgeLabel="Early detection context"
        align="center"
        title="Why early detection context matters for this demo."
        description="LungAI presents scan review as an educational workflow: quick to test, clear about uncertainty, and explicit that medical decisions belong with licensed clinicians."
      />

      <section className="container py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {focusCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <Icon className="mb-4 h-6 w-6 text-primary" />
                    <h3 className="text-lg font-medium">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {card.body}
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
            <p className="section-label mb-2">Responsible flow</p>
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
              From scan to next question.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {progression.map((item) => (
              <Card key={item.n}>
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-mono text-sm text-muted-foreground">
                      {item.n}
                    </span>
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="See the interface in action."
        description="Try a sample scan and inspect the model output without treating it like a diagnosis."
        label="Analyze scan"
      />
    </>
  );
}
