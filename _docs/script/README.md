# Playwright Test Scripts

## 概要

テスト計画ドキュメントから自動生成されたPlaywrightテストスクリプトを保存するディレクトリです。

## ファイル構造

```
script/
├── feature-name.spec.ts    # 各機能のテストスクリプト
├── utils/                  # 共通ユーティリティ（必要に応じて）
└── config/                 # 設定ファイル（必要に応じて）
```

## スクリプトの特徴

### 自動生成される機能
- **スクリーンショット取得**: 計画されたタイミングでの自動撮影
- **動画録画設定**: Playwrightのvideo機能有効化
- **エラーハンドリング**: 基本的な例外処理
- **待機処理**: 適切な待機時間を設定

### スクリプト例
```typescript
import { test, expect } from '@playwright/test'

test('商品追加機能', async ({ page }) => {
  // 商品一覧ページ表示
  await page.goto('/products')
  await page.screenshot({ path: '../images/product-list-01.png' })

  // 新規商品追加ボタンクリック
  await page.click('button:has-text("新規追加")')
  await page.screenshot({ path: '../images/product-add-button-02.png' })

  // 商品情報入力
  await page.fill('input[name="name"]', 'テスト商品')
  await page.fill('input[name="price"]', '1000')
  await page.screenshot({ path: '../images/product-form-03.png' })

  // 保存実行
  await page.click('button:has-text("保存")')
  await page.screenshot({ path: '../images/product-save-04.png' })
})
```

## 生成プロセス

1. **テスト計画の読み込み**
   - `plan/` からテスト計画ドキュメントを解析

2. **スクリプトテンプレートの適用**
   - 定義済みのテンプレートに操作ステップを注入

3. **スクリーンショット設定の追加**
   - 計画されたタイミングで撮影コードを挿入

4. **動画録画設定の有効化**
   - playwright.config.tsで動画録画を有効化

## 使用方法

### スクリプトの実行
```bash
# 全スクリプト実行
npm run test

# 特定のスクリプト実行
npx playwright test script/feature-name.spec.ts

# 動画・スクリーンショット付き実行
npx playwright test --config=playwright.config.ts
```

### スクリプトの修正
```typescript
// 手動修正が必要な場合
// （通常は自動生成を推奨）
```

## 設定ファイル

### playwright.config.ts
```typescript
export default defineConfig({
  use: {
    video: 'on',        // 動画録画有効化
    screenshot: 'on',   // スクリーンショット有効化
  },
  // その他の設定...
})
```

## 注意事項

- このディレクトリの内容は自動生成システムにより保守されます
- 手動編集はテスト計画変更時に上書きされる可能性があります
- カスタムロジックが必要な場合は別途管理してください
- バージョン管理では生成スクリプトを除外することを検討

## 関連リンク

- [メイン戦略ドキュメント](../e2e-manual-automation-strategy.md)
- [テスト計画ディレクトリ](../plan/)
- [Playwright公式ドキュメント](https://playwright.dev/)
