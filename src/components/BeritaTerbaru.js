"use client";

import { useEffect, useState } from "react";
import BeritaCard from "@/components/BeritaCard";
import { beritaList } from "@/data/berita";
import { getMerged } from "@/lib/storage";

export default function BeritaTerbaru() {
  const [list, setList] = useState(beritaList);

  useEffect(() => {
    setList(getMerged("berita", beritaList));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {list.slice(0, 3).map((item) => (
        <BeritaCard key={item.id} berita={item} />
      ))}
    </div>
  );
}