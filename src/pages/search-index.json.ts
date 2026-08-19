import type { APIRoute } from 'astro';
import { vehicles } from '../data/vehicles';
import { news } from '../data/news';
import { brands } from '../data/brands';

export const prerender = true;

export const GET: APIRoute = () => {
  const index = {
    vehicles: vehicles.map((v) => ({
      type: 'vehicle',
      id: v.id,
      slug: v.slug,
      title: v.name,
      subtitle: `${v.brand} \u00b7 ${v.year}`,
      image: v.image,
      url: `/vehicles/${v.slug}`,
    })),
    news: news.map((n) => ({
      type: 'news',
      id: n.id,
      slug: n.slug,
      title: n.title,
      subtitle: n.category,
      image: n.image,
      url: `/news/${n.slug}`,
    })),
    brands: brands.map((b) => ({
      type: 'brand',
      id: b.id,
      slug: b.slug,
      title: b.name,
      subtitle: b.type === 'mobil' ? 'Mobil' : b.type === 'motor' ? 'Motor' : 'Mobil & Motor',
      image: null,
      url: `/vehicles?brand=${b.slug}`,
    })),
  };

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
