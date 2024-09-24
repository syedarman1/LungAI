'use client';

import React from 'react';

export default function HowToUse() {
  return (
    <section className="py-12 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Title Section */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">How to Use LungAI</h1>

        {/* Introductory Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-10">
          <p className="text-lg text-gray-700 leading-relaxed">
            Using LungAI to test for potential lung cancer is simple and straightforward. Just follow the steps below to upload your CT scan and receive an analysis.
            Remember, LungAI is designed for early detection and should not replace professional medical advice.
          </p>
        </div>

        {/* Step-by-Step Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 1: Prepare Your CT Scan</h3>
            <p className="text-md text-gray-700">
              Ensure that your CT scan is in a supported format (.jpg, .png, .dcm). If your scan is in a different format, 
              you may need to convert it using a medical imaging tool or ask your healthcare provider for a compatible format.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 2: Upload the CT Scan</h3>
            <p className="text-md text-gray-700">
              Go to the <a href="/test" className="text-blue-600 underline">Test Page</a> and click the "Choose File" button. Select the CT scan image file from your device that you want to upload for analysis.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 3: Submit for Analysis</h3>
            <p className="text-md text-gray-700">
              After uploading the file, click the "Analyze Scan" button. LungAI will process the image using our AI model and provide a prediction within seconds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 4: Review Your Results</h3>
            <p className="text-md text-gray-700">
              The prediction result will appear below the upload section. If LungAI detects any signs of lung cancer, consult with a healthcare professional for further diagnosis and testing.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <a href="/test" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 transition duration-300">
            Go to the Test Page to Upload Your CT Scan
          </a>
        </div>
      </div>
    </section>
  );
}
