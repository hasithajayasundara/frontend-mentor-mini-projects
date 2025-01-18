import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        destination: resolve(__dirname, 'nested/destination.html'),
        crew: resolve(__dirname, 'nested/crew.html'),
        technology: resolve(__dirname, 'nested/technology.html'),
      },
    },
  },
});

