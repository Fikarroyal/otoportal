const COMPARE_KEY = 'otoportal:compare';
const CHECKLIST_KEY = 'otoportal:credit-checklist';
const COMPARE_MAX = 4;

function readList(key) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeList(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // localStorage unavailable (private mode, etc.) - fail silently
  }
}

export function getCompareList() {
  return readList(COMPARE_KEY);
}

export function isInCompare(id) {
  return getCompareList().includes(id);
}

export function addToCompare(id, max = COMPARE_MAX) {
  const list = getCompareList();
  if (list.includes(id)) return { ok: false, reason: 'exists' };
  if (list.length >= max) return { ok: false, reason: 'max' };
  list.push(id);
  writeList(COMPARE_KEY, list);
  window.dispatchEvent(new CustomEvent('compare:change', { detail: { compare: list } }));
  return { ok: true };
}

export function removeFromCompare(id) {
  const list = getCompareList().filter((item) => item !== id);
  writeList(COMPARE_KEY, list);
  window.dispatchEvent(new CustomEvent('compare:change', { detail: { compare: list } }));
}

export function clearCompare() {
  writeList(COMPARE_KEY, []);
  window.dispatchEvent(new CustomEvent('compare:change', { detail: { compare: [] } }));
}

export function getChecklist() {
  return readList(CHECKLIST_KEY);
}

export function isChecklistItemDone(id) {
  return getChecklist().includes(id);
}

export function toggleChecklistItem(id) {
  const items = getChecklist();
  const index = items.indexOf(id);
  if (index >= 0) {
    items.splice(index, 1);
  } else {
    items.push(id);
  }
  writeList(CHECKLIST_KEY, items);
  window.dispatchEvent(new CustomEvent('checklist:change', { detail: { items } }));
  return items;
}
