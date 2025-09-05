import { NextResponse } from 'next/server'

// ダッシュボード統計データのモックデータ
const mockStats = {
  totalUsers: 12450,
  totalRevenue: 892340,
  totalOrders: 3456,
  activeUsers: 892,
  growth: {
    users: 12.5,
    revenue: 8.3,
    orders: 15.2,
  },
}

export async function GET() {
  // 実際のプロジェクトではここでデータベースからデータを取得
  // 今回はモックデータを返却
  return NextResponse.json(mockStats)
}

