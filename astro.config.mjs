import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://c2o.vsahni.me",
  output: "hybrid",
  adapter: cloudflare({
    wasmModuleImports: true
  }),
  integrations: [tailwind(), svelte()]
});