"use client";

import { useEffect, useState } from "react";
import { addItem, getStored, removeItem } from "../../lib/storage";

const KATEGORI_BERITA = [
  "Akademik",
  "Ekstrakurikuler",
  "Informasi",
  "Dies Natalis",
  "Kesiswaan",
  "Sekolah",
];

const inputStyle = {
  padding: 10,
  border: "1px solid #ccc",
  borderRadius: 6,
  color: "black",
  background: "white",
  width: "100%",
};

const buttonStyle = {
  padding: "10px 16px",
  borderRadius: 6,
  cursor: "pointer",
  border: "1px solid #1e3a8a",
  background: "#1e3a8a",
  color: "white",
};

const dangerStyle = { ...buttonStyle, background: "#b91c1c", borderColor: "#b91c1c" };

function Pesan({ pesan }) {
  if (!pesan) return null;
  return <p style={{ color: pesan.includes("berhasil") ? "green" : "red" }}>{pesan}</p>;
}

function ListItem({ title, sub, onHapus }) {
  return (
    <div
      style={{
        border: "1px solid #444",
        borderRadius: 8,
        padding: 14,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div>
        <strong>{title}</strong>
        <div style={{ fontSize: 13, opacity: 0.6 }}>{sub}</div>
      </div>
      <button onClick={onHapus} style={dangerStyle}>
        Hapus
      </button>
    </div>
  );
}

/* ---------------- BERITA ---------------- */
function BeritaManager() {
  const [list, setList] = useState([]);
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState(KATEGORI_BERITA[0]);
  const [gambar, setGambar] = useState("");
  const [isi, setIsi] = useState("");
  const [pesan, setPesan] = useState("");

  useEffect(() => {
    setList(getStored("berita"));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!judul.trim() || !isi.trim()) {
      setPesan("Judul dan isi berita wajib diisi");
      return;
    }

    const paragraf = isi
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    const ringkasan =
      paragraf[0].length > 110 ? paragraf[0].slice(0, 110) + "..." : paragraf[0];

    const tanggal = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    addItem("berita", {
      judul: judul.trim(),
      tanggal,
      kategori,
      ringkasan,
      gambar: gambar.trim(),
      isi: paragraf,
    });

    setList(getStored("berita"));
    setJudul("");
    setGambar("");
    setIsi("");
    setPesan("Berita berhasil disimpan");
  }

  function handleHapus(id) {
    if (!confirm("Hapus berita ini?")) return;
    removeItem("berita", id);
    setList(getStored("berita"));
  }

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Tambah Berita</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 600 }}
      >
        <input
          placeholder="Judul berita"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          style={inputStyle}
        />
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          style={inputStyle}
        >
          {KATEGORI_BERITA.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <input
          placeholder="Gambar (opsional), contoh: /GambarBerita1.jpg"
          value={gambar}
          onChange={(e) => setGambar(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Isi berita. Pisahkan paragraf dengan satu baris kosong."
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          rows={8}
          style={{ ...inputStyle, resize: "vertical" }}
        />
        <Pesan pesan={pesan} />
        <button type="submit" style={buttonStyle}>
          Simpan Berita
        </button>
      </form>

      <h2 style={{ margin: "32px 0 12px" }}>Berita yang ditambahkan ({list.length})</h2>
      {list.length === 0 ? (
        <p style={{ opacity: 0.6 }}>Belum ada berita tambahan.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {list.map((b) => (
            <ListItem
              key={b.id}
              title={b.judul}
              sub={`${b.kategori} · ${b.tanggal}`}
              onHapus={() => handleHapus(b.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- EKSTRAKURIKULER ---------------- */
function EkskulManager() {
  const [list, setList] = useState([]);
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [ikon, setIkon] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [pesan, setPesan] = useState("");

  useEffect(() => {
    setList(getStored("ekskul"));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!nama.trim() || !deskripsi.trim()) {
      setPesan("Nama dan deskripsi wajib diisi");
      return;
    }

    addItem("ekskul", {
      nama: nama.trim(),
      kategori: kategori.trim() || "Umum",
      deskripsi: deskripsi.trim(),
      ikon: ikon.trim() || "\u{1F3EB}",
    });

    setList(getStored("ekskul"));
    setNama("");
    setKategori("");
    setIkon("");
    setDeskripsi("");
    setPesan("Ekstrakurikuler berhasil disimpan");
  }

  function handleHapus(id) {
    if (!confirm("Hapus ekstrakurikuler ini?")) return;
    removeItem("ekskul", id);
    setList(getStored("ekskul"));
  }

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Tambah Ekstrakurikuler</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 600 }}
      >
        <input
          placeholder="Nama ekstrakurikuler"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Kategori, contoh: Seni, Olahraga, Organisasi"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Ikon (satu emoji), contoh: ⚽"
          value={ikon}
          onChange={(e) => setIkon(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Deskripsi singkat"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          rows={4}
          style={{ ...inputStyle, resize: "vertical" }}
        />
        <Pesan pesan={pesan} />
        <button type="submit" style={buttonStyle}>
          Simpan Ekstrakurikuler
        </button>
      </form>

      <h2 style={{ margin: "32px 0 12px" }}>Ekstrakurikuler yang ditambahkan ({list.length})</h2>
      {list.length === 0 ? (
        <p style={{ opacity: 0.6 }}>Belum ada ekstrakurikuler tambahan.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {list.map((x) => (
            <ListItem
              key={x.id}
              title={`${x.ikon} ${x.nama}`}
              sub={x.kategori}
              onHapus={() => handleHapus(x.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- GURU ---------------- */
function GuruManager() {
  const [list, setList] = useState([]);
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [mapel, setMapel] = useState("");
  const [pesan, setPesan] = useState("");

  useEffect(() => {
    setList(getStored("guru"));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!nama.trim()) {
      setPesan("Nama wajib diisi");
      return;
    }

    addItem("guru", {
      nama: nama.trim(),
      jabatan: jabatan.trim() || "Guru",
      mapel: mapel.trim() || "-",
    });

    setList(getStored("guru"));
    setNama("");
    setJabatan("");
    setMapel("");
    setPesan("Guru berhasil disimpan");
  }

  function handleHapus(id) {
    if (!confirm("Hapus data guru ini?")) return;
    removeItem("guru", id);
    setList(getStored("guru"));
  }

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Tambah Guru</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 600 }}
      >
        <input
          placeholder="Nama lengkap beserta gelar"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Jabatan, contoh: Wali Kelas, Wakasek Kurikulum"
          value={jabatan}
          onChange={(e) => setJabatan(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Mata pelajaran (kosongkan jika tidak ada)"
          value={mapel}
          onChange={(e) => setMapel(e.target.value)}
          style={inputStyle}
        />
        <Pesan pesan={pesan} />
        <button type="submit" style={buttonStyle}>
          Simpan Guru
        </button>
      </form>

      <h2 style={{ margin: "32px 0 12px" }}>Guru yang ditambahkan ({list.length})</h2>
      {list.length === 0 ? (
        <p style={{ opacity: 0.6 }}>Belum ada guru tambahan.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {list.map((g) => (
            <ListItem
              key={g.id}
              title={g.nama}
              sub={`${g.jabatan} · ${g.mapel}`}
              onHapus={() => handleHapus(g.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- PRESTASI ---------------- */
function PrestasiManager() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [kategori, setKategori] = useState("");
  const [tingkat, setTingkat] = useState("");
  const [tahun, setTahun] = useState("");
  const [ikon, setIkon] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [pesan, setPesan] = useState("");

  useEffect(() => {
    setList(getStored("prestasi"));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !deskripsi.trim()) {
      setPesan("Judul prestasi dan deskripsi wajib diisi");
      return;
    }

    addItem("prestasi", {
      title: title.trim(),
      kategori: kategori.trim() || "Umum",
      tingkat: tingkat.trim() || "Sekolah",
      tahun: tahun.trim(),
      deskripsi: deskripsi.trim(),
      ikon: ikon.trim() || "\u{1F3C6}",
    });

    setList(getStored("prestasi"));
    setTitle("");
    setKategori("");
    setTingkat("");
    setTahun("");
    setIkon("");
    setDeskripsi("");
    setPesan("Prestasi berhasil disimpan");
  }

  function handleHapus(id) {
    if (!confirm("Hapus prestasi ini?")) return;
    removeItem("prestasi", id);
    setList(getStored("prestasi"));
  }

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Tambah Prestasi</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 600 }}
      >
        <input
          placeholder="Judul prestasi, contoh: Juara 1 Lomba Debat"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Kategori, contoh: Akademik, Olahraga, Seni"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Tingkat, contoh: Kabupaten, Provinsi, Nasional"
          value={tingkat}
          onChange={(e) => setTingkat(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Tahun raihan (opsional), contoh: 2026"
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Ikon (satu emoji, opsional), contoh: 🏆"
          value={ikon}
          onChange={(e) => setIkon(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Deskripsi singkat"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          rows={4}
          style={{ ...inputStyle, resize: "vertical" }}
        />
        <Pesan pesan={pesan} />
        <button type="submit" style={buttonStyle}>
          Simpan Prestasi
        </button>
      </form>

      <h2 style={{ margin: "32px 0 12px" }}>Prestasi yang ditambahkan ({list.length})</h2>
      {list.length === 0 ? (
        <p style={{ opacity: 0.6 }}>Belum ada prestasi tambahan.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {list.map((p) => (
            <ListItem
              key={p.id}
              title={`${p.ikon} ${p.title}`}
              sub={`${p.kategori} · ${p.tingkat}`}
              onHapus={() => handleHapus(p.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- DASHBOARD ---------------- */
const TABS = [
  { key: "berita", label: "Berita" },
  { key: "ekskul", label: "Ekstrakurikuler" },
  { key: "guru", label: "Guru" },
  { key: "prestasi", label: "Prestasi" },
];

function Dashboard({ onLogout }) {
  const [tab, setTab] = useState("berita");

  return (
    <div style={{ padding: 40, maxWidth: 900, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
      <h1>Dashboard Admin</h1>
      <div style={{ display: "flex", gap: 8 }}>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          style={{ ...buttonStyle, textDecoration: "none", display: "inline-block" }}
        >
          Lihat Website
        </a>
        <button
          onClick={onLogout}
          style={{ ...buttonStyle, background: "transparent", color: "inherit", border: "1px solid #888" }}
        >
          Logout
        </button>
      </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              ...buttonStyle,
              background: tab === t.key ? "#1e3a8a" : "transparent",
              color: tab === t.key ? "white" : "inherit",
              border: "1px solid #1e3a8a",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "berita" && <BeritaManager />}
      {tab === "ekskul" && <EkskulManager />}
      {tab === "guru" && <GuruManager />}
      {tab === "prestasi" && <PrestasiManager />}
    </div>
  );
}

/* ---------------- HALAMAN ADMIN (LOGIN) ---------------- */
export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

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

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setPassword("");
        setLoggedIn(true);
      } else {
        setError(data.error || "Login gagal");
      }
    } catch {
      setError("Tidak bisa terhubung ke server");
    }
  }

  async function handleLogout() {
    await fetch("/api/session", { method: "DELETE" });
    setLoggedIn(false);
  }

  if (checking) {
    return <div style={{ padding: 40 }}>Memuat...</div>;
  }

  if (loggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12, width: 300 }}>
        <h1>Login Admin</h1>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={buttonStyle}>
          Masuk
        </button>
      </form>
    </div>
  );
}