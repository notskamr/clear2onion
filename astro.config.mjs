import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://clear2onion.pages.dev",
  output: "hybrid",
  adapter: cloudflare({
    wasmModuleImports: true
  }),
  integrations: [tailwind(), svelte()]
});