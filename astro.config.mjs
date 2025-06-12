// @ts-check
import icons from 'astro-icon';
import mdx from '@astrojs/mdx';
import pageFind from 'astro-pagefind';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://michael-scott.info',
  integrations: [mdx(), sitemap(), pageFind(), icons()],
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
});
