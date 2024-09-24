export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <h1 className="text-6xl font-extrabold text-gray-900 mb-6">Welcome to LungAI</h1>
      <p className="text-8xl mb-6">🫁</p>
      <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
        LungAI is a powerful tool designed to help detect early signs of lung cancer using state-of-the-art AI technology. By analyzing CT scans, our AI model assists in identifying potential cancerous growths, offering valuable insights to medical professionals and individuals.
      </p>
      <p className="text-lg text-gray-700 mt-6 max-w-3xl">
        With LungAI, early detection is made more accessible, improving treatment outcomes and saving lives. This platform is designed for ease of use, accuracy, and timely detection of lung cancer.
      </p>
    </section>
  );
} 
