// https://astro.build/config
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      config: {
        path: './tailwind.config.cjs',
      },
    }),
    preact(),
  ],
});
