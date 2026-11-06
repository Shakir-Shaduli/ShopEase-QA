import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './saucedemo/tests',
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
});