'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface Order {
  id: string
  customer: string
  total: number
  status: string
  date: string
}

export function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders')
        const data = await response.json()
        setOrders(data.slice(0, 5)) // 最新5件のみ表示
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '完了':
        return <Badge variant="default">完了</Badge>
      case '処理中':
        return <Badge variant="secondary">処理中</Badge>
      case '発送済み':
        return <Badge variant="outline">発送済み</Badge>
      case 'キャンセル':
        return <Badge variant="destructive">キャンセル</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={`loading-order-${i}`}
            className="flex items-center space-x-4"
          >
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{order.customer}</p>
            <p className="text-sm text-muted-foreground">{order.id}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm font-medium">
              ¥{order.total.toLocaleString()}
            </div>
            {getStatusBadge(order.status)}
          </div>
        </div>
      ))}
    </div>
  )
}
