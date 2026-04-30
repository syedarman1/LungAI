"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  FileImage,
  FlaskConical,
  Gauge,
  Loader2,
  RotateCcw,
  ScanLine,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type PredictionResponse = {
  label: "cancer" | "no_cancer";
  message: string;
  confidence: number;
  raw_score: number;
  threshold: number;
};

const SAMPLES = [
  { id: 1, src: "/samples/sample1.png", hint: "Patient 01", diagnosis: "Adenocarcinoma", subtext: "Lower left lobe · Stage Ib" },
  { id: 2, src: "/samples/sample2.png", hint: "Patient 02", diagnosis: "Adenocarcinoma", subtext: "Lower left lobe · Stage Ib" },
  { id: 3, src: "/samples/sample3.png", hint: "Patient 03", diagnosis: "Large Cell Carcinoma", subtext: "Left hilum · Stage IIIa" },
  { id: 4, src: "/samples/sample4.png", hint: "Patient 04", diagnosis: "Squamous Cell Carcinoma", subtext: "Left hilum · Stage IIIa" },
  { id: 5, src: "/samples/sample5.png", hint: "Patient 05", diagnosis: "Normal Tissue", subtext: "No abnormalities detected" },
  { id: 6, src: "/samples/sample6.png", hint: "Patient 06", diagnosis: "Normal Tissue", subtext: "No abnormalities detected" },
];

const MODEL_STATS = [
  { label: "Architecture", value: "EfficientNetB0" },
  { label: "Input", value: "224 x 224" },
  { label: "Threshold", value: "0.35" },
  { label: "Max file", value: "10 MB" },
];

