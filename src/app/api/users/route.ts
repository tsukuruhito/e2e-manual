import { NextResponse } from 'next/server'

// ユーザー一覧のモックデータ
const mockUsers = [
  {
    id: 1,
    name: '山田太郎',
    email: 'yamada@example.com',
    role: '管理者',
    status: 'active',
    lastLogin: '2024-01-15',
    avatar: '/avatars/01.png',
  },
  {
    id: 2,
    name: '佐藤花子',
    email: 'sato@example.com',
    role: 'ユーザー',
    status: 'active',
    lastLogin: '2024-01-14',
    avatar: '/avatars/02.png',
  },
  {
    id: 3,
    name: '鈴木一郎',
    email: 'suzuki@example.com',
    role: 'ユーザー',
    status: 'inactive',
    lastLogin: '2024-01-10',
    avatar: '/avatars/03.png',
  },
  {
    id: 4,
    name: '田中美咲',
    email: 'tanaka@example.com',
    role: '管理者',
    status: 'active',
    lastLogin: '2024-01-15',
    avatar: '/avatars/04.png',
  },
  {
    id: 5,
    name: '高橋健太',
    email: 'takahashi@example.com',
    role: 'ユーザー',
    status: 'active',
    lastLogin: '2024-01-13',
    avatar: '/avatars/05.png',
  },
]

export async function GET() {
  // 実際のプロジェクトではここでデータベースからデータを取得
  // クエリパラメータによるフィルタリングも可能
  return NextResponse.json(mockUsers)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, role } = body

    // バリデーション
    if (!name || !email || !role) {
      return NextResponse.json(
        { error: '必須フィールドが不足しています' },
        { status: 400 }
      )
    }

    // メールアドレスの重複チェック
    const existingUser = mockUsers.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'このメールアドレスは既に使用されています' },
        { status: 409 }
      )
    }

    // 新しいユーザーIDを生成
    const newId = Math.max(...mockUsers.map((u) => u.id)) + 1

    // 現在の日付を取得
    const today = new Date().toISOString().split('T')[0]

    const newUser = {
      id: newId,
      name,
      email,
      role,
      status: 'active', // 新規ユーザーはデフォルトでアクティブ
      lastLogin: today,
      avatar: `/avatars/${String(newId).padStart(2, '0')}.png`,
    }

    // ユーザーを追加
    mockUsers.push(newUser)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error('ユーザー追加エラー:', error)
    return NextResponse.json(
      { error: 'ユーザーの追加に失敗しました' },
      { status: 500 }
    )
  }
}
