'use client';

import React from 'react';

export default function EarlyDetection() {
  return (
    <section className="py-12 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Title Section */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Why Early Detection Matters</h1>

        {/* Introduction Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-10">
          <p className="text-lg text-gray-700 leading-relaxed">
            Early detection of lung cancer is critical because it can significantly improve patient outcomes.
            By catching cancer early, treatment is more effective, and survival rates increase.
          </p>
        </div>

        {/* Key Points Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Improves Treatment Outcomes</h3>
            <p className="text-md text-gray-700">
              Lung cancer detected in the early stages is more likely to respond well to treatment, 
              increasing the chances of survival and recovery.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Reduces Treatment Costs</h3>
            <p className="text-md text-gray-700">
              Early detection often leads to less invasive treatments and reduces overall healthcare costs for both patients and providers.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Increases Survival Rates</h3>
            <p className="text-md text-gray-700">
              Research shows that patients diagnosed early have a much higher five-year survival rate compared to those diagnosed at later stages.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Prevents Cancer Spread</h3>
            <p className="text-md text-gray-700">
              Detecting cancer before it spreads to other organs makes it easier to control and treat effectively, reducing complications.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <a href="https://www.cancer.org/cancer/lung-cancer.html" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 transition duration-300">
            Learn More About Early Detection
          </a>
        </div>
      </div>
    </section>
  );
}
