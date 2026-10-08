import Hero from "@/components/Hero";

export default function ProfilPage() {
  const fasilitas = [
    {
      nama: "Laboratorium Komputer & Komputer SNBT",
      deskripsi: "Fasilitas IT modern & jaringan internet cepat.",
      icon: "💻",
    },
    {
      nama: "Perpustakaan & Ruang Baca",
      deskripsi: "Koleksi literasi cetak & digital pendukung riset.",
      icon: "📚",
    },
    {
      nama: "Lapangan Olahraga Terpadu",
      deskripsi: "Fasilitas basket, futsal, dan bola tangan.",
      icon: "🏀",
    },
    {
      nama: "Lingkungan Adiwiyata",
      deskripsi: "Area hijau dan asri berwawasan lingkungan.",
      icon: "🌱",
    },
  ];

  const prestasi = [
    {
      kategori: "Akademik & Kelembagaan",
      items: [
        "Top 10 SMA Terbaik di Jawa Tengah versi LTMPT",
        "Sekolah Adiwiyata Mandiri sejak tahun 2018",
        "Medali Perak Olimpiade Sains Nasional (OSN)",
        "Juara Lomba Karya Ilmiah & Inovasi Riset Siswa",
      ],
    },
    {
      kategori: "Olahraga & Seni",
      items: [
        "Juara 1 POPDA Bola Basket Putra & Putri Kab. Temanggung",
        "Juara 1 AFK Liga Futsal Pelajar Temanggung",
        "Juara 1 Lomba Bola Tangan Tingkat Kabupaten",
        "Juara 2 KOBE CUP Perbasi Pemkab Temanggung",
      ],
    },
  ];

  const ekskul = [
    "SATRIA MANGGALA (OSIS/MPK)",
    "ROHIS AL IKHLAS",
    "PASPARA PATRIOT",
    "Taekwondo",
    "Literasi & Numerasi",
    "SMASA Currency",
    "Klub Sains & OSN",
    "Seni Musik & Tari",
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <Hero
        title="Profil SMA Negeri 1 Temanggung"
        subtitle="Mengenal lebih dekat sejarah, visi misi, tenaga pendidik, dan prestasi sekolah kami."
      />

      <div className="max-w-6xl mx-auto px-4">
        {/* 1. Ringkasan Identitas Sekolah (Overlap ke atas menimpa Hero) */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-10 relative z-10 mb-16">
          {[
            { label: "Akreditasi", nilai: "A (Unggul)" },
            { label: "Status Sekolah", nilai: "Adiwiyata Mandiri" },
            { label: "Peringkat Jateng", nilai: "Top 10 LTMPT" },
            { label: "Berdiri Sejak", nilai: "15 Okt 1959" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 text-center border border-slate-100 hover:-translate-y-1 transition-transform"
            >
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">
                {stat.label}
              </p>
              <p className="text-xl md:text-2xl font-extrabold text-blue-700">
                {stat.nilai}
              </p>
            </div>
          ))}
        </section>

        {/* 2. Sambutan Kepala Sekolah - Gaya Majalah/Editorial */}
        <section className="mb-20">
          <div className="bg-blue-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-800 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-blue-400/30 flex-shrink-0 shadow-lg">
                <img
                  src="/Kepsek.jpeg"
                  alt="Kepala Sekolah"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-400/30">
                  Sambutan Kepala Sekolah
                </span>
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6 text-blue-50 italic">
                  "Laman resmi SMAN 1 Temanggung hadir sebagai media penyedia
                  informasi akurat terkait seluruh kegiatan akademik, kesiswaan,
                  kehumasan, inovasi, serta prestasi yang terus kita upayakan
                  demi kemajuan bersama."
                </blockquote>
                <h2 className="text-2xl font-bold">
                  Drs. Endri Kurniawan, S.Pd., M.Si.
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Sejarah & Visi Misi - Layout Bersebelahan */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-6">
              🏫
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Sejarah Sekolah
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
              <p>
                <strong>SMA Negeri 1 Temanggung</strong> merupakan sekolah
                menengah atas tertua di Kabupaten Temanggung yang didirikan pada{" "}
                <strong>15 Oktober 1959</strong> di Jalan Kartini Nomor 04.
              </p>
              <p>
                Sebagai sekolah rujukan, kami konsisten masuk dalam jajaran{" "}
                <strong>Top 10 SMA Terbaik Jawa Tengah</strong> dan menyandang
                predikat <strong>Sekolah Adiwiyata Mandiri</strong> sejak 2018.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-6">
              🎯
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Visi & Misi
            </h2>
            <div className="space-y-6">
              <p className="text-blue-800 font-semibold italic bg-blue-50 p-4 rounded-xl text-sm leading-relaxed border border-blue-100">
                "Terwujudnya sumber daya manusia yang bertakwa, berbudaya, bermutu
                internasional dan berwawasan lingkungan."
              </p>
              <ul className="space-y-3 text-slate-600 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-0.5">✦</span>
                  Meningkatkan ketakwaan & pembiasaan akhlak mulia.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-0.5">✦</span>
                  Pembelajaran unggul berbasis iptek & berstandar internasional.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-0.5">✦</span>
                  Melestarikan lingkungan dan budaya secara berkelanjutan.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Prestasi & Fasilitas */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Kebanggaan Kami
            </h2>
            <p className="text-slate-500 mt-2">Prestasi dan fasilitas penunjang di SMAN 1 Temanggung</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Prestasi (Ambil 2 Kolom) */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {prestasi.map((kelompok, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm">🏆</span>
                    {kelompok.kategori}
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    {kelompok.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                        <span className="text-blue-400 font-bold mt-0.5">›</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Fasilitas (1 Kolom) */}
            <div className="space-y-4">
              {fasilitas.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-blue-200 transition-colors">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{item.nama}</h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{item.deskripsi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Ekstrakurikuler */}
        <section className="mb-20 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Wadah Kreasi Siswa (Ekstrakurikuler)
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {ekskul.map((item, index) => (
              <span
                key={index}
                className="bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-sm font-semibold px-5 py-2.5 rounded-full border border-slate-200 transition-all cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* 6. Alamat Sekolah */}
        <section id="alamat" className="mb-10 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-6">
            📍
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Alamat Sekolah
          </h2>
          <div className="space-y-2 text-slate-600 text-sm md:text-base leading-relaxed">
            <p>SMA Negeri 1 Temanggung</p>
            <p>Jl. Kartini No 04, Temanggung, Jawa Tengah</p>
            <p>Email: info@smansatemanggung.sch.id</p>
            <p>Telp: 0293491159</p>
          </div>
        </section>

        {/* 7. Maps */}
        <section className="rounded-3xl overflow-hidden border-4 border-white shadow-xl shadow-slate-200 h-[400px]">
          <iframe
            src="https://maps.google.com/maps?q=SMA%20Negeri%201%20Temanggung&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi SMAN 1 Temanggung"
          ></iframe>
        </section>
      </div>
    </div>
  );
}