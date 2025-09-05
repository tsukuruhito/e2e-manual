'use client'

import { MoreHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Order {
  id: string
  customer: string
  email: string
  total: number
  status: string
  date: string
  items: number
}

export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders')
        const data = await response.json()
        setOrders(data)
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
            key={`loading-order-row-${i}`}
            className="h-16 bg-gray-200 rounded animate-pulse"
          ></div>
        ))}
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>注文ID</TableHead>
          <TableHead>顧客名</TableHead>
          <TableHead>メールアドレス</TableHead>
          <TableHead>合計金額</TableHead>
          <TableHead>ステータス</TableHead>
          <TableHead>注文日</TableHead>
          <TableHead>商品数</TableHead>
          <TableHead className="text-right">アクション</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>{order.email}</TableCell>
            <TableCell>¥{order.total.toLocaleString()}</TableCell>
            <TableCell>{getStatusBadge(order.status)}</TableCell>
            <TableCell>{order.date}</TableCell>
            <TableCell>{order.items}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
