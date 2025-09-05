import { test, expect } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

interface ManualSection {
  title: string
  content: string
  images: string[]
  videos: string[]
}

class ManualGenerator {
  private baseDir = '_docs'
  private testResultsDir = 'test-results'

  async generateDashboardManual(): Promise<string> {
    const sections: ManualSection[] = [
      {
        title: 'ダッシュボードページ表示',
        content:
          'ダッシュボードページにアクセスし、主要指標が正しく表示されていることを確認します。',
        images: ['dashboard-main-01.png'],
        videos: [],
      },
      {
        title: '統計カード確認',
        content:
          '総ユーザー数、総収益、総注文数、アクティブユーザー数の統計カードを確認します。',
        images: ['dashboard-stats-02.png'],
        videos: [],
      },
      {
        title: '収益チャート確認',
        content: '収益推移チャートが正しく表示されていることを確認します。',
        images: ['dashboard-revenue-chart-03.png'],
        videos: [],
      },
      {
        title: '最近の注文確認',
        content: '最近の注文一覧が正しく表示されていることを確認します。',
        images: ['dashboard-recent-orders-04.png'],
        videos: [],
      },
      {
        title: 'ナビゲーション確認',
        content:
          '各ページへのナビゲーションリンクが正しく機能することを確認します。',
        images: ['dashboard-navigation-05.png'],
        videos: ['dashboard-video.webm'],
      },
    ]

    return this.buildMarkdown('ダッシュボード', sections)
  }

  async generateProductsManual(): Promise<string> {
    const sections: ManualSection[] = [
      {
        title: '商品一覧ページ表示',
        content:
          '商品管理ページにアクセスし、商品一覧が正しく表示されていることを確認します。',
        images: ['products-list-01.png'],
        videos: [],
      },
      {
        title: '新規商品追加ボタンクリック',
        content:
          '新規商品追加ボタンをクリックして、商品追加モーダルを開きます。',
        images: ['products-add-button-02.png'],
        videos: [],
      },
      {
        title: '商品情報入力',
        content:
          '新規商品追加モーダルで以下の情報を入力します：\n- 商品名: テスト商品\n- カテゴリ: テストカテゴリ\n- 価格: ¥5,000\n- 在庫数: 100',
        images: ['products-form-input-03.png'],
        videos: [],
      },
      {
        title: '商品追加実行',
        content: '追加ボタンをクリックして商品を保存します。',
        images: ['products-save-04.png'],
        videos: [],
      },
      {
        title: '商品編集ボタンクリック',
        content:
          '既存商品（プレミアムノートブック）の編集ボタンをクリックします。',
        images: ['products-edit-button-05.png'],
        videos: [],
      },
      {
        title: '商品情報編集',
        content: '編集フォームで商品情報を更新します：在庫数を50に変更',
        images: ['products-edit-form-06.png'],
        videos: [],
      },
      {
        title: '商品更新実行',
        content: '保存ボタンをクリックして変更を保存します。',
        images: ['products-update-07.png'],
        videos: ['products-video.webm'],
      },
    ]

    return this.buildMarkdown('商品管理', sections)
  }

  async generateOrdersManual(): Promise<string> {
    const sections: ManualSection[] = [
      {
        title: '注文一覧ページ表示',
        content:
          '注文管理ページにアクセスし、注文一覧が正しく表示されていることを確認します。',
        images: ['orders-list-01.png'],
        videos: [],
      },
      {
        title: '注文詳細確認',
        content: '最初の注文（ORD-2024-001）の詳細情報を確認します。',
        images: ['orders-detail-02.png'],
        videos: [],
      },
      {
        title: 'ステータス更新',
        content:
          '処理中の注文（ORD-2024-002）のステータスを「発送済み」に変更します。',
        images: ['orders-status-before-03.png'],
        videos: [],
      },
      {
        title: 'ステータス変更実行',
        content: 'ステータスを「発送済み」に変更して保存します。',
        images: ['orders-status-after-04.png'],
        videos: ['orders-video.webm'],
      },
    ]

    return this.buildMarkdown('注文管理', sections)
  }

  async generateUsersManual(): Promise<string> {
    const sections: ManualSection[] = [
      {
        title: 'ユーザー一覧ページ表示',
        content:
          'ユーザー管理ページにアクセスし、ユーザー一覧が正しく表示されていることを確認します。',
        images: ['users-list-01.png'],
        videos: [],
      },
      {
        title: '新規ユーザー追加ボタンクリック',
        content:
          '新規ユーザー追加ボタンをクリックして、ユーザー追加モーダルを開きます。',
        images: ['users-add-button-02.png'],
        videos: [],
      },
      {
        title: 'ユーザー情報入力',
        content:
          '新規ユーザー追加モーダルで以下の情報を入力します：\n- ユーザー名: テストユーザー\n- メールアドレス: test@example.com\n- 役割: ユーザー',
        images: ['users-form-input-03.png'],
        videos: [],
      },
      {
        title: 'ユーザー追加実行',
        content: '追加ボタンをクリックしてユーザーを保存します。',
        images: ['users-save-04.png'],
        videos: [],
      },
      {
        title: 'ユーザー編集ボタンクリック',
        content: '既存ユーザー（鈴木一郎）の編集ボタンをクリックします。',
        images: ['users-edit-button-05.png'],
        videos: [],
      },
      {
        title: 'ユーザー情報編集',
        content:
          '編集フォームでユーザー情報を更新します：ステータスをアクティブに変更',
        images: ['users-edit-form-06.png'],
        videos: [],
      },
      {
        title: 'ユーザー更新実行',
        content: '保存ボタンをクリックして変更を保存します。',
        images: ['users-update-07.png'],
        videos: ['users-video.webm'],
      },
    ]

    return this.buildMarkdown('ユーザー管理', sections)
  }

