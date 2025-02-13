'use client';

import { motion } from 'framer-motion';

export default function HowToUse() {
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
          How to Use LungAI
        </h1>

        {/*  Explanation */}
        <p className="text-xl text-gray-900 max-w-3xl mb-6">
          LungAI makes it easy to detect potential lung cancer early.  
          Simply upload a <strong className="text-green-600">CT scan image</strong>, and our AI will analyze it within <strong className="text-green-600">seconds</strong>.
        </p>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-xl mb-6"
        >
          <span className="text-gray-700 font-bold">What You Need:</span>  
          <br />
          ✔ A CT scan image (<strong className="text-green-600">JPG, PNG, or DICOM</strong>)  
          ✔ A <strong className="text-green-600">stable internet connection</strong>  
          ✔ A <strong className="text-green-600">few seconds</strong> for AI analysis  
        </motion.div>
      </motion.div>

      {/* Stepby Step Guide */}
      <div className="container mx-auto px-6 py-20 text-center bg-white">
        <h2 className="text-4xl font-bold mb-10 text-gray-900">Step-by-Step Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 1: Upload Your CT Scan</h3>
            <p className="text-md text-gray-700">Click the <strong className="text-green-600">"Check Your CT Scan"</strong> button and select your image file.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 2: AI Analysis</h3>
            <p className="text-md text-gray-700">LungAI will process the image and detect potential abnormalities.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 3: Review Your Results</h3>
            <p className="text-md text-gray-700">Instantly receive a <strong className="text-green-600">risk assessment</strong> and next steps.</p>
          </motion.div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">Frequently Asked Questions</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">What file formats are supported?</h3>
            <p className="text-md text-gray-700">
              We accept <strong className="text-green-600">JPG, PNG, and DICOM</strong> images.  
              For best results, use <strong className="text-green-600">high-resolution CT scans</strong>.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How long does analysis take?</h3>
            <p className="text-md text-gray-700">
              The AI model processes scans <strong className="text-green-600">within seconds</strong>,  
              providing near-instant feedback.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Is my data private?</h3>
            <p className="text-md text-gray-700">
              Yes, we <strong className="text-green-600">never store user uploads</strong>.  
              All images are processed in real-time and deleted immediately.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Does this replace a doctor?</h3>
            <p className="text-md text-gray-700">
              No. LungAI provides <strong className="text-green-600">preliminary risk assessments</strong>,  
              but always consult a <strong className="text-green-600">medical professional</strong> for diagnosis.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gray-900 text-white text-center py-10">
        <h2 className="text-3xl font-bold">Try LungAI Today</h2>
        <p className="text-lg mt-2">Upload your CT scan and take the first step toward early detection.</p>
      </div>
    </section>
  );
}