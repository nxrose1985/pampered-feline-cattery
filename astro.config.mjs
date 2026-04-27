// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pamperedfelinemainecoons.com',
  integrations: [sitemap({ filter: (page) => page === 'https://pamperedfelinemainecoons.com/' })],
  vite: {
    plugins: [tailwindcss()]
  }
});
