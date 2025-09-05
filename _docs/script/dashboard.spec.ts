import { test, expect } from '@playwright/test'

test.describe('ダッシュボード機能', () => {
  test('ダッシュボード操作フロー', async ({ page }) => {
    // 動画録画開始
    await page.context().tracing.start({ screenshots: true, snapshots: true })

    // 1. ダッシュボードページ表示
    await page.goto('http://localhost:3000/')
    await page.waitForLoadState('networkidle')
    await page.screenshot({
      path: '_docs/images/dashboard-main-01.png',
      fullPage: true,
    })

    // 2. 統計カード確認
    await page.locator('text=総ユーザー数').scrollIntoViewIfNeeded()
    await page.screenshot({
      path: '_docs/images/dashboard-stats-02.png',
      fullPage: true,
    })

    // 3. 収益チャート確認
    await page.locator('text=収益チャート').scrollIntoViewIfNeeded()
    await page.screenshot({
      path: '_docs/images/dashboard-revenue-chart-03.png',
      fullPage: true,
    })

    // 4. 最近の注文確認
    await page.locator('text=最近の注文').scrollIntoViewIfNeeded()
    await page.screenshot({
      path: '_docs/images/dashboard-recent-orders-04.png',
      fullPage: true,
    })

    // 5. ナビゲーション確認
    await page.locator('a').filter({ hasText: '商品管理' }).hover()
    await page.locator('a').filter({ hasText: '注文管理' }).hover()
    await page.locator('a').filter({ hasText: 'ユーザー管理' }).hover()
    await page.locator('a').filter({ hasText: 'レポート' }).hover()
    await page.screenshot({
      path: '_docs/images/dashboard-navigation-05.png',
      fullPage: true,
    })

    // 動画録画終了
    await page.context().tracing.stop()
  })
})
