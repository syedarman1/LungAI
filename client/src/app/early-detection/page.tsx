'use client';

import { motion } from 'framer-motion';

export default function WhyEarlyDetectionMatters() {
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
          Why Early Detection Matters
        </h1>

        <p className="text-xl text-gray-700 max-w-3xl mb-6">
          Lung cancer is the <strong className="text-green-600">leading cause of cancer deaths worldwide</strong>.  
          Early detection increases survival rates by up to <strong className="text-green-600">80%</strong>,  
          yet <strong className="text-green-600">70% of cases</strong> are diagnosed too late when treatment options are limited.
        </p>

        {/* Fact Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-xl mb-6"
        >
          <span className="text-green-600 font-bold">Did You Know?</span>  
          <br />
          Patients diagnosed at <strong className="text-green-600">Stage 1</strong> have a 5-year survival rate of <strong className="text-green-600">80%</strong>.  
          Those diagnosed at <strong className="text-green-600">Stage 4</strong>? Less than <strong className="text-green-600">5%</strong>.
        </motion.div>

        {/* Links */}
        <p className="text-md text-gray-600 mt-2">
          Learn more: 
          <a href="https://www.cdc.gov/cancer/lung/" target="_blank" className="text-gray-900 hover:underline"> CDC on Lung Cancer</a> | 
          <a href="https://www.cancer.org/research/cancer-facts-statistics.html" target="_blank" className="text-gray-900 hover:underline"> American Cancer Society</a>
        </p>
      </motion.div>

      {/* Survival Rates */}
      <div className="container mx-auto px-6 py-20 text-center bg-white">
        <h2 className="text-4xl font-bold mb-10 text-gray-900">Survival Rates: Early vs. Late Detection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Early Detection (Stage 1)</h3>
            <p className="text-md text-gray-700">
              Patients diagnosed at <strong className="text-green-600">Stage 1</strong> have a 5-year survival rate of up to <strong className="text-green-600">80%</strong>.  
              <br />
              <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7892035/" target="_blank" className="text-gray-900 hover:underline"> Source: NCBI Study</a>
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Late Detection (Stage 4)</h3>
            <p className="text-md text-gray-700">
              Patients diagnosed at <strong className="text-green-600">Stage 4</strong> have a 5-year survival rate of less than <strong className="text-green-600">5%</strong>.  
              <br />
              <a href="https://www.who.int/news-room/fact-sheets/detail/cancer" target="_blank" className="text-gray-900 hover:underline"> Source: WHO Cancer Data</a>
            </p>
          </motion.div>
        </div>
      </div>

      {/* SBS Progression of Lung Cancer */}
      <div className="container mx-auto px-6 py-20 text-center bg-gray-50">
        <h2 className="text-4xl font-bold mb-10 text-gray-900">The Progression of Lung Cancer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 1: Abnormal Cells Form</h3>
            <p className="text-md text-gray-700">Lung cancer begins when <strong className="text-green-600">abnormal cells</strong> start growing uncontrollably.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 2: Tumor Growth</h3>
            <p className="text-md text-gray-700">Without early detection, the cancerous cells multiply and form a <strong className="text-green-600">tumor</strong>.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 3: Cancer Spreads</h3>
            <p className="text-md text-gray-700">Once lung cancer spreads to other organs, treatment becomes <strong className="text-green-600">much more difficult</strong>.</p>
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