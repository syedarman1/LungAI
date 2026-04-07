"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  FileImage,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

export default function TestPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const acceptFile = useCallback(
    (f: File) => {
      const ok = ["image/jpeg", "image/png", "image/jpg"].includes(f.type);
      if (!ok) {
        setError("Only JPG and PNG files are supported.");
        return;
      }
      if (f.size > 10 * 1024 * 1024) {
        setError("File too large (max 10 MB).");
        return;
      }
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
      setResult(null);
      setError(null);
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
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const detail = await res.json().catch(() => ({}));
        throw new Error(detail.detail || `Server error (${res.status})`);
      }
      const data: PredictionResponse = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const isCancer = result?.label === "cancer";
  const confidencePct = result ? Math.round(result.confidence * 100) : 0;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
        <div className="absolute inset-0 bg-radial-fade pointer-events-none" />
        <div className="container relative pt-20 pb-12 text-center">
          <Badge variant="default" className="mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            CT SCAN ANALYZER
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Run the model on a scan
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Upload a JPG or PNG of a lung CT slice. We process it in memory,
            run inference, and return a confidence score.
          </p>
        </div>
      </section>

      {/* Analyzer */}
      <section className="container py-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* LEFT: uploader / preview */}
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="data-label">INPUT</span>
                {file && (
                  <button
                    onClick={reset}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Reset"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {!previewUrl ? (
                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={cn(
                    "relative flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed transition-all cursor-pointer",
                    isDragging
                      ? "border-primary bg-primary/5 scale-[1.01]"
                      : "border-border hover:border-primary/50 hover:bg-secondary/30"
                  )}
                >
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInput}
                    className="sr-only"
                  />
                  <div className="flex flex-col items-center gap-3 text-center px-6">
                    <div className="h-14 w-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Drop a CT scan here, or{" "}
                        <span className="text-primary">browse</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 font-mono">
                        JPG · PNG · max 10 MB
                      </p>
                    </div>
                  </div>
                </label>
              ) : (
                <div className={cn("scan-frame aspect-square", loading && "glow-cyan")}>
                  <div className="absolute top-3 left-4 data-label z-10">
                    {file?.name.slice(0, 22)}
                  </div>
                  <div className="absolute top-3 right-4 data-label z-10">
                    {file && `${(file.size / 1024).toFixed(0)} KB`}
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="CT scan preview"
                    className="absolute inset-0 w-full h-full object-contain p-8"
                  />
                  <div className="absolute bottom-3 left-4 data-label z-10">
                    <FileImage className="inline h-3 w-3 mr-1" />
                    PREVIEW
                  </div>
                  <div className="absolute bottom-3 right-4 data-label z-10">
                    {loading ? (
                      <span className="text-primary">● ANALYZING</span>
                    ) : result ? (
                      <span className="text-success">● COMPLETE</span>
                    ) : (
                      <span>● READY</span>
                    )}
                  </div>
                </div>
              )}

              <Button
                onClick={handleAnalyze}
                disabled={!file || loading}
                size="lg"
                className="w-full mt-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Running inference...
                  </>
                ) : (
                  "Analyze scan"
                )}
              </Button>

              <p className="text-xs text-muted-foreground mt-3 text-center font-mono">
                ENDPOINT · {API_URL}/predict
              </p>
            </CardContent>
          </Card>

          {/* RIGHT: result */}
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="data-label">OUTPUT</span>
                {result && (
                  <Badge variant={isCancer ? "destructive" : "success"}>
                    {result.label.replace("_", " ")}
                  </Badge>
                )}
              </div>

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
                      <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-destructive">
                          Inference failed
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {error}
                        </p>
                        <p className="text-xs text-muted-foreground mt-3 font-mono">
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
                    className="space-y-6"
                  >
                    <div
                      className={cn(
                        "rounded-lg border p-5 flex items-start gap-4",
                        isCancer
                          ? "border-destructive/40 bg-destructive/10"
                          : "border-success/40 bg-success/10"
                      )}
                    >
                      {isCancer ? (
                        <AlertTriangle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="h-6 w-6 text-success shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p
                          className={cn(
                            "font-semibold text-lg",
                            isCancer ? "text-destructive" : "text-success"
                          )}
                        >
                          {isCancer
                            ? "Anomaly detected"
                            : "No anomaly detected"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          {result.message}
                        </p>
                      </div>
                    </div>

                    {/* Confidence */}
                    <div>
                      <div className="flex items-end justify-between mb-2">
                        <span className="data-label">Confidence</span>
                        <span className="font-mono text-2xl font-bold text-primary text-glow">
                          {confidencePct}%
                        </span>
                      </div>
                      <Progress
                        value={confidencePct}
                        indicatorClassName={
                          isCancer ? "bg-destructive" : "bg-success"
                        }
                      />
                    </div>

                    {/* Raw stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-md border border-border bg-secondary/30 p-3">
                        <div className="data-label">Raw score</div>
                        <div className="font-mono text-lg mt-1">
                          {result.raw_score.toFixed(4)}
                        </div>
                      </div>
                      <div className="rounded-md border border-border bg-secondary/30 p-3">
                        <div className="data-label">Threshold</div>
                        <div className="font-mono text-lg mt-1">
                          {result.threshold.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                      Educational use only · not a diagnosis
                    </p>
                  </motion.div>
                ) : loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 gap-4"
                  >
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <div className="text-center">
                      <p className="font-semibold">Running inference</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Convolutional pass over 224×224 grayscale...
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 gap-3 text-center"
                  >
                    <div className="h-14 w-14 rounded-full border border-border flex items-center justify-center">
                      <FileImage className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Upload a CT slice and run analysis to see results here.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
