// Helper untuk baca/tulis Local Storage.
// Key yang dipakai: "berita", "ekskul", "guru", "prestasi"
// Hanya boleh dipanggil dari komponen "use client" (di browser).

function isBrowser() {
  return typeof window !== "undefined";
}

// Ambil data tambahan dari Local Storage (array)
export function getStored(key) {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save(key, list) {
  window.localStorage.setItem(key, JSON.stringify(list));
}

// Gabungan: data tambahan admin (paling baru di atas) + data bawaan dari src/data
export function getMerged(key, baseList) {
  return [...getStored(key), ...baseList];
}

// Tambah data baru. id dibuat otomatis dari waktu supaya tidak bentrok
// dengan id bawaan (1, 2, 3, ...).
export function addItem(key, item) {
  const list = getStored(key);
  const newItem = { ...item, id: Date.now() };
  save(key, [newItem, ...list]);
  return newItem;
}

// Ubah data tambahan berdasarkan id
export function updateItem(key, id, changes) {
  const list = getStored(key).map((it) =>
    it.id === Number(id) ? { ...it, ...changes } : it
  );
  save(key, list);
}

// Hapus data tambahan berdasarkan id
export function removeItem(key, id) {
  const list = getStored(key).filter((it) => it.id !== Number(id));
  save(key, list);
}

// Cari satu data (bawaan + tambahan) berdasarkan id
export function findById(key, baseList, id) {
  return getMerged(key, baseList).find((it) => it.id === Number(id));
}  