// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://iria-ramos.github.io',
    vite: {    
        plugins: [tailwindcss()], 
    },
    i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
  }
});
