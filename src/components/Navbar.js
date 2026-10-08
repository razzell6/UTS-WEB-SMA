"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Tambahkan menu di dalam array menu ini
const menu = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Guru", href: "/guru" },
  { label: "Ekstrakurikuler", href: "/ekstrakurikuler" },
  { label: "Prestasi", href: "/prestasi" },
  { label: "Berita", href: "/berita" },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href) =>
    href === "s/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="bg-blue-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-y-2">
        {/* Logo & Nama Sekolah */}
        <Link href="/" className="flex items-center gap-3 font-bold text-base md:text-lg">
          <Image
            src="/Logo.jpg"
            alt="Logo SMA Negeri 1 Temanggung"
            width={40}
            height={40}
            className="rounded"
          />
          <span>SMA Negeri 1 Temanggung</span>
        </Link>

        {/* Menu Navigasi */}
        <div className="flex gap-5 font-medium text-sm md:text-base">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition pb-1 border-b-2 ${
                isActive(item.href)
                  ? "border-blue-300 text-white"
                  : "border-transparent text-blue-100 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}