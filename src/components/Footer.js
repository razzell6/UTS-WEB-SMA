export default function Footer() {
  return (
    <footer className="bg-[#0b1329] text-gray-300 py-8 px-6 border-t border-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Informasi Sekolah */}
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-lg font-bold text-white">
            SMA Negeri 1 Temanggung
          </h3>
          <p className="text-xs text-gray-400">
            Jl. Kartini No 04 Temanggung, Jawa Tengah
          </p>
          <p className="text-xs text-gray-400 pt-1">
            Email: <span className="text-gray-300">info@smansatemanggung.sch.id</span> | Telp: <span className="text-gray-300">0293491159</span>
          </p>
        </div>

        {/* Hak Cipta */}
        <div className="text-center md:text-right text-xs text-gray-400">
          <p>© 2026 SMA Negeri 1 Temanggung. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}