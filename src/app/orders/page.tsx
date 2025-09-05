import { Suspense } from 'react'
import { OrdersTable } from '@/components/orders/orders-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function OrdersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">注文管理</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>注文一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading orders...</div>}>
            <OrdersTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

