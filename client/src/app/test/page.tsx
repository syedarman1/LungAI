'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

type PredictionResponse = {
  label: 'cancer' | 'no_cancer';
  message: string;
  confidence: number;
  raw_score: number;
  threshold: number;
};

export default function TestLungAI() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
    setResult(null);
    setError(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(uploadedFile));
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const detail = await res.json().catch(() => ({}));
        throw new Error(detail.detail || `Server error (${res.status})`);
      }

      const data: PredictionResponse = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const isCancer = result?.label === 'cancer';
  const confidencePct = result ? Math.round(result.confidence * 100) : 0;

  return (
    <section className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center text-center min-h-screen px-6"
      >
        <h1 className="text-6xl font-extrabold mb-6">
          Test Your CT Scan with LungAI
        </h1>

        <p className="text-xl text-gray-700 max-w-3xl mb-6">
          Upload a lung CT scan, and our AI will analyze it within seconds.
          Get an instant preliminary risk assessment and take the next step toward early detection.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full"
        >
          <label className="block text-xl font-bold text-gray-900 mb-4">
            Upload Your CT Scan:
          </label>
          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-gray-500 focus:ring focus:ring-gray-200 transition"
            />
            {file && (
              <p className="text-sm text-green-600">Selected File: {file.name}</p>
            )}
            {previewUrl && (
              <img
                src={previewUrl}
                alt="CT scan preview"
                className="max-h-64 rounded-md border border-gray-200"
              />
            )}

            <button
              onClick={handleSubmit}
              disabled={!file || loading}
              className={`w-full py-3 rounded-lg text-white text-lg font-bold transition ${
                file && !loading
                  ? 'bg-gray-900 hover:bg-gray-800'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {loading ? 'Analyzing...' : 'Analyze Scan'}
            </button>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 p-6 bg-red-100 border border-red-400 text-red-800 rounded-lg max-w-xl w-full"
          >
            <h3 className="text-xl font-bold">Error</h3>
            <p className="text-md mt-2">{error}</p>
            <p className="text-xs mt-3 text-red-600">
              Make sure the backend is running at {API_URL}.
            </p>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mt-8 p-6 rounded-lg max-w-xl w-full border ${
              isCancer
                ? 'bg-red-50 border-red-400 text-red-900'
                : 'bg-green-50 border-green-400 text-green-900'
            }`}
          >
            <h3 className="text-2xl font-bold">Analysis Result</h3>
            <p className="text-lg mt-2">{result.message}</p>
            <div className="mt-4">
              <div className="flex justify-between text-sm font-medium mb-1">
                <span>Confidence</span>
                <span>{confidencePct}%</span>
              </div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-gray-300">
                <div
                  className={`h-full ${isCancer ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: `${confidencePct}%` }}
                />
              </div>
              <p className="text-xs mt-2 opacity-70">
                Raw model score: {result.raw_score} (threshold {result.threshold})
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      <div className="container mx-auto px-6 py-20 text-center bg-white">
        <h2 className="text-4xl font-bold mb-10 text-gray-900">Why Choose LungAI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast Results</h3>
            <p className="text-md text-gray-700">
              Get your results in seconds, enabling faster medical intervention.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">High Accuracy</h3>
            <p className="text-md text-gray-700">
              Our AI detects early-stage lung cancer with over 91% accuracy.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Privacy</h3>
            <p className="text-md text-gray-700">
              We never store your data. All scans are processed in real-time.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="bg-gray-900 text-white text-center py-10">
        <h2 className="text-3xl font-bold">Start Using LungAI Today</h2>
        <p className="text-lg mt-2">AI-powered lung cancer screening is fast, secure, and free to try.</p>
      </div>
    </section>
  );
}
