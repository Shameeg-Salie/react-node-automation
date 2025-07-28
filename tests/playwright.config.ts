import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './',
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },
  reporter: [['html', { open: 'always' }],['junit', { outputFile: 'test-results/junit-results.xml' }]],
  workers: 1,
});