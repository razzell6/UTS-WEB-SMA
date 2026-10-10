"use client";

import Hero from "@/components/Hero";
import BeritaCard from "@/components/BeritaCard";
import { useState } from "react";
import { beritaList } from "@/data/berita";

export default function BeritaPage() {
  const agendaSidebar = [
    { judul: "Bimtek SPMI untuk seluruh guru", tanggal: "29 Sep 2026" },
    { judul: "Seminar Cerdas Berinvestasi SMASA Currency", tanggal: "18 Sep 2026" },
    { judul: "Dies Natalis ke-67 AKSARAKARSA", tanggal: "22 Agu 2026" },
  ];

  const prestasiSidebar = [
    { judul: "Lomba Bola Tangan", detail: "Juara 1 Kabupaten" },
    { judul: "Olimpiade Sains Nasional", detail: "Medali Perak" },
    { judul: "POPDA Bola Basket", detail: "Juara 1 Putra" },
    { judul: "AFK Liga Futsal Pelajar", detail: "Juara 1" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(beritaList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBerita = beritaList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <Hero
        title="Ruang Berita"
        subtitle="Informasi, kabar terbaru, dan dokumentasi kegiatan di SMA Negeri 1 Temanggung."
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* KOLOM KIRI: Daftar Berita (Lebar 8 kolom) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {currentBerita.map((item) => (
                <BeritaCard key={item.id} berita={item} />
              ))}
            </div>

            {/* Paginasi Desain Modern */}
            <div className="flex justify-center items-center gap-2 pt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {"\u2190"}
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                    currentPage === page
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {"\u2192"}
              </button>
            </div>
          </div>

          {/* SIDEBAR KANAN (Lebar 4 kolom - Menempel saat di scroll) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Widget Kegiatan Terkini */}
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-sm font-bold text-slate-900 tracking-widest uppercase mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Kegiatan Terkini
                </h2>
                <div className="space-y-5">
                  {agendaSidebar.map((agenda, idx) => (
                    <div key={idx} className="group">
                      <p className="text-xs text-blue-600 font-bold mb-1">
                        {agenda.tanggal}
                      </p>
                      <h4 className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors leading-relaxed">
                        {agenda.judul}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget Prestasi */}
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 md:p-8 rounded-3xl shadow-lg text-white">
                <h2 className="text-sm font-bold text-blue-200 tracking-widest uppercase mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                  Papan Prestasi
                </h2>
                <div className="space-y-4">
                  {prestasiSidebar.map((pres, idx) => (
                    <div
                      key={idx}
                      className="border-b border-blue-700/50 pb-4 last:border-0 last:pb-0"
                    >
                      <h4 className="text-sm font-bold text-white mb-1 leading-snug">
                        {pres.judul}
                      </h4>
                      <p className="text-xs text-blue-300 font-medium flex items-center gap-1.5">
                        <span className="text-yellow-400">{"\u{1F3C6}"}</span>{" "}
                        {pres.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}