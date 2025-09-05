'use client'

import { Plus } from 'lucide-react'
import { Suspense, useId, useState } from 'react'
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
import { UsersTable } from '@/components/users/users-table'

export default function UsersPage() {
  const nameId = useId()
  const emailId = useId()
  const roleId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'ユーザー',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsOpen(false)
        setFormData({ name: '', email: '', role: 'ユーザー' })
        setRefreshKey((prev) => prev + 1) // テーブルを更新
      } else {
        const error = await response.json()
        alert(error.error || 'ユーザーの追加に失敗しました')
      }
    } catch (error) {
      console.error('Error adding user:', error)
      alert('ユーザーの追加に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">ユーザー管理</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                新規ユーザー
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新規ユーザー追加</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor={nameId}>名前</Label>
                  <Input
                    id={nameId}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="名前を入力してください"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={emailId}>メールアドレス</Label>
                  <Input
                    id={emailId}
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="メールアドレスを入力してください"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={roleId}>役割</Label>
                  <select
                    id={roleId}
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="ユーザー">ユーザー</option>
                    <option value="管理者">管理者</option>
                  </select>
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
          <CardTitle>ユーザー一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading users...</div>}>
            <UsersTable key={refreshKey} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
