'use client';

import React from 'react';

export default function HowLungAIWorks() {
  return (
    <section className="py-12 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Title Section */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">How LungAI Works</h1>

        {/* Introduction Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-10">
          <p className="text-lg text-gray-700 leading-relaxed">
            LungAI uses advanced deep learning techniques to analyze CT scan images and predict the likelihood of lung cancer.
            By leveraging a convolutional neural network (CNN), LungAI processes CT scan images and provides accurate predictions.
          </p>
        </div>

        {/* Key Process Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 1: Data Collection</h3>
            <p className="text-md text-gray-700">
              The CT scan data used for training the AI model was sourced from The Cancer Imaging Archive (TCIA). 
              You can learn more about TCIA and the datasets used by visiting{' '}
              <a href="https://www.cancerimagingarchive.net" className="text-blue-600 underline">The Cancer Imaging Archive (TCIA)</a>.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 2: Data Preprocessing</h3>
            <p className="text-md text-gray-700">
              Each CT scan was resized to 224x224 pixels, normalized, and labeled for binary classification. The preprocessing step ensures
              that all images are consistent for input into the model.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 3: Model Training</h3>
            <p className="text-md text-gray-700">
              A convolutional neural network (CNN) was built and trained using Keras and TensorFlow. The model achieved around 81.69% accuracy
              on the validation set and was saved for integration into LungAI.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 4: Model Deployment</h3>
            <p className="text-md text-gray-700">
              The trained model was deployed using FastAPI and is integrated into this web application. Users can upload their CT scans, and LungAI
              will return predictions based on the input images.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <a href="https://www.cancerimagingarchive.net" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 transition duration-300">
            Visit TCIA for More Information on CT Scan Data
          </a>
        </div>
      </div>
    </section>
  );
}
