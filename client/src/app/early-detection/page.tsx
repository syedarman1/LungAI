"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Clock,
  Eye,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
      <section className="relative overflow-hidden bg-[hsl(var(--graphite))] text-white">
        <div className="grid-bg absolute inset-0 opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_18%,hsl(var(--aqua)_/_0.22),transparent_34%),radial-gradient(circle_at_84%_30%,hsl(var(--coral)_/_0.14),transparent_28%)]" />
        <div className="container relative pt-24 pb-16 text-center">
          <Badge className="mb-5 border-[hsl(var(--amber)/0.4)] bg-[hsl(var(--amber)/0.12)] text-[hsl(var(--amber))]">
            <AlertTriangle className="h-3.5 w-3.5" />
            Early detection context
          </Badge>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight md:text-6xl"
          >
            Faster signals are useful only when they stay responsible.
          </motion.h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70">
            LungAI presents AI-assisted scan review as an educational workflow:
            quick to test, clear about uncertainty, and explicit that medical
            decisions belong with licensed clinicians.
          </p>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {focusCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <Icon className="mb-5 h-7 w-7 text-primary" />
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {card.body}
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
          <div className="mb-10 text-center">
            <p className="section-kicker mb-3">Responsible flow</p>
            <h2 className="text-3xl font-bold md:text-5xl">
              From scan to next question.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {progression.map((item) => (
              <Card key={item.n} className="bg-white/75">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="font-mono text-sm text-muted-foreground">
                      {item.n}
                    </span>
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="dark-glass rounded-lg p-8 text-white md:p-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <Activity className="mb-4 h-8 w-8 text-[hsl(var(--aqua))]" />
              <h2 className="max-w-2xl text-3xl font-bold md:text-5xl">
                See the interface in action.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/60">
                Try a sample scan and inspect the model output without treating
                it like a diagnosis.
              </p>
            </div>
            <Button asChild size="lg" className="bg-[hsl(var(--aqua))] text-primary hover:bg-[hsl(var(--background))]">
              <Link href="/test">
                Analyze a scan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
