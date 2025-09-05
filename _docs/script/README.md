# Playwrightテストスクリプト

このディレクトリには、E2Eテスト計画に基づいて生成されたPlaywrightテストスクリプトが含まれています。

## ファイル一覧

- `dashboard.spec.ts` - ダッシュボード機能のテスト
- `products.spec.ts` - 商品管理機能のテスト
- `orders.spec.ts` - 注文管理機能のテスト
- `users.spec.ts` - ユーザー管理機能のテスト
- `reports.spec.ts` - レポート機能のテスト
- `run-all-tests.spec.ts` - 統合テスト実行スクリプト

## テスト実行方法

### 個別機能テスト実行

```bash
# ダッシュボード機能テスト
npm run test:dashboard

# 商品管理機能テスト
npm run test:products

# 注文管理機能テスト
npm run test:orders

# ユーザー管理機能テスト
npm run test:users

# レポート機能テスト
npm run test:reports
```

### 全機能テスト実行

```bash
# 全テスト実行
npm run test:all

# ブラウザを表示しながらテスト実行
npm run test:headed

# Playwright UIでテスト実行
npm run test:ui
```

## 生成されるファイル

テスト実行により以下のファイルが生成されます：

### スクリーンショット
- `_docs/images/` ディレクトリにPNG形式で保存
- 各テストステップでの画面キャプチャ

### 動画
- `_docs/movies/` ディレクトリにWebM形式で保存
- テスト実行中の操作を録画

### テストレポート
- `_docs/plan/html-report/` にHTMLレポート
- `_docs/plan/results.json` にJSON結果

## テストの特徴

- **動画録画**: 各テストで操作の動画を自動録画
- **スクリーンショット**: 計画されたタイミングで自動撮影
- **トレーシング**: Playwrightのトレーシング機能で詳細な実行ログ
- **フルページキャプチャ**: スクリーンショットはフルページで撮影

## 注意事項

1. テスト実行前にアプリケーションが `http://localhost:3000` で起動していることを確認してください
2. テストデータは実際のアプリケーション状態に依存します
3. 動画ファイルは容量が大きくなる可能性があります

## トラブルシューティング

### テストが失敗する場合
1. アプリケーションが正しく起動しているか確認
2. セレクタがアプリケーションの変更に合わせて更新されているか確認
3. ネットワーク接続が安定しているか確認

### 動画ファイルが生成されない場合
1. `playwright.config.ts` の `video: 'on'` 設定を確認
2. 十分なディスク容量があるか確認