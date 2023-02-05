// https://astro.build/config
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import preact from '@astrojs/preact';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [
    tailwind({
      config: {
        path: './tailwind.config.cjs',
      },
    }),
    preact(),
  ],
});
