'use client';

import { motion } from 'framer-motion';

export default function HowItWorks() {
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
          How LungAI Works
        </h1>

        {/* Explanation */}
        <p className="text-xl text-gray-700 max-w-3xl mb-6">
          LungAI is an <strong className="text-green-600">AI-powered tool</strong> that analyzes CT scan images to detect potential lung cancer <strong className="text-green-600">earlier than traditional methods</strong>. Using advanced deep learning models, LungAI provides <strong className="text-green-600">instant results</strong> with <strong className="text-green-600">high accuracy</strong>, allowing for faster medical intervention.
        </p>

        {/* Advantage Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-xl mb-6"
        >
          <span className="text-green-600 font-bold">Why Use AI for Detection?</span>  
          <br />
          AI can <strong className="text-green-600">analyze CT scans 5x faster</strong> than human experts and detect <strong className="text-green-600">early-stage lung cancer with up to 91% accuracy</strong>.
        </motion.div>

        {/* Links */}
        <p className="text-md text-gray-600 mt-2">
          Learn more:  
          <a href="https://pubmed.ncbi.nlm.nih.gov/34751894/" target="_blank" className="text-gray-900 hover:underline"> AI in Cancer Detection (PubMed)</a> |  
          <a href="https://jamanetwork.com/journals/jamaoncology/fullarticle/2785671" target="_blank" className="text-gray-900 hover:underline"> JAMA Oncology Report</a>
        </p>
      </motion.div>

      {/* SBS Process */}
      <div className="container mx-auto px-6 py-20 text-center bg-white">
        <h2 className="text-4xl font-bold mb-10 text-gray-900">Step-by-Step Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 1: Upload Your CT Scan</h3>
            <p className="text-md text-gray-700">Simply drag and drop your lung CT scan into LungAI's secure system.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 2: AI-Powered Analysis</h3>
            <p className="text-md text-gray-700">Our deep learning model scans for abnormalities and potential cancerous growths.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 3: Instant Results</h3>
            <p className="text-md text-gray-700">Get a preliminary report immediately, allowing you to consult a doctor sooner.</p>
          </motion.div>
        </div>
      </div>

      {/* How AI Compares to Traditional Screening */}
      <div className="bg-gray-50 py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">How AI Outperforms Traditional Screening</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Traditional Screening</h3>
            <p className="text-md text-gray-700">
              • Takes <strong className="text-green-600">weeks</strong> for radiologists to analyze scans  
              • <strong className="text-green-600">High chance of human error</strong> in early-stage cases  
              • <strong className="text-green-600">Limited access</strong> to specialists in many areas  
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Screening</h3>
            <p className="text-md text-gray-700">
              • <strong className="text-green-600">Results in seconds</strong>, enabling faster treatment  
              • Detects abnormalities <strong className="text-green-600">before they become visible to the human eye</strong>  
              • <strong className="text-green-600">Accessible anywhere</strong>, improving global healthcare  
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gray-900 text-white text-center py-10">
        <h2 className="text-3xl font-bold">Start Using LungAI Today</h2>
        <p className="text-lg mt-2">AI-powered lung cancer screening is the future of early detection.</p>
      </div>
    </section>
  );
}