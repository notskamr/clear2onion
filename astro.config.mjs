import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://clear2onion.netlify.app",
  output: "hybrid",
  adapter: cloudflare(),
  integrations: [tailwind(), svelte()]
});