let cachedIndex = null;

export async function loadSearchIndex() {
  if (cachedIndex) return cachedIndex;
  const res = await fetch('/search-index.json');
  cachedIndex = await res.json();
  return cachedIndex;
}

function matches(item, query) {
  const q = query.toLowerCase();
  const title = (item.title || '').toLowerCase();
  const subtitle = (item.subtitle || '').toLowerCase();
  return title.includes(q) || subtitle.includes(q);
}

export function filterIndex(index, query, limit = 6) {
  const q = query.trim();
  if (!q) return { vehicles: [], news: [], brands: [] };
  return {
    vehicles: index.vehicles.filter((item) => matches(item, q)).slice(0, limit),
    news: index.news.filter((item) => matches(item, q)).slice(0, limit),
    brands: index.brands.filter((item) => matches(item, q)).slice(0, limit),
  };
}
