import { Calendar, Download } from 'lucide-react'
import { Suspense } from 'react'
import { DashboardChart } from '@/components/dashboard/dashboard-chart'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ReportsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">レポート</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            日付フィルター
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            エクスポート
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今月の売上</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥165,000</div>
            <p className="text-xs text-muted-foreground">前月比 +15.2%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">新規ユーザー</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">278</div>
            <p className="text-xs text-muted-foreground">前月比 +12.5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">注文数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">前月比 +8.3%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              コンバージョン率
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">前月比 +0.5%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>売上推移</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading chart...</div>}>
              <DashboardChart />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>人気商品ランキング</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div>
                    <p className="text-sm font-medium">
                      プレミアムノートブック
                    </p>
                    <p className="text-xs text-muted-foreground">234個販売</p>
                  </div>
                </div>
                <div className="text-sm font-medium">¥280,800</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div>
                    <p className="text-sm font-medium">ワイヤレスイヤホン</p>
                    <p className="text-xs text-muted-foreground">567個販売</p>
                  </div>
                </div>
                <div className="text-sm font-medium">¥1,028,400</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div>
                    <p className="text-sm font-medium">LEDデスクライト</p>
                    <p className="text-xs text-muted-foreground">345個販売</p>
                  </div>
                </div>
                <div className="text-sm font-medium">¥621,000</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

