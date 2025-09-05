'use client'

import { MoreHorizontal } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
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

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: string
  sales: number
}

export function ProductsTable({ onRefresh }: { onRefresh?: () => void }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
      onRefresh?.()
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }, [onRefresh])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '在庫あり':
        return <Badge variant="default">在庫あり</Badge>
      case '在庫少':
        return <Badge variant="secondary">在庫少</Badge>
      case '在庫なし':
        return <Badge variant="destructive">在庫なし</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={`loading-product-row-${i}`}
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
          <TableHead>商品名</TableHead>
          <TableHead>カテゴリ</TableHead>
          <TableHead>価格</TableHead>
          <TableHead>在庫数</TableHead>
          <TableHead>ステータス</TableHead>
          <TableHead>売上数</TableHead>
          <TableHead className="text-right">アクション</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>¥{product.price.toLocaleString()}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>{getStatusBadge(product.status)}</TableCell>
            <TableCell>{product.sales}</TableCell>
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
