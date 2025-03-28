import { defineConfig } from '@tanstack/react-start/config';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from 'vite-imagetools';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tailwindcss(),
      imagetools(),
    ],
  },
});
