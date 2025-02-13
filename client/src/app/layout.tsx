'use client';  

import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>LungAI</title>
        <meta name="description" content="AI-powered lung cancer detection app." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900">
        
        
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
            
            
            <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
              LungAI
            </Link>

            
            <div className="hidden md:flex space-x-6 text-lg">
              <Link href="/early-detection" className="text-gray-700 hover:text-green-600 transition">
                Why Early Detection Matters
              </Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-green-600 transition">
                How It Works
              </Link>
              <Link href="/how-to-use" className="text-gray-700 hover:text-green-600 transition">
                How to Use
              </Link>
            </div>

            
            <Link 
              href="/test" 
              className="bg-gray-900 text-white px-5 py-2 rounded-lg font-semibold text-lg transition hover:bg-gray-800"
            >
              Check Your CT Scan
            </Link>
          </div>
        </nav>

        
        <main className="mt-20">{children}</main>

      </body>
    </html>
  );
}