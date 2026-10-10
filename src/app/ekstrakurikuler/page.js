import Hero from "@/components/Hero";
import { ekskulList } from "@/data/ekskul";

export const metadata = {
  title: "Ekstrakurikuler | SMA Negeri 1 Temanggung",
  description: "Daftar ekstrakurikuler di SMA Negeri 1 Temanggung",
};

export default function EkskulPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <Hero
        title="Ekstrakurikuler"
        subtitle="Wadah pengembangan minat, bakat, kepemimpinan, dan prestasi siswa SMA Negeri 1 Temanggung."
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">
            Wadah Kreasi Siswa
          </h2>
          <h3 className="text-3xl font-bold text-slate-900">
            Daftar Kegiatan Ekstrakurikuler
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ekskulList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{item.ikon}</span>
                <span className="bg-blue-50 text-blue-700 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.kategori}
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
                {item.nama}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.deskripsi}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}