# Video Recordings

## 概要

Playwrightテスト実行時に自動録画される動画ファイルを保存するディレクトリです。

## ファイル命名規則

```
{feature-name}-{browser}-{retry}.webm
```

### 例
- `product-add-chromium.webm` - 商品追加機能の動画
- `user-login-chromium-retry1.webm` - リトライ時の動画

## 動画仕様

- **フォーマット**: WebM
- **コーデック**: VP8 (ビデオ), Opus (オーディオ)
- **解像度**: テスト実行時のブラウザ解像度に依存
- **フレームレート**: 通常 30fps
- **編集**: なし（そのままの操作を録画）

## 録画タイミング

動画は以下のタイミングで自動録画されます：

1. **テスト開始時**: 各テストの最初から録画開始
2. **テスト終了時**: テスト完了時に自動停止
3. **失敗時**: テスト失敗時も動画を保存（デバッグ用）

## 生成プロセス

1. **設定の有効化**
   - `playwright.config.ts` で `video: 'on'` を設定

2. **自動録画**
   - テスト実行時に自動で動画録画を開始
   - 各テストごとに個別の動画ファイルが生成

3. **保存と整理**
   - 指定されたパスにWebM形式で保存
   - ファイル名は自動生成

4. **マニュアルへの連携**
   - `manuals/` のマークダウン生成時に自動リンク

## 使用方法

### 動画の確認
```bash
# ディレクトリ内の動画一覧
ls -la *.webm

# 特定の機能の動画のみ表示
ls -la product-*.webm
```

### 動画の再生
```bash
# ブラウザで再生
open product-add-chromium.webm

# VLCプレーヤーなどで再生
vlc product-add-chromium.webm
```

### 動画の整理
```bash
# 古い動画の削除（必要に応じて）
rm old-feature-*.webm

# 容量確認
du -sh *.webm
```

## 注意事項

- **ファイルサイズ**: 動画ファイルは比較的大きくなります（1テストあたり数MB）
- **ストレージ容量**: 定期的なクリーンアップを検討してください
- **再生環境**: WebM形式に対応したプレーヤーが必要です
- **Git管理**: 大量の動画ファイルはGit LFSの導入を検討

## トラブルシューティング

### 動画が生成されない場合
```typescript
// playwright.config.ts の確認
export default defineConfig({
  use: {
    video: 'on',  // この設定を確認
  }
})
```

### 動画ファイルが壊れている場合
- Playwrightのバージョンが最新か確認
- テスト実行時のメモリ不足がないか確認
- 一時的に `video: 'retain-on-failure'` を試す

## 関連リンク

- [メイン戦略ドキュメント](../e2e-manual-automation-strategy.md)
- [Zenn記事: Playwrightでテスト実行を動画に撮る](https://zenn.dev/reflex4qa/articles/b9ce85908a9374)
- [Playwright公式ドキュメント](https://playwright.dev/docs/videos)
