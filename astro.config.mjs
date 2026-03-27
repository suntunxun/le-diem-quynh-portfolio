// @ts-check

import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://lediemquynh.com',
	output: 'server',
	adapter: cloudflare({ imageService: 'compile' }),
	integrations: [mdx(), react(), sitemap(), keystatic()],
});
