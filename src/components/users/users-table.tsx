'use client'

import { MoreHorizontal } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  lastLogin: string
  avatar: string
}

export function UsersTable({ onRefresh }: { onRefresh?: () => void }) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
      onRefresh?.()
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }, [onRefresh])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">アクティブ</Badge>
      case 'inactive':
        return <Badge variant="secondary">非アクティブ</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case '管理者':
        return <Badge variant="destructive">管理者</Badge>
      case 'ユーザー':
        return <Badge variant="outline">ユーザー</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={`loading-user-row-${i}`}
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
          <TableHead>ユーザー</TableHead>
          <TableHead>メールアドレス</TableHead>
          <TableHead>役割</TableHead>
          <TableHead>ステータス</TableHead>
          <TableHead>最終ログイン</TableHead>
          <TableHead className="text-right">アクション</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
              </div>
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{getRoleBadge(user.role)}</TableCell>
            <TableCell>{getStatusBadge(user.status)}</TableCell>
            <TableCell>{user.lastLogin}</TableCell>
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
