import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://portal-otomotif.vercel.app',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
