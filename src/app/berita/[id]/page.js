import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import { beritaList, getBeritaById } from "@/data/berita";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const berita = getBeritaById(id);

  return {
    title: berita
      ? `${berita.judul} | SMA Negeri 1 Temanggung`
      : "Berita tidak ditemukan",
  };
}

export default async function DetailBeritaPage({ params }) {
  const { id } = await params;
  const berita = getBeritaById(id);

  if (!berita) {
    notFound();
  }

  const beritaLain = beritaList.filter((b) => b.id !== berita.id).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <Hero
        title="Detail Berita"
        subtitle="Informasi dan dokumentasi kegiatan di SMA Negeri 1 Temanggung."
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ARTIKEL UTAMA */}
          <article className="lg:col-span-8 bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={berita.gambar}
                alt={berita.judul}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full">
                  {berita.kategori}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {berita.tanggal}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
                {berita.judul}
              </h1>

              <div className="space-y-4 text-slate-600 leading-relaxed">
                {berita.isi.map((paragraf, idx) => (
                  <p key={idx}>{paragraf}</p>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-slate-100">
                <Link
                  href="/berita"
                  className="text-blue-600 text-sm font-bold inline-flex items-center gap-2 hover:gap-3 transition-all"
                >
                  <span className="text-lg">←</span> Kembali ke Berita
                </Link>
              </div>
            </div>
          </article>

          {/* SIDEBAR: BERITA LAINNYA */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 tracking-widest uppercase mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Berita Lainnya
              </h2>
              <div className="space-y-5">
                {beritaLain.map((item) => (
                  <Link
                    key={item.id}
                    href={`/berita/${item.id}`}
                    className="group block"
                  >
                    <p className="text-xs text-blue-600 font-bold mb-1">
                      {item.tanggal}
                    </p>
                    <h3 className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors leading-relaxed">
                      {item.judul}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}