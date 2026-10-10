import Link from "next/link";
import BeritaCard from "@/components/BeritaCard";
import { beritaList } from "@/data/berita";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* 1. HERO SECTION DENGAN GAMBAR BACKGROUND (Diperpanjang) */}
      <section className="relative h-[90vh] min-h-[750px] flex items-center justify-center text-center px-4">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/Sekolah.jpg')",
          }}
        >
          {/* Overlay Gelap agar teks terbaca */}
          <div className="absolute inset-0 bg-slate-900/75" />
        </div>

        {/* Konten Hero */}
        <div className="relative z-10 max-w-4xl mx-auto text-white mt-16">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold tracking-wider mb-6 border border-blue-400/30 backdrop-blur-sm">
            BERDAYA MANUSIA YANG BERTAKWA
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Selamat Datang di <br />
            <span className="text-blue-400">SMA Negeri 1 Temanggung</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Mewujudkan sumber daya manusia yang bertakwa, berbudaya, bermutu
            internasional, dan berwawasan lingkungan.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full shadow-lg hover:bg-blue-700 hover:shadow-blue-600/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            Jelajahi Profil Sekolah
          </Link>
        </div>
      </section>

      {/* 2. STATISTIK OVERLAP (Ditarik ke atas menabrak Hero) */}
      <section className="relative z-20 max-w-5xl mx-auto px-4 -mt-16">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 flex flex-wrap justify-around gap-6 border border-slate-100">
          {[
            { angka: "A", label: "Akreditasi Unggul" },
            { angka: "Top 10", label: "SMA Terbaik Jateng" },
            { angka: "60+", label: "Tenaga Pendidik" },
            { angka: "25+", label: "Ekstrakurikuler" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center px-4">
              <h3 className="text-3xl font-extrabold text-blue-700 mb-1">
                {stat.angka}
              </h3>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. KEUNGGULAN SEKOLAH */}
      <section className="py-24 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">
            Mengapa Memilih Kami
          </h2>
          <h3 className="text-3xl font-bold text-slate-900">
            Keunggulan SMA Negeri 1 Temanggung
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "\u{1F4DA}", // buku
              title: "Kurikulum Unggulan",
              desc: "Menerapkan kurikulum berbasis kompetensi yang disesuaikan dengan standar nasional dan kebutuhan siswa di era digital.",
            },
            {
              icon: "\u{1F3C6}", // piala
              title: "Prestasi Gemilang",
              desc: "Membina siswa untuk meraih prestasi di tingkat regional, nasional, hingga internasional di bidang akademik maupun non-akademik.",
            },
            {
              icon: "\u{1F3EB}", // sekolah
              title: "Fasilitas Lengkap",
              desc: "Didukung dengan laboratorium modern, perpustakaan digital, dan sarana olahraga untuk menunjang kegiatan belajar mengajar.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-blue-50 text-2xl rounded-xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">
                {item.title}
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SAMBUTAN KEPALA SEKOLAH (Layout Asimetris) */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-blue-400/30 shadow-2xl">
                <img
                  src="/Kepsek.jpeg"
                  alt="Drs. Endri Kurniawan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h2 className="text-sm font-bold text-blue-300 tracking-widest uppercase mb-4">
                Sambutan Kepala Sekolah
              </h2>
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed italic mb-8 text-blue-50">
                "Kami berkomitmen untuk terus memberikan lingkungan belajar yang
                inovatif, nyaman, dan inklusif. Di sini, setiap potensi siswa
                akan dikembangkan secara maksimal untuk menjadi pemimpin masa depan."
              </blockquote>
              <div>
                <h4 className="text-xl font-bold">
                  Drs. Endri Kurniawan, S.Pd., M.Si.
                </h4>
                <p className="text-blue-300 mt-1">Kepala SMA Negeri 1 Temanggung</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BERITA TERBARU */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">
              Kabar Sekolah
            </h2>
            <h3 className="text-3xl font-bold text-slate-900">Berita Terbaru</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beritaList.slice(0, 3).map((item) => (
              <BeritaCard key={item.id} berita={item} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/berita"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-blue-700 border border-blue-200 rounded-full hover:bg-blue-50 transition"
            >
              Lihat Semua Berita
            </Link>
          </div>
        </div>
      </section>

      {/* 6. PROGRAM UNGGULAN SEKOLAH */}
      <section className="py-24 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-2">
            Fokus Pendidikan
          </h2>
          <h3 className="text-3xl font-bold text-slate-900">
            Program Unggulan Sekolah
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: "\u{1F331}", // tunas
              title: "Sekolah Adiwiyata Mandiri",
              desc: "Menerapkan pendidikan karakter peduli lingkungan dan pelestarian alam sekitar secara berkelanjutan.",
            },
            {
              icon: "\u{1F4BB}", // laptop
              title: "Kurikulum Merdeka & Digital",
              desc: "Pembelajaran adaptif berbasis teknologi dengan platform e-learning terpadu untuk semua siswa.",
            },
            {
              icon: "\u{1F52C}", // mikroskop
              title: "Pembinaan Riset & OSN",
              desc: "Bimbingan intensif untuk mencetak ilmuwan muda dan juara olimpiade sains di tingkat nasional.",
            },
            {
              icon: "\u{1F3AF}", // target
              title: "Pengembangan Karakter",
              desc: "Membentuk kepribadian siswa yang tangguh, berakhlak mulia, dan memiliki jiwa kepemimpinan.",
            },
          ].map((prog, idx) => (
            <div
              key={idx}
              className="group flex gap-6 p-6 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 flex-shrink-0 bg-blue-50 text-blue-600 text-xl rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {prog.icon}
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                  {prog.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {prog.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CALL TO ACTION (CTA) */}
      <section className="py-16 bg-blue-600 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Ingin Mengenal Lebih Dekat SMAN 1 Temanggung?
        </h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Jelajahi berbagai informasi, kegiatan, dan pendaftaran peserta didik baru melalui portal resmi kami.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/about#alamat"
            className="bg-white text-blue-700 font-bold px-8 py-3 rounded-full hover:bg-slate-50 transition shadow-lg"
          >
            Hubungi Kami
          </Link>
          <Link
            href="/berita"
            className="bg-blue-700 text-white border border-blue-500 font-bold px-8 py-3 rounded-full hover:bg-blue-800 transition shadow-lg"
          >
            Lihat Berita
          </Link>
        </div>
      </section>
    </div>
  );
}