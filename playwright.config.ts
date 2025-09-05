import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './_docs/script',
  outputDir: './test-results',

  use: {
    video: 'on', // 動画録画有効化
    screenshot: 'on', // スクリーンショット有効化
    trace: 'on-first-retry',
    baseURL: 'http://localhost:3000', // Next.js開発サーバーのURL
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  reporter: [
    ['html', { outputFolder: '_docs/plan/html-reports' }],
    ['json', { outputFile: '_docs/plan/results.json' }],
  ],
})
