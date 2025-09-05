import { test, expect } from '@playwright/test'

test.describe('商品管理機能', () => {
  test('商品管理操作フロー', async ({ page }) => {
    // 動画録画開始
    await page.context().tracing.start({ screenshots: true, snapshots: true })

    // 1. 商品一覧ページ表示
    await page.goto('http://localhost:3000/products')
    await page.waitForLoadState('networkidle')
    await page.screenshot({
      path: '_docs/images/products-list-01.png',
      fullPage: true,
    })

    // 2. 新規商品追加ボタンクリック
    await page.click('button:has-text("新規商品")')
    await page.screenshot({
      path: '_docs/images/products-add-button-02.png',
      fullPage: true,
    })

    // 3. 商品情報入力
    await page.fill(
      'input[placeholder="商品名を入力してください"]',
      'テスト商品'
    )
    await page.fill(
      'input[placeholder="カテゴリを入力してください"]',
      'テストカテゴリ'
    )
    await page.fill('input[type="number"]', '5000') // 価格入力
    await page.screenshot({
      path: '_docs/images/products-form-input-03.png',
      fullPage: true,
    })

    // 在庫数入力（2番目の数値入力フィールド）
    const stockInputs = await page.locator('input[type="number"]').all()
    if (stockInputs.length >= 2) {
      await stockInputs[1].fill('100')
    }

    // 4. 商品追加実行
    await page.click('button:has-text("追加")')
    await page.waitForTimeout(1000) // 追加処理完了を待つ
    await page.screenshot({
      path: '_docs/images/products-save-04.png',
      fullPage: true,
    })

    // 動画録画終了（新規商品追加部分）
    await page.context().tracing.stop()

    // 新しいトレーシング開始（編集部分）
    await page.context().tracing.start({ screenshots: true, snapshots: true })

    // 5. 商品編集ボタンクリック
    await page
      .locator('tr')
      .filter({ hasText: 'プレミアムノートブック' })
      .locator('button')
      .click()
    await page.screenshot({
      path: '_docs/images/products-edit-button-05.png',
      fullPage: true,
    })

    // 6. 商品情報編集
    const editStockInputs = await page.locator('input[type="number"]').all()
    if (editStockInputs.length >= 2) {
      await editStockInputs[1].fill('50') // 在庫数を50に変更
    }
    await page.screenshot({
      path: '_docs/images/products-edit-form-06.png',
      fullPage: true,
    })

    // 7. 商品更新実行
    await page.click('button:has-text("保存")')
    await page.waitForTimeout(1000) // 更新処理完了を待つ
    await page.screenshot({
      path: '_docs/images/products-update-07.png',
      fullPage: true,
    })

    // 動画録画終了
    await page.context().tracing.stop()
  })
})
