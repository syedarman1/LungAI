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
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/site/page-header";
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
  { label: "Input", value: "224 × 224" },
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
  const resultLabel =
    result?.label === "cancer" ? "flagged finding" : "no finding";
  const activeSampleData = activeSample
    ? SAMPLES.find((sample) => sample.id === activeSample)
    : null;

  return (
    <>
      <PageHeader
        badgeLabel="Analyzer"
        title="Upload a scan, review the readout."
        description="Select a demo patient or upload your own CT slice. Confidence, threshold, and raw score stay visible throughout."
      >
        <div className="grid max-w-xl grid-cols-2 gap-2.5 sm:grid-cols-4">
          {MODEL_STATS.map((stat) => (
            <div
              key={stat.label}
              className="clinical-card px-3 py-2.5"
            >
              <p className="data-label">{stat.label}</p>
              <p className="mt-1 font-mono text-xs font-medium">{stat.value}</p>
            </div>
          ))}
        </div>
      </PageHeader>

      <section className="clinical-band">
        <div className="container py-8">
          <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1">
            <FlaskConical className="h-4 w-4 text-primary" strokeWidth={1.75} />
            <span className="text-sm font-medium text-foreground">Sample scans</span>
            <span className="text-sm text-muted-foreground">
              Select a patient to run inference.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {SAMPLES.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSample(sample)}
                disabled={loading}
                className={cn(
                  "group relative aspect-square overflow-hidden rounded-lg border bg-[hsl(var(--viewer))] text-left transition-colors",
                  activeSample === sample.id
                    ? "border-primary/50 ring-1 ring-primary/15"
                    : "border-border hover:border-primary/30"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sample.src}
                  alt={sample.hint}
                  className="h-full w-full object-cover opacity-85 transition-opacity group-hover:opacity-100"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2.5 pb-2 pt-8">
                  <p className="text-xs font-medium text-white">{sample.hint}</p>
                  <p className="truncate text-[11px] text-white/70">
                    {sample.diagnosis} · demo label
                  </p>
                </div>
                {activeSample === sample.id && loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                  </div>
                )}
                {activeSample === sample.id && result && (
                  <div className="absolute right-2 top-2 rounded-full bg-black/50 p-1">
                    {isCancer ? (
                      <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                    ) : (
                      <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-10 md:py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <p className="section-label">Input</p>
                  <h2 className="mt-0.5 font-medium text-foreground">Patient image</h2>
                </div>
                {(file || previewUrl) && (
                  <button
                    onClick={reset}
                    className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
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
                      "relative flex aspect-[4/3] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-secondary/40 transition-colors",
                      isDragging
                        ? "border-primary/40 bg-accent"
                        : "border-border hover:border-primary/25 hover:bg-accent/60"
                    )}
                  >
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileInput}
                      className="sr-only"
                    />
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Upload className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Drop CT image here, or browse
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          JPG or PNG · 10 MB max
                        </p>
                      </div>
                    </div>
                  </label>
                ) : (
                  <div className={cn("scan-viewer aspect-[4/3]", loading && "ring-2 ring-primary/20")}>
                    <div className="absolute left-3 top-3 z-10 data-label text-white/60">
                      {activeSampleData?.hint || file?.name.slice(0, 24)}
                    </div>
                    <div className="absolute right-3 top-3 z-10 data-label text-white/60">
                      {file && `${(file.size / 1024).toFixed(0)} KB`}
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt="CT scan preview"
                      className="absolute inset-0 h-full w-full object-contain p-6"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/10 bg-black/50 px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-xs text-white/70">
                        <FileImage className="h-3.5 w-3.5" />
                        {activeSample ? "Demo scan" : "Uploaded scan"}
                      </span>
                      <span className="text-xs font-medium text-white/90">
                        {loading ? "Analyzing…" : result ? "Complete" : "Ready"}
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

                {activeSample && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Reset to upload your own scan.
                  </p>
                )}

                <details className="mt-4 rounded-lg border border-border/70 bg-secondary/40 px-3 py-2">
                  <summary className="cursor-pointer text-xs font-medium text-muted-foreground">
                    Developer info
                  </summary>
                  <p className="mt-2 break-all font-mono text-xs text-muted-foreground">
                    Endpoint: {API_URL}/predict
                  </p>
                </details>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <p className="section-label">Output</p>
                  <h2 className="mt-0.5 font-medium text-foreground">Result readout</h2>
                </div>
                {result && (
                  <Badge variant={isCancer ? "destructive" : "success"}>
                    {resultLabel}
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
                      className="rounded-lg border border-destructive/30 bg-destructive/5 p-5"
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                        <div>
                          <p className="font-medium text-destructive">
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
                      className="space-y-4"
                    >
                      <div
                        className={cn(
                          "rounded-lg border p-5",
                          isCancer
                            ? "border-destructive/30 bg-destructive/5"
                            : "border-success/30 bg-success/5"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          {isCancer ? (
                            <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-destructive" />
                          ) : (
                            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-success" />
                          )}
                          <div>
                            <p className={cn("font-medium", isCancer ? "text-destructive" : "text-success")}>
                              {isCancer ? "Anomaly detected" : "No anomaly detected"}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-muted-foreground">
                              {result.message}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-border bg-secondary/40 p-5">
                        <div className="mb-3 flex items-end justify-between">
                          <div>
                            <p className="section-label">Confidence</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              Relative to the selected classification.
                            </p>
                          </div>
                          <span className="font-mono text-2xl font-medium text-foreground">
                            {confidencePct}%
                          </span>
                        </div>
                        <Progress
                          value={confidencePct}
                          indicatorClassName={isCancer ? "bg-destructive" : "bg-success"}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg border border-border bg-card p-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Activity className="h-4 w-4" />
                            <span className="data-label">Raw score</span>
                          </div>
                          <div className="mt-2 font-mono text-lg font-medium">
                            {result.raw_score.toFixed(4)}
                          </div>
                        </div>
                        <div className="rounded-lg border border-border bg-card p-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Gauge className="h-4 w-4" />
                            <span className="data-label">Threshold</span>
                          </div>
                          <div className="mt-2 font-mono text-lg font-medium">
                            {result.threshold.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {activeSampleData && (
                        <div className="rounded-lg border border-border bg-accent/50 p-4">
                          <div className="data-label mb-1">
                            Sample metadata (for demo comparison only)
                          </div>
                          <div className="font-medium text-accent-foreground">
                            {activeSampleData.diagnosis}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {activeSampleData.subtext}
                          </div>
                          <p className="mt-2 text-xs leading-5 text-muted-foreground">
                            This label describes the demo dataset, not a diagnosis
                            returned by the model.
                          </p>
                        </div>
                      )}

                      <div className="disclaimer-banner">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
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
                      className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-border bg-secondary/30 p-8 text-center"
                    >
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <div>
                        <p className="font-medium">Running inference</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          TensorFlow · 224 × 224 · threshold 0.35
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex min-h-[400px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-secondary/20 p-8 text-center"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                        <FileImage className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">No scan analyzed yet</p>
                        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
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
