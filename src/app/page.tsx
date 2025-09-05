import { Suspense } from 'react'
import { DashboardChart } from '@/components/dashboard/dashboard-chart'
import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { RecentOrders } from '@/components/dashboard/recent-orders'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">ダッシュボード</h2>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <DashboardStats />
      </Suspense>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>収益チャート</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Suspense fallback={<div>Loading chart...</div>}>
              <DashboardChart />
            </Suspense>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>最近の注文</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading orders...</div>}>
              <RecentOrders />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
