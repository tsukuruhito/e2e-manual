import { NextResponse } from 'next/server'

// チャートデータのモックデータ
const mockChartData = [
  { month: '1月', revenue: 65000, users: 1200 },
  { month: '2月', revenue: 78000, users: 1350 },
  { month: '3月', revenue: 92000, users: 1580 },
  { month: '4月', revenue: 85000, users: 1420 },
  { month: '5月', revenue: 98000, users: 1690 },
  { month: '6月', revenue: 110000, users: 1850 },
  { month: '7月', revenue: 125000, users: 2100 },
  { month: '8月', revenue: 118000, users: 1980 },
  { month: '9月', revenue: 135000, users: 2250 },
  { month: '10月', revenue: 142000, users: 2380 },
  { month: '11月', revenue: 158000, users: 2650 },
  { month: '12月', revenue: 165000, users: 2780 },
]

export async function GET() {
  // 実際のプロジェクトではここでデータベースからデータを取得
  return NextResponse.json(mockChartData)
}

