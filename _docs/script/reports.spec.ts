import { test, expect } from '@playwright/test'

test.describe('レポート機能', () => {
  test('レポート操作フロー', async ({ page }) => {
    // 動画録画開始
    await page.context().tracing.start({ screenshots: true, snapshots: true })

    // 1. レポートページ表示
    await page.goto('http://localhost:3000/reports')
    await page.waitForLoadState('networkidle')
    await page.screenshot({
      path: '_docs/images/reports-main-01.png',
      fullPage: true,
    })

    // 2. 売上推移チャート確認
    await page.locator('text=売上推移').scrollIntoViewIfNeeded()
    await page.screenshot({
      path: '_docs/images/reports-sales-chart-02.png',
      fullPage: true,
    })

    // 3. 人気商品ランキング確認
    await page.locator('text=人気商品ランキング').scrollIntoViewIfNeeded()
    await page.screenshot({
      path: '_docs/images/reports-popular-products-03.png',
      fullPage: true,
    })

    // 4. 日付フィルターボタンクリック
    await page.click('button:has-text("日付フィルター")')
    await page.screenshot({
      path: '_docs/images/reports-date-filter-04.png',
      fullPage: true,
    })

    // 5. 日付範囲選択（今月を選択）
    await page.click('text=今月')
    await page.waitForTimeout(1000) // フィルター適用を待つ
    await page.screenshot({
      path: '_docs/images/reports-filter-applied-05.png',
      fullPage: true,
    })

    // 6. エクスポート機能実行
    await page.click('button:has-text("エクスポート")')
    await page.waitForTimeout(2000) // エクスポート処理完了を待つ
    await page.screenshot({
      path: '_docs/images/reports-export-06.png',
      fullPage: true,
    })

    // 動画録画終了
    await page.context().tracing.stop()
  })
})
