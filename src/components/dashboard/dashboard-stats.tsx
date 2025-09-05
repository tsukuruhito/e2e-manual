'use client'

import { DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface StatsData {
  totalUsers: number
  totalRevenue: number
  totalOrders: number
  activeUsers: number
  growth: {
    users: number
    revenue: number
    orders: number
  }
}

export function DashboardStats() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={`stat-card-${i}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded animate-pulse w-16 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">総ユーザー数</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.totalUsers.toLocaleString()}
          </div>
          <div className="flex items-center space-x-1">
            <Badge variant="secondary" className="text-xs">
              +{stats.growth.users}%
            </Badge>
            <p className="text-xs text-muted-foreground">前月比</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">総収益</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ¥{stats.totalRevenue.toLocaleString()}
          </div>
          <div className="flex items-center space-x-1">
            <Badge variant="secondary" className="text-xs">
              +{stats.growth.revenue}%
            </Badge>
            <p className="text-xs text-muted-foreground">前月比</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">総注文数</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.totalOrders.toLocaleString()}
          </div>
          <div className="flex items-center space-x-1">
            <Badge variant="secondary" className="text-xs">
              +{stats.growth.orders}%
            </Badge>
            <p className="text-xs text-muted-foreground">前月比</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            アクティブユーザー
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.activeUsers.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">今日のアクティブ数</p>
        </CardContent>
      </Card>
    </div>
  )
}
