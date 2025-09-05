import { test, expect } from '@playwright/test'

test.describe('注文管理機能', () => {
  test('注文管理操作フロー', async ({ page }) => {
    // 動画録画開始
    await page.context().tracing.start({ screenshots: true, snapshots: true })

    // 1. 注文一覧ページ表示
    await page.goto('http://localhost:3000/orders')
    await page.waitForLoadState('networkidle')
    await page.screenshot({
      path: '_docs/images/orders-list-01.png',
      fullPage: true,
    })

    // 2. 注文詳細確認（ORD-2024-001の行をクリック）
    await page.locator('tr').filter({ hasText: 'ORD-2024-001' }).click()
    await page.screenshot({
      path: '_docs/images/orders-detail-02.png',
      fullPage: true,
    })

    // 3. ステータス更新前のスクリーンショット
    await page
      .locator('tr')
      .filter({ hasText: 'ORD-2024-002' })
      .locator('button')
      .click()
    await page.screenshot({
      path: '_docs/images/orders-status-before-03.png',
      fullPage: true,
    })

    // 動画録画終了（ステータス変更前の部分）
    await page.context().tracing.stop()

    // 新しいトレーシング開始（ステータス変更部分）
    await page.context().tracing.start({ screenshots: true, snapshots: true })

    // 4. ステータス変更実行
    // ステータスを「発送済み」に変更（ラジオボタンまたはセレクトボックスを想定）
    await page.selectOption('select[name="status"]', '発送済み')
    await page.click('button:has-text("保存")')
    await page.waitForTimeout(1000) // 更新処理完了を待つ
    await page.screenshot({
      path: '_docs/images/orders-status-after-04.png',
      fullPage: true,
    })

    // 動画録画終了
    await page.context().tracing.stop()
  })
})
