/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  test: {
    setupFiles: ['./vitest-setup.ts'],
    environment: 'happy-dom',
    coverage: {
      exclude: [...configDefaults.coverage.exclude!, '**/commitlint.config.*'],
      thresholds: {
        branches: 80,
        lines: 80,
        functions: 80,
        statements: 80,
      },
    },
  },
});
