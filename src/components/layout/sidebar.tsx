'use client'

import {
  BarChart3,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  {
    name: 'ダッシュボード',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'ユーザー管理',
    href: '/users',
    icon: Users,
  },
  {
    name: '商品管理',
    href: '/products',
    icon: Package,
  },
  {
    name: '注文管理',
    href: '/orders',
    icon: ShoppingCart,
  },
  {
    name: 'レポート',
    href: '/reports',
    icon: BarChart3,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            管理システム
          </h2>
          <div className="space-y-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  pathname === item.href && 'bg-muted'
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

