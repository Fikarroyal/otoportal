# OtoPortal, Website Otomotif (Astro)

Portal otomotif modern dibangun dengan **Astro** dan **Tailwind CSS**, tanpa backend eksternal.
Semua fitur interaktif (search, filter, compare, kalkulator kredit beserta fitur pendukungnya)
berjalan sepenuhnya di sisi klien dengan `localStorage`, jadi proyek ini bisa langsung dijalankan
tanpa database atau API tambahan.

## Stack

- [Astro](https://astro.build) 4.x (static output, tanpa adapter SSR)
- [Tailwind CSS](https://tailwindcss.com) 3.x via `@astrojs/tailwind`
- Ikon: komponen SVG inline buatan sendiri (`src/components/Icon.astro`), digambar mengikuti
  path asli Lucide, tanpa bergantung pada paket ikon eksternal apa pun
- Data dummy lokal (`src/data/*.ts`), 10 kendaraan, 10 artikel, 8 brand, lengkap dengan foto dan
  logo asli dari Wikimedia Commons
- Font: Plus Jakarta Sans (Google Fonts)

## Menjalankan di lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:4321`.

## Build produksi

```bash
npm run build
npm run preview   # opsional, untuk cek hasil build sebelum deploy
```

## Struktur proyek

```
src/
├── components/     # Navbar, VehicleCard, NewsCard, FilterBar, CreditCalculator, dll.
├── data/           # vehicles.ts, news.ts, brands.ts (dummy data)
├── layouts/        # Layout.astro (SEO, navbar, footer)
├── lib/            # format.ts (format Rupiah, tanggal, angka)
├── pages/          # routing berbasis file
│   ├── vehicles/   # katalog dan detail kendaraan
│   ├── news/       # berita dan detail artikel
│   ├── compare.astro
│   ├── calculator.astro
│   └── search.astro
├── scripts/        # storage.js (compare dan checklist via localStorage), toast.js, search.js
└── styles/         # global.css
```

## Catatan fitur

- **Bandingkan** kendaraan disimpan di `localStorage`, tetap tersimpan setelah refresh atau
  browser ditutup.
- **Kalkulator kredit** memakai metode bunga flat, murni estimasi dan bukan simulasi resmi
  lembaga pembiayaan. Di sampingnya tersedia tiga fitur pendukung: perbandingan cicilan antar
  tenor, pengecekan kemampuan finansial berdasarkan pendapatan bulanan, dan checklist dokumen
  yang perlu disiapkan sebelum mengajukan kredit.
- **Search** memakai endpoint statis `/search-index.json` yang di-generate saat build dari data
  kendaraan, berita, dan brand.
- Data kendaraan dan berita bersifat ilustratif (dummy), termasuk foto dan logo brand yang
  diambil dari Wikimedia Commons.
