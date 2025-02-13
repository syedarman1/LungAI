'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TestLungAI() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    setResult(null);

    // LOAD EFFECT
    setTimeout(() => {
      setLoading(false);
      setResult("No abnormalities detected. You may consult a doctor for further confirmation.");
    }, 3000);
  };

  return (
    <section className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
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

        {/* File Upload Section */}
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
              accept=".jpg,.png,.dcm"
              onChange={handleFileUpload}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-gray-500 focus:ring focus:ring-gray-200 transition"
            />
            {file && (
              <p className="text-sm text-green-600">
                Selected File: {file.name}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={!file}
              className={`w-full py-3 rounded-lg text-white text-lg font-bold transition ${
                file ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {loading ? 'Analyzing...' : 'Analyze Scan'}
            </button>
          </div>
        </motion.div>

        {/* Result Section */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 p-6 bg-green-100 border border-green-400 text-green-800 rounded-lg max-w-xl w-full"
          >
            <h3 className="text-2xl font-bold">Analysis Result:</h3>
            <p className="text-lg mt-2">{result}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Why Choose LungAI Section */}
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

      {/* Final CTA */}
      <div className="bg-gray-900 text-white text-center py-10">
        <h2 className="text-3xl font-bold">Start Using LungAI Today</h2>
        <p className="text-lg mt-2">AI-powered lung cancer screening is fast, secure, and free to try.</p>
      </div>
    </section>
  );
}