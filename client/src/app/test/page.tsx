'use client';

import React, { useState } from 'react';

export default function Test() {
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
    setPrediction(null); // Clear previous prediction when a new file is uploaded
  };

  const handleSubmit = async () => {
    if (file) {
      setLoading(true); // Show loading state
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:8000/predict', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setPrediction(data.prediction); // Assuming your backend returns a JSON with 'prediction'
        } else {
          setPrediction('Error: Unable to analyze the scan.');
        }
      } catch (error) {
        setPrediction('Error: Failed to communicate with the backend.');
      } finally {
        setLoading(false); // Hide loading state
      }
    }
  };

  return (
    <section className="py-12 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Title Section */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Test Your CT Scan</h1>

        {/* Intro Section */}
        <p className="text-lg text-gray-700 leading-relaxed mb-4 text-center">
          Upload your CT scan below, and LungAI will analyze the image to detect any signs of lung cancer. This tool provides a preliminary result and should be followed up with professional medical advice.
        </p>

        {/* File Upload Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-10">
          <input
            type="file"
            accept=".jpg, .png, .dcm"
            onChange={handleFileUpload}
            className="block w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleSubmit}
            className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze Scan'}
          </button>
        </div>

        {/* Prediction Display Section */}
        {prediction && (
          <div className="bg-white p-6 rounded-lg shadow-md mt-6 text-center">
            <h2 className="text-2xl font-bold">Prediction:</h2>
            <p className={`text-lg font-semibold mt-4 ${prediction === 'Cancerous' ? 'text-red-600' : 'text-green-600'}`}>
              {prediction === 'Cancerous' 
                ? 'Cancer detected. Please consult a medical professional.' 
                : 'No cancer detected. Keep monitoring your health.'}
            </p>

            {/* Informational Section */}
            <div className="mt-6">
              <h3 className="text-xl font-bold">What you should know:</h3>
              <p className="text-md text-gray-700 mt-2">
                LungAI is designed for early detection and is not a substitute for professional medical advice. For more information on lung cancer, visit the {' '}
                <a href="https://www.cancer.org/cancer/lung-cancer.html" className="text-blue-600 underline">American Cancer Society</a>.
              </p>
            </div>
          </div>
        )}

        {/* File Preview Section */}
        {file && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold">Preview:</p>
            <img src={URL.createObjectURL(file)} alt="CT Scan Preview" className="mt-2 max-w-md mx-auto border" />
          </div>
        )}

        {/* Loading Animation */}
        {loading && <div className="loader mx-auto my-4"></div>}
      </div>
    </section>
  );
}
