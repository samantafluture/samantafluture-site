// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://samantafluture.com',
  output: 'static',
  integrations: [mdx(), sitemap()],
});
