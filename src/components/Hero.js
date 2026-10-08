import Link from 'next/link';

export default function Hero({ title, subtitle, buttonText, buttonLink }) {
  return (
    <section className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-16 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{title}</h1>
        <p className="text-base md:text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
          {subtitle}
        </p>
        {buttonText && buttonLink && (
          <Link
            href={buttonLink}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-5 py-2.5 rounded-lg shadow transition inline-block text-sm md:text-base"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}