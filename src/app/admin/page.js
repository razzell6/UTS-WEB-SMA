"use client";

import { useEffect, useState } from "react";
import {
  addItem,
  getStored,
  removeItem,
  updateItem,
  seedIfNeeded,
  resetToBase,
} from "../../lib/storage";
import { beritaList } from "@/data/berita";
import { ekskulList } from "@/data/ekskul";
import { guruList } from "@/data/guru";
import { prestasiList } from "@/data/prestasi";

/* ---------- STYLE ---------- */
const inputCls =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100";
const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 active:scale-95 cursor-pointer";
const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-95 cursor-pointer";
const btnSmall =
  "rounded-lg px-3 py-1.5 text-xs font-semibold transition active:scale-95 cursor-pointer";

const KATEGORI_BERITA = [
  "Akademik",
  "Ekstrakurikuler",
  "Informasi",
  "Dies Natalis",
  "Kesiswaan",
  "Sekolah",
];

/* ---------- KONFIGURASI TIAP BAGIAN ---------- */
const SECTIONS = {
  berita: {
    tab: "Berita",
    icon: "\u{1F4F0}",
    singular: "Berita",
    storageKey: "berita",
    base: beritaList,
    required: ["judul", "isi"],
    requiredMsg: "Judul dan isi berita wajib diisi",
    fields: [
      { name: "judul", placeholder: "Judul berita" },
      { name: "kategori", type: "select", options: KATEGORI_BERITA },
      { name: "gambar", placeholder: "Gambar (opsional), contoh: /GambarBerita1.jpg" },
      {
        name: "isi",
        type: "textarea",
        rows: 8,
        placeholder: "Isi berita. Pisahkan paragraf dengan satu baris kosong.",
      },
    ],
    initial: { judul: "", kategori: KATEGORI_BERITA[0], gambar: "", isi: "" },
    toValues: (it) => ({
      judul: it.judul,
      kategori: it.kategori,
      gambar: it.gambar || "",
      isi: Array.isArray(it.isi) ? it.isi.join("\n\n") : String(it.isi),
    }),
    build: (v, isEdit) => {
      const paragraf = v.isi
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
      const data = {
        judul: v.judul.trim(),
        kategori: v.kategori,
        ringkasan:
          paragraf[0].length > 110 ? paragraf[0].slice(0, 110) + "..." : paragraf[0],
        gambar: v.gambar.trim(),
        isi: paragraf,
      };
      if (!isEdit) {
        data.tanggal = new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      }
      return data;
    },
    itemTitle: (it) => it.judul,
    itemSub: (it) => `${it.kategori} · ${it.tanggal}`,
  },

  ekskul: {
    tab: "Ekstrakurikuler",
    icon: "\u{1F3AF}",
    singular: "Ekstrakurikuler",
    storageKey: "ekskul",
    base: ekskulList,
    required: ["nama", "deskripsi"],
    requiredMsg: "Nama dan deskripsi wajib diisi",
    fields: [
      { name: "nama", placeholder: "Nama ekstrakurikuler" },
      { name: "kategori", placeholder: "Kategori, contoh: Seni, Olahraga, Organisasi" },
      { name: "ikon", placeholder: "Ikon (satu emoji), contoh: ⚽" },
      { name: "deskripsi", type: "textarea", rows: 4, placeholder: "Deskripsi singkat" },
    ],
    initial: { nama: "", kategori: "", ikon: "", deskripsi: "" },
    toValues: (it) => ({
      nama: it.nama,
      kategori: it.kategori,
      ikon: it.ikon,
      deskripsi: it.deskripsi,
    }),
    build: (v) => ({
      nama: v.nama.trim(),
      kategori: v.kategori.trim() || "Umum",
      deskripsi: v.deskripsi.trim(),
      ikon: v.ikon.trim() || "\u{1F3EB}",
    }),
    itemTitle: (it) => `${it.ikon} ${it.nama}`,
    itemSub: (it) => it.kategori,
  },

  guru: {
    tab: "Guru",
    icon: "\u{1F469}\u200D\u{1F3EB}",
    singular: "Guru",
    storageKey: "guru",
    base: guruList,
    required: ["nama"],
    requiredMsg: "Nama wajib diisi",
    fields: [
      { name: "nama", placeholder: "Nama lengkap beserta gelar" },
      { name: "jabatan", placeholder: "Jabatan, contoh: Wali Kelas, Wakasek Kurikulum" },
      { name: "mapel", placeholder: "Mata pelajaran (kosongkan jika tidak ada)" },
    ],
    initial: { nama: "", jabatan: "", mapel: "" },
    toValues: (it) => ({
      nama: it.nama,
      jabatan: it.jabatan,
      mapel: it.mapel === "-" ? "" : it.mapel,
    }),
    build: (v) => ({
      nama: v.nama.trim(),
      jabatan: v.jabatan.trim() || "Guru",
      mapel: v.mapel.trim() || "-",
    }),
    itemTitle: (it) => it.nama,
    itemSub: (it) => `${it.jabatan} · ${it.mapel}`,
  },

  prestasi: {
    tab: "Prestasi",
    icon: "\u{1F3C6}",
    singular: "Prestasi",
    storageKey: "prestasi",
    base: prestasiList,
    required: ["title", "deskripsi"],
    requiredMsg: "Judul prestasi dan deskripsi wajib diisi",
    fields: [
      { name: "title", placeholder: "Judul prestasi, contoh: Juara 1 Lomba Debat" },
      { name: "kategori", placeholder: "Kategori, contoh: Akademik, Olahraga, Seni" },
      { name: "tingkat", placeholder: "Tingkat, contoh: Kabupaten, Provinsi, Nasional" },
      { name: "tahun", placeholder: "Tahun raihan (opsional), contoh: 2026" },
      { name: "ikon", placeholder: "Ikon (satu emoji, opsional), contoh: 🏆" },
      { name: "deskripsi", type: "textarea", rows: 4, placeholder: "Deskripsi singkat" },
    ],
    initial: { title: "", kategori: "", tingkat: "", tahun: "", ikon: "", deskripsi: "" },
    toValues: (it) => ({
      title: it.title,
      kategori: it.kategori,
      tingkat: it.tingkat,
      tahun: it.tahun || "",
      ikon: it.ikon,
      deskripsi: it.deskripsi,
    }),
    build: (v) => ({
      title: v.title.trim(),
      kategori: v.kategori.trim() || "Umum",
      tingkat: v.tingkat.trim() || "Sekolah",
      tahun: v.tahun.trim(),
      deskripsi: v.deskripsi.trim(),
      ikon: v.ikon.trim() || "\u{1F3C6}",
    }),
    itemTitle: (it) => `${it.ikon} ${it.title}`,
    itemSub: (it) => `${it.kategori} · ${it.tingkat}`,
  },
};

