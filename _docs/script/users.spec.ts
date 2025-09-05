import { test, expect } from '@playwright/test'

test.describe('ユーザー管理機能', () => {
  test('ユーザー管理操作フロー', async ({ page }) => {
    // 動画録画開始
    await page.context().tracing.start({ screenshots: true, snapshots: true })

    // 1. ユーザー一覧ページ表示
    await page.goto('http://localhost:3000/users')
    await page.waitForLoadState('networkidle')
    await page.screenshot({
      path: '_docs/images/users-list-01.png',
      fullPage: true,
    })

    // 2. 新規ユーザー追加ボタンクリック
    await page.click('button:has-text("新規ユーザー")')
    await page.screenshot({
      path: '_docs/images/users-add-button-02.png',
      fullPage: true,
    })

    // 3. ユーザー情報入力
    await page.fill('input[placeholder*="ユーザー"]', 'テストユーザー')
    await page.fill('input[type="email"]', 'test@example.com')
    await page.selectOption('select[name="role"]', 'ユーザー')
    await page.screenshot({
      path: '_docs/images/users-form-input-03.png',
      fullPage: true,
    })

    // 4. ユーザー追加実行
    await page.click('button:has-text("追加")')
    await page.waitForTimeout(1000) // 追加処理完了を待つ
    await page.screenshot({
      path: '_docs/images/users-save-04.png',
      fullPage: true,
    })

    // 動画録画終了（新規ユーザー追加部分）
    await page.context().tracing.stop()

    // 新しいトレーシング開始（編集部分）
    await page.context().tracing.start({ screenshots: true, snapshots: true })

    // 5. ユーザー編集ボタンクリック
    await page
      .locator('tr')
      .filter({ hasText: '鈴木一郎' })
      .locator('button')
      .click()
    await page.screenshot({
      path: '_docs/images/users-edit-button-05.png',
      fullPage: true,
    })

    // 6. ユーザー情報編集
    await page.selectOption('select[name="status"]', 'アクティブ')
    await page.screenshot({
      path: '_docs/images/users-edit-form-06.png',
      fullPage: true,
    })

    // 7. ユーザー更新実行
    await page.click('button:has-text("保存")')
    await page.waitForTimeout(1000) // 更新処理完了を待つ
    await page.screenshot({
      path: '_docs/images/users-update-07.png',
      fullPage: true,
    })

    // 動画録画終了
    await page.context().tracing.stop()
  })
})
