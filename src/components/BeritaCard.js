import Link from "next/link";

export default function BeritaCard({ berita }) {
  return (
    <article className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col">
      <div className="relative overflow-hidden aspect-[4/3]">
        <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-blue-700 rounded-full">
          {berita.kategori}
        </span>
        <img
          src={berita.gambar}
          alt={berita.judul}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-xs text-slate-400 font-medium mb-3">
          {berita.tanggal}
        </p>
        <h3 className="font-bold text-slate-900 text-lg leading-snug mb-3 group-hover:text-blue-600 transition-colors">
          {berita.judul}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {berita.ringkasan}
        </p>

        <div className="mt-auto">
          <Link
            href={`/berita/${berita.id}`}
            className="text-blue-600 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all"
          >
            Baca Selengkapnya <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}