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

        {/* Grid Kartu Guru (4 Kolom Sesuai Tampilan Situs Resmi) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {guruList.map((guru) => (
            <div
              key={guru.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 text-center flex flex-col items-center justify-between"
            >
              <div className="flex flex-col items-center w-full">
                {/* Placeholder Avatar Biru Muda Bulat */}
                <div className="w-28 h-28 rounded-full bg-[#bde3f8] text-[#38bdf8] flex items-center justify-center mb-4 overflow-hidden">
                  <svg
                    className="w-24 h-24 fill-current translate-y-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>

                {/* Nama Guru */}
                <h4 className="text-sm font-bold text-blue-600 mb-1 leading-snug">
                  {guru.nama}
                </h4>

                {/* Jabatan */}
                <p className="text-xs font-bold text-slate-800 mb-1">
                  {guru.jabatan}
                </p>

                {/* Mata Pelajaran */}
                <p className="text-xs text-slate-400 font-medium">
                  {guru.mapel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}