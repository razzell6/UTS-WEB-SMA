import Hero from "@/components/Hero";
import { prestasiList } from "@/data/prestasi";

export const metadata = {
  title: "Prestasi Sekolah | SMA Negeri 1 Temanggung",
  description: "Daftar pencapaian dan prestasi siswa SMA Negeri 1 Temanggung",
};

export default function PrestasiPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <Hero
        title="Prestasi & Ukiran Kebanggaan"
        subtitle="Rekam jejak pencapaian siswa dan kelembagaan SMA Negeri 1 Temanggung di berbagai tingkatan."
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">
            Papan Penghargaan
          </h2>
          <h3 className="text-3xl font-bold text-slate-900">
            Capaian Prestasi Terbaru
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prestasiList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{item.ikon}</span>
                  <div className="flex gap-2">
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.kategori}
                    </span>
                    <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.tingkat}
                    </span>
                  </div>
                </div>

                <h4 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {item.deskripsi}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Tahun Raihan:</span>
                <span className="font-bold text-blue-600">{item.tahun}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}