export default function TestPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeSample, setActiveSample] = useState<number | null>(null);

  const runAnalysis = useCallback(async (formData: FormData) => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const detail = await res.json().catch(() => ({}));
        throw new Error(detail.detail || `Server error (${res.status})`);
      }

      setResult(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  const acceptFile = useCallback(
    (f: File) => {
      const ok = ["image/jpeg", "image/png", "image/jpg"].includes(f.type);
      if (!ok) {
        setError("Only JPG and PNG files are supported.");
        return;
      }

      if (f.size > 10 * 1024 * 1024) {
        setError("File too large. Maximum upload size is 10 MB.");
        return;
      }

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
      setResult(null);
      setError(null);
      setActiveSample(null);
    },
    [previewUrl]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) acceptFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) acceptFile(f);
  };

  const reset = () => {
    if (previewUrl && !activeSample) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setActiveSample(null);
  };

  const handleSample = async (sample: (typeof SAMPLES)[0]) => {
    reset();
    setActiveSample(sample.id);
    setPreviewUrl(sample.src);
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch(sample.src);
      const blob = await res.blob();
      const f = new File([blob], `${sample.hint}.png`, { type: "image/png" });
      setFile(f);
      const formData = new FormData();
      formData.append("file", f);
      await runAnalysis(formData);
    } catch {
      setError("Could not load sample image.");
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    await runAnalysis(formData);
  };

  const isCancer = result?.label === "cancer";
  const confidencePct = result ? Math.round(result.confidence * 100) : 0;
  const activeSampleData = activeSample
    ? SAMPLES.find((sample) => sample.id === activeSample)
    : null;

  return (
    <>
      <section className="relative overflow-hidden bg-[hsl(var(--graphite))] text-white">
        <div className="grid-bg absolute inset-0 opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_16%,hsl(var(--aqua)_/_0.2),transparent_34%),radial-gradient(circle_at_86%_20%,hsl(var(--amber)_/_0.18),transparent_28%)]" />
        <div className="container relative pt-24 pb-12">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <Badge className="mb-5 border-[hsl(var(--aqua)/0.3)] bg-[hsl(var(--aqua)/0.1)] text-[hsl(var(--aqua))]">
                <ScanLine className="h-3.5 w-3.5" />
                Analyzer command center
              </Badge>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                Upload a scan. Watch the model think.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">
                Select a demo patient or upload your own CT slice. LungAI keeps
                the raw score, threshold, and confidence visible so every result
                is easy to inspect.
              </p>
            </div>

            <div className="grid min-w-[280px] grid-cols-2 gap-3">
              {MODEL_STATS.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-white/10 bg-white/10 p-3">
                  <p className="font-mono text-[10px] uppercase text-white/50">
                    {stat.label}
                  </p>
                  <p className="mt-1 font-mono text-sm text-[hsl(var(--aqua))]">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="soft-band border-b border-border/70">
        <div className="container py-8">
          <div className="mb-5 flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-primary" />
            <span className="font-semibold">Sample scans</span>
            <span className="text-sm text-muted-foreground">
              Click one to run inference instantly.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {SAMPLES.map((sample) => (
              <motion.button
                key={sample.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSample(sample)}
                disabled={loading}
                className={cn(
                  "group relative aspect-square overflow-hidden rounded-lg border bg-[hsl(var(--graphite))] text-left shadow-[0_18px_42px_-32px_hsl(var(--graphite)_/_0.75)]",
                  activeSample === sample.id
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-white/10 hover:border-primary/50"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sample.src}
                  alt={sample.hint}
                  className="h-full w-full object-cover opacity-70 grayscale transition-all group-hover:scale-105 group-hover:opacity-95 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="font-mono text-xs text-white">{sample.hint}</p>
                  <p className="mt-0.5 truncate text-[11px] text-white/60">
                    {sample.diagnosis}
                  </p>
                </div>
                {activeSample === sample.id && loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Loader2 className="h-5 w-5 animate-spin text-[hsl(var(--aqua))]" />
                  </div>
                )}
                {activeSample === sample.id && result && (
                  <div className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5">
                    {isCancer ? (
                      <AlertTriangle className="h-4 w-4 text-red-300" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />
                    )}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <Card className="overflow-hidden border-primary/20">
            <CardContent className="p-0">
              <div className="flex items-center justify-between border-b border-border/70 px-6 py-4">
                <div>
                  <p className="section-kicker">Input scan</p>
                  <h2 className="mt-1 text-xl font-semibold">Patient image</h2>
                </div>
                {(file || previewUrl) && (
                  <button
                    onClick={reset}
                    className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-destructive"
                    aria-label="Reset"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="p-6">
                {!previewUrl ? (
                  <label
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={cn(
                      "relative flex aspect-[4/3] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed bg-[hsl(var(--graphite))] text-white",
                      isDragging
                        ? "border-[hsl(var(--aqua))] shadow-[0_0_0_6px_hsl(var(--aqua)_/_0.14)]"
                        : "border-[hsl(var(--aqua)/0.25)] hover:border-[hsl(var(--aqua)/0.6)]"
                    )}
                  >
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileInput}
                      className="sr-only"
                    />
                    <div className="grid-bg absolute inset-0 opacity-25" />
                    <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[hsl(var(--aqua)/0.3)] bg-[hsl(var(--aqua)/0.1)]">
                        <Upload className="h-7 w-7 text-[hsl(var(--aqua))]" />
                      </div>
                      <div>
                        <p className="text-base font-semibold">
                          Drop CT image here, or browse
                        </p>
                        <p className="mt-2 font-mono text-xs uppercase text-white/60">
                          JPG or PNG · 10 MB max
                        </p>
                      </div>
                    </div>
                  </label>
                ) : (
                  <div className={cn("scan-frame aspect-[4/3]", loading && "shadow-[0_0_0_6px_hsl(var(--aqua)_/_0.12)]")}>
                    <div className="absolute left-4 top-3 z-10 data-label text-[hsl(var(--aqua))]/70">
                      {activeSampleData?.hint || file?.name.slice(0, 24)}
                    </div>
                    <div className="absolute right-4 top-3 z-10 data-label text-[hsl(var(--aqua))]/70">
                      {file && `${(file.size / 1024).toFixed(0)} KB`}
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt="CT scan preview"
                      className="absolute inset-0 h-full w-full object-contain p-8"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase text-white/70">
                        <FileImage className="h-3.5 w-3.5" />
                        {activeSample ? "Demo scan" : "Uploaded scan"}
                      </span>
                      <span className="font-mono text-xs uppercase text-[hsl(var(--aqua))]">
                        {loading ? "Analyzing" : result ? "Complete" : "Ready"}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
                  <Button
                    onClick={handleAnalyze}
                    disabled={!file || loading || !!activeSample}
                    size="lg"
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Running inference
                      </>
                    ) : activeSample ? (
                      "Sample analyzed automatically"
                    ) : (
                      "Analyze scan"
                    )}
                  </Button>

                  <Button
                    onClick={reset}
                    disabled={!file && !previewUrl && !result && !error}
                    type="button"
                    variant="outline"
                    size="lg"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>

                <p className="mt-4 break-all rounded-md bg-secondary/70 px-3 py-2 font-mono text-xs text-muted-foreground">
                  Endpoint: {API_URL}/predict
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-primary/20">
            <CardContent className="p-0">
              <div className="flex items-center justify-between border-b border-border/70 px-6 py-4">
                <div>
                  <p className="section-kicker">Output</p>
                  <h2 className="mt-1 text-xl font-semibold">Result readout</h2>
                </div>
                {result && (
                  <Badge variant={isCancer ? "destructive" : "success"}>
                    {result.label.replace("_", " ")}
                  </Badge>
                )}
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {error ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-lg border border-destructive/40 bg-destructive/10 p-5"
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                        <div>
                          <p className="font-semibold text-destructive">
                            Inference failed
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {error}
                          </p>
                          <p className="mt-3 font-mono text-xs text-muted-foreground">
                            Make sure the backend is running at {API_URL}.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      <div
                        className={cn(
                          "rounded-lg border p-5",
                          isCancer
                            ? "border-destructive/40 bg-destructive/10"
                            : "border-success/40 bg-success/10"
                        )}
                      >
                        <div className="flex items-start gap-4">
                          {isCancer ? (
                            <AlertTriangle className="mt-0.5 h-7 w-7 shrink-0 text-destructive" />
                          ) : (
                            <CheckCircle2 className="mt-0.5 h-7 w-7 shrink-0 text-success" />
                          )}
                          <div>
                            <p className={cn("text-xl font-semibold", isCancer ? "text-destructive" : "text-success")}>
                              {isCancer ? "Anomaly detected" : "No anomaly detected"}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-muted-foreground">
                              {result.message}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-border bg-secondary/50 p-5">
                        <div className="mb-3 flex items-end justify-between">
                          <div>
                            <p className="section-kicker">Confidence</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Relative to the selected classification.
                            </p>
                          </div>
                          <span className="font-mono text-4xl font-bold text-primary">
                            {confidencePct}%
                          </span>
                        </div>
                        <Progress
                          value={confidencePct}
                          indicatorClassName={isCancer ? "bg-destructive" : "bg-success"}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg border border-border bg-white/70 p-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Activity className="h-4 w-4" />
                            <span className="data-label">Raw score</span>
                          </div>
                          <div className="mt-2 font-mono text-2xl font-semibold">
                            {result.raw_score.toFixed(4)}
                          </div>
                        </div>
                        <div className="rounded-lg border border-border bg-white/70 p-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Gauge className="h-4 w-4" />
                            <span className="data-label">Threshold</span>
                          </div>
                          <div className="mt-2 font-mono text-2xl font-semibold">
                            {result.threshold.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {activeSampleData && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                          className="rounded-lg border border-primary/30 bg-primary/10 p-4"
                        >
                          <div className="data-label mb-1">Demo diagnosis</div>
                          <div className="font-semibold text-primary">
                            {activeSampleData.diagnosis}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {activeSampleData.subtext}
                          </div>
                        </motion.div>
                      )}

                      <div className="flex items-start gap-3 rounded-lg border border-[hsl(var(--amber)/0.45)] bg-[hsl(var(--amber)/0.15)] p-4 text-sm text-foreground">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                        <p>
                          This is a research demo. Do not use this output for
                          medical diagnosis, triage, or treatment decisions.
                        </p>
                      </div>
                    </motion.div>
                  ) : loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="diagnostic-panel flex min-h-[440px] flex-col items-center justify-center gap-5 p-8 text-center text-white"
                    >
                      <Loader2 className="h-10 w-10 animate-spin text-[hsl(var(--aqua))]" />
                      <div>
                        <p className="text-lg font-semibold">Running inference</p>
                        <p className="mt-2 text-sm text-white/60">
                          TensorFlow · 224 x 224 · threshold 0.35
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex min-h-[440px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-secondary/50 p-8 text-center"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-white/70">
                        <FileImage className="h-7 w-7 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold">No scan analyzed yet</p>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                          Select a patient sample above or upload a JPG/PNG CT
                          slice to populate the readout.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
