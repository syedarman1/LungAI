"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Activity, AlertTriangle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const survival = [
  {
    stage: "Stage 1",
    rate: "80%",
    body: "When caught at Stage 1, the 5-year survival rate climbs to roughly 80%.",
    source: "NCBI Study",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7892035/",
    tone: "success" as const,
  },
  {
    stage: "Stage 4",
    rate: "<5%",
    body: "When diagnosed at Stage 4, the 5-year survival rate falls below 5%.",
    source: "WHO Cancer Data",
    url: "https://www.who.int/news-room/fact-sheets/detail/cancer",
    tone: "destructive" as const,
  },
];

const progression = [
  {
    n: "01",
    title: "Abnormal cells form",
    body: "Lung cancer begins when cells start dividing uncontrollably, often triggered by DNA damage.",
  },
  {
    n: "02",
    title: "Tumor growth",
    body: "Without intervention, those cells multiply and form a tumor that distorts surrounding tissue.",
  },
  {
    n: "03",
    title: "Metastasis",
    body: "Once cancer spreads to other organs, treatment options narrow and outcomes degrade rapidly.",
  },
];

export default function EarlyDetectionPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div className="absolute inset-0 bg-radial-fade pointer-events-none" />
        <div className="container relative pt-24 pb-20 text-center">
          <Badge variant="default" className="mb-4">
            <AlertTriangle className="h-3 w-3" />
            EARLY DETECTION
          </Badge>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Why early detection
            <br />
            <span className="text-primary text-glow">changes everything.</span>
          </motion.h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Lung cancer is the leading cause of cancer death worldwide. Roughly{" "}
            <span className="text-foreground font-semibold">70% of cases</span>{" "}
            are diagnosed too late, when treatment options are already limited.
          </p>
        </div>
      </section>

      <section className="container py-20">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-3">5-YEAR SURVIVAL</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Early vs. late detection
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {survival.map((s, i) => (
            <motion.div
              key={s.stage}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <Badge variant={s.tone}>{s.stage}</Badge>
                  <div className="mt-4 text-6xl font-bold text-glow"
                    style={{ color: s.tone === "success" ? "hsl(var(--success))" : "hsl(var(--destructive))" }}
                  >
                    {s.rate}
                  </div>
                  <p className="text-muted-foreground mt-3 leading-relaxed">
                    {s.body}
                  </p>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono uppercase tracking-wider text-primary hover:underline mt-4 inline-flex items-center gap-1"
                  >
                    {s.source} <ArrowRight className="h-3 w-3" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container py-20">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-3">PROGRESSION</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            How lung cancer progresses
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {progression.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="data-label">PHASE {p.n}</span>
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.body}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card/40 p-12 text-center">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute inset-0 bg-radial-fade" />
          <div className="relative">
            <Activity className="h-8 w-8 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              The earlier, the better.
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Try LungAI on a CT slice and see how AI-assisted screening works.
            </p>
            <Button asChild size="lg">
              <Link href="/test">
                Analyze a scan <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
