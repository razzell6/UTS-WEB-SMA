import Hero from "@/components/Hero";
import { guruList } from "@/data/guru";

export const metadata = {
  title: "Profil Guru | SMA Negeri 1 Temanggung",
  description: "Daftar tenaga pendidik dan guru di SMA Negeri 1 Temanggung",
};

export default function GuruPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Hero Banner */}
      <Hero
        title="Tenaga Pendidik"
        subtitle="Mengenal lebih dekat bapak dan ibu guru pengajar di SMA Negeri 1 Temanggung."
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Judul Seksi */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">
            Pendidik Berkualitas
          </h2>
          <h3 className="text-3xl font-bold text-slate-900">
            Daftar Guru & Staf Pengajar
          </h3>
        </div>

        {/* Grid Kartu Guru */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {guruList.map((guru) => (
            <div
              key={guru.id}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center"
            >
              {/* Foto Guru */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 mb-5 shadow-inner">
                <img
                  src={guru.foto}
                  alt={guru.nama}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Jabatan Badge */}
              <span className="bg-blue-50 text-blue-700 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                {guru.jabatan}
              </span>

              {/* Nama Guru */}
              <h4 className="text-lg font-bold text-slate-900 mb-1 leading-snug">
                {guru.nama}
              </h4>

              {/* Mata Pelajaran */}
              <p className="text-sm text-slate-500 font-medium">
                {guru.mapel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}