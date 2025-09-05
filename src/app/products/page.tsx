'use client'

import { Plus } from 'lucide-react'
import { Suspense, useId, useState } from 'react'
import { ProductsTable } from '@/components/products/products-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ProductsPage() {
  const nameId = useId()
  const categoryId = useId()
  const priceId = useId()
  const stockId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          price: parseInt(formData.price, 10),
          stock: parseInt(formData.stock, 10),
        }),
      })

      if (response.ok) {
        setIsOpen(false)
        setFormData({ name: '', category: '', price: '', stock: '' })
        setRefreshKey((prev) => prev + 1) // テーブルを更新
      } else {
        const error = await response.json()
        alert(error.error || '商品の追加に失敗しました')
      }
    } catch (error) {
      console.error('Error adding product:', error)
      alert('商品の追加に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">商品管理</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                新規商品
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新規商品追加</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor={nameId}>商品名</Label>
                  <Input
                    id={nameId}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="商品名を入力してください"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={categoryId}>カテゴリ</Label>
                  <Input
                    id={categoryId}
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="カテゴリを入力してください"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={priceId}>価格</Label>
                  <Input
                    id={priceId}
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="価格を入力してください"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={stockId}>在庫数</Label>
                  <Input
                    id={stockId}
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    placeholder="在庫数を入力してください"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    キャンセル
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? '追加中...' : '追加'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>商品一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductsTable key={refreshKey} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
