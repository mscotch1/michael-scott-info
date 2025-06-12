// @ts-check
import mdx from '@astrojs/mdx';
import pageFind from 'astro-pagefind';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://michael-scott.info',
  integrations: [mdx(), sitemap(), pageFind()],
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
});
