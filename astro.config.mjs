import { defineConfig } from 'astro/config';
import nodejs from '@astrojs/node';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  adapter: nodejs(),
  output: 'hybrid',
});