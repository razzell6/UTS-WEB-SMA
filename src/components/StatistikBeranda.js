"use client";

import { useEffect, useState } from "react";
import { ekskulList } from "@/data/ekskul";
import { guruList } from "@/data/guru";
import { getMerged } from "@/lib/storage";

export default function StatistikBeranda() {
  const [jmlEkskul, setJmlEkskul] = useState(ekskulList.length);
  const [jmlGuru, setJmlGuru] = useState(guruList.length);

  useEffect(() => {
    setJmlEkskul(getMerged("ekskul", ekskulList).length);
    setJmlGuru(getMerged("guru", guruList).length);
  }, []);

  const stats = [
    { angka: "A", label: "Akreditasi Unggul" },
    { angka: "1959", label: "Tahun Berdiri" },
    { angka: String(jmlEkskul), label: "Ekstrakurikuler" },
    { angka: String(jmlGuru), label: "Guru & Staf Terdaftar" },
  ];

  return (
    <section className="relative z-20 max-w-5xl mx-auto px-4 -mt-16">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 flex flex-wrap justify-around gap-6 border border-slate-100">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center px-4">
            <h3 className="text-3xl font-extrabold text-blue-700 mb-1">
              {stat.angka}
            </h3>
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}