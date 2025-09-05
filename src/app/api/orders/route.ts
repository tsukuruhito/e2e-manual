import { NextResponse } from 'next/server'

// 注文一覧のモックデータ
const mockOrders = [
  {
    id: 'ORD-2024-001',
    customer: '山田太郎',
    email: 'yamada@example.com',
    total: 12000,
    status: '完了',
    date: '2024-01-15',
    items: 3,
  },
  {
    id: 'ORD-2024-002',
    customer: '佐藤花子',
    email: 'sato@example.com',
    total: 8500,
    status: '処理中',
    date: '2024-01-14',
    items: 2,
  },
  {
    id: 'ORD-2024-003',
    customer: '鈴木一郎',
    email: 'suzuki@example.com',
    total: 25000,
    status: '発送済み',
    date: '2024-01-13',
    items: 1,
  },
  {
    id: 'ORD-2024-004',
    customer: '田中美咲',
    email: 'tanaka@example.com',
    total: 4500,
    status: '完了',
    date: '2024-01-12',
    items: 1,
  },
  {
    id: 'ORD-2024-005',
    customer: '高橋健太',
    email: 'takahashi@example.com',
    total: 18000,
    status: 'キャンセル',
    date: '2024-01-11',
    items: 4,
  },
]

export async function GET() {
  // 実際のプロジェクトではここでデータベースからデータを取得
  return NextResponse.json(mockOrders)
}

