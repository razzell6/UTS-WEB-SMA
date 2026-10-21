// Helper Local Storage. Key: "berita", "ekskul", "guru", "prestasi"
// Hanya dipanggil dari komponen "use client".

function isBrowser() {
  return typeof window !== "undefined";
}

const flagKey = (key) => `seeded_${key}`;

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

export function isSeeded(key) {
  return isBrowser() && window.localStorage.getItem(flagKey(key)) === "1";
}

// Salin data bawaan ke Local Storage (hanya sekali per key).
// Data tambahan lama (kalau ada) tetap dipertahankan.
export function seedIfNeeded(key, baseList) {
  if (!isBrowser() || isSeeded(key)) return;
  save(key, [...getStored(key), ...baseList]);
  window.localStorage.setItem(flagKey(key), "1");
}

// Kembalikan ke data awal website
export function resetToBase(key, baseList) {
  save(key, baseList);
  window.localStorage.setItem(flagKey(key), "1");
}

// Data untuk halaman publik
export function getMerged(key, baseList) {
  if (isSeeded(key)) return getStored(key);
  return [...getStored(key), ...baseList];
}

export function addItem(key, item) {
  const list = getStored(key);
  const newItem = { ...item, id: Date.now() };
  save(key, [newItem, ...list]);
  return newItem;
}

export function updateItem(key, id, changes) {
  const list = getStored(key).map((it) =>
    it.id === Number(id) ? { ...it, ...changes } : it
  );
  save(key, list);
}

export function removeItem(key, id) {
  const list = getStored(key).filter((it) => it.id !== Number(id));
  save(key, list);
}

export function findById(key, baseList, id) {
  return getMerged(key, baseList).find((it) => it.id === Number(id));
}