const TAB_ORDER = ["berita", "ekskul", "guru", "prestasi"];

/* ---------- KOMPONEN CRUD UMUM ---------- */
function Manager({ cfg }) {
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [values, setValues] = useState(cfg.initial);
  const [notif, setNotif] = useState(null);

  useEffect(() => {
    seedIfNeeded(cfg.storageKey, cfg.base);
    setList(getStored(cfg.storageKey));
  }, [cfg.storageKey, cfg.base]);

  function setField(name, val) {
    setValues((prev) => ({ ...prev, [name]: val }));
  }

  function reset() {
    setEditId(null);
    setValues(cfg.initial);
  }

  function handleEdit(it) {
    setEditId(it.id);
    setValues(cfg.toValues(it));
    setNotif(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const kosong = cfg.required.some((k) => !String(values[k] || "").trim());
    if (kosong) {
      setNotif({ type: "error", text: cfg.requiredMsg });
      return;
    }

    const data = cfg.build(values, !!editId);
    if (editId) {
      updateItem(cfg.storageKey, editId, data);
      setNotif({ type: "ok", text: "Perubahan berhasil disimpan" });
    } else {
      addItem(cfg.storageKey, data);
      setNotif({ type: "ok", text: `${cfg.singular} berhasil disimpan` });
    }
    setList(getStored(cfg.storageKey));
    reset();
  }

  function handleHapus(id) {
    if (!confirm(`Hapus ${cfg.singular.toLowerCase()} ini?`)) return;
    removeItem(cfg.storageKey, id);
    setList(getStored(cfg.storageKey));
    if (editId === id) reset();
  }

  function handleReset() {
    if (
      !confirm(
        "Kembalikan ke data awal website? Semua perubahan di bagian ini akan hilang."
      )
    )
      return;
    resetToBase(cfg.storageKey, cfg.base);
    setList(getStored(cfg.storageKey));
    reset();
  }

  return (
    <div className="space-y-6">
      {/* FORM */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-2xl">
            {cfg.icon}
          </span>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {editId ? `Edit ${cfg.singular}` : `Tambah ${cfg.singular}`}
            </h2>
            <p className="text-sm text-slate-500">
              {editId
                ? "Ubah datanya lalu simpan perubahan."
                : "Isi form di bawah, data langsung tampil di website."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {cfg.fields.map((f) =>
            f.type === "select" ? (
              <select
                key={f.name}
                value={values[f.name]}
                onChange={(e) => setField(f.name, e.target.value)}
                className={inputCls}
              >
                {f.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : f.type === "textarea" ? (
              <textarea
                key={f.name}
                rows={f.rows || 4}
                placeholder={f.placeholder}
                value={values[f.name]}
                onChange={(e) => setField(f.name, e.target.value)}
                className={`${inputCls} resize-y`}
              />
            ) : (
              <input
                key={f.name}
                placeholder={f.placeholder}
                value={values[f.name]}
                onChange={(e) => setField(f.name, e.target.value)}
                className={inputCls}
              />
            )
          )}

          {notif && (
            <div
              className={`rounded-xl px-4 py-3 text-sm font-medium ${
                notif.type === "ok"
                  ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                  : "bg-red-50 text-red-700 ring-1 ring-red-200"
              }`}
            >
              {notif.type === "ok" ? "✅ " : "⚠️ "}
              {notif.text}
            </div>
          )}

          <div className="flex gap-3">
            <button type="submit" className={`${btnPrimary} flex-1`}>
              {editId ? "Simpan Perubahan" : `Simpan ${cfg.singular}`}
            </button>
            {editId && (
              <button type="button" onClick={reset} className={btnGhost}>
                Batal
              </button>
            )}
          </div>
        </form>
      </section>

      {/* DAFTAR */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-slate-900">Daftar {cfg.singular}</h2>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              {list.length} data
            </span>
            <button
              onClick={handleReset}
              className={`${btnSmall} bg-slate-100 text-slate-600 hover:bg-slate-200`}
            >
              Reset ke data awal
            </button>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-sm text-slate-400">
            Belum ada data.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {list.map((it) => (
              <div
                key={it.id}
                className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 transition hover:shadow-md ${
                  editId === it.id
                    ? "border-blue-400 bg-blue-50/50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-900">
                    {cfg.itemTitle(it)}
                  </p>
                  <p className="text-xs text-slate-500">{cfg.itemSub(it)}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(it)}
                    className={`${btnSmall} bg-blue-900 text-white hover:bg-blue-800`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleHapus(it.id)}
                    className={`${btnSmall} bg-red-50 text-red-700 hover:bg-red-100`}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ---------- DASHBOARD ---------- */
function Dashboard({ onLogout }) {
  const [tab, setTab] = useState("berita");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div className="flex items-center gap-3">
            <img src="/Logo.jpg" alt="Logo" className="h-10 w-10 rounded" />
            <div>
              <h1 className="text-lg font-bold leading-tight">Dashboard Admin</h1>
              <p className="text-xs text-blue-200">SMA Negeri 1 Temanggung</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Lihat Website ↗
            </a>
            <button
              onClick={onLogout}
              className="cursor-pointer rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Tabs */}
        <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-white p-2 shadow-sm md:grid-cols-4">
          {TAB_ORDER.map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                tab === key
                  ? "bg-blue-900 text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span>{SECTIONS[key].icon}</span>
              {SECTIONS[key].tab}
            </button>
          ))}
        </div>

        <Manager key={tab} cfg={SECTIONS[tab]} />
      </main>
    </div>
  );
}

/* ---------- HALAMAN ADMIN (LOGIN) ---------- */
function EyeIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/session")
      .then((r) => r.json())
      .then((d) => setLoggedIn(d.loggedIn))
      .catch(() => setLoggedIn(false))
      .finally(() => setChecking(false));
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setPassword("");
        setShowPw(false);
        setLoggedIn(true);
      } else {
        setError(data.error || "Login gagal");
      }
    } catch {
      setError("Tidak bisa terhubung ke server");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/session", { method: "DELETE" });
    setLoggedIn(false);
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-500">
        Memuat...
      </div>
    );
  }

  if (loggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <img src="/Logo.jpg" alt="Logo" className="mb-4 h-16 w-16 rounded-xl shadow" />
          <h1 className="text-2xl font-extrabold text-slate-900">Login Admin</h1>
          <p className="mt-1 text-sm text-slate-500">SMA Negeri 1 Temanggung</p>
        </div>

        <div className="relative">
          <input
            type={showPw ? "text" : "password"}
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputCls} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            aria-label={showPw ? "Sembunyikan password" : "Lihat password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-blue-700"
          >
            <EyeIcon open={showPw} />
          </button>
        </div>

        {error && (
          <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200">
            ⚠️ {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`${btnPrimary} mt-5 w-full disabled:opacity-60`}
        >
          {loading ? "Memeriksa..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}