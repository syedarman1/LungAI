import '/Users/syedarman/Desktop/LungAI/client/src/app/globals.css';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>LungAI</title>
        <meta name="description" content="Lung cancer detection app using AI." />
      </head>
      <body className="min-h-screen bg-white text-black">
        <div className="flex justify-center space-x-6 py-4 bg-blue-600 text-white font-semibold">
          <a href="/" className="hover:text-gray-200">Home</a>
          <a href="/early-detection" className="hover:text-gray-200">Why Early Detection Matters</a>
          <a href="/how-it-works" className="hover:text-gray-200">How LungAI Works</a>
          <a href="/how-to-use" className="hover:text-gray-200">How to Use</a>
          <a href="/test" className="hover:text-gray-200">Test</a>
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
