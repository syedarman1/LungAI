'use client';

import { motion } from 'framer-motion';

export default function Home() {
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
          Early Detection Saves Lives
        </h1>

        <p className="text-xl text-gray-700 max-w-3xl mb-6">
          Lung cancer is the leading cause of cancer deaths worldwide.  
          Early detection increases survival rates by up to 80%,  
          yet 70% of cases are diagnosed too late when treatment options are limited.
        </p>

        {/* Highlighted Fact Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-xl mb-6"
        >
          <span className="text-green-600 font-bold">Did You Know?</span>  
          <br />
          Patients diagnosed at Stage 1 have a 5-year survival rate of 80%.  
          Those diagnosed at Stage 4? Less than 5%.
        </motion.div>

        {/* Links */}
        <p className="text-md text-gray-600 mt-2">
          Learn more: 
          <a href="https://www.cdc.gov/cancer/lung/" target="_blank" className="text-gray-900 hover:underline"> CDC on Lung Cancer</a> | 
          <a href="https://www.cancer.org/research/cancer-facts-statistics.html" target="_blank" className="text-gray-900 hover:underline"> American Cancer Society</a>
        </p>
      </motion.div>

      {/* Why Early Detection Matters */}
      <div className="container mx-auto px-6 py-20 text-center bg-white">
        <h2 className="text-4xl font-bold mb-10 text-gray-900">Why Early Detection Matters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Lung Cancer is the Leading Cause of Cancer Deaths</h3>
            <p className="text-md text-gray-700">
              According to the <a href="https://www.cancer.org/research/cancer-facts-statistics.html" target="_blank" className="text-gray-900 hover:underline">American Cancer Society</a>, lung cancer accounts for <strong>1 in 5 cancer deaths worldwide.</strong>
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Assisted Screening Improves Accuracy</h3>
            <p className="text-md text-gray-700">
              Studies from <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7892035/" target="_blank" className="text-gray-900 hover:underline">NCBI</a> suggest that <strong>AI models can detect early-stage lung cancer with over 91% accuracy.</strong>
            </p>
          </motion.div>
        </div>
      </div>

      {/* How AI-Powered Screening Works */}
      <div className="container mx-auto px-6 py-20 text-center bg-gray-50">
        <h2 className="text-4xl font-bold mb-10 text-gray-900">How LungAI Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 1: Upload CT Scan</h3>
            <p className="text-md text-gray-700">Choose a CT scan image and upload it to LungAI.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 2: AI Analyzes Image</h3>
            <p className="text-md text-gray-700">Our AI model processes the scan and detects any anomalies.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 3: Get Instant Results</h3>
            <p className="text-md text-gray-700">See your results instantly and consult with a medical expert.</p>
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