  async generateReportsManual(): Promise<string> {
    const sections: ManualSection[] = [
      {
        title: 'レポートページ表示',
        content:
          'レポートページにアクセスし、主要なレポート指標が正しく表示されていることを確認します。',
        images: ['reports-main-01.png'],
        videos: [],
      },
      {
        title: '売上推移チャート確認',
        content: '売上推移チャートが正しく表示されていることを確認します。',
        images: ['reports-sales-chart-02.png'],
        videos: [],
      },
      {
        title: '人気商品ランキング確認',
        content: '人気商品ランキングが正しく表示されていることを確認します。',
        images: ['reports-popular-products-03.png'],
        videos: [],
      },
      {
        title: '日付フィルターボタンクリック',
        content:
          '日付フィルターボタンをクリックして、フィルターオプションを表示します。',
        images: ['reports-date-filter-04.png'],
        videos: [],
      },
      {
        title: '日付範囲選択',
        content: '日付範囲を今月に設定してデータをフィルタリングします。',
        images: ['reports-filter-applied-05.png'],
        videos: [],
      },
      {
        title: 'エクスポート機能実行',
        content:
          'エクスポートボタンをクリックして、レポートデータをエクスポートします。',
        images: ['reports-export-06.png'],
        videos: ['reports-video.webm'],
      },
    ]

    return this.buildMarkdown('レポート', sections)
  }

  private buildMarkdown(
    featureName: string,
    sections: ManualSection[]
  ): string {
    let markdown = `# ${featureName}操作マニュアル\n\n`
    markdown += `## 概要\n\n`
    markdown += `${featureName}機能の基本的な操作方法を説明します。\n\n`
    markdown += `## 操作手順\n\n`

    sections.forEach((section, index) => {
      markdown += `### ${index + 1}. ${section.title}\n\n`
      markdown += `${section.content}\n\n`

      // 画像リンクの追加
      section.images.forEach((image) => {
        if (this.fileExists(path.join(this.baseDir, 'images', image))) {
          markdown += `![${section.title}](images/${image})\n\n`
        }
      })

      // 動画リンクの追加
      section.videos.forEach((video) => {
        // まずmoviesディレクトリを確認
        let videoPath = path.join(this.baseDir, 'movies', video)
        if (this.fileExists(videoPath)) {
          markdown += `🎥 [操作動画](movies/${video})\n\n`
        } else {
          // test-resultsディレクトリから検索
          const testResultVideo = this.findVideoInTestResults(
            video.replace('.webm', '')
          )
          if (testResultVideo) {
            markdown += `🎥 [操作動画](${testResultVideo})\n\n`
          }
        }
      })
    })

    markdown += `## 注意事項\n\n`
    markdown += `- 各操作は正しい順序で実行してください\n`
    markdown += `- データの保存前に内容を確認してください\n`
    markdown += `- エラーが発生した場合は管理者にお問い合わせください\n\n`

    markdown += `---\n\n`
    markdown += `*このマニュアルは自動生成されました。*\n`

    return markdown
  }

  private fileExists(filePath: string): boolean {
    try {
      fs.accessSync(filePath)
      return true
    } catch {
      return false
    }
  }

  private findVideoInTestResults(videoName: string): string | null {
    try {
      const testResultsPath = path.join(this.testResultsDir)
      if (!fs.existsSync(testResultsPath)) {
        return null
      }

      // テスト結果ディレクトリを再帰的に検索
      const findVideo = (dir: string): string | null => {
        const items = fs.readdirSync(dir)
        for (const item of items) {
          const fullPath = path.join(dir, item)
          const stat = fs.statSync(fullPath)

          if (stat.isDirectory()) {
            const result = findVideo(fullPath)
            if (result) return result
          } else if (
            item === 'video.webm' &&
            fullPath.includes(videoName.replace('video', ''))
          ) {
            return fullPath
          }
        }
        return null
      }

      const foundVideo = findVideo(testResultsPath)
      return foundVideo
        ? foundVideo.replace(/\\/g, '/').replace(this.testResultsDir + '/', '')
        : null
    } catch {
      return null
    }
  }

  async saveManual(content: string, featureName: string): Promise<void> {
    const manualsDir = path.join(this.baseDir, 'manuals')
    if (!fs.existsSync(manualsDir)) {
      fs.mkdirSync(manualsDir, { recursive: true })
    }

    const fileName = `${featureName.toLowerCase()}.md`
    const filePath = path.join(manualsDir, fileName)

    fs.writeFileSync(filePath, content, 'utf8')
    console.log(`✅ マニュアル生成完了: ${filePath}`)
  }

  async generateAllManuals(): Promise<void> {
    console.log('🚀 マニュアル生成を開始します...')

    // 各機能のマニュアルを生成
    const manuals = [
      { name: 'dashboard', generator: this.generateDashboardManual.bind(this) },
      { name: 'products', generator: this.generateProductsManual.bind(this) },
      { name: 'orders', generator: this.generateOrdersManual.bind(this) },
      { name: 'users', generator: this.generateUsersManual.bind(this) },
      { name: 'reports', generator: this.generateReportsManual.bind(this) },
    ]

    for (const manual of manuals) {
      try {
        const content = await manual.generator()
        await this.saveManual(content, manual.name)
      } catch (error) {
        console.error(`❌ ${manual.name} マニュアル生成エラー:`, error)
      }
    }

    console.log('🎉 全マニュアル生成完了！')
  }
}

// メイン実行関数
async function main() {
  const generator = new ManualGenerator()
  await generator.generateAllManuals()
}

// テストとして実行する場合
if (require.main === module) {
  main().catch(console.error)
}

export { ManualGenerator }
