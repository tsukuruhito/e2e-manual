import { NextResponse } from 'next/server'

// 商品一覧のモックデータ
const mockProducts = [
  {
    id: 1,
    name: 'プレミアムノートブック',
    category: '文具',
    price: 1200,
    stock: 45,
    status: '在庫あり',
    sales: 234,
  },
  {
    id: 2,
    name: 'ワイヤレスイヤホン',
    category: '電子機器',
    price: 8500,
    stock: 12,
    status: '在庫少',
    sales: 567,
  },
  {
    id: 3,
    name: 'コーヒーカップ',
    category: 'キッチン用品',
    price: 1800,
    stock: 78,
    status: '在庫あり',
    sales: 123,
  },
  {
    id: 4,
    name: 'デスクチェア',
    category: '家具',
    price: 25000,
    stock: 5,
    status: '在庫少',
    sales: 89,
  },
  {
    id: 5,
    name: 'LEDデスクライト',
    category: '電子機器',
    price: 4500,
    stock: 23,
    status: '在庫あり',
    sales: 345,
  },
]

export async function GET() {
  // 実際のプロジェクトではここでデータベースからデータを取得
  return NextResponse.json(mockProducts)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, category, price, stock } = body

    // バリデーション
    if (
      !name ||
      !category ||
      typeof price !== 'number' ||
      typeof stock !== 'number'
    ) {
      return NextResponse.json(
        { error: '必須フィールドが不足しています' },
        { status: 400 }
      )
    }

    // 新しい商品IDを生成
    const newId = Math.max(...mockProducts.map((p) => p.id)) + 1

    // 在庫状況を判定
    let status = '在庫あり'
    if (stock === 0) {
      status = '在庫なし'
    } else if (stock < 10) {
      status = '在庫少'
    }

    const newProduct = {
      id: newId,
      name,
      category,
      price,
      stock,
      status,
      sales: 0, // 新規商品なので売上は0
    }

    // 商品を追加
    mockProducts.push(newProduct)

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error('商品追加エラー:', error)
    return NextResponse.json(
      { error: '商品の追加に失敗しました' },
      { status: 500 }
    )
  }
}
